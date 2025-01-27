import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const hookURL = "/users/is-doctor/";

export const useIsDoctor = (address?: string) => {
    const URL = `${baseURL}${hookURL}${address}`;
    
    const { isSuccess, isError, error, data, isLoading } = useQuery({
        queryKey: ['isDoctor', address],
        queryFn: async () =>
            await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) =>
                res.json(),
            ),
    });

    return {
        isDoctor: data?.isDoctor as boolean,
        isSuccess,
        isError,
        error,
        isLoading
    };
};
