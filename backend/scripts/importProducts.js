import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import mongoose from "mongoose";
import { mongodbDatabase, mongodbURL } from "../config.js";

const defaultFile = path.resolve("megamart.products.json");
const sourceFile = path.resolve(process.argv[2] || defaultFile);

try {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add your Atlas connection string to backend/.env first."
    );
  }

  const source = await fs.readFile(sourceFile, "utf8");
  const products = mongoose.mongo.BSON.EJSON.parse(source);

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("The product export must be a non-empty JSON array.");
  }

  await mongoose.connect(mongodbURL, { dbName: mongodbDatabase });

  const result = await mongoose.connection.collection("products").bulkWrite(
    products.map((product) => ({
      replaceOne: {
        filter: { _id: product._id },
        replacement: product,
        upsert: true,
      },
    })),
    { ordered: false }
  );

  console.log(
    `Imported ${products.length} products into ${mongodbDatabase}.products ` +
      `(${result.upsertedCount} inserted, ${result.modifiedCount} updated).`
  );
} catch (error) {
  console.error(`Product import failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
