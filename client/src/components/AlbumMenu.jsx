import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAlbumStore } from "@/store/albumStore";

export default function AlbumMenu({ album }) {
  const { renameAlbum, deleteAlbum } = useAlbumStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded hover:bg-muted">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            const name = prompt("New album name");
            if (name) renameAlbum(album._id, name);
          }}
        >
          Rename
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-500"
          onClick={() => deleteAlbum(album._id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
