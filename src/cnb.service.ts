import axios from "axios";

export interface Rate {
  /** example: USA, EMU, Romania */
  country: string;
  /** example: dollar, euro, leu */
  currencyName: string;
  /** example: USD, EUR, RON */
  code: string;
  /** How many CZK are equal to 1 of the currency */
  czkPerUnit: number;
}

const API_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

export const fetchExchangeRates = async () => {
  const response = await axios.get(API_URL);
  return _mapResponseToRates(response.data);
};

const _mapResponseToRates = (responseData: string): Rate[] => {
  const lines = responseData.split("\n");
  const dataWithoutFirstLine = lines.slice(2, lines.length - 1);

  return dataWithoutFirstLine.map((line) => {
    const [country, currencyName, amount, code, rate] = line.split("|");
    return {
      country,
      currencyName,
      code,
      czkPerUnit: Number(rate) / Number(amount),
    };
  });
};
