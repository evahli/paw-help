import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { getClinicIcon, userLocationIcon } from '@/lib/categoryIcons';
import dayjs from 'dayjs';
import { getClinicTypes } from '@/lib/utils';
import { useMapVariantData } from '@/lib/useMapVariantData';
import { getLocation } from '@/lib/location';

const lastEditedAt = dayjs('2025-06-07');

export const HomePage = () => {
  const [location, setLocation] = useState(null);
  const {
    mapVariantData: data,
    isLoading,
    error,
  } = useMapVariantData({ variant: 'all' });

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-screen overflow-y-auto flex flex-col justify-between'>
      <div className="flex flex-col text-center gap-2 pt-4">
        <h1>PawHelp</h1>
        <h2>Hledám</h2>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Button variant="emergency" to="/map?variant=emergency">
          Veterinární pohotovost
        </Button>
        <Button variant="vetCare" to="/map?variant=vetCare">
          Veterinární péče
        </Button>
        <Button variant="homeCare" to="/map?variant=homeCare">
          Veterinář domů
        </Button>
      </div>
      {location ? ( // wait for location before rendering map
        <div className="h-[50vh] w-screen">
          <MapContainer
            className="w-full h-full"
            center={[location.latitude, location.longitude]}
            zoom={13}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((item) => {
              return (
                <Marker
                  key={item.placeId}
                  position={[item.location.lat, item.location.lng]}
                  icon={getClinicIcon(item)}
                >
                  <Popup>
                    <strong> {item.title}</strong> <br />
                    {getClinicTypes(item)}
                  </Popup>
                </Marker>
              );
            })}
            <Marker
              position={[location.latitude, location.longitude]}
              icon={userLocationIcon}
            ></Marker>
          </MapContainer>
        </div>
      ) : (
        <p> No location provided, map cannot be rendered</p>
      )}
      <div className="p-2">
        <p className="italic font-medium text-xs">
          Data použitá v této aplikaci pocházejí z Google Maps. Poslední
          aktualizace proběhla dne {lastEditedAt.format('DD.MM.YYYY')}.
          Informace se mohou měnit a nemusejí být vždy zcela aktuální.
        </p>
      </div>
    </div>
  );
};
