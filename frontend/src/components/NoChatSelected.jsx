import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    // CHANGE: Replaced theme background with our consistent chat panel background color.
    <div className="w-full flex-1 flex-col items-center justify-center p-16 bg-gray-50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center">
          {/* CHANGE: Removed animation and replaced primary colors with neutral grays. */}
          <div
            className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center
             justify-center"
          >
            <MessageSquare className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        {/* Welcome Text */}
        {/* CHANGE: Applied specific text colors and font family. */}
        <h2 className="text-2xl font-bold text-gray-900 font-sans">Welcome to Chatty!</h2>
        <p className="text-gray-500 font-sans">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;