import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    await sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    removeImage();
  };

  return (
    // CHANGE: Added white background and a top border for clean separation.
    <div className="p-4 w-full bg-white border-t border-gray-200">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {/* CHANGE: Replaced border color with a consistent gray. */}
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
            />
            {/* CHANGE: Restyled the remove button for a cleaner look. */}
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-600 text-white
              flex items-center justify-center hover:bg-gray-800 transition-colors"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* CHANGE: Removed all library-specific 'input' classes. */}
        <input
          type="text"
          className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2
                     text-gray-800 placeholder:text-gray-500 font-sans
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* CHANGE: Removed 'btn' classes and restyled as a simple icon button. */}
        <button
          type="button"
          className="hidden sm:flex items-center justify-center size-10 rounded-full
                     text-gray-500 hover:bg-gray-200 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>

        {/* CHANGE: Removed 'btn' classes and created a custom styled submit button. */}
        <button
          type="submit"
          className="flex items-center justify-center size-10 rounded-full
                     bg-gray-500 text-white
                     hover:bg-gray-600 transition-colors
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;