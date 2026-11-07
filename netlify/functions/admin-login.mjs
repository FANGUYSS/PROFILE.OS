import crypto from "node:crypto";
import { signSession } from "./shared-auth.mjs";

const sameOrigin = (request) => { const origin=request.headers.get("origin"); if(!origin)return true; try{return new URL(origin).host===new URL(request.url).host;}catch{return false;} };
export default async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403 });
  const hashSetting = process.env.ADMIN_PASSWORD_HASH || "";
  if (!hashSetting.includes(":") || !process.env.ADMIN_SESSION_SECRET) {
    return Response.json({ error: "Admin authentication is not configured. Set ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET." }, { status: 503 });
  }
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  const [salt, expectedHex] = hashSetting.split(":");
  const actual = crypto.scryptSync(String(body.password || ""), salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    return Response.json({ error: "Incorrect admin password" }, { status: 401 });
  }
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  const signature = signSession(expires);
  return Response.json({ ok: true }, {
    headers: { "set-cookie": `profile_admin=${expires}.${signature}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`, "cache-control": "no-store" }
  });
};
