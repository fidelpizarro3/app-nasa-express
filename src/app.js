import express from "express";
import cors from "cors";
import apodRouter from "./routes/apod.routes.js";

import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = process.env.FRONTEND_URL?.split(',') || [];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" });
});

app.use("/api/apod", apodRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
