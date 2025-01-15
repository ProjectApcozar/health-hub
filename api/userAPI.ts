import { User } from "@/app/(app)/register";
import { encryptData } from "@/utils/crypto";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL =`${baseURL}/items`;

export const registerUser = async (user: User, address: string): Promise<void> => {
    try {
        
        const encryptedData = await encryptData(user, address);
        
        const encryptedUserWithKey = {
            ...encryptedData,
            key: address
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