import { useEffect, useState } from "react";

const STORAGE_KEY = "om_recently_viewed";
const MAX_ITEMS = 12;

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
  } catch {
    return [];
  }
}

function write(handles: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(handles.slice(0, MAX_ITEMS)));
  } catch {
    /* quota exceeded — ignore */
  }
}

/**
 * Track recently viewed product handles. Call `track(handle)` on each PDP mount.
 * Returns the most recent N (excluding the current handle if provided).
 */
export function useRecentlyViewed(currentHandle?: string) {
  const [handles, setHandles] = useState<string[]>([]);

  // Read on mount
  useEffect(() => {
    setHandles(read());
  }, []);

  const track = (handle: string) => {
    const current = read();
    const next = [handle, ...current.filter((h) => h !== handle)].slice(0, MAX_ITEMS);
    write(next);
    setHandles(next);
  };

  const list = currentHandle ? handles.filter((h) => h !== currentHandle) : handles;
  return { handles: list, track };
}
