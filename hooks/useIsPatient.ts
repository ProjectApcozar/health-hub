import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;
const hookURL = "/users/is-patient/";

export const useIsPatient = (address?: string) => {
    const URL = `${baseURL}${hookURL}${address}`;
    
    const { isSuccess, isError, error, data, isLoading } = useQuery({
        queryKey: ['isPatient', address],
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
        isPatient: data?.isPatient as boolean,
        isSuccess,
        isError,
        error,
        isLoading
    };
};
