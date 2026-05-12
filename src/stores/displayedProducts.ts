import { create } from "zustand";

interface DisplayedProductsState {
  ids: Set<string>;
  register: (ids: string[]) => void;
  unregister: (ids: string[]) => void;
  reset: () => void;
}

// Tracks product IDs already shown on the current page so other sections
// can filter them out and avoid duplicates.
export const useDisplayedProducts = create<DisplayedProductsState>((set) => ({
  ids: new Set<string>(),
  register: (ids) =>
    set((state) => {
      const next = new Set(state.ids);
      ids.forEach((id) => next.add(id));
      return { ids: next };
    }),
  unregister: (ids) =>
    set((state) => {
      const next = new Set(state.ids);
      ids.forEach((id) => next.delete(id));
      return { ids: next };
    }),
  reset: () => set({ ids: new Set<string>() }),
}));
