import { User } from "@/app/(app)/register";
import { encryptData, getAesKey } from "@/utils/crypto";
import { storeKey } from "@/utils/secureStore";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL =`${baseURL}/users`;

export const registerUser = async (user: User, address: string): Promise<void> => {
    try {
        const aesKey = getAesKey(address);

        if (aesKey) {
            await storeKey(aesKey);
        }

        const encryptedData = await encryptData(user, aesKey);
        
        const encryptedUserWithKey = {
            ...encryptedData,
            cipher_key: aesKey,
            key: address,
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedUserWithKey),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        console.log('Usuario registrado');
    } catch (error) {
        console.error('Error al registrar el ususario', error);
        throw error;
    }
};

export const updateUser = async (user:Partial<User>, address: string): Promise<void> => {
    try {
        const UPDATE_URL = `${URL}/${address}`;
        const encryptedData = await encryptData(user, address);
        
        const encryptedUserWithKey = {
            ...encryptedData,
            key: address
        };

        console.log(UPDATE_URL);
        const response = await fetch(UPDATE_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(encryptedUserWithKey),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        console.log('Usuario actualizado');
    } catch (error) {
        console.error('Error al actualizar el ususario', error);
        throw error;
    }
};

export const isPatient = async (address: string): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/is-patient/${address}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data.isDoctor;
    } catch (error) {
        console.error('Error al verificar si es paciente', error);
        throw error;
    }
}

export const isDoctor = async (address: string): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/is-doctor/${address}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data.isDoctor;
    } catch (error) {
        console.error('Error al verificar si es doctor', error);
        throw error;
    }
}
