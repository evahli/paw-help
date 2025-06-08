import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isEmergencyClinic, isHomeVetClinic, isVetCareClinic } from './categorySorting';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 
 * @param {*} item : single clinic data
 * @returns clinic types as a string
 */
export const getClinicTypes = (item) => {
  const clinicTypes = [
    isEmergencyClinic(item) && 'Pohotovost',
    isVetCareClinic(item) && 'Veterinární péče',
    isHomeVetClinic(item) && 'Veterinář domů',
  ]
    .filter(Boolean)
    .join(', ');
  return clinicTypes;
};
