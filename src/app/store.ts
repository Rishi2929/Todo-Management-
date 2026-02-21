import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// By exporting this, we get full Autocomplete
// and type-checking whenever we use useSelector. If I rename a field in authSlice,
// TypeScript will immediately flag every component that tries to access the old field name.
export type RootState = ReturnType<typeof store.getState>; //what do i have
export type AppDispatch = typeof store.dispatch; //what can i do
// This is crucial for middleware like redux-thunk.
// It ensures that when we dispatch complex actions,
// the IDE knows exactly what arguments are required.
// It turns runtime errors into compile-time errors.
