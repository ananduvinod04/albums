import { create } from "zustand";
import api from "@/api/api";

export const useMediaStore = create((set) => ({
  media: [],

  fetchMediaByAlbum: async (albumId) => {
    const res = await api.get(`/media/${albumId}`);
    set({ media: res.data });
  },

  saveMediaMetadata: async (files, albumId) => {
    const payload = files
      .map((file) => {
        const name =
          file.name ||
          (file.path
            ? file.path.split(/[\\/]/).pop()
            : null);

        if (!name) {
          console.error("INVALID FILE:", file);
          return null;
        }

        return {
          name,
          albumId,
          type:
            file.type === "video" ||
            file.type?.startsWith("video")
              ? "video"
              : "image",
          path: `/media/${name}`, // ✅ ALWAYS CORRECT
        };
      })
      .filter(Boolean);

    if (!payload.length) return;

    await api.post("/media", payload);
  },

  setMedia: (media) => set({ media }),
}));
