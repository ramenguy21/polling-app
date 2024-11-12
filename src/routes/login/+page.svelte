<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="text-center text-2xl">Login/Register</h1>
{#if form?.message}
<div class="w-1/2 m-auto p-2 rounded">
	<h1 class="text-red-500 font-bold bg-gray-200 text-2xl">An error occured:</h1>
	<p class="text-red-500 font-bold text-center bg-gray-200">{form?.message ?? ''}</p>
</div>
{/if}

<form class="flex flex-col w-1/2 m-auto" method='post' action='?/login' use:enhance>
	<label class="flex flex-col">
		Username
		<input required aria-required="true" name='username' />
	</label>
	<label class="flex flex-col">
		Password
		<input required aria-required="true" type='password' name='password' />
	</label>
	<button class="m-2 bg-cyan-500 rounded p-2 text-white hover:bg-cyan-700 hover:text-gray-200">Login</button>
	<button class="m-2 bg-gray-500 rounded p-2 text-white hover:bg-gray-700 hover:text-cyan-200" formaction='?/register'>Register</button>
</form>

