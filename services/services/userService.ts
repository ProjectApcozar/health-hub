import { User } from "@/common/types";
import { encryptData, getAesKey } from "@/utils/crypto";
import { getStoredKey, storeKey, storePassword } from "@/utils/secureStore";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL =`${baseURL}/users`;

export const registerUser = async (user: Partial<User>, address: string) => {
    try {
        const aesKey = getAesKey(address);
        const password = user.encryptedUserPassword;

        if (password) {
            await storePassword(password);
        }

        if (aesKey) {
            await storeKey(aesKey);
        }

        const encryptedData = await encryptData(user, aesKey);
        const encryptedUserWithKey = {
            ...encryptedData,
            cipherKey: aesKey,
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
        return response.json();
    } catch (error) {
        console.error('Error al registrar el ususario', error);
        throw error;
    }
};

export const updateUser = async (user: Partial<User>, address: string) => {
    try {
        const UPDATE_URL = `${URL}/${address}`;
        const aesKey = await getStoredKey();
        const encryptedData = await encryptData(user, aesKey!);
        
        const encryptedUserWithKey = {
            ...encryptedData,
            key: address
        };

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
        return response.json();
    } catch (error) {
        console.error('Error al actualizar el ususario', error);
        throw error;
    }
};