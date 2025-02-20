import { getItemAsync, setItemAsync } from 'expo-secure-store';

export const getStoredKey = async (): Promise<string | null> => {
    const key = await getItemAsync('key');
    return key;
};

export const storeKey = async (key: string) => {
    await setItemAsync('key', key);
};

export const storePassword = async (password: string) => {
    await setItemAsync('password', password);
};

export const getPassword = async (): Promise<string | null> => {
    const password = await getItemAsync('password');
    return password;
};

export async function getDoctorKey(patientId: string) {
    try {
        const storedData = await getItemAsync("doctorKeys");
        if (!storedData) return null;

        const doctorKeys = JSON.parse(storedData);
        return doctorKeys[patientId] || null;
    } catch (error) {
        console.error("Error al obtener la clave del paciente:", error);
        return null;
    }
}