import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.status(200).json({
    status: 'success',
    message: 'One4Health Backend is live!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
}
