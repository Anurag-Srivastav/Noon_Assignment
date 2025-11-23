import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import cartReducer from "./cart/cartSlice";
import searchReducer from "./search/searchSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart", "search"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
