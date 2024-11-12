<script lang="ts">
	import Edit from '../../components/icons/edit.svelte';

	let heading = $state('no heading');
	let options: string[] = $state(['new value 1']);
	let display: File | null = $state(null);
	//let img_url : string = $state('')

	function handleImage(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			display = target.files[0];
		}

		//send call to TinyImg api using display's binary data in body

		//parse the response and enocde the image in base64, store the base64 string in the table.
	}

	function handleCreatePoll() {
		const newPollForm = new FormData();

        newPollForm.append('heading', heading);
        options.map((opt,idx) => newPollForm.append(`opt${idx}`, opt)); 

		if (display) {
			newPollForm.append('img', display);
		}

		fetch('/create', {
			method: 'POST',
			body: newPollForm
		});
	}

	//initate long polling request to the server for each poll.


</script>

<div>
	<h1 class="p-4 text-center text-2xl">Poll creation Page</h1>
</div>

<div class="bg-cyan-500 p-4">
	<img
		alt="Poll Preview"
		class="mb-4 max-h-48 w-full rounded object-cover shadow-md"
		src={display ? URL.createObjectURL(display) : 'https://fakeimg.pl/600x400?text=placeholder'}
	/>
	<!-- Wrapper for the custom file input -->
	<div class="relative flex justify-end">
		<!-- Hidden File Input -->
		<input
			type="file"
			accept="image/*"
			onchange={handleImage}
			class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
		/>

		<!-- Custom Button -->
		<div
			class=" w-fit cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-semibold text-white hover:bg-blue-600"
		>
			<Edit />
		</div>
	</div>
	<label class="font-bold text-white" for="heading">Poll title</label>
	<input name="heading" bind:value={heading} />
	<div class="flex flex-col">
		{#each options as opt, idx}
			<div class="my-2 rounded bg-blue-500 p-4">
				<input type="checkbox" />
				<input
					name="label"
					value={opt}
					onchange={(event) => (options[idx] = event.currentTarget.value)}
				/>
			</div>
		{/each}
	</div>

	<div class="m-auto my-2 flex w-1/2 w-full flex-col space-y-2">
		<button
			class="rounded bg-blue-700 px-4 py-2 text-white"
			onclick={() => options.push(`new value ${options.length + 1}`)}
		>
			+ Add Option</button
		>
		<button class="rounded bg-green-700 px-4 py-2 text-white" onclick={handleCreatePoll}
			>Create Poll
		</button>
	</div>
</div>

<a class="float-right m-2 rounded bg-green-200 p-2" href="/">Home</a>
