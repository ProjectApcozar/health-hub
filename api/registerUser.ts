import { User } from "@/app/(app)/register";

const url = 'http://172.20.10.2:3000/items';

export const registerUser = async (user: User): Promise<void> => {
    try {
        const userWithKey = {
            ...user,
            key: 'test',
        };

        console.log(JSON.stringify(userWithKey));

        const response = await fetch(url, {
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