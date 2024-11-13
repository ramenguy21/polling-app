<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import '../app.css';
	const { children, data } = $props();
	//const data = $props<LayoutServerData>();
	let isOpen = $state(false);
</script>


<div class="flex flex-col h-screen justify-between">
<header class="flex justify-between">
<button class="m-4 rounded bg-blue-500 p-2 text-white" onclick={() => isOpen=true}>
	Menu
</button>

<h1 class="my-2 mx-auto text-2xl">Realtime Polling App.</h1>
</header>
<main class="m-3 mb-auto flex">
	<!-- Sidebar -->
	<div
		class={`fixed inset-y-0 left-0 w-64 transform bg-gray-800 text-white transition-transform ${
			isOpen ? 'translate-x-0' : '-translate-x-full'
		}`}
	>
		<div class="flex justify-between">
			<div class="p-4 text-lg font-bold">Menu</div>
			<button class="p-2 bg-red-500 text-white" onclick={() => isOpen=false}>X</button>
		</div>

		<ul class="space-y-2 p-4">
			<li><a onclick={() => isOpen=false} href="/" class="block rounded p-2 hover:bg-gray-700">Home</a></li>
			<li><a onclick={() => isOpen=false} href="/profile" class="block rounded p-2 hover:bg-gray-700">Profile</a></li>
			<li><a onclick={() => isOpen=false} href="/create" class="block rounded p-2 hover:bg-gray-700">Create a Poll</a></li>
			<li class="">
				{#if data?.user}
				<form method="post" action="?/logout" use:enhance>
				<button class="rounded bg-red-500 p-2 text-white m-auto">Sign out</button>
				</form>	
				{:else}
				<button class="rounded bg-cyan-500 p-2 text-white m-auto" onclick={() => goto('/login')}>Login</button>
				{/if}
			</li>
		</ul>
	</div>
	<div class="w-full">
		<div class="flex justify-between my-2">
			{#if data?.user}
				<h1>Hi, {data.user.username || null}</h1>
			{/if}
		</div>
		{@render children()}
	</div>
</main>

<footer>
	<p class="bg-blue-700 text-white  py-2 text-center">Created for the ConnectHear dev assignment <br/> by Muhammad Hamza Asad</p>
</footer>
</div>