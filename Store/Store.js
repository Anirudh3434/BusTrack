import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './Slice';
import localStorageMiddleware from './middleware';

const store = configureStore({
  reducer: {
    auth: storeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
