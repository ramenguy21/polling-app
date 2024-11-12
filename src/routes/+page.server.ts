import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getPoll } from '$lib/server/poll';
import { castVote } from '$lib/server/vote';

export const load: PageServerLoad = async ({ locals }) => {
	const poll = await getPoll('8b3fd6dd-4158-4a4a-94e0-26c1cf03f558');

	if (!locals.user) {
		return { user: null, poll };
	}
	return { user: locals.user, poll };
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
