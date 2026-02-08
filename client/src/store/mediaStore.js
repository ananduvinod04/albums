import { create } from "zustand";

export const useMediaStore = create((set) => ({
  media: [],

  addMediaBatch: (files) =>
    set((state) => ({
      media: [...state.media, ...files],
    })),
}));
