import carbon_time from '../assets/carbon_time.svg';
import famicons_earth from '../assets/famicons_earth.svg';
import ic_round_phone from '../assets/ic_round_phone.svg';
import pin from '../assets/pin.svg';
import car from '../assets/car.svg';
import { Button } from '../components/ui/button';
import { Reviews } from './Reviews';

export const DetailPageBody = ({
  title,
  totalScore,
  reviewsCount,
  categoryName,
  address,
  openingHours,
  website,
  phone,
  showCarIcon,
  variant,
}) => {
  return (
    <div className='sm:max-w-max'>
      <div className="flex flex-col gap-2 mb-6 mt-6">
        <h2 className="text-left">{title}</h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Reviews totalScore={totalScore} reviewsCount={reviewsCount}/>
            <h3>{categoryName}</h3>
          </div>
          {address && showCarIcon && (
            <div>
              <Button icon={car} variant={variant} size="icon"></Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {address ? (
          <div className="flex flex-row gap-3 items-center">
            <div className="w-8">
              <img src={pin} alt="pin" />
            </div>
            <p>{address}</p>
          </div>
        ) : (
          ''
        )}
        {openingHours ? (
          <div className="flex flex-row gap-4">
            <div className="w-6">
              <img src={carbon_time} alt="carbon_time" />
            </div>
            <p>{openingHours}</p>
          </div>
        ) : (
          ''
        )}
        {website ? (
          <div className="flex flex-row gap-4">
            <div className="w-6">
              <img src={famicons_earth} alt="famicons_earth" />
            </div>
            <p>{website}</p>
          </div>
        ) : (
          ''
        )}
        {phone ? (
          <div className="flex flex-row gap-4 items-center">
            <div className="w-6">
              <img src={ic_round_phone} alt="ic_round_phone" />
            </div>
            <a href="tel:+420777123456">{phone}</a>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
