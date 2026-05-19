import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAuthorizedRequest } from '../_lib/adminAuth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!isAuthorizedRequest(req)) {
    res.status(401).json({ authenticated: false });
    return;
  }

  res.status(200).json({ authenticated: true });
}
