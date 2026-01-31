// ================= HOROSCOPE PAYLOAD =================
// Used by: planets, dasha, nakshatra, ascendant, combined

export function mapHoroscopePayload(body) {
  const day = String(body.date).padStart(2, "0");
  const month = String(body.month).padStart(2, "0");
  const year = body.year;

  const hour = String(body.hours).padStart(2, "0");
  const minute = String(body.minutes).padStart(2, "0");

  return {
    dob: `${day}/${month}/${year}`,
    tob: `${hour}:${minute}`,
    lat: body.latitude,
    lon: body.longitude,
    tz: body.timezone,
    ayanamsa: 1 // REQUIRED for dasha & nakshatra
  };
}

// ================= PANCHANG PAYLOAD =================
// Used ONLY by: panchang

export function mapPanchangPayload(body) {
  return {
    day: body.date,
    month: body.month,
    year: body.year,
    lat: body.latitude,
    lon: body.longitude,
    tz: body.timezone
  };
}
