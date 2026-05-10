import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

const SESSION_COOKIE = 'o4h_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

type SessionPayload = {
  role: 'admin';
  exp: number;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodePayload(value: string) {
  const raw = Buffer.from(value, 'base64url').toString('utf8');
  return JSON.parse(raw) as SessionPayload;
}

function signValue(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  if (first.length !== second.length) return false;
  return crypto.timingSafeEqual(first, second);
}

function createSessionToken() {
  const secret = getRequiredEnv('ADMIN_SESSION_SECRET');
  const payload: SessionPayload = {
    role: 'admin',
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = encodePayload(payload);
  const signature = signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

function parseCookies(req: VercelRequest) {
  const header = req.headers.cookie;
  if (!header) return {};

  return Object.fromEntries(
    header.split(';').map((part) => {
      const [name, ...rest] = part.trim().split('=');
      return [name, decodeURIComponent(rest.join('='))];
    }),
  );
}

export function isAuthorizedRequest(req: VercelRequest) {
  try {
    const secret = getRequiredEnv('ADMIN_SESSION_SECRET');
    const token = parseCookies(req)[SESSION_COOKIE];
    if (!token) return false;

    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return false;

    const expectedSignature = signValue(encodedPayload, secret);
    if (!safeEqual(signature, expectedSignature)) return false;

    const payload = decodePayload(encodedPayload);
    return payload.role === 'admin' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

function buildCookie(value: string, expiresAt: number, maxAgeSeconds: number) {
  const expires = new Date(expiresAt).toUTCString();
  const parts = [
    `${SESSION_COOKIE}=${encodeURIComponent(value)}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Expires=${expires}`,
    `Max-Age=${maxAgeSeconds}`,
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  return parts.join('; ');
}

export function setAdminSession(res: VercelResponse) {
  const token = createSessionToken();
  res.setHeader('Set-Cookie', buildCookie(token, Date.now() + SESSION_TTL_MS, SESSION_TTL_MS / 1000));
}

export function clearAdminSession(res: VercelResponse) {
  res.setHeader('Set-Cookie', buildCookie('', 0, 0));
}

export function getAdminPassword() {
  return getRequiredEnv('ADMIN_PASSWORD');
}
