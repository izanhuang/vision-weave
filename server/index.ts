// server/index.ts
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

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

app.listen(4000, () => {
  console.log("✅ Proxy server running at http://localhost:4000");
});
