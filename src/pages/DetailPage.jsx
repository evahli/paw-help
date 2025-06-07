import { Button } from '../components/ui/button';
import car from '../assets/car.svg';
import carbon_time from '../assets/carbon_time.svg';
import famicons_earth from '../assets/famicons_earth.svg';
import ic_round_phone from '../assets/ic_round_phone.svg';
import arrow_left from '../assets/arrow_left.svg';
import pin from '../assets/pin.svg';

export const DetailPage = () => {
  return (
    <div>
      <div className="border-b-4 border-indigo-500 mb-8">
        {/* To do: Icon button */}
        <div className="flex justify-start">
          <Button variant="secondary" size="icon" className="size-8">
            <img src={arrow_left} alt="arrow left" />
          </Button>
        </div>
        {/* To do: nahradit za komponentu DetailHeader */}
        <div className="mb-4">
          <h1>PawHelp</h1>
          <Button>Veterinarni pece</Button>
        </div>
      </div>
      <div>
        {/* To do: Styled image komponenta */}
        <img
          src="/images/elementor-placeholder-image.png"
          alt="placeholder"
          width="385px"
          className="rounded-md"
        />
        <div className="flex flex-col gap-2 mb-8 mt-8">
          <h2 className="text-left">Nazev kliniky</h2>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <h3>Recenze</h3>
              <h3>Type pece</h3>
            </div>
            <div>
              <Button
                variant="secondary"
                size="icon"
                className="size-8 border-2 border-indigo-500 rounded-full"
              >
                <img src={car} alt="car" className="p-1" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="w-6">
              <img src={pin} alt="pin" />
            </div>
            <p>Adresa</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6">
              <img src={carbon_time} alt="carbon_time" />
            </div>
            <p>Oteviraci doba</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className='w-6'>
              <img src={famicons_earth} alt="famicons_earth" />
            </div>
            <p>Adresa</p>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className='w-6'>
              <img src={ic_round_phone} alt="ic_round_phone" />
            </div>
            <a href="tel:+420777123456">+420777123456</a>
          </div>
        </div>
      </div>
    </div>
  );
};
