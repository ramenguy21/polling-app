import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getRecentPolls } from '$lib/server/poll';
import { castVote } from '$lib/server/vote';

export const load: PageServerLoad = async () => {
	const polls = await getRecentPolls(10);

	return { polls };
};

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
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/login');
	}
} satisfies Actions;
