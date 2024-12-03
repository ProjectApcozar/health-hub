import { getItemAsync, setItemAsync } from 'expo-secure-store';

export const getStoredSalt = async (): Promise<string | null> => {
    const salt = await getItemAsync('salt');
    return salt;
};

export const storeSalt = async (salt: string) => {
    await setItemAsync('salt', salt);
};