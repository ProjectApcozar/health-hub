import { Permission } from "@/common/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createPermission, getDoctorPermissions } from "../services/permissionService";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;

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
        requestPermission: builder.mutation<Permission, { address: string; doctorId: string; patientId: string }>({
            query: ({ doctorId, patientId}) => ({
                url: '/permissions/request-access',
                method: 'POST',
                body: { doctorId, patientId}
            }),
            invalidatesTags: (_result, _error, { address }) => [{ type: "Permission", address }],
        }),
        // READ
        getPatientPermissions: builder.query<Permission[], string>({
            query: (address) => `permissions/patient/${address}`,
            providesTags: (address) => [{ type: "Permission", address }],
        }),
        getDoctorPermissions: builder.query({
            async queryFn(address) {
                const data = await getDoctorPermissions(address);
                await deleteItemAsync("doctorKeys");
                if (Array.isArray(data) && data.length === 0) {
                    return { data: [] }
                }
                const doctorKeys: { [key: string]: string } = {};
                for (const entry of data) {
                    doctorKeys[entry.patientId] = entry.doctorDecryptedCipherKey;
                }
                await setItemAsync("doctorKeys", JSON.stringify(doctorKeys));
                return { data };
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
    useRequestPermissionMutation,
    useGetPatientPermissionsQuery,
    useGetDoctorPermissionsQuery,
    useDeletePermissionMutation,
} = permissionsApi;