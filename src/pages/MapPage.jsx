import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { getClinicIcon, userLocationIcon } from '@/lib/categoryIcons';
import { PageHeader } from '@/components/PageHeader';
import { Link, useSearchParams } from 'react-router';
import { ClinicCard } from '@/components/ClinicCard';
import { getClinicTypes } from '@/lib/utils';
import { useMapVariantData } from '@/lib/useMapVariantData';
import { getLocation } from '@/lib/location';
import { getDistance } from 'geolib';
import { isClinicOpen } from '@/lib/openingHours';
import { LoadingScreen } from '@/components/LoadingScreen';


export const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [searchParams] = useSearchParams();
  const pageVariant = searchParams.get('variant') || 'vetCare';
  const {
    mapVariantData: data,
    isLoading,
    error,
  } = useMapVariantData({ variant: pageVariant });

  useEffect(() => {
    getLocation(setLocation);
  }, []);
  if (isLoading || !data) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;
  
  const sortedData = location 
    ? data.map((item) => ({
          ...item,
          distance: getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: item.location.lat, longitude: item.location.lng }
          )
        }))
        .sort((a, b) => a.distance - b.distance)
    : data;

  const filteredData = sortedData.filter((item) => {
    if (pageVariant === "emergency") {
      return isClinicOpen(item.openingHours)
    } else {
      return true;
    }
  })

  return (
    <div className="w-screen h-screen relative sm:flex sm:flex-row-reverse">
      <PageHeader variant={pageVariant} redirectToHome={true} />
      {location && (
        <MapContainer
          className="w-screen h-[80vh] top-[20vh] fixed z-0"
          center={[location.latitude, location.longitude]}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredData.map((item) => (
            <Marker
              key={item.placeId}
              position={[item.location.lat, item.location.lng]}
              icon={getClinicIcon(item)}
            >
              <Popup>
                <Link
                  to={`/detail?placeId=${item.placeId}&variant=${pageVariant}`}
                >
                  <strong>{item.title}</strong> <br />
                </Link>
                {getClinicTypes(item)}
              </Popup>
            </Marker>
          ))}
          <Marker
            position={[location.latitude, location.longitude]}
            icon={userLocationIcon}
          ></Marker>
        </MapContainer>
      )}
      <div className="absolute top-[80vh] sm:top-[20vh] w-full sm:max-w-md p-4 sm:p-0 sm:ml-0 sm:pl-0">
        <div className="flex flex-col gap-2 sm:gap-0">
          {filteredData.map((item) => (
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
