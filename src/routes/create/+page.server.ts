import type { Actions } from './$types';

export const actions = {
    // this endpoint is vulnerable to abuse,
    // I should implement an ip based cooldown to avoid abuse;
    
    /* Aside 
        maybe the ip addresss could stand in for the anon vote,
        and if the anon vote is coming from the same ip address, reject it ?
    */
    	default: async (event) => {

		console.log(await event.request.json());
	}
} satisfies Actions;