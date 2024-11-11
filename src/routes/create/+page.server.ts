import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}
	return { user: locals.user };
};

async function imageUrlToBase64(url: string) {
	// Fetch the image data from the URL
	const response = await fetch(url);
	// Convert the response to a buffer
	const buffer = await response.arrayBuffer();

	// Convert the buffer to a base64 string
	const base64String = Buffer.from(buffer).toString('base64');
	return base64String;
}

export const actions = {
	default: async (event) => {
		let formData: FormData;
		try {
			formData = await event.request.formData();
		} catch (err) {
			console.error('Error parsing create poll formdata: ', err);
			return;
		}

		const tinifyHeaders = new Headers();
		tinifyHeaders.set('Content-Type', 'image/png');
		tinifyHeaders.set(
			'Authorization',
			'Basic YXBpOkdEWjRDWHpRV3lrTEpSVnJ4VldqTnAwdDBURzFTR3lR'
			//Buffer.from('api:GDZ4CXzQWykLJRVrxVWjNp0t0TG1SGyQ')
		); //process.env.TINY_IMAGE_API_KEY

		try {
			//should probably do some content aware cropping to fit as well.
			const res = await fetch('https://api.tinify.com/shrink', {
				method: 'POST',
				headers: tinifyHeaders,
				body: formData.get('img')
			});
			const img_url = (await res.json()).output.url;

			//process the tinyImg response
			const encodedImg = await imageUrlToBase64(img_url);
			//todo : move this to another try-catch block
			const options = [];

			for (const [key, value] of formData.entries()) {
				if (key.startsWith('opt')) {
					options.push(value);
				}
			}

			await db.insert(table.poll).values({
				id: '23',
				heading: formData.get('heading'),
				img: encodedImg,
				options
			});
		} catch (err) {
			console.error('Error compressing image: ', err);
		}
	}
} satisfies Actions;
