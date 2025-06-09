import { Button } from './ui/button';
import { BackButton } from './BackButton';

/*
const categoriesNames = {
  emergency: 'bg-emergency',
  vetCare: 'Veterinární péče',
  homeCare: 'bg-homeCare',
};

const categoryNameToButtonVariant = {};
*/

const variantNames = {
  emergency: 'Veterinární pohotovost',
  vetCare: 'Veterinární péče',
  homeCare: 'Veterinář domů',
};

export const PageHeader = ({ variant, redirectToHome }) => {
  const backButtonPath = redirectToHome ? "/" : `/map?variant=${variant}`;

  return (
    <div className="bg-white h-[20vh] w-screen fixed top-0 z-20">
      <BackButton className="absolute top-0" path={backButtonPath} />
      <div className="flex flex-col text-center items-center gap-4 p-4">
        <h1>PawHelp</h1>
        <Button className="w-full max-w-xs" variant={variant}>{variantNames[variant]}</Button>
      </div>
    </div>
  );
};
