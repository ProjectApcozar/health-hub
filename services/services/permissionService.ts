import { Permission } from "@/common/types";
import { getPassword } from "@/utils/secureStore";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const URL = `${baseURL}/permissions`;

export const createPermission = async (permission: Partial<Permission>) => {
    try {

        const password = await getPassword();

        if (password) {
            permission.patientPassword = password;
        }

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(permission),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al crear el permiso', error);
        throw error;
    }
};