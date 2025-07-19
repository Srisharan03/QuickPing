import { Send } from "lucide-react";

// This is the same preview data from your original file.
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  // The useThemeStore hook and theme selection logic have been completely removed.

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        {/* CHANGE: Simplified the page header. */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-gray-900 font-sans">Appearance</h2>
          <p className="text-sm text-gray-500 font-sans">
            This is a preview of your application's visual style.
          </p>
        </div>

        {/* 
          NOTE: The entire theme selection grid has been deleted
          as it conflicts with the goal of creating a single unique UI.
        */}

        {/* Preview Section - NOW HARD-CODED TO YOUR NEW DESIGN */}
        <h3 className="text-lg font-semibold text-gray-800 font-sans">Preview</h3>
        {/* CHANGE: The entire preview is rebuilt using our established styles. */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
          <div className="max-w-full mx-auto">
            {/* Mock Chat UI */}
            <div className="rounded-xl overflow-hidden">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                    J
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 font-sans">John Doe</h3>
                    <p className="text-xs text-gray-500 font-sans">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-gray-50">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex font-sans ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-xl p-3 shadow-sm
                        ${
                          message.isSent
                            ? "bg-gray-500 text-white" // Outgoing message style
                            : "bg-gray-200 text-gray-800" // Incoming message style
                        }
                      `}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`
                          text-[10px] mt-1.5
                          ${
                            message.isSent
                              ? "text-white/70" // Outgoing timestamp
                              : "text-gray-500" // Incoming timestamp
                          }
                        `}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2
                               text-sm text-gray-800 placeholder:text-gray-500 font-sans
                               focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Type a message..."
                    readOnly
                  />
                  <button
                    className="flex items-center justify-center size-10 rounded-lg
                               bg-gray-500 text-white transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;