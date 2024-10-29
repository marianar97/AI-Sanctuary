export default function AddVideoButton({ handleAddVideo }) {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white hover:bg-gray-900 h-10 px-4 py-2"
      onClick={handleAddVideo}
    >
      Add Video
    </button>
  );
}
