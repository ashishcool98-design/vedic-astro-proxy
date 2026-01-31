import express from "express";
import {
  getPlanets,
  getDasha,
  getNakshatra,
  getAscendant,
  getPanchang
} from "../services/vedic.service.js";

const router = express.Router();

router.post("/planets", getPlanets);
router.post("/dasha", getDasha);
router.post("/nakshatra", getNakshatra);
router.post("/ascendant", getAscendant);
router.post("/panchang", getPanchang);

export default router;
