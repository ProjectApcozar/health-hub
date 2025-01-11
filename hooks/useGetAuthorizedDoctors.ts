import { useQuery } from "@tanstack/react-query";

const baseURL = process.env.EXPO_PUBLIC_API_URL as string;

export const useGetAuthorizedDoctors = (address: string) => {
    const URL =`${baseURL}/relations/patient/${address}`;
        
    const { isSuccess , isError, error, data } = useQuery<string[]>({
      queryKey: ['doctors'],
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
      doctors: data || [],
      isSuccess,
      isError,
      error
    };
};