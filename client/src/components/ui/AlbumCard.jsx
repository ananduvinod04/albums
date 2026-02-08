import { Folder } from "lucide-react";
import { useAlbumStore } from "@/store/albumStore";

export default function AlbumCard({ album, cover }) {
  const selectAlbum = useAlbumStore((s) => s.selectAlbum);

  return (
    <div
      onClick={() => selectAlbum(album)}
      className="cursor-pointer rounded-lg border p-2 hover:shadow-lg"
    >
      {cover ? (
        <img
          src={`http://localhost:5000${cover.path}`}
          className="h-32 w-full object-cover rounded"
        />
      ) : (
        <div className="h-32 flex items-center justify-center">
          <Folder size={48} />
        </div>
      )}

      <p className="mt-2 text-center font-medium">
        {album.name}
      </p>
    </div>
  );
}
