<script lang="ts">
	interface Option {
		checked?: boolean;
		text: string;
	}

	//i'm not sure if there is some local way of grabbing client ip address
	//so i'm using an external api to fetch it
    export let ip = '';
	export let id : string = '';
	export let heading = 'No heading provided';
	export let options: Option[] = [];
	export let imgSrc = "";
</script>

<div class="bg-blue-600 text-white p-2 m-1">
	<h2>{heading}</h2>
	<img alt="poll" class="mb-4 max-h-48 w-full rounded object-cover shadow-md" src={`data:image/png;base64,${imgSrc}`} />
	{#each options as opt}
		<form method="POST">
			<button
				class="my-2 flex items-center rounded bg-cyan-500 p-2 hover:text-gray-500 hover:bg-cyan-700"
				type="submit"
				formaction="?/vote"
			>
			<!--wait, why does this work lol.-->
				<input class="hidden" name="vote" value={opt.text}/>
				<p class="mx-2">{opt.text}</p>
      
				    <input class="hidden" name="ip" value= {ip} />
            
              
				    <input class="hidden" name="id" value={id} />
			</button>
		</form>
	{/each}
</div>
