<script lang="ts">
	import { onMount } from 'svelte';
	import Poll from '../components/poll.svelte';
	import { goto } from '$app/navigation';
	async function getIpAddress() {
		const data = await fetch('https://api.ipify.org?format=json');
		return await data.json();
	}
	function handleCreate() {
		goto(`/create`, {replaceState : true})
	}
	let ipAddress: Promise<any>;
	onMount(() => ipAddress = getIpAddress())
	 
</script>

<h1>Polling App.</h1>
<p>This is a polling app for the ConnectHear dev assignment.</p>
<button on:click={handleCreate} class="bg-blue-500 text-white p-2 rounded float-right hover:bg-blue-300 hover:text-gray-700">Create a poll</button>

{#await ipAddress}
<p class="animate-spin">Loading Poll ...</p>
{:then ipAddr}
<Poll
	heading="Test Poll"
	options={[
		{ text: 'option 1', checked: false },
		{ text: 'option 2', checked: true }
	]}
	ip={ipAddr.ip}
/>
{:catch err}
{err}
{/await}

