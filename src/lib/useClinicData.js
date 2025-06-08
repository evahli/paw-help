import { useQuery } from "@tanstack/react-query";

export const useClinicData = (placeId) => {
    const { data, isLoading, error } = useQuery({
    queryKey: ['clinics'],
    queryFn: () =>
      fetch('https://api.apify.com/v2/datasets/A9Iwh31T14DnUBqgY/items').then(
        (res) => res.json(),
      ),
  });

  const foundPlace = data && data.find(item => item.placeId === placeId)

  return {
    placeData: foundPlace,
    isLoading,
    error
  }
}
