import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';

const clinicName = 'Veterinarni klinika Nusle';
const rating = 4.7;
const type = 'veterinarni klinika';
const tel = '608493808';
const position = [50, 1, 14.423];
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
const clinicWebsite = 'czechitas.cz';

const ClinicCardContent = () => {
  return (
    <div className='flex flex-col items-start'>
    <span>{rating}</span>
    <span>{type}</span>
    <span>{tel}</span>
    <span>Otevreno</span>
    </div>
  )
}

export const ClinicCard = () => {
  return (
    <Card className='min-w-full'>
      <CardHeader>
        <CardTitle>{clinicName}</CardTitle>
        <CardAction>
          <Button>Directions</Button>
        <Button>Website</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ClinicCardContent/>
      </CardContent>
    </Card>
  );
};
