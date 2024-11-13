import { env } from '$env/dynamic/private';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

//keep track: https://x.com/hnasr/status/1856745402399359315?t=ttvjRLd6vdDbGJgAE2_PhA&s=33;

const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
