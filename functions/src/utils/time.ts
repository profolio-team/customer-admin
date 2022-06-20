export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const getDiffInMins = (timestampStart: number, timestampFinish: number): number => {
  const diffInMins = (timestampFinish - timestampStart) / MINUTE;
  return Math.round(diffInMins);
};

export const getDiffInHours = (timestampStart: number, timestampFinish: number): number => {
  const diffInMins = (timestampFinish - timestampStart) / HOUR;
  return Math.round(diffInMins);
};

export const getDiffInDays = (timestampStart: number, timestampFinish: number): number => {
  const diffInMins = (timestampFinish - timestampStart) / DAY;
  return Math.round(diffInMins);
};
