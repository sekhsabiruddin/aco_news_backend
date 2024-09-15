const express = require("express");
const axios = require("axios");
const router = express.Router();
const ErrorHander = require("../utils/errorhander");
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

router.get("/get-all", async (req, res, next) => {
  try {
    const response = await axios.get(process.env.GNEWS_API);
    res.status(200).json(response.data);
  } catch (error) {
    next(new ErrorHander(error.message, 500));
  }
});

router.get("/top-headlines", async (req, res, next) => {
  try {
    const { category, lang, country, page = 1, pageSize = 10 } = req.query;

    const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
      params: {
        category,
        lang,
        country,
        page,
        pageSize,
        apikey: GNEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    next(new ErrorHander(error.message, 500));
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { q, lang, country, page = 1, pageSize = 10 } = req.query;

    const response = await axios.get(`https://gnews.io/api/v4/search`, {
      params: {
        q,
        lang,
        country,
        page,
        pageSize,
        apikey: GNEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    next(new ErrorHander(error.message, 500));
  }
});

module.exports = router;
