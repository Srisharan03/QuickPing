import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    // CHANGES: Replaced border color and added a solid white background for a clean header area.
    <div className="p-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            {/* CHANGE: Added a subtle border to the avatar for definition. */}
            <div className="size-10 rounded-full relative border border-gray-300">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            {/* CHANGES: Updated font weight and color to match the "John Doe" style. */}
            <h3 className="font-semibold text-gray-900 font-sans">{selectedUser.fullName}</h3>
            {/* CHANGES: Updated status text color to match the "Online" style. */}
            <p className="text-sm text-gray-500 font-sans">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        {/* CHANGE: Styled the close button for better visibility and interaction. */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;