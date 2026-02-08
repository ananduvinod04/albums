import { useState } from "react";
import { useMediaStore } from "@/store/mediaStore";
import MediaViewer from "@/components/MediaViewer";

export default function MediaGrid({ search = "" }) {
  const { media } = useMediaStore();
  const [active, setActive] = useState(null);

  const safeMedia = Array.isArray(media) ? media : [];

const filtered = safeMedia.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);


 if (filtered.length === 0) {
  return (
    <p className="text-muted-foreground">
      No files in this album yet
    </p>
  );
}


  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {/* Preview */}
            {item.type === "image" ? (
              <img
                src={`http://localhost:5000${item.path}`}
                alt={item.name}
                className="h-40 w-full object-cover cursor-pointer"
                onClick={() => setActive(item)}
              />
            ) : (
              <video
                src={`http://localhost:5000${item.path}`}
                className="h-40 w-full object-cover cursor-pointer"
                onClick={() => setActive(item)}
              />
            )}

            {/* File name */}
            <div className="px-2 py-1 text-sm truncate">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen viewer */}
      {active && (
        <MediaViewer
          item={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
