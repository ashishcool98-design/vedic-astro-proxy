import axios from "axios";
import { mapBirthDetails } from "../utils/mapper.js";
import { getCache, setCache } from "../utils/cache.js";

const client = axios.create({
  baseURL: process.env.VEDIC_API_BASE,
  timeout: 10000
});

async function callVedic(endpoint, payload) {
  const cacheKey = endpoint + JSON.stringify(payload);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const { data } = await client.post(
    endpoint,
    payload,
    { params: { api_key: process.env.VEDIC_API_KEY } }
  );

  setCache(cacheKey, data);
  return data;
}

export async function getPlanets(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/planet-details",
      mapBirthDetails(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}

export async function getDasha(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/vimshottari-dasha",
      mapBirthDetails(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}
