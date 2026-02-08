import { Button } from "@/components/ui/button";
import { useMediaStore } from "@/store/mediaStore";

function App() {
  const { media, addMediaBatch } = useMediaStore();

  const handleUpload = async () => {
    const files = await window.electronAPI.pickMedia();
    addMediaBatch(files);
  };

  return (
    <div className="p-6">
      <Button onClick={handleUpload}>Upload Media</Button>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {media.map((item, i) =>
          item.type === "image" ? (
            <img
              key={i}
              src={`file://${item.path}`}
              className="h-40 object-cover rounded"
            />
          ) : (
            <video
              key={i}
              src={`file://${item.path}`}
              controls
              className="h-40 rounded"
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
