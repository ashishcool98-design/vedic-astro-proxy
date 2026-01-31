import express from "express";
import { getPlanets, getDasha } from "../services/vedic.service.js";

const router = express.Router();

router.post("/planets", getPlanets);
router.post("/dasha", getDasha);

export default router;
