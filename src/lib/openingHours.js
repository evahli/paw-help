import dayjs from 'dayjs';

/** splits a string like "9 to 12" to [9, 12], if there is a half hour we transfer 3:30 to 3.5 */
const parseSingleInterval = (intervalString) => {
  return intervalString.split(' to ').map((hour) => {
    if (hour.includes(':')) {
      const [hours, minutes] = hour.split(':').map(Number);
      const minutesAsHours = minutes / 60;
      return hours + minutesAsHours;
    }
    return Number(hour);
  });
};

/** function gets a string and returns an interval, for mutliple windows of opening time, it returns multiple intervals */
const parseOpeningHours = (openingHoursString) => {
  if (
    openingHoursString.includes('24') &&
    openingHoursString.toLowerCase().includes('otevřeno')
  ) {
    return [[0, 24]];
  }
  if (openingHoursString.includes(' to ')) {
    const singleIntervals = openingHoursString.split(', ');
    return singleIntervals.map((interval) => parseSingleInterval(interval));
  }
  return [];
};


/** helper to translate - our data has day names in Czech, using dayjs with english names */
const daysCzToEng = {
  Sun: 'neděle',
  Mon: 'pondělí',
  Tue: 'úterý',
  Wed: 'středa',
  Thu: 'čtvrtek',
  Fri: 'pátek',
  Sat: 'sobota',
};

/** check if 14:10 as 14.11 is within an inverval of opening hours [14, 18] */
const isTimeWithinIntervals = (hourAsNumber, intervals) => {
  for (const interval of intervals) {
    const intervalStart = interval[0];
    const intervalEnd = interval[1];
    if (hourAsNumber >= intervalStart && hourAsNumber < intervalEnd) {
      return true;
    }
  }
  return false;
};

/** get today's date, translate name to Czech name, find correct name within the weekly opening hours object, return today's opening hours (displayed on clinic detail card) */
export const getTodaysOpeningHours = (weeklyOpeningHours) => {
  const today = dayjs().format('ddd');
  const todayCz = daysCzToEng[today];
  const todaysOpeningHours = weeklyOpeningHours.find(
    (item) => item.day === todayCz,
  );
  console.log(todaysOpeningHours)
  return todaysOpeningHours;
};

/** check today's opening hours, compare them with the clinc's opening hours */
export const isClinicOpen = (weeklyOpeningHours) => {
  const todaysOpeningHours = getTodaysOpeningHours(weeklyOpeningHours);
  if (todaysOpeningHours === undefined) {
    return false;
  }
  const parsedOpeningHours = parseOpeningHours(todaysOpeningHours.hours);
  const timeNow = dayjs().get('hour') + dayjs().get('minute') / 60;
  return isTimeWithinIntervals(timeNow, parsedOpeningHours);
};
