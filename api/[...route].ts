import crypto from "crypto";

type ActiveFlags = Record<string, string>;

const activeFlags: ActiveFlags = {};

function generateFlag(id: string, type: string = "lab"): string {
  const hash = crypto
    .createHash("md5")
    .update(id + Date.now().toString())
    .digest("hex")
    .slice(0, 16);

  const flag = `FLAG{${type}-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}}`;
  activeFlags[id] = flag;
  return flag;
}

const ssrfFlag = generateFlag("ssrf", "ssrf");
const robotsFlag = "FLAG{info-robots-2026-flag}";
activeFlags["robots"] = robotsFlag;
const hiddenApiFlag = generateFlag("hidden-api", "api");
const deleteFlag = "FLAG{student-delete-access-granted-2026}";
activeFlags["student-delete"] = deleteFlag;

function sendJson(res: any, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function sendText(res: any, status: number, text: string, contentType: string = "text/plain"): void {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.end(text);
}

async function readJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function getRouteFromPath(pathname: string): string {
  if (pathname === "/robots.txt") {
    return "robots";
  }

  if (pathname.startsWith("/api/")) {
    return pathname.slice(5);
  }

  if (pathname === "/api/admin-console") {
    return "admin-console";
  }

  if (pathname === "/api/admin-backup") {
    return "admin-backup";
  }

  return "";
}

export default async function handler(req: any, res: any): Promise<void> {
  const url = new URL(req.url || "/", "http://localhost");
  const pathname = url.pathname;
  const route = getRouteFromPath(pathname);
  const method = (req.method || "GET").toUpperCase();

  if ((route === "robots" || route === "admin-backup") && method === "GET") {
    sendText(
      res,
      200,
      `User-agent: *\nDisallow: /admin\nDisallow: /api/admin-console\nDisallow: /api/internal/config\n`
    );
    return;
  }

  if (route === "admin-console" && method === "GET") {
    sendText(
      res,
      200,
      `
      <div style="font-family: sans-serif; padding: 20px; border: 2px solid #721c8a; background: #fff;">
        <h1 style="color: #721c8a;">ADT University - Internal Admin Panel</h1>
        <p>Welcome, Administrator.</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 5px solid #f39200; margin-top: 20px;">
          <strong>SYSTEM STATUS:</strong> ALL SYSTEMS OPERATIONAL<br>
          <strong>DATABASE:</strong> CONNECTED<br>
          <strong>INTERNAL_FLAG:</strong> <span style="color: #ed1c24; font-weight: bold;">${ssrfFlag}</span>
        </div>
      </div>
    `,
      "text/html"
    );
    return;
  }

  if (route === "status" && method === "GET") {
    sendJson(res, 200, { status: "online", system: "ADT-University-Admin-v1.0.4" });
    return;
  }

  if (route === "internal/config" && method === "GET") {
    sendJson(res, 200, {
      version: "1.0.4-internal",
      db_host: "db.adt-university.internal",
      db_user: "admin_root",
      db_pass: "P@ssw0rd123_ADT",
      api_key: "sk_live_51Mz...[REDACTED]",
      internal_flag: hiddenApiFlag,
      note: "Do not expose this endpoint to public internet."
    });
    return;
  }

  if (route === "fetch" && method === "POST") {
    const body = await readJsonBody(req);
    const fetchUrl = body?.url;

    if (!fetchUrl) {
      sendJson(res, 400, { error: "URL is required" });
      return;
    }

    try {
      const response = await fetch(fetchUrl);
      const data = await response.text();
      sendText(res, 200, data, "text/plain");
    } catch (error: any) {
      sendJson(res, 500, { error: "Failed to fetch URL", details: error?.message || "Unknown error" });
    }
    return;
  }

  if (route === "submit-flag" && method === "POST") {
    const body = await readJsonBody(req);
    const flag = body?.flag;

    if (!flag) {
      sendJson(res, 400, { error: "Flag is required" });
      return;
    }

    const matchedEntry = Object.entries(activeFlags).find(([, expectedFlag]) => expectedFlag === flag);

    if (matchedEntry) {
      const [vulnerability] = matchedEntry;
      sendJson(res, 200, { success: true, vulnerability, message: `Correct! You solved the ${vulnerability} challenge.` });
      return;
    }

    sendJson(res, 400, { success: false, message: "Incorrect flag. Try again." });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}
