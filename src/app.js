import express from "express";
import cors from "cors";
import apodRouter from "./routes/apod.routes.js";

import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" });
});

app.use("/api/apod", apodRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
