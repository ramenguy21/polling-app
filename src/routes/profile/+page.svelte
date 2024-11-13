<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageServerData } from "../$types";

    export let data : PageServerData;
</script>

<div>
    <h1 class="text-xl my-2">Your polls</h1>

    {#each data.polls! as poll}
        <div class="bg-blue-600 text-white p-2 rounded my-2">
            <div class="flex justify-between">
            <h2 class="underline text-lg my-3">{poll.heading}</h2>
            <div class="flex flex-col space-y-2">
                <button class="bg-cyan-500 text-white p-1 rounded" onclick={() => goto(`/edit/${poll.id}`)}>Edit</button>
                <button class="bg-red-500 text-white p-1 rounded" onclick={async() => {
                    await fetch(`/profile?id=${poll.id}`, {method : "DELETE"})
                }}>Delete</button>
            </div>
        </div>
            <img src={poll.img} alt="no poll display"/>
            <ul>
                {#each poll.options as opt}
                    <li class="text-sm py-1">{opt}</li>
                {/each}
            </ul>
        </div>
    {/each}
</div>