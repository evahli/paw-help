import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getClinicIcon } from '@/lib/categoryIcons';
import { PageHeader } from '@/components/PageHeader';
import { useSearchParams } from 'react-router';
import { ClinicCard } from '@/components/ClinicCard';
import { getClinicTypes } from '@/lib/utils';
import { useMapVariantData } from '@/lib/useMapVariantData';

const getLocation = async (setLocation) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
      },
    );
  } else {
    console.log('Geolocation not supported');
  }
};

export const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [searchParams] = useSearchParams();
  const pageVariant = searchParams.get('variant') || "vetCare";
  const {mapVariantData: data, isLoading, error} = useMapVariantData({variant: pageVariant})

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  /** To do: make it nicer */
  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-screen h-screen relative">
      <PageHeader variant={pageVariant} />
      {location && (
        <MapContainer
          className="w-screen h-[80vh] fixed top-[20vh] z-0"
          center={location}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((item) => (
            <Marker
              key={item.placeId}
              position={[item.location.lat, item.location.lng]}
              icon={getClinicIcon(item)}
            >
              <Popup>
                <strong>{item.title}</strong> <br />
                {getClinicTypes(item)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      <div className="absolute top-[80vh] w-full p-4">
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <ClinicCard
              clinicData={item}
              variant={pageVariant}
              key={item.placeId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
