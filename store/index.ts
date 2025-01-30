import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "@/store/userRoleSlice";
import { usersApi } from "@/services/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { permissionsApi } from "@/services/permission";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [permissionsApi.reducerPath]: permissionsApi.reducer,
        userRole: userRoleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(permissionsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;