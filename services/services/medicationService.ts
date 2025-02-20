import { Medication, Vaccine } from "@/common/types";
import { encryptData } from "@/utils/crypto";
import { getDoctorKey, getStoredKey } from "@/utils/secureStore";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL = `${baseURL}/medications`;

export const createMedication = async (medication: Partial<Medication>, address: string) => {
    try {
        let aesKey;

        const encryptionKey = await getDoctorKey(address);
        
        if (encryptionKey){
            aesKey = encryptionKey;
        } else {
            aesKey = await getStoredKey();
        }

        if (!aesKey) {
            throw new Error(`No existe aesKey: ${aesKey}`);
        }

        const medicationWithDate = {
            ...medication,
            createdAt: Date.now().toString(),
        }

        const encryptedMedication = await encryptData(medicationWithDate, aesKey);
        
        const medicationWithPatient = {
            ...encryptedMedication,
            patientId: address,
            doctorId: address,
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicationWithPatient),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log('Error al registrar la medicación', error);
        throw error;
    }
};
