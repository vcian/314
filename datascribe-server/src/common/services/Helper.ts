import crypto from 'crypto';

export function genHashToken(token_length = 10) {
    const buffer = crypto.randomBytes(token_length);
    const token = buffer.toString('hex');
    return token;
}