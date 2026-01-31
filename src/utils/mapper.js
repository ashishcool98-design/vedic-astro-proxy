export function mapBirthDetails(body) {
  const day = String(body.date).padStart(2, "0");
  const month = String(body.month).padStart(2, "0");
  const year = body.year;

  return {
    dob: `${day}/${month}/${year}`,
    hour: body.hours,
    min: body.minutes,
    lat: body.latitude,
    lon: body.longitude,
    tzone: body.timezone
  };
}
