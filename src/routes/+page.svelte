<script lang="ts">
	import { onMount } from 'svelte';
	import Poll from '../components/poll.svelte';
	import type { PageServerData } from './$types';
	import Spinner from '../components/icons/spinner.svelte';

	export let data: PageServerData | null;

	async function getIpAddress() {
		const response = await fetch('https://api.ipify.org?format=json');
		return await response.json();
	}

	let ipAddress: Promise<any>;
	onMount(() => {
		ipAddress = getIpAddress();
		console.log(data);
	});
</script>

{#await ipAddress}
	<div class="align-center my-2 flex flex-col justify-center">
		<Spinner class="m-auto animate-spin" />
		<p class="text-center">Loading Polls</p>
	</div>
{:then ipAddr}
	{#each data?.polls! as poll}
		<Poll
			id={poll?.id || ''}
			imgSrc={poll?.img || ''}
			heading={poll?.heading || 'no heading'}
			options={poll?.options.map((opt) => {
				return { text: opt, checked: false };
			})}
			ip={ipAddr?.ip || null}
			votes={[]}
		/>
	{/each}
{:catch err}
	{err}
{/await}
