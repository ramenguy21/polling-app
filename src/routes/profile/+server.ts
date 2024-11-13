import { deletePoll } from "$lib/server/poll";
import { json } from "@sveltejs/kit";

export async function DELETE(request) {
    const pollId = request.url.searchParams.get("id") || "";
    const result = await deletePoll(pollId);
    return json({result})
}