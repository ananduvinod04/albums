import { Folder } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAlbumStore } from "@/store/albumStore";

export default function AlbumCard({ album, isSelected }) {
  const selectAlbum = useAlbumStore((s) => s.selectAlbum);

  return (
    <Card
      onClick={() => selectAlbum(album)}
      className={`cursor-pointer p-6 transition hover:shadow-lg ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <Folder size={48} />
        <p className="font-medium text-center break-words">
          {album.name}
        </p>
      </div>
    </Card>
  );
}
