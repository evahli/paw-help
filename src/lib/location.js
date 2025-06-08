import { getDistance } from 'geolib';

export const getLocation = async (setLocation) => {
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
}

export const useGeolocation = () => {
  return
}
