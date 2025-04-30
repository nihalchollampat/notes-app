import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Function to safely parse JSON
const loadPastesFromLocalStorage = () => {
  try {
    const serializedPastes = localStorage.getItem("pastes");
    if (serializedPastes === null) {
      return [];
    }
    return JSON.parse(serializedPastes);
  } catch (e) {
    console.error("Could not parse pastes from localStorage:", e);

    localStorage.removeItem("pastes");
    return [];
  }
};

const initialState = {
  pastes: loadPastesFromLocalStorage(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully!");
      } catch (e) {
        console.error("Could not save paste to localStorage:", e);
        toast.error("Failed to save paste.");
      }
    },

    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(
        (paste) => paste._id === updatedPaste._id
      );
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        try {
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste updated successfully!");
        } catch (e) {
          console.error("Could not update paste in localStorage:", e);
          toast.error("Failed to update paste.");
        }
      } else {
        toast.error("Paste not found!");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      try {
        localStorage.removeItem("pastes");
        toast.success("All pastes have been reset.");
      } catch (e) {
        console.error("Could not reset pastes in localStorage:", e);
        toast.error("Failed to reset pastes.");
      }
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
      try {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste removed successfully!");
      } catch (e) {
        console.error("Could not remove paste from localStorage:", e);
        toast.error("Failed to remove paste.");
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
