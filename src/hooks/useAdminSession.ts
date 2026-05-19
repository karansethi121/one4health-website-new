import { useCallback, useEffect, useState } from 'react';

type AdminStatus = 'loading' | 'authenticated' | 'unauthenticated';

async function parseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function useAdminSession() {
  const [status, setStatus] = useState<AdminStatus>('loading');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/me', {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      });

      setStatus(response.ok ? 'authenticated' : 'unauthenticated');
    } catch {
      setStatus('unauthenticated');
      setError('Admin session check is unavailable right now.');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = async (password: string) => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const payload = await parseJson(response);

      if (!response.ok) {
        setStatus('unauthenticated');
        setError(payload?.error || 'Unable to sign in.');
        return false;
      }

      setStatus('authenticated');
      return true;
    } catch {
      setStatus('unauthenticated');
      setError('Admin login is unavailable right now.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    setSubmitting(true);
    setError(null);

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      });
    } finally {
      setStatus('unauthenticated');
      setSubmitting(false);
    }
  };

  return {
    authenticated: status === 'authenticated',
    checking: status === 'loading',
    submitting,
    error,
    login,
    logout,
    refresh,
  };
}
