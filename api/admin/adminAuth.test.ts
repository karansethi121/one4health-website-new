// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import loginHandler from './login';
import logoutHandler from './logout';
import meHandler from './me';

type MockResponse = VercelResponse & {
  statusCode?: number;
  headers: Record<string, string | string[]>;
  body?: unknown;
};

function createResponse() {
  const response = {
    headers: {},
    setHeader: vi.fn((key: string, value: string | string[]) => {
      response.headers[key] = value;
      return response;
    }),
    status: vi.fn((statusCode: number) => {
      response.statusCode = statusCode;
      return response;
    }),
    json: vi.fn((body: unknown) => {
      response.body = body;
      return response;
    }),
  } as unknown as MockResponse;

  return response;
}

function createRequest(options: Partial<VercelRequest>) {
  return {
    method: 'GET',
    headers: {},
    body: {},
    ...options,
  } as VercelRequest;
}

describe('admin auth API', () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = 'correct-password';
    process.env.ADMIN_SESSION_SECRET = 'test-session-secret';
  });

  it('rejects invalid admin passwords', () => {
    const req = createRequest({
      method: 'POST',
      body: { password: 'wrong-password' },
    });
    const res = createResponse();

    loginHandler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid administrator password' });
    expect(res.headers['Set-Cookie']).toBeUndefined();
  });

  it('sets a signed session cookie for valid admin passwords', () => {
    const req = createRequest({
      method: 'POST',
      body: { password: 'correct-password' },
    });
    const res = createResponse();

    loginHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(String(res.headers['Set-Cookie'])).toContain('o4h_admin_session=');
    expect(String(res.headers['Set-Cookie'])).toContain('HttpOnly');
  });

  it('reports authenticated status when the signed session cookie is present', () => {
    const loginReq = createRequest({
      method: 'POST',
      body: { password: 'correct-password' },
    });
    const loginRes = createResponse();
    loginHandler(loginReq, loginRes);

    const cookie = String(loginRes.headers['Set-Cookie']).split(';')[0];
    const meReq = createRequest({
      method: 'GET',
      headers: { cookie },
    });
    const meRes = createResponse();

    meHandler(meReq, meRes);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body).toEqual({ authenticated: true });
  });

  it('clears admin session cookies on logout', () => {
    const req = createRequest({ method: 'POST' });
    const res = createResponse();

    logoutHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(String(res.headers['Set-Cookie'])).toContain('o4h_admin_session=');
    expect(String(res.headers['Set-Cookie'])).toContain('Max-Age=0');
  });
});
