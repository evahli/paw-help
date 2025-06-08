import { ClinicCard } from '@/components/ClinicCard';
import data from '@/data/kliniky_data_sample.json';

const testClinic = data[0];

export const TestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-screen  sm:w-xl">
      <ClinicCard variant="emergency" clinicData={testClinic} />
      <ClinicCard variant="vetCare" clinicData={testClinic} />
      <ClinicCard variant="homeCare" clinicData={testClinic} />
    </div>
  );
};
