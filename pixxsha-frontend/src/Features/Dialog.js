import { createSlice } from "@reduxjs/toolkit";

const FolderinitialState = {
  folders: [], // Changed to plural for clarity
};

const TaginitialState = {
  tags: [], // Changed to plural for clarity
};

const FolderSlice = createSlice({
  name: "Folder",
  initialState: FolderinitialState,
  reducers: {
    createFolder: (state, action) => {
      state.folders.push(action.payload); // Add the new folder
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      ); // Remove the folder by its id
    },
  },
});

const TagSlice = createSlice({
  name: "Tag",
  initialState: TaginitialState,
  reducers: {
    createTag: (state, action) => {
      state.tags.push(action.payload); // Add the new tag
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag.id !== action.payload); // Remove the tag by its id
    },
  },
});

export const { createFolder, deleteFolder } = FolderSlice.actions;
export const { createTag, deleteTag } = TagSlice.actions;

export const folderReducer = FolderSlice.reducer;
export const tagReducer = TagSlice.reducer;
