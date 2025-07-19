import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // The loading state now correctly uses the modified MessageSkeleton
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* CHANGE: Added `bg-gray-50` to match the light gray chat background from the image. */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                {/* CHANGE: Added a specific border color. */}
                <div className="size-10 rounded-full border border-gray-300">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* CONTAINER FOR BUBBLE AND TIME */}
              <div className="flex flex-col">
                {/* 
                  CHANGE: Replaced `chat-bubble` with a fully conditional className.
                  This block now controls the background and text color for both message types based on your image.
                */}
                <div
                  className={`
                    px-4 py-2 rounded-xl flex flex-col font-sans
                    ${
                      isSender
                        ? "bg-gray-500 text-white" // Darker bubble for the sender (outgoing)
                        : "bg-gray-200 text-gray-800" // Lighter bubble for the receiver (incoming)
                    }
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                {/* CHANGE: Styled the timestamp to match the subtle look in the image. */}
                <time
                  className={`text-xs mt-1 ml-1
                    ${isSender ? "text-right" : "text-left"}
                    text-gray-400
                  `}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;