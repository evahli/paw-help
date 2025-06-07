import { Button } from '../components/ui/button';
import { BackButton } from './BackButton';

/*
const categoriesNames = {
  emergency: 'bg-emergency',
  vetCare: 'Veterinární péče',
  homeCare: 'bg-homeCare',
};

const categoryNameToButtonVariant = {};
*/

export const HeaderDetailPage = ({ categoryName }) => {
  return (
    <div className="border-b-4 border-indigo-500 mb-8">
      <div className="flex justify-start">
        {/* To do: back to proper path */}
        <BackButton path="/map" />
      </div>
      <div className="mb-4">
        <h1>PawHelp</h1>
        {/* To do: show proper varian based on categoryName */}
        <Button variant="emergency">{categoryName}</Button>
      </div>
    </div>
  );
};
