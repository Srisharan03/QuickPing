import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    // CHANGE: Set a consistent light gray background for the entire page.
    <div className="h-screen pt-20 bg-gray-100">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* CHANGE: Replaced theme background with a clean white card. */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
          <div className="text-center">
            {/* CHANGE: Styled typography. */}
            <h1 className="text-2xl font-semibold text-gray-900 font-sans">Profile</h1>
            <p className="mt-1 text-gray-500 font-sans">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                // CHANGE: Styled image border.
                className="size-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1
                  bg-gray-800 hover:bg-gray-900 hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {/* CHANGE: Styled helper text. */}
            <p className="text-sm text-gray-500 font-sans">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2 font-sans">
                <User className="w-4 h-4" />
                Full Name
              </div>
              {/* CHANGE: Styled info display field. */}
              <p className="px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 font-sans">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2 font-sans">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              {/* CHANGE: Styled info display field. */}
              <p className="px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 font-sans">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 font-sans">Account Information</h2>
            <div className="space-y-3 text-sm font-sans text-gray-700">
              {/* CHANGE: Styled the key-value display rows. */}
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Account Status</span>
                <span className="font-semibold text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;