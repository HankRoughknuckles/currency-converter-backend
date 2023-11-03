import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { fetchExchangeRates, Rate } from "./cnb.service";

dotenv.config();

export const app: Application = express();

const setCorsHeaders = (res: Response) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW);
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
};

app.get("/", async (req: Request, res: Response<Rate[]>) => {
  try {
    const rates = await fetchExchangeRates();
    setCorsHeaders(res);
    res.send(rates);
  } catch (error) {
    res.status(500).send([]);
  }
});
