import ApiService from "@/ApiService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [], // Store images with metadata
};

export const uploadImage = createAsyncThunk('image/uploadImage', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.addImage(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const deleteImage = createAsyncThunk('image/deleteImage', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.deleteImage(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const editImageMetadata = createAsyncThunk('image/editImageMetadata', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.updateImage(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
});

export const addImageToGroup = createAsyncThunk('image/addImageToGroup', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.addImageToGroup(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
})

export const deleteImageFromGroup = createAsyncThunk('image/deleteImageFromGroup', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.deleteImageFromGroup(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
})

export const deleteGroup = createAsyncThunk('image/deleteGroup', async () => {
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ApiService.deleteGroup(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
})

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // imageUploaded: (state, action) => {
    //   // Add a new image with its metadata
    //   state.images.push(action.payload); // payload should contain the image and its metadata (e.g., { id, url, metadata })
    // },
    // deleteImage: (state, action) => {
    //   // Delete image by its id
    //   state.images = state.images.filter(
    //     (image) => image.id !== action.payload
    //   );
    // },
    // deleteImagesByFolderId: (state, action) => {
    //   // Delete images that belong to a specific folderId
    //   const folderId = action.payload;
    //   state.images = state.images.filter(
    //     (image) => image.folderId === folderId
    //   );
    // },
    // editImageMetadata: (state, action) => {
    //   // Find the image by its id and update its metadata
    //   const { id, metadata } = action.payload;
    //   const image = state.images.find((img) => img.id === id);
    //   if (image) {
    //     image.metadata = { ...image.metadata, ...metadata }; // Update the metadata with new values
    //   }
    // },
    // moveImageToFolder: (state, action) => {
    //   const { imageId, folderId } = action.payload;
    //   console.log(imageId, folderId);
    //   const image = state.images.find((img) => img.id === imageId); // Find the image by its id
    //   if (image) {
    //     image.folderId = folderId; // Update the folderId of the image
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete image
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(
          (image) => image.id !== action.payload
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove image from group/folder
      .addCase(deleteImageFromGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImageFromGroup.fulfilled, (state, action) => {
        state.loading = false;
        const folderId = action.payload
        state.images = state.images.filter(
          (image) => image.folderId === folderId,
        );
      })
      .addCase(deleteImageFromGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit image metadata
      .addCase(editImageMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editImageMetadata.fulfilled, (state, action) => {
        state.loading = false;
        const { id, metadata } = action.payload;
        const image = state.images.find((img) => img.id === id);
        if (image) {
          image.metadata = { ...image.metadata, ...metadata };
        }
      })
      .addCase(editImageMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add image to folder/group
      .addCase(addImageToGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addImageToGroup.fulfilled, (state, action) => {
        state.loading = false;
        const { imageId, folderId } = action.payload;
        console.log(imageId, folderId);
        const image = state.images.find((img) => img.id === imageId); // Find the image by its id
        if (image) {
          image.folderId = folderId; // Update the folderId of the image
        }
      })
      .addCase(addImageToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to get image by ID
export const getImageById = (state, id) => {
  return state.image.images.find((image) => image.id === id);
};


export default imageSlice.reducer;
