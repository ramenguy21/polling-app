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
	onMount(() => {ipAddress = getIpAddress()
		console.log(data)
	});
</script>



{#await ipAddress}
<div class="flex justify-center align-center my-2">
	<p class="text-center">Loading Polls </p>
	<Spinner class="animate-spin mx-2"/>
</div>
{:then ipAddr}
	<Poll
		id={data?.polls?.id || ''}
		imgSrc={data?.polls?.img || ''}
		heading={data?.polls?.heading || 'no heading'}
		options={data?.polls?.options.map((opt) => {
			return { text: opt, checked: false };
		})}
		ip={ipAddr?.ip || null}
	/>
{:catch err}
	{err}
{/await}
