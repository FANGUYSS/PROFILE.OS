import { getStore } from "@netlify/blobs";
import { isAdminRequest } from "./shared-auth.mjs";

const sameOrigin = (request) => { const origin=request.headers.get("origin"); if(!origin)return true; try{return new URL(origin).host===new URL(request.url).host;}catch{return false;} };
const store = getStore("profile-os-global");
const defaults = {
  dark: true, brightness: 85, volume: 65,
  lockWallpaper: "nocturne", homeWallpaper: "aurora",
  customIcons: {}, customApps: [], customSongs: [],
  lockMedia: null, homeMedia: null, bootMedia: null,
  updatedAt: null
};

export default async (request) => {
  if (request.method === "GET") {
    const config = await store.get("config", { type: "json" });
    return Response.json({ ...defaults, ...(config || {}) }, {
      headers: { "cache-control": "no-store" }
    });
  }
  if (request.method !== "PUT") return new Response("Method not allowed", { status: 405 });
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403 });
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  let incoming;
  try { incoming = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const allowed = ["dark","brightness","volume","lockWallpaper","homeWallpaper","customIcons","customApps","customSongs","lockMedia","homeMedia","bootMedia"];
  const current = { ...defaults, ...(await store.get("config", { type: "json" }) || {}) };
  for (const key of allowed) if (key in incoming) current[key] = incoming[key];
  current.updatedAt = new Date().toISOString();
  await store.setJSON("config", current);
  return Response.json({ ok: true, updatedAt: current.updatedAt });
};
