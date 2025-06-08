import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import data from '@/data/kliniky_data_sample.json';
import {
  isEmergencyClinic,
  isHomeVetClinic,
  isVetCareClinic,
} from '@/lib/categorySorting';
import { getClinicIcon } from '@/lib/categoryIcons';
import { PageHeader } from '@/components/PageHeader';
import { useSearchParams } from 'react-router';

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
  searchParams.get('variant');

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (
    <>
      {/* to do: get categoryName from URL query */}
      <PageHeader variant={searchParams.get('variant')} />
      {location ? ( // wait for location before rendering map
        <div className="h-[75svh]">
          <MapContainer className="w-full h-full" center={location} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((item) => {
              return (
                <Marker
                  position={[item.location.lat, item.location.lng]}
                  icon={getClinicIcon(item)}
                >
                  <Popup>
                    {item.title} <br />
                    {isEmergencyClinic(item) && 'Emergency'}
                    {isHomeVetClinic(item) && 'Vyjezd'}
                    {isVetCareClinic(item) && 'Klinika'}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      ) : (
        <p> No location provided, map cannot be rendered</p>
      )}
    </>
  );
};
