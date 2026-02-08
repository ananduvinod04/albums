import { Button } from "@/components/ui/button";
import { useAlbumStore } from "@/store/albumStore";

function App() {
  const { albums, addAlbum, selectAlbum, selectedAlbum } =
    useAlbumStore();

  return (
    <div className="h-screen p-6">
      <div className="flex gap-4 mb-6">
        <Button onClick={() => addAlbum("My Album")}>
          Add Album
        </Button>
      </div>

      <div className="flex gap-4">
        {albums.map((album) => (
          <Button
            key={album.id}
            variant={
              selectedAlbum?.id === album.id
                ? "default"
                : "outline"
            }
            onClick={() => selectAlbum(album)}
          >
            {album.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default App;
