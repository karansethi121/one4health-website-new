import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearAdminSession } from '../_lib/adminAuth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  clearAdminSession(res);
  res.status(200).json({ ok: true });
}
