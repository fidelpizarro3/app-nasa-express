import express from "express";
import cors from "cors";
import apodRouter from "./routes/apod.routes.js";
import authRouter from "./routes/auth.routes.js"
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" });
});

app.use("/api/apod", apodRouter);
app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
