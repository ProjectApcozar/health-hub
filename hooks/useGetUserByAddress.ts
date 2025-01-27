import { decryptData } from "@/utils/crypto";
import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;

export const useGetUserByAddress = (address: string) => {
    const URL =`${baseURL}/items/${address}`;
        
    const { isSuccess , isError, error, data } = useQuery({
      queryKey: ['user', address],
      queryFn: async () =>
        await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) =>
          res.json(),
        ).then(async (encryptedData) => {
          return await decryptData(encryptedData);
        }),
    });
    
    return {
      user: data,
      isSuccess,
      isError,
      error
    };
};