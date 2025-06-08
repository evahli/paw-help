import { useQuery } from '@tanstack/react-query';
import {
  isEmergencyClinic,
  isHomeVetClinic,
  isVetCareClinic,
} from './categorySorting';
import { useMemo } from 'react';

export const useMapVariantData = ({ variant }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['clinics'],
    queryFn: () =>
      fetch('https://api.apify.com/v2/datasets/A9Iwh31T14DnUBqgY/items').then(
        (res) => res.json(),
      ),
  });

  const fileredData = useMemo(() => {
    if (data && variant === 'all') {
      return data;
    } else if (data && variant === 'emergency') {
      return data.filter((item) => isEmergencyClinic(item));
    } else if (data && variant === 'homeCare') {
      return data.filter((item) => isHomeVetClinic(item));
    } else if (data && variant === 'vetCare') {
      return data.filter((item) => isVetCareClinic(item));
    }
  }, [data, variant]);
  return {
    mapVariantData: fileredData,
    isLoading,
    error,
  };
};
