import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-red-500 text-lg">Paste not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full max-w-lg gap-4 bg-white rounded-lg shadow-md p-5">
        {/* Title Input (Read-Only) */}
        <input
          className="p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={paste.title}
          disabled
        />

        {/* Content Textarea (Read-Only) */}
        <textarea
          className="p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
          value={paste.content}
          disabled
          placeholder="Enter content here"
          rows={10}
        />

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
