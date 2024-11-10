import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const poll = pgTable('poll', {
    id : text('id').primaryKey(),
    
})

export const vote = pgTable('vote', {
    pollId : text('poll_id').notNull().references(() => poll.id),
    //note, userId can either be an ip address, which if exists
    //can be used to register a vote for that client, disallowing them from voting further
    userId : text('user_id').notNull().references(() => user.id),
    label : text('label').notNull(),

})

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
