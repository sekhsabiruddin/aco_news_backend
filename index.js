const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const newsRoutes = require("./controller/news");
const cors = require("cors");

app.use(
  cors({
    origin: ["https://aco-news-frontend.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/news", newsRoutes); // Place routes after CORS

app.use(errorMiddleware); // Place error middleware last

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
