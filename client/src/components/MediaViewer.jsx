export default function MediaViewer({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {item.type === "image" ? (
        <img
          src={`http://localhost:5000${item.path}`}
          className="max-h-full max-w-full"
        />
      ) : (
        <video
          src={`http://localhost:5000${item.path}`}
          controls
          autoPlay
          className="max-h-full max-w-full"
        />
      )}
    </div>
  );
}
