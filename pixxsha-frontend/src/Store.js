import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./Features/popupslice";
import imagereducer from "./Features/image";
import { folderReducer, tagReducer } from "./Features/Dialog";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    folder: folderReducer,
    tags: tagReducer,
    image: imagereducer,
  },
});
