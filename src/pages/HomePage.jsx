import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { getClinicIcon, userLocationIcon } from '@/lib/categoryIcons';
import dayjs from 'dayjs';
import { getClinicTypes } from '@/lib/utils';
import { useMapVariantData } from '@/lib/useMapVariantData';
import { getLocation } from '@/lib/location';
import { LoadingScreen } from '@/components/LoadingScreen';

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

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen overflow-y-auto flex flex-col justify-between">
      <div className="flex flex-col text-center gap-2 pt-4">
        <h1>PawHelp</h1>
        <h3>Co hledám?</h3>
      </div>
      <div className="flex flex-col gap-2 p-4 items-center">
        <Button
          variant="emergency"
          to="/map?variant=emergency"
          className="w-full max-w-xs"
        >
          Veterinární pohotovost
        </Button>
        <Button
          variant="vetCare"
          to="/map?variant=vetCare"
          className="w-full max-w-xs"
        >
          Veterinární péče
        </Button>
        <Button
          variant="homeCare"
          to="/map?variant=homeCare"
          className="w-full max-w-xs"
        >
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
        // if location disable in browser, display centered in ceter of Prague
        <div className="h-[50vh] w-screen">
          <MapContainer
            className="w-full h-full"
            center={[50.0857, 14.4195]}
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
          </MapContainer>
        </div>
      )}
      <footer className=" text-gray-600 text-xs px-2 py-1">
        <div className=" mx-auto leading-tight">
          <p>
            😽Tohle je finální projekt Evy a Káji z Digitální Akademie Web 2025 od{' '}
            <a
              href="https://www.czechitas.cz"
              className="text-blue-500 hover:underline"
            > 
              Czechitas
            </a>
            .
          </p>
          <p>
            😼Data použitá v této aplikaci pocházejí z Google Maps. Poslední
            aktualizace proběhla dne {lastEditedAt.format('DD.MM.YYYY')}.
            Informace nemusejí být vždy zcela aktuální.
          </p>
        </div>
      </footer>
    </div>
  );
};
