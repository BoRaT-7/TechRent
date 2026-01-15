// server.js
const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// ✅ CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5178", "http://localhost:5179"], // আপনার frontend ports
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // যদি cookie/token ব্যবহৃত হয়
  })
);

// ✅ Express JSON parser
app.use(express.json());

// ✅ OPTIONS preflight handler
app.options("/*", cors());

// ✅ Login proxy route
app.post("/api/admin/login", cors(), async (req, res) => {
  try {
    // Backend API call
    const backendRes = await fetch(
      "http://209.97.161.90:6002/api/v1/public/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await backendRes.json();

    // Response same as backend
    res.status(backendRes.status).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({
      message: "Proxy error",
      error: err.message,
    });
  }
});

// ✅ Logout route (optional, just clear server-side if needed)
app.post("/api/admin/logout", cors(), (req, res) => {
  // কোনো server-side token না থাকলে শুধু response দিন
  res.status(200).json({ message: "Logged out" });
});

// ✅ Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});
