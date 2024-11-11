<script lang="ts">
	import { onMount } from 'svelte';
	import Poll from '../components/poll.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	export let data: PageServerData | null;

	async function getIpAddress() {
		const response = await fetch('https://api.ipify.org?format=json');
		return await response.json();
	}
	function handleCreate() {
		goto(`/create`, { replaceState: true });
	}
	let ipAddress: Promise<any>;
	onMount(() => (ipAddress = getIpAddress()));
</script>

<div class="flex justify-between">
	<h1 class="text-2xl">Polling App.</h1>

	{#if data?.user}
		<h1>Hi, {data.user.username || null}</h1>
		<p>Your user ID is {data?.user.id}.</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="rounded bg-red-500 p-2 text-white">Sign out</button>
		</form>
	{:else}
		<button class="rounded bg-cyan-500 p-2 text-white" on:click={() => goto('/login')}>Login</button
		>
	{/if}
</div>

<p>This is a polling app for the ConnectHear dev assignment.</p>
<button
	on:click={handleCreate}
	class="float-right rounded bg-blue-500 p-2 text-white hover:bg-blue-300 hover:text-gray-700"
	>Create a poll</button
>

{#await ipAddress}
	<p class="animate-spin">Loading Poll ...</p>
{:then ipAddr}
	<Poll
		id={data?.poll?.id || ''}
		imgSrc={data?.poll?.img || ''}
		heading={data?.poll?.heading || 'no heading'}
		options={data?.poll?.options.map((opt) => {
			return { text: opt, checked: false };
		})}
		ip={ipAddr?.ip || null}
	/>
{:catch err}
	{err}
{/await}
