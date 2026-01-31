import axios from "axios";
import {
  mapHoroscopePayload,
  mapPanchangPayload
} from "../utils/mapper.js";
import { getCache, setCache } from "../utils/cache.js";

const client = axios.create({
  baseURL: process.env.VEDIC_API_BASE,
  timeout: 15000
});

async function callVedic(endpoint, params) {
  const cacheKey = endpoint + JSON.stringify(params);
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const response = await client.get(endpoint, {
    params: {
      ...params,
      api_key: process.env.VEDIC_API_KEY
    }
  });

  setCache(cacheKey, response.data);
  return response.data;
}

// ================= HOROSCOPE =================

export async function getPlanets(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/planet-details",
      mapHoroscopePayload(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}

export async function getDasha(req, res, next) {
  try {
    const basePayload = mapHoroscopePayload(req.body);

    const dashaPayload = {
      ...basePayload,
      mahadasa: true // REQUIRED by Vedic API
    };

    const data = await callVedic(
      "/horoscope/vimshottari-dasha",
      dashaPayload
    );

    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}


export async function getNakshatra(req, res, next) {
  try {
    const data = await callVedic(
      "/horoscope/nakshatra-details",
      mapHoroscopePayload(req.body)
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
      mapHoroscopePayload(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}

// ================= PANCHANG =================

export async function getPanchang(req, res, next) {
  try {
    const data = await callVedic(
      "/panchang",
      mapPanchangPayload(req.body)
    );
    res.json({ output: data });
  } catch (err) {
    next(err);
  }
}
