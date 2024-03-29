import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counter";
import userIdSlice from "../slices/auth";
import publishSlice from "../slices/publish";
import homeSlice from "../slices/home";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userId: userIdSlice,
    publish: publishSlice,
    home: homeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
