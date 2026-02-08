import { useEffect } from "react";
import { useAlbumStore } from "@/store/albumStore";

import CreateAlbumDialog from "@/components/ui/CreateAlbumDialog";
import AlbumCard from "@/components/ui/AlbumCard";
import AlbumView from "@/components/AlbumView";




function App() {
  const {
    albums,
    selectedAlbum,
    fetchAlbums,
    selectAlbum,
  } = useAlbumStore();

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-6">
      {/* NO album selected → show albums */}
      {!selectedAlbum && (
        <>
          <div className="mb-4">
            <CreateAlbumDialog />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {albums.map((album) => (
              <AlbumCard
                key={album._id}
                album={album}
                isSelected={false}
              />
            ))}
          </div>
        </>
      )}

      {/* Album selected → open album */}
      {selectedAlbum && (
        <AlbumView album={selectedAlbum} />
      )}
    </div>
  );
}

export default App;
