import { randomBytes, timingSafeEqual } from "node:crypto";

export const LOCAL_ORIGIN = "http://127.0.0.1:43129";
export const SESSION_HEADER = "x-clip-farm-session";
export function newSessionToken() {
  return randomBytes(32).toString("base64url");
}
export function validSession(candidate, secret) {
  if (typeof candidate !== "string" || typeof secret !== "string") return false;
  const a = Buffer.from(candidate, "utf8");
  const b = Buffer.from(secret, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
export function allowedLocalRequest({ pathname, method, host, origin, token }, secret) {
  if (host !== "127.0.0.1:43129") return false;
  if (pathname === "/api/youtube/callback" && method === "GET") return true;
  if (pathname === "/" && method === "GET") return true;
  if (!pathname.startsWith("/api/") || method !== "POST") return false;
  return origin === LOCAL_ORIGIN && validSession(token, secret);
}
