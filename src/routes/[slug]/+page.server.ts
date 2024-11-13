import { getPoll } from '$lib/server/poll.js';
import { castVote, getPollVotes } from '$lib/server/vote.js';
import type { Actions } from '@sveltejs/kit';

export async function load({ params }) {
	const pollId = params.slug;

	const poll = await getPoll(pollId);
	const votes = await getPollVotes(pollId);

	const response = await fetch('https://api.ipify.org?format=json');
	const parsedIp = await response.json();
	const ip = parsedIp.ip;


	return { poll, votes, ip };
}

export const actions = {
	// this endpoint is vulnerable to abuse,
	// I should implement an ip based cooldown to avoid abuse;

	/* Aside 
        maybe the ip addresss could stand in for the anon vote,
        and if the anon vote is coming from the same ip address, reject it ?
    */
	vote: async (event) => {
		const formData = await event.request.formData();
		await castVote(
			'0',
			formData.get('id') as string,
			formData.get('vote') as string,
			formData.get('ip') as string
		);
	}
} satisfies Actions;
