import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import starImg from '@/assets/star.svg';
import phoneImg from '@/assets/ic_round_phone.svg';
import { cva } from 'class-variance-authority';

const clinicName = 'Veterinarni klinika Nusle';
const rating = 4.7;
const clinicType = 'veterinarni klinika';
const phoneNumber = '608493808';
const position = [50.1, 14.423];
const openingHours = [
  {
    day: 'středa',
    hours: '9 to 20',
  },
  {
    day: 'čtvrtek',
    hours: '9 to 20',
  },
  {
    day: 'pátek',
    hours: '9 to 20',
  },
  {
    day: 'sobota',
    hours: '9 to 17',
  },
  {
    day: 'neděle',
    hours: 'Zavřeno',
  },
  {
    day: 'pondělí',
    hours: '9 to 20',
  },
  {
    day: 'úterý',
    hours: '9 to 20',
  },
];
const clinicWebsite = 'https://czechitas-podklady.cz';

const clinicCardVariants = cva('w-full border-2 bg-background', {
  variants: {
    variant: {
      emergency: 'border-emergency',
      vetCare: 'border-vetCare',
      homeCare: 'border-homeCare',
    },
  },
  defaultVariants: {
    variant: 'emergency',
  },
});

const ClinicCardContent = ({ variant }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <span>{rating}</span>
        <img className="w-4 h-4" src={starImg}></img>
      </div>
      <a href={`tel:${phoneNumber}`} className="flex items-center gap-2">
        <img className="w-6 h-6" src={phoneImg}></img>
        <span>{phoneNumber}</span>
      </a>
      {variant === 'homeCare' ? (
        ''
      ) : (
        <div className="flex gap-2">
          <span className="text-green-600 font-semibold">Otevřeno</span>
          {variant === 'emergency' ? <span>300m od vas</span> : ''}
          {variant === 'vetCare' ? <span>Zavira v 19:00</span> : ''}
        </div>
      )}
    </div>
  );
};

const allowedClinicCardVariants = ['emergency', 'vetCare', 'homeCare'];

export const ClinicCard = ({ variant }) => {
  if (!allowedClinicCardVariants.includes(variant)) {
    throw new Error(`Invalid ClinicCard variant - ${variant}!`);
  }

  return (
    <Card className={clinicCardVariants({variant})}>
      <CardHeader>
        <CardTitle>{clinicName}</CardTitle>
        <CardDescription>{clinicType}</CardDescription>

        <CardAction>
          <Button variant={variant} to={clinicWebsite}>
            Website
          </Button>
          {variant === 'homeCare' ? (
            ''
          ) : (
            <Button
              variant={variant}
              to={`https://maps.google.com/maps?daddr=${position.join()}`}
            >
              Directions
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <ClinicCardContent variant={variant} />
      </CardContent>
    </Card>
  );
};
