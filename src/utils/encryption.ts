/**
 * Message Encryption Service
 * Single Responsibility: Handle message encryption/decryption
 * Dependency Injection: Accepts encryption key as constructor parameter
 */

import type { EncryptionConfig, IEncryptionService } from '../types';

const ENCRYPTION_CONFIG: EncryptionConfig = {
  algorithm: 'AES-GCM',
  keyLength: 256,
  ivLength: 12,
  pbkdf2Iterations: 100000,
  pbkdf2Hash: 'SHA-256'
} as const;

class EncryptionService implements IEncryptionService {
  private sharedKey: CryptoKey | null = null;
  private readonly encryptionKey: string;

  constructor(encryptionKey: string) {
    if (!encryptionKey) {
      throw new Error('Encryption key is required');
    }
    this.encryptionKey = encryptionKey;
  }

  async getSharedKey(): Promise<CryptoKey> {
    if (this.sharedKey) return this.sharedKey;

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.encryptionKey),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    this.sharedKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new Uint8Array(16),
        iterations: ENCRYPTION_CONFIG.pbkdf2Iterations,
        hash: ENCRYPTION_CONFIG.pbkdf2Hash
      },
      keyMaterial,
      { name: ENCRYPTION_CONFIG.algorithm, length: ENCRYPTION_CONFIG.keyLength },
      true,
      ['encrypt', 'decrypt']
    );

    return this.sharedKey;
  }

  async encrypt(message: string, key: CryptoKey): Promise<string> {
    const data = new TextEncoder().encode(message);
    const iv = crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.ivLength));

    const encrypted = await crypto.subtle.encrypt(
      { name: ENCRYPTION_CONFIG.algorithm, iv },
      key,
      data
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  async decrypt(encryptedMessage: string, key: CryptoKey): Promise<string> {
    try {
      const combined = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
      const iv = combined.slice(0, ENCRYPTION_CONFIG.ivLength);
      const encrypted = combined.slice(ENCRYPTION_CONFIG.ivLength);

      const decrypted = await crypto.subtle.decrypt(
        { name: ENCRYPTION_CONFIG.algorithm, iv },
        key,
        encrypted
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.warn('Decryption failed, returning original message', error);
      return encryptedMessage;
    }
  }
}

const encryptionKey = import.meta.env.VITE_MESSAGE_ENCRYPTION_KEY || '';
export const MessageEncryption: IEncryptionService = new EncryptionService(encryptionKey);
