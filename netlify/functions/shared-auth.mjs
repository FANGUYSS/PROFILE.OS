import crypto from "node:crypto";

export async function isAdminRequest(request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const raw = (request.headers.get("cookie") || "").split(";").map(v=>v.trim()).find(v=>v.startsWith("profile_admin="))?.slice("profile_admin=".length);
  if (!raw) return false;
  const [expires, signature] = raw.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = crypto.createHmac("sha256", secret).update(expires).digest("hex");
  const a = Buffer.from(signature), b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a,b);
}
export function signSession(expires) {
  return crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(String(expires)).digest("hex");
}
