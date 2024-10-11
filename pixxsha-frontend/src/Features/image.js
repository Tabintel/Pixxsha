import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [], // Store images with metadata
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    uploadImage: (state, action) => {
      // Add a new image with its metadata
      state.images.push(action.payload); // payload should contain the image and its metadata (e.g., { id, url, metadata })
    },
    deleteImage: (state, action) => {
      // Delete image by its id
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
    editImageMetadata: (state, action) => {
      // Find the image by its id and update its metadata
      const { id, metadata } = action.payload;
      const image = state.images.find((img) => img.id === id);
      if (image) {
        image.metadata = { ...image.metadata, ...metadata }; // Update the metadata with new values
      }
    },
  },
});

export const { uploadImage, deleteImage, editImageMetadata } =
  imageSlice.actions;
export default imageSlice.reducer;
