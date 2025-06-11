const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Proxy server is running");
});

app.get("/api/rss", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).send("Missing or invalid url");
  }

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }, // helps Pinterest accept the request
    });
    res.set("Content-Type", "application/rss+xml");
    res.send(response.data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Failed to fetch RSS feed");
  }
});

app.get("/api/image", async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).send("Missing or invalid URL");
  }
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    res.set("Content-Type", response.headers["content-type"]);
    res.set("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Image fetch failed");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
