import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      // CHANGES: Replaced `border-base-300` with a specific shade `border-gray-200`.
      // Added `bg-white` for a clean sidebar background.
      className="h-full w-20 lg:w-72 border-r border-gray-200 bg-white
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      {/* CHANGES: Replaced border color, added text color and font style. */}
      <div className="border-b border-gray-200 w-full p-5">
        <div className="flex items-center gap-2 text-gray-800">
          <Users className="w-6 h-6" />
          {/* Using `font-semibold` to match the "John Doe" text weight from the image. */}
          <span className="font-semibold hidden lg:block font-sans">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              {/* CHANGE: Replaced 'skeleton' with a specific background color `bg-gray-300`. */}
              <div className="bg-gray-300 size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              {/* CHANGE: Replaced 'skeleton' with specific background and rounded corners. */}
              <div className="bg-gray-200 h-4 w-32 mb-2 rounded" />
              <div className="bg-gray-200 h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;