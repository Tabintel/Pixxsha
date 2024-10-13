import { createSlice } from "@reduxjs/toolkit";

// Initial state for folders
const FolderinitialState = {
  folders: [], // Changed to plural for clarity
};

// Initial state for tags
const TaginitialState = {
  tags: [], // Changed to plural for clarity
};

// Create the folder slice
const FolderSlice = createSlice({
  name: "Folder",
  initialState: FolderinitialState,
  reducers: {
    createFolder: (state, action) => {
      state.folders.push(action.payload); // Add the new folder
    },
    deleteFolderaction: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      ); // Remove the folder by its id
    },
  },
});

// Create the tag slice
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

// Selectors for getting folders and tags by ID
export const selectFolderById = (state, id) =>
  state.folder.folders.find((folder) => folder.id === id);

export const selectTagById = (state, id) =>
  state.tags.tags.find((tag) => tag.id === id);

export const { createFolder, deleteFolderaction } = FolderSlice.actions;
export const { createTag, deleteTag } = TagSlice.actions;

// Export the reducers for both slices
export const folderReducer = FolderSlice.reducer;
export const tagReducer = TagSlice.reducer;
