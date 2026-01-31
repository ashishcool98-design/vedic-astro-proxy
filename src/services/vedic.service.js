import axios from "axios";
import { mapBirthDetails } from "../utils/mapper.js";
import { getCache, setCache } from "../utils/cache.js";

const client = axios.create({
  baseURL: process.env.VEDIC_API_BASE,
  timeout: 15000
});

async function callVedic(endpoint, payload) {
  const cacheKey = endpoint + JSON.stringify(payload);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const response = await client.get(endpoint, {
    params: {
      ...payload,
      api_key: process.env.VEDIC_API_KEY
    }
  });

  setCache(cacheKey, response.data);
  return response.data;
}


// =======================
// CORE ENDPOINTS
// =======================

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

// =======================
// FREE-TIER EXTENSIONS
// =======================

export async function getNakshatra(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/nakshatra-details",
      mapBirthDetails(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}

export async function getAscendant(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/ascendant-report",
      mapBirthDetails(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}

export async function getPanchang(req, res, next) {
  try {
    const data = await callVedic(
      "/panchang",
      mapBirthDetails(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}
