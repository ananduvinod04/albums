import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlbumStore } from "@/store/albumStore";

export default function CreateAlbumDialog() {
  const [name, setName] = useState("");
  const createAlbum = useAlbumStore((s) => s.createAlbum);

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createAlbum(name);
    setName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Album</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Album name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
