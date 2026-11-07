import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";
import { isAdminRequest } from "./shared-auth.mjs";
const store = getStore("profile-os-media");
export default async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET") {
    const key = url.searchParams.get("key");
    if (!key || !/^[a-zA-Z0-9._-]{1,120}$/.test(key)) return new Response("Not found", { status: 404 });
    const obj = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!obj) return new Response("Not found", { status: 404 });
    return new Response(obj.data, { headers: { "content-type": obj.metadata?.contentType || "application/octet-stream", "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" } });
  }
  if (request.method !== "POST" && request.method !== "DELETE") return new Response("Method not allowed", { status: 405 });
  if (!sameOrigin(request)) return new Response("Forbidden", { status: 403 });
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (request.method === "DELETE") {
    const key = url.searchParams.get("key");
    if (!key) return Response.json({ error: "Missing key" }, { status: 400 });
    await store.delete(key); return Response.json({ ok: true });
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 5_500_000) return Response.json({ error: "File too large. Keep shared uploads under 4 MB." }, { status: 413 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid upload" }, { status: 400 }); }
  if (!body.name || !body.type || !body.data || !/^[a-zA-Z0-9._-]{1,100}$/.test(body.name)) return Response.json({ error: "Invalid file details" }, { status: 400 });
  const allowed = /^(image\/(png|jpeg|webp|svg\+xml)|audio\/(mpeg|mp4|ogg|wav|webm)|video\/(mp4|webm))$/;
  if (!allowed.test(body.type)) return Response.json({ error: "Unsupported media type" }, { status: 415 });
  const bytes = Buffer.from(body.data, "base64");
  if (bytes.length > 4 * 1024 * 1024) return Response.json({ error: "Shared media limit is 4 MB per file." }, { status: 413 });
  const key = `${crypto.randomUUID()}-${body.name}`;
  await store.set(key, bytes, { metadata: { contentType: body.type } });
  return Response.json({ key, url: `/.netlify/functions/profile-media?key=${encodeURIComponent(key)}` });
};
function cryptoRandom(){ return Math.random().toString(36).slice(2,12); }
