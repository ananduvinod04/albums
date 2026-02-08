import { create } from "zustand";

export const useMediaStore = create((set) => ({
  media: [],

  addMedia: (file) =>
    set((state) => ({
      media: [
        ...state.media,
        {
          id: Date.now(),
          name: file.name,
          type: file.type,
          path: file.path || "",
        },
      ],
    })),

  getMediaByAlbum: (albumId) => {
    return [];
  },
}));
