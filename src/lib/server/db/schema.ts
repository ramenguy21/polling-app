import {
	pgTable,
	text,
	timestamp,
	pgEnum,
	uuid
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { primaryKey } from 'drizzle-orm/mysql-core';

export const user = pgTable('user', {
	id: uuid('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const poll = pgTable('poll', {
	id: uuid('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
	heading: text('heading'),
	img: text('img'),
	options: text('options')
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`)
});

export const identifierEnum = pgEnum('identifier', ['ip', 'user']);

export const vote = pgTable(
	'vote',
	{
		pollId: uuid('poll_id')
			.notNull()
			.references(() => poll.id, {onDelete : 'cascade'}),
		//note, userId can be an ip address, which if exists <--- scrapping this
		//can be used to register a vote for that client, disallowing them from voting further
		//userId = 0 is a special directive used to register an anon user.
		//identifier is an enum :-
		/*
		- ip
		- user
		- other unique identifiers we can find, (this is a bad alternative, good approach is to use a cookie id.)
		*/
		type: identifierEnum('identifier_type'),
		identifier: text('identifier'), //<-- signifier
		label: text('label').notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.pollId, table.identifier] })
		};
	}
);

export type Session = typeof session.$inferSelect;
export type Poll = typeof poll.$inferSelect;
export type Vote = typeof vote.$inferSelect;
export type User = typeof user.$inferSelect;
