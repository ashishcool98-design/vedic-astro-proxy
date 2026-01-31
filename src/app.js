import express from "express";
import cors from "cors";
import astroRoutes from "./routes/astro.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/astro", astroRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Vedic Astrology Proxy API running" });
});

app.use(errorHandler);

export default app;
