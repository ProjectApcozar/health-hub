import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "@/store/userRoleSlice";
import { usersApi } from "@/services/apis/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { permissionsApi } from "@/services/apis/permission";
import { vaccinesApi } from "@/services/apis/vaccine";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [permissionsApi.reducerPath]: permissionsApi.reducer,
        [vaccinesApi.reducerPath]: vaccinesApi.reducer,
        userRole: userRoleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(permissionsApi.middleware)
        .concat(vaccinesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;