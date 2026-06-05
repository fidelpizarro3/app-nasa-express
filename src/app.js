import express from "express";
import cors from "cors";
import apodRouter from "./routes/apod.routes.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" });
});

app.use("/api/apod", apodRouter);

export default app;
