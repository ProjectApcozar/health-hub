import { Vaccine } from "@/common/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createVaccine } from "../services/vaccinesService";
import { decryptData } from "@/utils/crypto";

const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;

export const vaccinesApi = createApi({
    reducerPath: "vaccinesAPi",
    tagTypes: ["Vaccine"],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        //CREATE
        createVaccine: builder.mutation<Vaccine, { address: string; vaccine: Partial<Vaccine>}>({
            async queryFn({ address, vaccine}) {
                const data = await createVaccine(vaccine, address);
                return { data }
            },
            invalidatesTags: (
                _result, _error, { address }
            ) => [{ type: 'Vaccine', address }],
        }),
        // READ
        getVaccinesByAddress: builder.query<Vaccine[], string>({
            query: (address) => `vaccines/${address}`,
            transformResponse: async (response: any) => {
                const decryptedData = [];
                for (const item of response) {
                    const decryptedItem = await decryptData(item);
                    console.log(decryptedItem)
                    decryptedData.push(decryptedItem);
                }
                return decryptedData; 
            },
            providesTags: (address) => [{ type: 'Vaccine', address }]
        }),
    }),
});

export const {
    useCreateVaccineMutation,
    useGetVaccinesByAddressQuery,
} = vaccinesApi;