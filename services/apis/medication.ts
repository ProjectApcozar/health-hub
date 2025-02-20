import { Medication } from "@/common/types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { decryptData } from "@/utils/crypto";
import { createMedication } from "../services/medicationService";
import { getDoctorKey } from "@/utils/secureStore";

const baseUrl = process.env.EXPO_PUBLIC_API_URL as string;

export const medicationsApi = createApi({
    reducerPath: "medicationsAPi",
    tagTypes: ["Medication"],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        //CREATE
        createMedication: builder.mutation<Medication, { address: string; medication: Partial<Medication>}>({
            async queryFn({ address, medication}) {
                const data = await createMedication(medication, address);
                return { data }
            },
            invalidatesTags: (
                _result, _error, { address }
            ) => [{ type: 'Medication', address }],
        }),
        // READ
        getMedicationsByAddress: builder.query<Medication[], string>({
            query: (address) => `medications/${address}`,
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
            providesTags: (address) => [{ type: 'Medication', address }]
        }),
    }),
});

export const {
    useCreateMedicationMutation,
    useGetMedicationsByAddressQuery,
} = medicationsApi;