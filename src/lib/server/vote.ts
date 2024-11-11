import { db } from './db';
import * as tables from '$lib/server/db/schema';

export async function castVote(userId: string, pollId: string, option: string, ipAddress: string) {
	//to do : create a constraint where pollId and userId combination must be unique
	// this ensures that there is only one vote for each user.
	try {
		await db
			.insert(tables.vote)
			.values({ pollId, userId: userId || '0', label: option, ipAddress });
	} catch (err) {
		console.error('Error casting vote: ', err);
	}
}

export async function getPollVotes(pollId: string) {}
