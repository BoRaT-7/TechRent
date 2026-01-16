// server.js  (techrent-proxy)
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// ✅ Custom CORS middleware — এখানে কোনো app.options নেই
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight OK
  }
  next();
});

app.use(express.json());

// ✅ Proxy login route
app.post("/api/admin/login", async (req, res) => {
  try {
    const backendRes = await fetch(
      "http://209.97.161.90:6002/api/v1/public/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const text = await backendRes.text();

    try {
      const json = JSON.parse(text);
      res.status(backendRes.status).json(json);
    } catch {
      res.status(backendRes.status).send(text);
    }
  } catch (err) {
    res.status(500).json({ message: "Proxy error", error: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log("Proxy server running on http://localhost:" + PORT);
});
