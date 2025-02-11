import { Permission } from "@/common/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createPermission, getDoctorPermissions } from "../services/permissionService";
import { getPassword } from "@/utils/secureStore";

const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;

interface PermissionRequest {
    address: string;
    password: string;
};

export const permissionsApi = createApi({
    reducerPath: "permissionsApi",
    tagTypes: ["Permission"],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // CREATE
        createPermission: builder.mutation<Permission, { address: string; permission: Partial<Permission> }>({
            async queryFn({ permission }) {
                const data = await createPermission(permission);
                return { data };
            },
            invalidatesTags: (_result, _error, { address }) => [{ type: "Permission", address }],
        }),
        // READ
        getPatientPermissions: builder.query<Permission[], string>({
            query: (address) => `permissions/patient/${address}`,
            providesTags: (address) => [{ type: "Permission", address }],
        }),
        getDoctorPermissions: builder.query({
            async queryFn({ address }) {
                const data = await getDoctorPermissions(address);
                return data;
            },
            providesTags: (address) => [{ type: "Permission", address }],
        }),
        // DELETE
        deletePermission: builder.mutation<Permission, { address: string; permission: Partial<Permission> }>({
            query: ({ permission }) => ({
                url: `permissions`,
                method: "DELETE",
                body: permission,
            }),
            invalidatesTags: (_result, _error, { address }) => [{ type: "Permission", address }],
        }),
    }),
})

export const {
    useCreatePermissionMutation,
    useGetPatientPermissionsQuery,
    useGetDoctorPermissionsQuery,
    useDeletePermissionMutation,
} = permissionsApi;