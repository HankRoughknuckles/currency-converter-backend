import request from "supertest";
import axios from "axios";
import { app } from "../src/app";

describe("GET /", () => {
  const axiosGetSpy = jest.spyOn(axios, "get");

  beforeEach(() => {
    axiosGetSpy.mockReset();
  });

  describe("when the source site returns data", () => {
    beforeEach(() => {
      const mockResponseData = `
02 Nov 2023 #212
USA|dollar|1|USD|20.0
EMU|euro|1|EUR|25.0
India|rupee|100|INR|27.762
`;
      axiosGetSpy.mockResolvedValue({ data: mockResponseData });
    });

    it("should 200", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    });

    it("should return exchange rates in the proper form", async () => {
      const response = await request(app).get("/");
      expect(response.body).toEqual([
        {
          country: "USA",
          currencyName: "dollar",
          code: "USD",
          czkPerUnit: 20.0,
        },
        { country: "EMU", currencyName: "euro", code: "EUR", czkPerUnit: 25.0 },
        {
          country: "India",
          currencyName: "rupee",
          code: "INR",
          czkPerUnit: 0.27762,
        },
      ]);
    });
  });

  describe("if there is an issue with the source site", () => {
    beforeEach(() => {
      axiosGetSpy.mockImplementation(() => {
        throw new Error("Something went wrong");
      });
    });

    it("should 500", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(500);
    });

    it("should return [] if the source site does not 200", async () => {
      const response = await request(app).get("/");
      expect(response.body).toEqual([]);
    });
  });
});
