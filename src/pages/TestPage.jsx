import { ClinicCard } from '@/components/ClinicCard';

export const TestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen w-screen  sm:w-xl">
      <ClinicCard variant="emergency" />
      <ClinicCard variant="vetCare" />
      <ClinicCard variant="homeCare" />
    </div>
  );
};
