import { Vaccine } from "@/common/types";
import { encryptData } from "@/utils/crypto";
import { getStoredKey } from "@/utils/secureStore";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL = `${baseURL}/vaccines`;

export const createVaccine = async (vaccine: Partial<Vaccine>, address: string) => {
    try {
        const aesKey = await getStoredKey();

        if (!aesKey) {
            throw new Error(`No existe aesKey: ${aesKey}`);
        }

        const vaccineWithDate = {
            ...vaccine,
            createdAt: Date.now().toString(),
        }

        const encryptedVaccine = await encryptData(vaccineWithDate, aesKey);
        
        const vaccineWithPatient = {
            ...encryptedVaccine,
            patientId: address,
            doctorId: address,
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vaccineWithPatient),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log('Error al registrar al usuario', error);
        throw error;
    }
};
