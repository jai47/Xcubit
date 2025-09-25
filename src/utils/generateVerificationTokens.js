import crypto from 'crypto';

// Function to generate a secure random verification token
export function generateVerificationTokens() {
    return crypto.randomBytes(32).toString('hex'); // 64-character hex string
}
