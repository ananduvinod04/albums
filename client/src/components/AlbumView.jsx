import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { useAlbumStore } from "@/store/albumStore";
import { useMediaStore } from "@/store/mediaStore";
import MediaGrid from "@/components/MediaGrid";

export default function AlbumView({ album }) {
  const selectAlbum = useAlbumStore((s) => s.selectAlbum);

  const {
    fetchMediaByAlbum,
    saveMediaMetadata,
  } = useMediaStore();

  const [search, setSearch] = useState("");

  const isElectron = !!window.electronAPI;

  // 🔥 Fetch media when album opens
  useEffect(() => {
    if (album?._id) {
      fetchMediaByAlbum(album._id);
    }
  }, [album]);

  // 🔥 Upload handler
  const handleUpload = async () => {
    if (!isElectron) {
      alert("Upload works only inside Electron");
      return;
    }

    const files = await window.electronAPI.pickMedia();
    if (!files || files.length === 0) return;

    await saveMediaMetadata(files, album._id);
    fetchMediaByAlbum(album._id);
  };

  if (!album) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => selectAlbum(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h2 className="text-xl font-semibold">
            {album.name}
          </h2>
        </div>

        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search */}
      <input
        className="border px-3 py-2 rounded w-64"
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Media grid */}
      <MediaGrid search={search} />

      {/* Drag & drop (Electron only) */}
     
{isElectron && (
  <div
    onDragOver={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    onDrop={async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const names = Array.from(e.dataTransfer.files).map(
        (f) => f.name
      );

      if (!names.length) return;

      const resolved =
        await window.electronAPI.resolveDroppedFiles(names);

      console.log("RESOLVED FILES:", resolved);

      if (!resolved.length) return;

      await saveMediaMetadata(resolved, album._id);
      fetchMediaByAlbum(album._id);
    }}
    className="border-dashed border-2 p-6 rounded text-center"
  >
    Drag & drop files here
  </div>
)}

    </div>
  );
}
