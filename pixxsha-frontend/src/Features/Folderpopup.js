import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderdetailsOpen: false,
};

const FolderPopupSlice = createSlice({
  name: "Folderpopup",
  initialState,
  reducers: {
    openfolderPopup: (state) => {
      state.folderdetailsOpen = true;
    },
    closefolderPopup: (state) => {
      state.folderdetailsOpen = false;
    },
  },
});

export const { openfolderPopup, closefolderPopup } = FolderPopupSlice.actions;
export default FolderPopupSlice.reducer;
