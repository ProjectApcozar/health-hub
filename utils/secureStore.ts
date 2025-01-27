import { getItemAsync, setItemAsync } from 'expo-secure-store';

export const getStoredKey = async (): Promise<string | null> => {
    const key = await getItemAsync('key');
    return key;
};

export const storeKey = async (key: string) => {
    await setItemAsync('key', key);
};