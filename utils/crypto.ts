import CryptoES from 'crypto-es';
import { getStoredKey } from './secureStore';
import { User } from '@/common/types';

const generateSalt = () => {
    return CryptoES.lib.WordArray.random(32).toString();
};

export const getAesKey = (key: string): string => {
    const salt = generateSalt();
    return CryptoES.PBKDF2(key, salt, { keySize: 256 / 32, iterations: 10000 }).toString();
};

export const encryptData = async (data: any, aesKey: string): Promise<any> => {

    const encryptedData: Partial<any> = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            encryptedData[key] = CryptoES.AES.encrypt(value, aesKey).toString();
        };
    };
    
    return encryptedData;
}; 

export const decryptData = async (encryptedData: any): Promise<any> => {
    const aesKey = await getStoredKey();
    if (!aesKey) return encryptedData;

    const decryptedData: Partial<any> = {};
    for (const [key, value] of Object.entries(encryptedData)) {
        if (typeof value === 'string') {
            const decryptedBytes = CryptoES.AES.decrypt(value, aesKey);
            decryptedData[key as keyof User] = decryptedBytes.toString(CryptoES.enc.Utf8);
        };
    };
    
    return decryptedData;
}

