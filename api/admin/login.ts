import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { getAdminPassword, setAdminSession } from '../_lib/adminAuth';

function safeEqual(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  if (first.length !== second.length) return false;
  return crypto.timingSafeEqual(first, second);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    const expectedPassword = getAdminPassword();

    if (!password || !safeEqual(password, expectedPassword)) {
      res.status(401).json({ error: 'Invalid administrator password' });
      return;
    }

    setAdminSession(res);
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Admin authentication is not configured.' });
  }
}
