import { env } from '$env/dynamic/private';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

// if the database refuses to push, revert back the changes to this file
// this is probably not compatible with the docker compose postgres perhaps, will
// have to test.
