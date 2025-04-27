import fs from "fs";
import csv from "csv-parser";
import { esClient } from "../elastic.js";
import { generateRandomEmbedding } from "../utils/generateEmbeddings.js";

// Seeding Amazon_Appliances_Reviews.csv into Amazon_Product_Reviews index
export const seedAmazonReviews = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream("data/Amazon_Appliances_Reviews.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const doc of results) {
          await esClient.index({
            index: "amazon_product_reviews", // index name
            document: {
              reviewerID: doc.reviewerID,
              asin: doc.asin,
              reviewerName: doc.reviewerName,
              helpful: JSON.parse(doc.helpful), // helpful is like [0, 0], parse it
              reviewText: doc.reviewText,
              overall: parseFloat(doc.overall),
              summary: doc.summary,
              unixReviewTime: parseInt(doc.unixReviewTime),
              reviewTime: doc.reviewTime,
            },
          });
        }

        res.send(`Seeded ${results.length} documents into Amazon_Product_Reviews`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while seeding Amazon Reviews");
  }
};

// Seeding Mini Dataset with Embeddings
export const seedMiniDataset = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream("data/Mini_Dataset_Amazon_Appliances_Reviews.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        for (const doc of results) {
          await esClient.index({
            index: "mini_dataset_amazon_product_reviews", // new index
            document: {
              reviewerID: doc.reviewerID,
              asin: doc.asin,
              reviewText: doc.reviewText,
              overall: parseFloat(doc.overall),
              unixReviewTime: parseInt(doc.unixReviewTime),
              reviewTime: doc.reviewTime,
              embedding: generateRandomEmbedding(), // Add embedding here using utility function
            },
          });
        }

        res.send(`Seeded ${results.length} documents into Mini_Dataset_Amazon_Product_Reviews`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while seeding Mini Dataset");
  }
};
