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
const deleteFlag = "FLAG{ssrf-delete-user-9921}";
activeFlags["ssrf-delete"] = deleteFlag;

const ADMIN_DELETE_KEY = "ADMIN_SECURE_TOKEN_2026_X92";

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

function sendRedirect(res: any, location: string): void {
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
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

  return "";
}

export default async function handler(req: any, res: any): Promise<void> {
  const url = new URL(req.url || "/", "http://localhost");
  const pathname = url.pathname;
  const route = getRouteFromPath(pathname);
  const method = (req.method || "GET").toUpperCase();

  // Helper to check if request is "internal" (simulated for Vercel/Local)
  const isInternal = req.headers["x-internal-request"] === "true" || 
                    req.headers["host"]?.includes("localhost") || 
                    req.headers["x-forwarded-for"] === "127.0.0.1";

  if (route === "robots" && method === "GET") {
    sendText(
      res,
      200,
      `User-agent: *\nDisallow: /admin\nDisallow: /api/internal/admin-panel\nDisallow: /api/internal/config\n`
    );
    return;
  }

  // --- INTERNAL ADMIN PANEL (Vulnerable to SSRF) ---
  if (route === "internal/admin-panel" && method === "GET") {
    if (!isInternal) {
      sendText(res, 403, "Access Denied: Administrative console is only accessible from the internal university network (localhost).", "text/plain");
      return;
    }

    sendText(
      res,
      200,
      `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h1 style="color: #721c8a; margin-top: 0;">ADT Internal Admin Console</h1>
        <p style="color: #64748b;">Welcome, System Administrator. Manage internal records below.</p>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
          <h2 style="font-size: 16px; color: #334155;">Active User Sessions</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="text-align: left; border-bottom: 1px solid #e2e8f0;">
              <th style="padding: 10px; font-size: 12px; text-transform: uppercase; color: #94a3b8;">Username</th>
              <th style="padding: 10px; font-size: 12px; text-transform: uppercase; color: #94a3b8;">Role</th>
              <th style="padding: 10px; font-size: 12px; text-transform: uppercase; color: #94a3b8;">Action</th>
            </tr>
            <tr>
              <td style="padding: 10px; font-size: 14px;">alice</td>
              <td style="padding: 10px; font-size: 14px;">Student</td>
              <td style="padding: 10px;"><a href="/api/internal/admin-panel/delete?username=alice&key=${ADMIN_DELETE_KEY}" style="color: #ef4444; text-decoration: none; font-weight: bold;">Delete</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-size: 14px;">carlos</td>
              <td style="padding: 10px; font-size: 14px;">Staff</td>
              <td style="padding: 10px;"><a href="/api/internal/admin-panel/delete?username=carlos&key=${ADMIN_DELETE_KEY}" style="color: #ef4444; text-decoration: none; font-weight: bold;">Delete</a></td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #fff7ed; border: 1px solid #ffedd5; border-radius: 6px;">
          <p style="color: #9a3412; font-size: 13px; margin: 0;">
            <strong>System Flag:</strong> ${ssrfFlag}
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 10px;">
            Hidden Admin Key: <span style="color: #e2e8f0;">${ADMIN_DELETE_KEY}</span> (Required for deletion actions)
          </p>
        </div>
      </div>
    `,
      "text/html"
    );
    return;
  }

  // --- DELETE USER ACTION (Exploited via SSRF) ---
  if (route === "internal/admin-panel/delete" && method === "GET") {
    if (!isInternal) {
      sendText(res, 403, "Access Denied: Deletion requires internal system clearance.", "text/plain");
      return;
    }

    const key = url.searchParams.get("key");
    if (key !== ADMIN_DELETE_KEY) {
      sendText(res, 403, "Access Denied: Invalid Administrative Key. Action blocked.", "text/plain");
      return;
    }

    const username = url.searchParams.get("username");
    if (username === "carlos") {
      sendText(res, 200, `Successfully deleted user 'carlos'. System Flag: ${deleteFlag}`, "text/plain");
    } else {
      sendText(res, 200, `Successfully deleted user '${username}'.`, "text/plain");
    }
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
      internal_flag: hiddenApiFlag,
    });
    return;
  }

  // --- VULNERABLE SSRF PROXY ---
  if (route === "fetch" && (method === "POST" || method === "GET")) {
    let fetchUrl = "";
    
    if (method === "POST") {
      const body = await readJsonBody(req);
      fetchUrl = body?.url;
    } else {
      fetchUrl = url.searchParams.get("url") || "";
    }

    if (!fetchUrl) {
      sendJson(res, 400, { error: "URL is required" });
      return;
    }

    try {
      // Simulation for Vercel: If the URL is localhost, we simulate the internal fetch
      if (fetchUrl.includes("localhost") || fetchUrl.includes("127.0.0.1") || fetchUrl.includes("internal")) {
        // If it's a direct browser access to the API with a localhost query, 
        // and it's not already an internal request, we might want to redirect
        // as per user's request: "it will Redicret to page with Delete api hidden key"
        if (method === "GET" && !req.headers["x-internal-request"]) {
          // This allows users to paste the fetch URL in their browser and see the "result"
          // We'll simulate this by just processing it and returning HTML if possible.
        }

        const internalUrl = new URL(fetchUrl.startsWith("http") ? fetchUrl : `http://localhost${fetchUrl.startsWith("/") ? "" : "/"}${fetchUrl}`);
        const internalPath = internalUrl.pathname + internalUrl.search;
        
        // We "recurse" into our own handler with a special internal header
        const mockReq = {
          url: internalPath,
          method: "GET",
          headers: { ...req.headers, "x-internal-request": "true" }
        };
        
        let output = "";
        let contentType = "text/plain";
        const mockRes = {
          statusCode: 200,
          setHeader: (name: string, value: string) => { 
            if (name.toLowerCase() === "content-type") contentType = value;
          },
          end: (data: string) => { output = data; }
        };
        
        await handler(mockReq, mockRes);
        
        // If the output is HTML, we should send it as HTML so it renders in the browser/Repeater
        sendText(res, 200, output, contentType);
        return;
      }

      const response = await fetch(fetchUrl);
      const data = await response.text();
      const contentType = response.headers.get("Content-Type") || "text/plain";
      sendText(res, 200, data, contentType);
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
