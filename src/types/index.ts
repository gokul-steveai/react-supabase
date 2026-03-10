/**
 * Application Type Definitions
 * Centralized types to avoid magic strings and ensure type safety
 */

// Encryption Types
export interface EncryptionConfig {
  readonly algorithm: 'AES-GCM';
  readonly keyLength: 256;
  readonly ivLength: 12;
  readonly pbkdf2Iterations: 100000;
  readonly pbkdf2Hash: 'SHA-256';
}

// Domain Types
export interface UserStats {
  readonly totalMembers: number;
  readonly onlineMembers: number;
}

export interface ChatMessage {
  readonly id: string;
  readonly message: string;
  readonly userId: string;
  readonly channelId: string;
  readonly insertedAt: string;
  readonly users: {
    readonly username: string | null;
  } | null;
}

export interface Channel {
  readonly id: string;
  readonly slug: string;
  readonly createdBy: string;
  readonly insertedAt: string;
}

// Error Types
export interface AppError extends Error {
  readonly code?: string;
  readonly statusCode?: number;
}

// Service Interfaces
export interface IEncryptionService {
  getSharedKey(): Promise<CryptoKey>;
  encrypt(message: string, key: CryptoKey): Promise<string>;
  decrypt(encryptedMessage: string, key: CryptoKey): Promise<string>;
}

export interface IUserService {
  getUserStats(): Promise<UserStats>;
  getUserUsername(userId: string): Promise<string | null>;
}

export interface IMessageService {
  sendMessage(message: string, userId: string, channelId: string): Promise<ChatMessage>;
}
