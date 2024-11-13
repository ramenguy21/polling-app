<script lang="ts">
	import { onMount } from 'svelte';

	interface Option {
		checked?: boolean;
		text: string;
	}

	//i'm not sure if there is some local way of grabbing client ip address
	//so i'm using an external api to fetch it
	export let ip = '';
	export let id: string = '';
	export let heading = 'No heading provided';
	export let options: (Option & { voteCount?: number })[] = [];
	export let votes: any[] = [];
	export let imgSrc = '';
	//determines if the user has already voted in the poll or not.
	let canVote: boolean = true;

	// Calculate vote counts for each option
	options = options.map((opt) => {
		const count = votes.filter((vote) => vote.label === opt.text).length;
		return { ...opt, voteCount: count };
	});

	// Check if the IP address has already voted
	if(ip){
	const hasVoted = votes.some((vote) => vote.identifier === ip);
	if (hasVoted) {
		canVote = false;
	}
}

	// Calculate the total number of votes
	$:totalVotes = votes.length;

	// Implement long polling for real-time vote updates
	let poller: number | undefined;

	const setupPoller = (pollId: string) => {
		if (poller) {
			clearTimeout(poller);
			poller = undefined;
		}
		pollProgress(pollId); // Start polling immediately
	};

	const pollProgress = async (pollId: string) => {
		try {
			console.log(`Polling ${pollId}`);

			// Fetch updated votes from the API
			const response = await fetch(`/api?id=${pollId}`, {
				method: 'GET',
				headers: { Accept: 'application/json' }
			});
			if (!response.ok) {
				throw new Error('Failed to fetch vote updates');
			}

			const update: any = await response.json();

			// Update the votes array and recalculate the counts
			votes = update.votes;
			options = options.map((opt) => {
				const count = votes.filter((vote) => vote.label === opt.text).length;
				return { ...opt, voteCount: count };
			});
		} catch (error) {
			console.error('Polling error:', error);
		} finally {
			// Continue polling after a delay
			poller = setTimeout(() => pollProgress(pollId), 2000);
		}
	};

	// Initialize polling
	onMount(() => {
		if (id) setupPoller(id);
	});
</script>

<div class="m-1 bg-blue-600 p-2 text-white">
	<a class="text-xl font-bold underline" href={'/' + id}><h2>{heading}</h2></a>
	{#if !canVote}
		<p class="text-sm text-red-400 my-2">You have already voted in this poll</p>
	{/if}
	<img
		alt="poll"
		class="mb-4 max-h-48 w-full rounded object-cover shadow-md"
		src={`data:image/png;base64,${imgSrc}`}
	/>
	{#each options as opt}
		<form method="POST">
			<!--to do, disable this button -->
			<button
				disabled={!canVote}
				class="my-2 flex items-center rounded bg-cyan-500 p-2 hover:bg-cyan-700 hover:text-gray-500"
				type="submit"
				formaction="?/vote"
			>
				<!--wait, why does this work lol.-->
				<input class="hidden" name="vote" value={opt.text} />
				<p class="mx-2">{opt.text}</p>

				<input class="hidden" name="ip" value={ip} />

				<input class="hidden" name="id" value={id} />
			</button>
		</form>
		<!-- Display vote count and percentage -->
		<p class="text-sm text-gray-300">
			{opt.voteCount} votes
			{#if totalVotes > 0}
				({Math.round((opt.voteCount! / totalVotes) * 100)}%)
			{/if}
		</p>
	{/each}

	<p class="mt-4 text-sm text-white">Total Votes: {totalVotes}</p>
</div>
