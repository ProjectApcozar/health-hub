import { User } from '@/app/(app)/register';
import CryptoES from 'crypto-es';
import { getStoredSalt, storeSalt } from './secureStore';

const generateAndStoreSalt = async (): Promise<string> => {
    let salt = await getStoredSalt();

    if (!salt) {
        salt = CryptoES.lib.WordArray.random(32).toString();
        await storeSalt(salt);
    };

    return salt;
};

const derivateKey = (key: string, salt: string): string => {
    return CryptoES.PBKDF2(key, salt, { keySize: 256 / 32, iterations: 10000 }).toString();
};

export const encryptData = async (data: any, address: string): Promise<any> => {
    const salt = await generateAndStoreSalt();
    const aesKey = derivateKey(address, salt);

    const encryptedData: Partial<any> = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            encryptedData[key] = CryptoES.AES.encrypt(value, aesKey).toString();
        };
    };
    
    return encryptedData;
}; 

export const decryptData = async (encryptedData: any, address: string): Promise<any> => {
    const salt = await generateAndStoreSalt();
    const aesKey = derivateKey(address, salt);

    const decryptedData: Partial<any> = {};
    for (const [key, value] of Object.entries(encryptedData)) {
        if (typeof value === 'string') {
            const decryptedBytes = CryptoES.AES.decrypt(value, aesKey);
            decryptedData[key as keyof User] = decryptedBytes.toString(CryptoES.enc.Utf8);
        };
    };
    
    return decryptedData;
}

