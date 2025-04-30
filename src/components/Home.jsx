import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 to-blue-100 p-6">
      <div className="flex flex-col w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 gap-6 border-t-4 border-indigo-500">
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 animate-pulse shadow-md">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h1>
        <input
          className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-200 bg-indigo-50 placeholder-indigo-500 text-gray-800 shadow-sm"
          type="text"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-200 bg-indigo-50 placeholder-indigo-500 text-gray-800 shadow-sm"
          placeholder="Enter your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={8}
        />
        <button
          onClick={createPaste}
          className="p-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          {pasteId ? "Update Paste" : "Save Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
