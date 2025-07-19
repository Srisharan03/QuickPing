import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    // CHANGE: Replaced border color and added a white background.
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 bg-white flex flex-col transition-all duration-200">
      {/* HEADER */}
      <div className="border-b border-gray-200 w-full p-5">
        <div className="flex items-center gap-2 text-gray-800">
          <Users className="size-6" />
          {/* CHANGE: Styled header text. */}
          <span className="font-semibold hidden lg:block font-sans">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            {/* CHANGE: Completely restyled checkbox, removing all 'checkbox' classes. */}
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="appearance-none size-4 rounded-sm bg-gray-200 checked:bg-gray-800
                         checked:before:content-['✓'] checked:before:text-white
                         checked:before:flex checked:before:items-center checked:before:justify-center
                         checked:before:text-xs"
            />
            <span className="text-sm text-gray-700 font-sans">Show online only</span>
          </label>
          <span className="text-xs text-gray-500 font-sans">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* CONTACT LIST */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            // CHANGE: Replaced hover and selected styles with our own palette.
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-100 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-200" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName} // Corrected alt text to use fullName
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-white" // CHANGE: ring color to white for a cleaner look.
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              {/* CHANGE: Styled user text. */}
              <div className="font-semibold text-gray-800 truncate font-sans">{user.fullName}</div>
              <div className="text-sm text-gray-500 font-sans">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          // CHANGE: Styled the empty state text.
          <div className="text-center text-gray-500 py-4 font-sans">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;