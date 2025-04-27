import express from "express";
import {
  searchQuantitative,
  searchFuzzy,
  searchHybrid,
  searchByYearEmbedding,
  searchByCategoryEmbedding,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/quantitative", searchQuantitative);
router.get("/fuzzy", searchFuzzy);
router.get("/hybrid", searchHybrid);
router.get("/embedding/year", searchByYearEmbedding);
router.get("/embedding/category", searchByCategoryEmbedding);

export default router;
