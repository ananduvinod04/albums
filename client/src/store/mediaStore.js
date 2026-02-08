import { create } from "zustand";
import api from "@/api/api";

export const useMediaStore = create((set) => ({
  media: [],

  fetchMediaByAlbum: async (albumId) => {
    const res = await api.get(`/media/${albumId}`);
    set({ media: res.data });
  },

  saveMediaMetadata: async (files, albumId) => {
    for (const file of files) {
      await api.post("/media", {
        ...file,
        albumId,
      });
    }
  },

  setMedia: (media) => set({ media }),
}));
