import "dotenv/config";

const mongodbURL =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/megamart";
const mongodbDatabase = process.env.MONGODB_DB_NAME || "megamart";
const port = Number(process.env.PORT) || 3000;
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export { corsOrigins, mongodbDatabase, mongodbURL, port };
