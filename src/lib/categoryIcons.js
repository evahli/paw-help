import Leaflet from 'leaflet';
import { isEmergencyClinic, isHomeVetClinic } from './categorySorting';
import catImg from '@/assets/mdi_emoji-cat.svg'

const greenIcon = new Leaflet.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new Leaflet.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new Leaflet.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const userLocationIcon = new Leaflet.Icon({
  iconUrl: catImg,
  iconSize: [60, 60],
  iconAnchor: [30, 30],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const getClinicIcon = (item) => {
  if (isEmergencyClinic(item)) {
    return redIcon;
  }
  if (isHomeVetClinic(item)) {
    return greenIcon;
  }
  return yellowIcon;
};
