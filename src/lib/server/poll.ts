import { db } from './db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getPoll(id: string) {
	try {
		const [result] = await db.select().from(table.poll).where(eq(table.poll.id, id));
		return result;
	} catch (err) {
		console.error('Error fetching poll: ', err);
	}
}

export async function getRecentPolls(count: number = 10) {
	try {
		const [result] = await db.select().from(table.poll).orderBy(table.poll.id).limit(count);
		return result;
	} catch (err) {
		console.error('Error fetching polls: ', err)
	}
}

export async function createPoll(pollDTO: Omit<table.Poll, 'id'>) {
	try {
		const [result] = await db.insert(table.poll).values(pollDTO);
	} catch (err) {
		console.error('Error creating poll: ', err);
	}
	return true;
}

export async function updatePoll(pollDTO: table.Poll) {
	return true;
}

export async function deletePoll(id: string) {
	return true;
}
