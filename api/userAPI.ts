import { User } from "@/app/(app)/register";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL =`${baseURL}/items`;

export const registerUser = async (user: User): Promise<void> => {
    try {
        const userWithKey = {
            ...user,
            key: 'test',
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userWithKey),
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