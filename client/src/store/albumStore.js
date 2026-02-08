import { create } from "zustand";
import api from "@/api/api";

export const useAlbumStore = create((set) => ({
  albums: [],
  selectedAlbum: null,

  fetchAlbums: async () => {
    const res = await api.get("/albums");
    set({ albums: res.data });
  },

  createAlbum: async (name) => {
    const res = await api.post("/albums", { name });
    set((state) => ({
      albums: [...state.albums, res.data],
    }));
  },

  selectAlbum: (album) => set({ selectedAlbum: album }),
}));
