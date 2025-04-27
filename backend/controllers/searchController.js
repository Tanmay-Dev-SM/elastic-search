import { esClient } from "../elastic.js";

export const searchQuantitative = async (req, res) => {
  try {
    const { rating } = req.query;

    const { hits } = await esClient.search({
      index: "amazon_product_reviews",
      size: 10,
      query: {
        match: {
          overall: rating,
        },
      },
    });

    const results = hits.hits.map((hit) => hit._source);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching quantitative reviews" });
  }
};

export const searchFuzzy = async (req, res) => {
  try {
    const { keyword } = req.query;

    const { hits } = await esClient.search({
      index: "amazon_product_reviews",
      size: 10,
      query: {
        match: {
          reviewText: {
            query: keyword,
            fuzziness: "AUTO",
          },
        },
      },
    });

    const results = hits.hits.map((hit) => hit._source);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching fuzzy reviews" });
  }
};

export const searchHybrid = async (req, res) => {
  try {
    const { rating, keyword } = req.query;

    const { hits } = await esClient.search({
      index: "amazon_product_reviews",
      size: 10,
      query: {
        bool: {
          must: [
            {
              match: {
                overall: rating,
              },
            },
            {
              match: {
                reviewText: {
                  query: keyword,
                  fuzziness: "AUTO",
                },
              },
            },
          ],
        },
      },
    });

    const results = hits.hits.map((hit) => hit._source);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching hybrid reviews" });
  }
};

export const searchByYearEmbedding = async (req, res) => {
  try {
    const { year } = req.query;

    const { hits } = await esClient.search({
      index: "mini_dataset_amazon_product_reviews",
      size: 3,
      query: {
        bool: {
          must: [
            {
              range: {
                unixReviewTime: {
                  gte: new Date(`${year}-01-01`).getTime() / 1000,
                  lt: new Date(`${parseInt(year) + 1}-01-01`).getTime() / 1000,
                },
              },
            },
          ],
        },
      },
    });

    const results = hits.hits.map((hit) => hit._source);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching by year" });
  }
};

export const searchByCategoryEmbedding = async (req, res) => {
  try {
    const { category } = req.query;

    const { hits } = await esClient.search({
      index: "mini_dataset_amazon_product_reviews",
      size: 3,
      query: {
        match: {
          reviewText: category,
        },
      },
    });

    const results = hits.hits.map((hit) => hit._source);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching by category" });
  }
};
