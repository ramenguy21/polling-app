import { getPollVotes } from '$lib/server/vote';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const pollId = url.searchParams.get('id');
	if (!pollId) {
		return new Response('poll id not provided');
	}
	const votes = await getPollVotes(pollId);

	return json({ votes });
}
