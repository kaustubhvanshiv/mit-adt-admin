import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // Store active flags for validation
  const activeFlags: Record<string, string> = {};

  // Helper to generate dynamic flags
  const generateFlag = (id: string, type: string = 'lab') => {
    const hash = crypto.createHash('md5').update(id + Date.now().toString()).digest('hex').slice(0, 16);
    const flag = `FLAG{${type}-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}}`;
    activeFlags[id] = flag;
    return flag;
  };

  // Pre-generate flags for the session
  const ssrfFlag = generateFlag('ssrf', 'ssrf');
  const robotsFlag = generateFlag('robots', 'info');
  const hiddenApiFlag = generateFlag('hidden-api', 'api');

  // --- VULNERABLE ENDPOINTS ---

  /**
   * robots.txt Exposure
   * Reveals hidden paths to the user
   */
  app.get("/robots.txt", (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Disallow: /admin
Disallow: /admin-backup
Disallow: /api/internal/config
# Hint: Flag for robots discovery -> ${robotsFlag}
`);
  });

  /**
   * SSRF Vulnerability
   * Endpoint: POST /api/fetch
   */
  app.post("/api/fetch", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      console.log(`[SSRF Lab] Fetching URL: ${url}`);
      const response = await fetch(url);
      const data = await response.text();
      res.send(data);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch URL", details: error.message });
    }
  });

  /**
   * Hidden API Endpoint (No Auth)
   * Discovered via robots.txt
   */
  app.get("/api/internal/config", (req, res) => {
    res.json({
      version: "1.0.4-internal",
      db_host: "db.adt-university.internal",
      db_user: "admin_root",
      db_pass: "P@ssw0rd123_ADT",
      api_key: "sk_live_51Mz...[REDACTED]",
      internal_flag: hiddenApiFlag,
      note: "Do not expose this endpoint to public internet."
    });
  });

  /**
   * Internal Admin Endpoint (SSRF Target)
   */
  app.get("/admin", (req, res) => {
    res.send(`
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid #721c8a; background: #fff;">
        <h1 style="color: #721c8a;">ADT University - Internal Admin Panel</h1>
        <p>Welcome, Administrator.</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 5px solid #f39200; margin-top: 20px;">
          <strong>SYSTEM STATUS:</strong> ALL SYSTEMS OPERATIONAL<br>
          <strong>DATABASE:</strong> CONNECTED<br>
          <strong>INTERNAL_FLAG:</strong> <span style="color: #ed1c24; font-weight: bold;">${ssrfFlag}</span>
        </div>
      </div>
    `);
  });

  /**
   * Flag Submission System
   */
  app.post("/api/submit-flag", (req, res) => {
    const { vulnerability, flag } = req.body;

    if (!vulnerability || !flag) {
      return res.status(400).json({ error: "Vulnerability type and flag are required" });
    }

    const expectedFlag = activeFlags[vulnerability];

    if (flag === expectedFlag) {
      return res.json({ success: true, message: `Correct! You solved the ${vulnerability} challenge.` });
    } else {
      return res.status(400).json({ success: false, message: "Incorrect flag. Try again." });
    }
  });

  app.get("/api/status", (req, res) => {
    res.json({ status: "online", system: "ADT-University-Admin-v1.0.4" });
  });

  // --- VITE MIDDLEWARE (Development Only) ---

  if (process.env.NODE_ENV !== "production") {
    // Only import Vite in development mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ADT University] Server running on http://localhost:${PORT}`);
  });
}

startServer();
