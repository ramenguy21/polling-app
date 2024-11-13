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
		const result = await db.select().from(table.poll).orderBy(table.poll.id).limit(count);
		return result;
	} catch (err) {
		console.error('Error fetching polls: ', err);
	}
}

export async function getUserPolls(userId: string) {
	try {
		const result = await db.select().from(table.poll).where(eq(table.poll.userId, userId));
		return result;
	} catch (err) {
		console.error(`Error fetching polls for user ${userId}`, err);
	}
}

export async function createPoll(pollDTO: Omit<table.Poll, 'id'>) {
	try {
		const [result] = await db.insert(table.poll).values(pollDTO);
	} catch (err) {
		console.error('Error creating poll: ', err);
		return false;
	}
	return true;
}

export async function updatePoll(pollDTO: Omit<table.Poll, 'userId'>) {
	try {
		const result = await db
			.update(table.poll)
			.set({ heading: pollDTO.heading, options: pollDTO.options, img: pollDTO.img })
			.where(eq(table.poll.id, pollDTO.id));
	} catch (err) {
		console.error('Error updating poll: ', err);
		return false
	}
	return true;
}

export async function deletePoll(id: string) {
	try {
		const result = await db.delete(table.poll).where(eq(table.poll.id, id));
		if (result.count) {
			return true;
		} else return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}
