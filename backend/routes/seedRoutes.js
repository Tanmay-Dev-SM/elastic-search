import express from "express";
import { seedAmazonReviews, seedMiniDataset } from "../controllers/seedController.js";

const router = express.Router();

// Seed Amazon Reviews Route
router.post("/amazon-reviews", seedAmazonReviews);
router.post("/mini-dataset", seedMiniDataset);

export default router;
