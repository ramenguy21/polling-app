import { getPoll, updatePoll } from "$lib/server/poll";
import { redirect, type Actions } from "@sveltejs/kit";

export async function load({ params }) {
	const pollId = params.slug;
    if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(pollId))
    {
	    const poll = await getPoll(pollId);
        return { poll };
    }
}

export const actions = {
    default : async({request, locals}) => {
        let formData: FormData;
		try {
			formData = await request.formData();
		} catch (err) {
			console.error('Error parsing create poll formdata: ', err);
			return;
		}
        const pollId = formData.get("id") as string;
        const heading = formData.get("heading") as string;
        const options = [];

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('opt')) {
                options.push(value as string);
            }
        }
        
        const result = await updatePoll({
            id: pollId, heading, options,
            img: null
        })

        redirect(302, `/${pollId}`);
    }
} satisfies Actions