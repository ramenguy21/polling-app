import { db } from './db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getPoll(id: string) {
	try {
		const [result] = await db.select().from(table.poll).where(eq(table.poll.id, id));
		return result;
	} catch (err) {
		console.error('Error fetching data: ', err);
	}
}

export async function getRecentPolls() {
	return [];
}

export async function createPoll(pollDTO: table.Poll) {
	return {};
}

export async function updatePoll(pollDTO: table.Poll) {
	return true;
}

export async function deletePoll(id: string) {
	return true;
}
