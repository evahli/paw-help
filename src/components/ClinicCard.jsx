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
          <span className="text-green-600 font-semibold">Otevřeno</span>
          {variant === 'emergency' ? <span>300m od vas</span> : ''}
          {variant === 'vetCare' ? <span>Zavira v 19:00</span> : ''}
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
