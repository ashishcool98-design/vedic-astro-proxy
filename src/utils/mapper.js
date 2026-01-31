export function mapBirthDetails(body) {
  return {
    day: body.date,
    month: body.month,
    year: body.year,
    hour: body.hours,
    min: body.minutes,
    lat: body.latitude,
    lon: body.longitude,
    tzone: body.timezone
  };
}
