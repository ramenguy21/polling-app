<script lang="ts">
	import Poll from "../../components/poll.svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData | null;
</script>



{#if data?.poll}
<a href="/" class="bg-green-500 p-2 rounded text-white">Home</a>
<h1>Poll</h1>
<Poll
		id={data?.poll?.id || ''}
		imgSrc={data?.poll?.img || ''}
		heading={data?.poll?.heading || 'no heading'}
		options={data?.poll?.options.map((opt) => {
			return { text: opt, checked: false };
		})}
		ip={""}
        votes={data?.votes}
	/>
    {:else}
        poll not found
    {/if}