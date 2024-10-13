import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk'
import { folderReducer, tagReducer } from "./Features/Dialog";
import folderpopupreducer from "./Features/Folderpopup";
import imagereducer from "./Features/image";
import popupReducer from "./Features/popupslice";

const thunkEnhancer = applyMiddleware(thunk);

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    folder: folderReducer,
    tags: tagReducer,
    image: imagereducer,
    folderpopup: folderpopupreducer,
  },
  enhancers: [thunkEnhancer],
});


