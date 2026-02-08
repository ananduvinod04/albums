import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAlbumStore } from "@/store/albumStore";
import { useMediaStore } from "@/store/mediaStore";
import CreateAlbumDialog from "./components/ui/CreateAlbumDialog";
import AlbumCard from "./components/ui/AlbumCard";



function App() {
  const {
    albums,
    selectedAlbum,
    fetchAlbums,
    createAlbum,
    selectAlbum,
  } = useAlbumStore();

  const {
    media,
    fetchMediaByAlbum,
    saveMediaMetadata,
  } = useMediaStore();

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      fetchMediaByAlbum(selectedAlbum._id);
    }
  }, [selectedAlbum]);

  const handleUpload = async () => {
    if (!selectedAlbum) {
      alert("Select an album first");
      return;
    }

    // Upload works only in Electron
    if (!window.electronAPI) {
      alert("Upload works only inside Electron");
      return;
    }

    const files = await window.electronAPI.pickMedia();
    await saveMediaMetadata(files, selectedAlbum._id);
    fetchMediaByAlbum(selectedAlbum._id);
  };

  return (
    <div className="p-6">
      {/* Album controls */}
   <div className="mb-6">
  {/* Top bar */}
  <div className="mb-4">
    <CreateAlbumDialog />
  </div>

  {/* Albums grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {albums.map((album) => (
      <AlbumCard
        key={album._id}
        album={album}
        isSelected={selectedAlbum?._id === album._id}
      />
    ))}
  </div>
</div>


      {/* Upload */}
      <Button onClick={handleUpload} disabled={!selectedAlbum}>
        Upload Media
      </Button>

      {/* Media grid */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {media.map((item) =>
          item.type === "image" ? (
            <img
              key={item._id}
              src={`http://localhost:5000${item.path}`}
              alt={item.name}
              className="h-40 w-full object-cover rounded"
            />
          ) : (
            <video
              key={item._id}
              src={`http://localhost:5000${item.path}`}
              controls
              className="h-40 w-full rounded"
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
