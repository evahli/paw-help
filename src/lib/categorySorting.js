export const isEmergencyClinic = (clinicData) => {
  const emergencyClinicKeyWords = 'pohotovost';
  const fieldsToSearch = [
    clinicData.title,
    clinicData.categoryName,
    ...clinicData.categories,
  ];

  const isEmergency = fieldsToSearch
    .map((field) => field.toLowerCase())
    .map((field) => {
      return field.includes(emergencyClinicKeyWords);
    })
    .some(Boolean);
  return isEmergency;
};

export const isHomeVetClinic = (clinicData) => {
  const isHomeVetClinicKeyWords = ['vyjezd', 'výjezd', 'domů', 'domu'];
  const fieldsToSearch = [
    clinicData.title,
    clinicData.categoryName,
    ...clinicData.categories,
  ];

  const isHomeVetClinic = fieldsToSearch
    .map((field) => field.toLowerCase())
    .map((field) => {
      return isHomeVetClinicKeyWords.some((keyword) => field.includes(keyword));
    })
    .some(Boolean);
  return isHomeVetClinic;
};

export const isVetCareClinic = (clinicData) => {
  const vetCareClinicKeyWords = ['veterinář', 'veterinární péče', 'klinika'];
  const fieldsToSearch = [clinicData.categoryName, ...clinicData.categories];

  const isVetCare = fieldsToSearch
    .map((field) => field.toLowerCase())
    .map((field) => {
      return vetCareClinicKeyWords.some((keyword) => field.includes(keyword));
    })
    .some(Boolean);
  return isVetCare;
};
