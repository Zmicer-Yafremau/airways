export const getTimeZone = (zone: string) => {
  const [sign, ...timezoneLetters] = zone.split('');
  const [firstNum, lastNum] = timezoneLetters.join('').split('.');

  const first = firstNum.length === 1 ? `0${firstNum}` : firstNum;
  const last = lastNum.length === 1 ? `${lastNum}0` : lastNum;

  return sign + first + last;
};
