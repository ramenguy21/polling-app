import { db } from './db';
import * as tables from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function castVote(
	userId: string = '0',
	pollId: string,
	option: string,
	identifier: string
) {
	//to do : create a constraint where pollId and userId combination must be unique
	// this ensures that there is only one vote for each user.
	try {
		await db.insert(tables.vote).values({ pollId, userId, identifier, label: option });
	} catch (err) {
		// throwing an error here because vote casting
		// should never fail.
		throw new Error(`Error casting vote: ${err}`);
	}
}

export async function getPollVotes(pollId: string) {
	try {
		const result = await db.select().from(tables.vote).where(eq(tables.vote.pollId, pollId));
		return result;
	} catch (err) {
		console.error(`Error fetching votes for ${pollId}: `, err);
	}
}
