import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import starImg from '@/assets/star.svg';
import phoneImg from '@/assets/ic_round_phone.svg';
import { cva } from 'class-variance-authority';
import carImg from '@/assets/car.svg';
import earthImg from '@/assets/famicons_earth.svg';
import {
  isEmergencyClinic,
  isVetCareClinic,
  isHomeVetClinic,
} from '@/lib/categorySorting';
import { getDistance } from 'geolib';
import { isClinicOpen, getTodaysOpeningHours } from '@/lib/openingHours';
import { useEffect, useState } from 'react';
import { getLocation } from '@/lib/location';


const DisplayDistance = ({distance}) => {
  if (distance <= 500) {
    return <span>{distance} m od Vás</span>
  }
  else {
    return <span>{(distance / 1000).toFixed(2)} km od Vás</span>
  }
}
/** generate clinic description based on its category from our helper functions */
const getClinicDescription = (clinicData) => {
  return [
    isEmergencyClinic(clinicData) && 'Pohotovost',
    isVetCareClinic(clinicData) && 'Veterinární péče',
    isHomeVetClinic(clinicData) && 'Veterinář domů',
  ]
    .filter(Boolean)
    .join(', ');
};

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

const ClinicCardContent = ({ variant, clinicData }) => {
  const [location, setLocation] = useState(null);
  const [distanceFromClinic, setDistanceFromClinic] = useState(null);

  useEffect(() => {
    getLocation(setLocation);
    if (location) {
      setDistanceFromClinic(getDistance({latitude: location.latitude, longitude:location.longitude}, clinicData.location))
    }
  }, [location, clinicData])
  const isOpen = isClinicOpen(clinicData.openingHours);
  return (
    <div className="flex flex-col items-start">
      {clinicData.totalScore && (
        <div className="flex items-center gap-2">
          <span>{clinicData.totalScore}</span>
          <img className="w-4 h-4" src={starImg} />
        </div>
      )}
      {clinicData.phone && (
        <a
          href={`tel:${clinicData.phoneUnformatted}`}
          className="flex items-center gap-2 font-semibold"
        >
          <img className="w-6 h-6 " src={phoneImg}></img>
          <span>{clinicData.phone}</span>
        </a>
      )}
      {variant === 'homeCare' ? (
        ''
      ) : (
        <div className="flex gap-2">
          {isOpen ? (
            <span className="text-green-600 font-semibold">Otevřeno</span>
          ) : (
            <span className="text-red-600 font-semibold">Zavřeno</span>
          )}

          {variant === 'emergency' && distanceFromClinic ? <DisplayDistance distance={distanceFromClinic} /> : ''}
          {isOpen && variant === 'vetCare' ? (
            <span>
              {getTodaysOpeningHours(clinicData.openingHours)?.hours.replace(
                'to',
                '-',
              )}
            </span>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

const allowedClinicCardVariants = ['emergency', 'vetCare', 'homeCare'];

export const ClinicCard = ({ variant, clinicData }) => {
  if (!allowedClinicCardVariants.includes(variant)) {
    throw new Error(`Invalid ClinicCard variant - ${variant}!`);
  }

  return (
    <Card className={clinicCardVariants({ variant })}>
      <CardHeader>
        <CardTitle>{clinicData.title}</CardTitle>
        <CardDescription>{getClinicDescription(clinicData)}</CardDescription>

        <CardAction className="flex gap-2">
          {clinicData.website && (
            <Button icon={earthImg} variant={variant} to={clinicData.website} />
          )}
          {variant === 'homeCare' ? (
            ''
          ) : (
            <Button
              icon={carImg}
              variant={variant}
              to={`https://maps.google.com/maps?daddr=${clinicData.location.lat},${clinicData.location.lng}`}
            />
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <ClinicCardContent variant={variant} clinicData={clinicData} />
      </CardContent>
    </Card>
  );
};
