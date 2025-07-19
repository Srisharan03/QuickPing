import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    // CHANGE: Replaced theme background with a neutral, light gray page background.
    <div className="h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-20 px-4">
        {/*
          CHANGES:
          - Replaced `bg-base-100` with `bg-white`.
          - Replaced custom shadow `shadow-cl` with a standard, clean `shadow-xl`.
        */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* These components are already styled and will fit perfectly. */}
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;