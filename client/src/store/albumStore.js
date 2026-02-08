import { create } from "zustand";

export const useAlbumStore = create((set) => ({
  albums: [],
  selectedAlbum: null,

  addAlbum: (name) =>
    set((state) => ({
      albums: [
        ...state.albums,
        { id: Date.now(), name }
      ],
    })),

  selectAlbum: (album) =>
    set({ selectedAlbum: album }),
}));
