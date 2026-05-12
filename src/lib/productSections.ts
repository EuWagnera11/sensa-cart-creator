// Curated homepage sections — "The Secret Menu".
// 6 themed sections grouping products into discovery-friendly buckets.
//
// Bundle strategy: meta (small, ~4KB, bundled) holds metadata + first 8
// preview handles per section. Full (~550KB, lazy) holds the complete
// listing_handles + handle_to_sections — loaded only on the section page.

import { useEffect, useState } from "react";
import metaData from "@/data/sections_meta.json";

// ============= TYPES =============

export type SectionId = "buzz" | "duo" | "slippery" | "tied" | "newbie" | "oops";

export interface SectionMeta {
  id: SectionId;
  name: string;
  subtitle: string;
  description: string;
  cta: string;
  total_products: number;
  total_in_listing: number;
  preview_handles: string[];
}

interface MetaFile {
  metadata: Record<string, unknown>;
  sections: Record<SectionId, SectionMeta>;
}

interface FullFile {
  sections: Record<SectionId, { listing_handles: string[] }>;
  handle_to_sections: Record<string, SectionId[]>;
}

const meta = metaData as unknown as MetaFile;

export const SECTION_ORDER: SectionId[] = ["buzz", "duo", "slippery", "tied", "newbie", "oops"];

// ============= SYNC (bundled meta) =============

export function getSection(id: string): SectionMeta | null {
  return (meta.sections as Record<string, SectionMeta>)[id] || null;
}

export function getAllSections(): SectionMeta[] {
  return SECTION_ORDER.map((id) => meta.sections[id]).filter(Boolean);
}

export function getVisibleSections(): SectionMeta[] {
  // Always include "oops" — it's a catch-all/sale section that surfaces
  // the whole catalog regardless of curated handles.
  return getAllSections().filter((s) => s.id === "oops" || s.total_in_listing > 0);
}

export function isCatchAllSection(id: string): boolean {
  return id === "oops";
}

export function getTilePreviewHandles(id: SectionId, n = 4): string[] {
  return (getSection(id)?.preview_handles || []).slice(0, n);
}

// ============= LAZY (full data) =============

let fullCache: FullFile | null = null;
let fullPromise: Promise<FullFile> | null = null;

async function loadFull(): Promise<FullFile> {
  if (fullCache) return fullCache;
  if (!fullPromise) {
    fullPromise = import("@/data/sections_full.json").then((m) => {
      fullCache = m as unknown as FullFile;
      return fullCache;
    });
  }
  return fullPromise;
}

/**
 * Lazy-load the full listing_handles for a section.
 */
export function useSectionFull(slug: string | undefined) {
  const section = slug ? getSection(slug) : null;
  const [handles, setHandles] = useState<string[]>([]);
  const [loading, setLoading] = useState(!!section);

  useEffect(() => {
    if (!section) {
      setHandles([]);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    loadFull().then((d) => {
      if (!alive) return;
      setHandles(d.sections[section.id]?.listing_handles || []);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [section?.id]);

  return { section, listing_handles: handles, loading };
}

/**
 * Lazy-load which sections a product handle belongs to (for badges).
 */
export function useProductSections(handle: string | undefined): SectionId[] {
  const [ids, setIds] = useState<SectionId[]>([]);
  useEffect(() => {
    if (!handle) return;
    let alive = true;
    loadFull().then((d) => {
      if (!alive) return;
      setIds(d.handle_to_sections[handle] || []);
    });
    return () => {
      alive = false;
    };
  }, [handle]);
  return ids;
}
