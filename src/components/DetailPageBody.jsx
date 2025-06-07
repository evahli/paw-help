import carbon_time from '../assets/carbon_time.svg';
import famicons_earth from '../assets/famicons_earth.svg';
import ic_round_phone from '../assets/ic_round_phone.svg';
import pin from '../assets/pin.svg';
import car from '../assets/car.svg';
import { Button } from '../components/ui/button';

export const DetailPageBody = ({
  title,
  totalScore,
  categoryName,
  address,
  openingHours,
  website,
  phone,
  showCarIcon,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-8 mt-8">
        <h2 className="text-left">{title}</h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h3>{totalScore}</h3>
            <h3>{categoryName}</h3>
          </div>
          {showCarIcon && (
            <div>
              <Button
                variant="secondary"
                size="icon"
                className="size-8 border-2 border-indigo-500 rounded-full"
              >
                <img src={car} alt="car" className="p-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-6">
            <img src={pin} alt="pin" />
          </div>
          <p>{address}</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-6">
            <img src={carbon_time} alt="carbon_time" />
          </div>
          <p>{openingHours}</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-6">
            <img src={famicons_earth} alt="famicons_earth" />
          </div>
          <p>{website}</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-6">
            <img src={ic_round_phone} alt="ic_round_phone" />
          </div>
          <a href="tel:+420777123456">{phone}</a>
        </div>
      </div>
    </div>
  );
};
