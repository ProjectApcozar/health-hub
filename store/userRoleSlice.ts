import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserRoleState {
    role: "doctor" | "patient" | null;
}

const initialState: UserRoleState = {
    role: null,
}

const userRoleSlice = createSlice({
    name: "userRole",
    initialState,
    reducers: {
        setUserRole(state, action: PayloadAction<"doctor" | "patient">) {
            state.role = action.payload;
        },
        clearUserRole(state) {
            state.role = null;
        },
    },
});

export const { setUserRole, clearUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;