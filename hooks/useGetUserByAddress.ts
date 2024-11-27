import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;

export const useGetUserByAddress = (address: string | null) => {

    const URL =`${baseURL}/items/${address}`;

    const { isSuccess , isError, error, data } = useQuery({
        queryKey: ['user', address],
        queryFn: () =>
          fetch(URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) =>
            res.json(),
          ),
    });
    
    return {
        user: data,
        isSuccess,
        isError,
        error
    };
};