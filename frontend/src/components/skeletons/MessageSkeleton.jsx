const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    // CHANGE: Added `bg-gray-50` for the light gray chat background from the image.
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              {/* CHANGE: Replaced 'skeleton' with a specific background color `bg-gray-300` for the avatar circle. */}
              <div className="bg-gray-300 w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            {/* CHANGE: Replaced 'skeleton' with `bg-gray-200` and added rounding for the name placeholder. */}
            <div className="bg-gray-200 h-4 w-16 rounded" />
          </div>

          {/* CHANGE: Replaced the single 'skeleton' class on the bubble with conditional background colors and rounding to match the two message types from the image. */}
          <div
            className={`
              h-16 w-[200px] rounded-xl
              ${idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;