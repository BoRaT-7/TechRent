// server.js
const express = require("express");
const http = require("http");

const app = express();

/* ============ GLOBAL CORS ============ */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// ⚠️ JSON parser শুধু JSON route গুলোতে ব্যবহার করব
// নিচে login + list + delete before handler এ লাগাব

/* Helper: JSON response safely forward */
const forwardJson = (backendRes, res) => {
  let data = "";
  backendRes.on("data", (chunk) => {
    data += chunk;
  });
  backendRes.on("end", () => {
    if (!data) {
      return res.sendStatus(backendRes.statusCode || 500);
    }
    try {
      const json = JSON.parse(data);
      res.status(backendRes.statusCode || 500).json(json);
    } catch (e) {
      res.status(backendRes.statusCode || 500).send(data);
    }
  });
};

/* ============ ADMIN LOGIN (JSON) ============ */
app.use("/api/admin/login", express.json());
app.post("/api/admin/login", (req, res) => {
  const options = {
    hostname: "209.97.161.90",
    port: 6002,
    path: "/api/v1/public/admin/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const backendReq = http.request(options, (backendRes) =>
    forwardJson(backendRes, res)
  );

  backendReq.on("error", (err) => {
    console.error("Login proxy error", err);
    res.status(500).json({ message: "Login proxy error" });
  });

  backendReq.write(JSON.stringify(req.body));
  backendReq.end();
});

/* ============ CATEGORY LIST (JSON) ============ */
app.get("/api/v1/category/magic", (req, res) => {
  const options = {
    hostname: "209.97.161.90",
    port: 6002,
    path: "/api/v1/category/magic",
    method: "GET",
    headers: {
      Authorization: req.headers.authorization || "",
    },
  };

  const backendReq = http.request(options, (backendRes) =>
    forwardJson(backendRes, res)
  );

  backendReq.on("error", (err) => {
    console.error("Category list proxy error", err);
    res.status(500).json({ message: "Category list proxy error" });
  });

  backendReq.end();
});

/* ============ CATEGORY CREATE (multipart/form-data) ============ */
app.post("/api/v1/category/create", (req, res) => {
  console.log("▶️ proxy create headers:", req.headers);

  const options = {
    hostname: "209.97.161.90",
    port: 6002,
    path: "/api/v1/category/create",
    method: "POST",
    headers: {
      ...req.headers, // Content-Type + boundary 그대로
      host: undefined,
      // origin, referer ইচ্ছা করলে বাদ দিতে পারো
    },
  };

  const backendReq = http.request(options, (backendRes) => {
    console.log(
      "⬅️ backend create status:",
      backendRes.statusCode,
      "headers:",
      backendRes.headers
    );

    let body = "";
    backendRes.on("data", (chunk) => {
      body += chunk.toString();
    });

    backendRes.on("end", () => {
      console.log("⬅️ backend create body:", body);
      res.writeHead(backendRes.statusCode || 500, backendRes.headers);
      res.end(body);
    });
  });

  backendReq.on("error", (err) => {
    console.error("❌ Category create proxy error", err);
    res.status(500).send("Category create proxy error");
  });

  req.on("error", (err) => {
    console.error("❌ Request stream error", err);
  });

  req.pipe(backendReq);
});

/* ============ CATEGORY UPDATE (multipart/form-data) ============ */
app.put("/api/v1/category/:id/magic", (req, res) => {
  const options = {
    hostname: "209.97.161.90",
    port: 6002,
    path: `/api/v1/category/${req.params.id}/magic`,
    method: "PUT",
    headers: {
      ...req.headers,
      host: undefined,
    },
  };

  const backendReq = http.request(options, (backendRes) => {
    res.writeHead(backendRes.statusCode || 500, backendRes.headers);
    backendRes.pipe(res);
  });

  backendReq.on("error", (err) => {
    console.error("Category update proxy error", err);
    res.status(500).json({ message: "Category update proxy error" });
  });

  req.pipe(backendReq);
});

/* ============ CATEGORY DELETE (JSON/empty) ============ */
app.delete("/api/v1/category/:id/magic", (req, res) => {
  const options = {
    hostname: "209.97.161.90",
    port: 6002,
    path: `/api/v1/category/${req.params.id}/magic`,
    method: "DELETE",
    headers: {
      Authorization: req.headers.authorization || "",
    },
  };

  const backendReq = http.request(options, (backendRes) =>
    forwardJson(backendRes, res)
  );

  backendReq.on("error", (err) => {
    console.error("Category delete proxy error", err);
    res.status(500).json({ message: "Category delete proxy error" });
  });

  backendReq.end();
});

/* ============ START SERVER ============ */
const PORT = 5001;
app.listen(PORT, () => {
  console.log("✅ Proxy server running on http://localhost:" + PORT);
});
