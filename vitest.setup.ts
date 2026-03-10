import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Add any global mocks or setup here
beforeAll(() => {
    // Mock window.scrollTo if needed
    window.scrollTo = () => { };
});

afterEach(() => {
    // Clear any state between tests
});
