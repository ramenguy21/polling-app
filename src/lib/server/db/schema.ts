import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const poll = pgTable('poll', {
	id: text('id').primaryKey(),
	heading: text('heading'),
	img: text('img'),
	options: text('options')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`)
});

export const vote = pgTable('vote', {
	pollId: text('poll_id')
		.notNull()
		.references(() => poll.id),
	//note, userId can be an ip address, which if exists <--- scrapping this
	//can be used to register a vote for that client, disallowing them from voting further
	//userId = 0 is a special directive used to register an anon user.
	userId: text('user_id') //<-- signifier
		.notNull()
		.references(() => user.id),
	ipAddress: text('ip_address'), //<-- signifier
	label: text('label').notNull()
});

export type Session = typeof session.$inferSelect;
export type Poll = typeof poll.$inferSelect;
export type Vote = typeof vote.$inferSelect;
export type User = typeof user.$inferSelect;
