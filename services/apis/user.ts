import { decryptData } from '@/utils/crypto';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { registerUser, updateUser } from '../services/userService';
import { User } from '@/common/types';

const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;
// https://redux-toolkit.js.org/rtk-query/usage/queries
export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // CREATE
        registerUser: builder.mutation<User, { address: string; user: Partial<User>}>({
            async queryFn({ address, user}) {
                const data = await registerUser(user, address);
                return { data };
            },
            invalidatesTags: (
                _result, _error, { address }
            ) => [{ type: 'User', address }],
        }),
        // READ
        getUserByAddress: builder.query<User, string>({
            query: (address) => `users/${address}`,
            transformResponse: async (response: any) => {
                return await decryptData(response);
            },
            providesTags: (address) => [{ type: 'User', address }],
        }),
        getIsDoctor: builder.query<boolean, string>({
            query: (address) => `users/is-doctor/${address}`,
            transformResponse: (response: any) => {
                return response.isDoctor;
            },
            providesTags: (address) => [{ type: 'User', address }],
        }),
        getIsPatient: builder.query<boolean, string>({
            query: (address) => `users/is-patient/${address}`,
            transformResponse: (response: any) => {
                return response.isPatient;
            },
            providesTags: (address) => [{ type: 'User', address }],
        }),
        // UPDATE
        updateUser: builder.mutation<User, { address: string; user: Partial<User>}>({
            async queryFn({ address, user }) {
                const data = await updateUser(user, address);
                return { data };
            },
            invalidatesTags: (
                _result, _error, { address }
            ) => [{ type: 'User', address }],
        }),
    }),
})

export const { 
    useRegisterUserMutation,
    useGetIsDoctorQuery,
    useGetIsPatientQuery,
    useGetUserByAddressQuery,
    useUpdateUserMutation,
} = usersApi;