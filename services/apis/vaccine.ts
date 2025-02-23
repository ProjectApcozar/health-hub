import { Vaccine } from "@/common/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createVaccine } from "../services/vaccinesService";
import { decryptData } from "@/utils/crypto";
import { getDoctorKey } from "@/utils/secureStore";

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
            transformResponse: async (response: any, _meta, address) => {
                const decryptedData = [];
                const encryptionKey = await getDoctorKey(address);
               
                for (const item of response) {
                    let decryptedItem;
                    if (encryptionKey) {
                        decryptedItem = await decryptData(item, encryptionKey);
                    } else {
                        decryptedItem = await decryptData(item);
                    }
                    
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