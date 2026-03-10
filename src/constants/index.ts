export const ROUTES = {
  HOME: '/',
  CHAT: '/chat'
} as const;

export const MESSAGES = {
  ERROR_GENERIC: 'An error occurred',
  ERROR_PASSWORD_MISMATCH: 'Passwords do not match',
  ERROR_PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters'
} as const;
