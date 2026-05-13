import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const LOCAL_KEY = "om_wishlist";
const MAX_LOCAL = 100; // sanity cap for anonymous users

// Event so multiple <Heart> buttons across the app stay in sync
const SYNC_EVENT = "om-wishlist-sync";

/* ===== localStorage helpers ===== */
function readLocal(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_LOCAL) : [];
  } catch {
    return [];
  }
}

function writeLocal(handles: string[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(handles.slice(0, MAX_LOCAL)));
  } catch {
    /* quota exceeded — ignore */
  }
}

function clearLocal() {
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch {
    /* ignore */
  }
}

function broadcast(handles: string[]) {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: handles }));
}

/* ===== DB helpers ===== */
async function dbFetch(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_handle")
    .eq("user_id", userId);
  if (error) {
    console.error("Wishlist fetch failed:", error);
    return [];
  }
  return data.map((r) => r.product_handle);
}

async function dbAdd(userId: string, handle: string) {
  const { error } = await supabase
    .from("wishlist_items")
    .insert({ user_id: userId, product_handle: handle });
  if (error && error.code !== "23505") {
    // 23505 = unique violation (already in wishlist) — silently ignore
    console.error("Wishlist add failed:", error);
  }
}

async function dbRemove(userId: string, handle: string) {
  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_handle", handle);
  if (error) console.error("Wishlist remove failed:", error);
}

/**
 * Wishlist with hybrid persistence:
 *   - Anonymous: localStorage only (per browser).
 *   - Logged in: Supabase DB only.
 *   - On login: merge any localStorage items into DB, then clear localStorage.
 *
 * Returns {items, has, toggle, add, remove, count, loading}.
 * Items are product handles (e.g. "lelo-tiani-rosa").
 *
 * Use the events broadcast pattern so multiple <Heart> components
 * across the page stay in sync without prop-drilling.
 */
export function useWishlist() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* ====== Initial load + auth state changes ====== */
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    (async () => {
      setLoading(true);

      if (user) {
        // Logged in — fetch from DB
        const dbItems = await dbFetch(user.id);
        const localItems = readLocal();

        // Merge: if anonymous had stuff, add to DB
        if (localItems.length > 0) {
          const toMerge = localItems.filter((h) => !dbItems.includes(h));
          await Promise.all(toMerge.map((h) => dbAdd(user.id, h)));
          clearLocal();
          if (cancelled) return;
          const merged = Array.from(new Set([...dbItems, ...localItems]));
          setItems(merged);
          broadcast(merged);
        } else {
          if (cancelled) return;
          setItems(dbItems);
          broadcast(dbItems);
        }
      } else {
        // Anonymous — localStorage only
        const localItems = readLocal();
        if (cancelled) return;
        setItems(localItems);
        broadcast(localItems);
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, authLoading]);

  /* ====== Listen to sync events from other components ====== */
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail as string[];
      setItems(next);
    };
    window.addEventListener(SYNC_EVENT, handler);
    return () => window.removeEventListener(SYNC_EVENT, handler);
  }, []);

  /* ====== Mutators ====== */
  const add = useCallback(
    async (handle: string) => {
      if (items.includes(handle)) return;
      const next = [...items, handle];
      setItems(next);
      broadcast(next);
      if (user) {
        await dbAdd(user.id, handle);
      } else {
        writeLocal(next);
      }
    },
    [items, user]
  );

  const remove = useCallback(
    async (handle: string) => {
      if (!items.includes(handle)) return;
      const next = items.filter((h) => h !== handle);
      setItems(next);
      broadcast(next);
      if (user) {
        await dbRemove(user.id, handle);
      } else {
        writeLocal(next);
      }
    },
    [items, user]
  );

  const toggle = useCallback(
    async (handle: string) => {
      if (items.includes(handle)) await remove(handle);
      else await add(handle);
    },
    [items, add, remove]
  );

  const has = useCallback((handle: string) => items.includes(handle), [items]);

  const clear = useCallback(async () => {
    setItems([]);
    broadcast([]);
    if (user) {
      await supabase.from("wishlist_items").delete().eq("user_id", user.id);
    } else {
      clearLocal();
    }
  }, [user]);

  return {
    items,
    count: items.length,
    has,
    add,
    remove,
    toggle,
    clear,
    loading,
  };
}
