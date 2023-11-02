import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { fetchExchangeRates, Rate } from "./src/cnb.service";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const setCorsHeaders = (res: Response) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW);
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
};

app.get("/", async (req: Request, res: Response<Rate[]>) => {
  const rates = await fetchExchangeRates();
  setCorsHeaders(res);
  res.send(rates);
});

app.listen(port, () => {
  console.log(`CORS proxy server is running on port ${port}`);
});
