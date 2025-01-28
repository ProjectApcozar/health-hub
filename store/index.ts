import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "@/store/userRoleSlice";
import { usersApi } from "@/services/user";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        userRole: userRoleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;