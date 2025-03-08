import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserProfilePictureView = ({
  setProfilePictureView,
  setProfilePictureViewInChatHeader,
}) => {
  const user = useSelector((state) => state.user.user);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  console.log("selectedConversation", selectedConversation);

  return (
    <>
      {setProfilePictureViewInChatHeader ? (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative p-4">
            {/* Close Button */}
            <button
              onClick={() => {
                if (setProfilePictureViewInChatHeader) {
                  setProfilePictureViewInChatHeader(false);
                } else {
                  setProfilePictureView(false);
                }
              }}
              className="absolute top-0 right-0  p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
              title="Close"
            >
              ✕
            </button>

            {/* Profile Image */}
            <img
              src={
                selectedConversation?.profilePicture ||
                "https://via.placeholder.com/400"
              }
              alt="Profile"
              className="max-w-full max-h-[80vh] rounded-lg border-2 border-gray-300 object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative p-4">
            {/* Close Button */}
            <button
              onClick={() => setProfilePictureView(false)}
              className="absolute top-0 right-0  p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
              title="Close"
            >
              ✕
            </button>

            {/* Profile Image */}
            <img
              src={user?.profilePicture || "https://via.placeholder.com/400"}
              alt="Profile"
              className="max-w-full max-h-[80vh] rounded-lg border-2 border-gray-300 object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePictureView;
