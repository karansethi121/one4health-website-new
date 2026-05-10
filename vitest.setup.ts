import '@testing-library/jest-dom';
import { beforeAll, afterEach } from 'vitest';

// Add any global mocks or setup here
beforeAll(() => {
    // Mock window.scrollTo if needed
    if (typeof window !== 'undefined') {
        window.scrollTo = () => { };
    }
});

afterEach(() => {
    // Clear any state between tests
});
