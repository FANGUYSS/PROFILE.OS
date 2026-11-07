export default async () => new Response(null, {
  status: 204,
  headers: { "set-cookie": "profile_admin=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0" }
});
