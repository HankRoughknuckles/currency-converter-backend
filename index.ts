import { app } from "./src/app";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`CORS proxy server is running on port ${port}`);
});
