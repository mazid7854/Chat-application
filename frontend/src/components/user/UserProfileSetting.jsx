import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { updateUser } from "../../redux/userSlice.js";
import imageCompression from "browser-image-compression";
import PencilIcon from "../../utils/PencilIcon.jsx";
import UserProfilePictureView from "../../utils/UserProfilePictureView.jsx";
import { setUserProfile } from "../../redux/userProfileSlice.js";
import { RiArrowGoBackFill } from "react-icons/ri";

const UserProfileSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState(user?.about || "");
  console.log(user);

  const [uploading, setUploading] = useState(false);
  const [profilePictureView, setProfilePictureView] = useState(false);

  // Handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Original file:", file);
    console.log("Original File Size:", file.size / 1024 / 1024, "MB");

    setUploading(true); // Ensure UI updates before async tasks

    try {
      // ------- Compress the image ---------//
      const options = {
        maxSizeMB: 2, // Maximum size in MB
        maxWidthOrHeight: 1920, // Resize if needed
        useWebWorker: true, // Improve performance
      };

      let compressedFile = file;
      try {
        compressedFile = await imageCompression(file, options);
        console.log(
          "Compressed File Size:",
          compressedFile.size / 1024 / 1024,
          "MB"
        );
      } catch (error) {
        console.error("Compression Error:", error);
      }

      // Extract file extension
      const fileExtension = compressedFile.name.split(".").pop();
      const newFileName = `${user?._id}.${fileExtension}`;

      // Create a new File object with the new name
      const renamedFile = new File([compressedFile], newFileName, {
        type: compressedFile.type,
      });

      // Upload the renamed file
      const formData = new FormData();
      formData.append("profilePicture", renamedFile);

      const response = await axios.post(
        `/api/users/profilePicture/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        dispatch(
          updateUser({
            ...user,
            profilePicture: response.data.profilePicture,
          })
        );
        toast.success("Profile picture updated!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setUploading(false); // Ensure UI updates back to normal after completion
      console.log("Uploading state set to false");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      about,
      profilePicture: user?.profilePicture,
      ...(password && { password }), // Only send password if it's changed
    };

    try {
      const response = await axios.put(
        `/api/users/update/${user._id}`,
        updatedProfile,
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch(updateUser(response.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Profile update failed!");
    }
  };

  return (
    <>
      {profilePictureView ? (
        <UserProfilePictureView setProfilePictureView={setProfilePictureView} />
      ) : (
        <div className="w-full max-w-lg sm:max-w-lg mx-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-6 h-screen overflow-y-auto">
          {/* Close Button header */}
          <div className="fixed top-0 left-0 w-full bg-gray-400 p-2 flex justify-between items-center sm:hidden rounded-lg">
            <button
              onClick={() => dispatch(setUserProfile(false))}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
              title="Close"
            >
              <RiArrowGoBackFill />
            </button>
          </div>

          {/* Add spacing so content doesn't overlap close button */}
          <div className="mt-12">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center text-slate-300 mb-4">
              Profile Settings
            </h2>

            {/* Profile Picture Upload */}
            <div className="relative flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-24 h-24 relative">
                {uploading ? (
                  <div className="w-full h-full flex items-center justify-center rounded-full border-2 border-gray-300 bg-gray-200">
                    <span className="loader"></span> {/* Add a CSS loader */}
                  </div>
                ) : (
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full border-2 border-gray-300 object-cover"
                    onClick={() => setProfilePictureView(true)}
                  />
                )}

                {/* Pencil Icon Button */}
                <button
                  type="button"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                  title="Change photo"
                  onClick={() =>
                    document.getElementById("profileImage").click()
                  } // Trigger file input
                >
                  <PencilIcon className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Name Input */}
              <div className="mt-4">
                <label className="block text-slate-300 text-sm font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="mt-4">
                <label className="block text-slate-300 text-sm font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              {/* About Input */}
              <div className="mt-4">
                <label className="block text-slate-300 text-sm font-semibold mb-1">
                  About
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Enter your about"
                ></textarea>
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileSetting;
