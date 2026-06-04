import { useState } from 'react';
export function useWaitlist() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinWaitlist = async (email: string, source?: string) => {
    try {
      setSubmitting(true);
      setError(null);

      // 1. Send waitlist request to backend API route
      const response = await fetch('/api/waitlist/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return { joinWaitlist, submitting, success, error };
}
