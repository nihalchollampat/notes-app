import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <input
        className="p-3 rounded-xl border border-gray-300 w-full max-w-xl mt-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
        type="search"
        placeholder="Search your pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
                key={paste?._id}
              >
                <div className="text-xl font-semibold mb-2 text-gray-800">
                  {paste.title}
                </div>
                <div className="bg-gray-50 p-4 rounded-md mb-4 overflow-hidden">
                  <div className="whitespace-pre-wrap break-words text-gray-700">
                    {paste.content}
                  </div>
                </div>
                <div className="flex flex-row justify-around mb-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: paste.title,
                            text: paste.content,
                            url: window.location.href,
                          })
                          .then(() => toast.success("Shared successfully!"))
                          .catch((error) => toast.error("Failed to share."));
                      } else {
                        toast.error(
                          "Sharing is not supported in this browser."
                        );
                      }
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Share
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center mt-5">
            No pastes found..
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
