import { ClinicCard } from '@/components/ClinicCard';
import data from '@/data/kliniky_data_sample.json';
import { useQuery } from "@tanstack/react-query";

  

const testClinic = data[0];

export const TestPage = () => {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["clinics"],
    queryFn: () => fetch("https://api.apify.com/v2/datasets/A9Iwh31T14DnUBqgY/items").then((res) => res.json()),
  });
  console.log(data)


  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-screen  sm:w-xl">
      <ClinicCard variant="emergency" clinicData={testClinic} />
      <ClinicCard variant="vetCare" clinicData={testClinic} />
      <ClinicCard variant="homeCare" clinicData={testClinic} />
    </div>
  );
};
