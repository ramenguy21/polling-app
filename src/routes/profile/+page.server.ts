import { getUserPolls } from "$lib/server/poll";
import type { PageServerLoad } from "../$types";

export const load : PageServerLoad =async({locals}) => {
    const userId = locals.user?.id;
    console.log(userId)
    if(userId){
        const polls = await getUserPolls(userId)
        return {polls};
    }
}