<script lang="ts">
	import type { PageServerData } from "./$types";

    export let data : PageServerData;
</script>

<div>
    <h1 class="text-xl my-2 text-center">Edit poll</h1>
    <form method="POST" class="bg-blue-600 p-2 flex flex-col">
        <input name="id" value={data.poll?.id} class="hidden"/>
        <div class="flex flex-col my-2 space-y-1">
            <label class="text-white" for="heading">Heading</label>
            <input name="heading" value={data.poll?.heading}/>
        </div>
        {#each data.poll?.options! as opt, idx}
            <div class="flex flex-col my-1 space-y-1">
                <label class="text-white" for={`opt${idx}`}>Option {idx}</label>
                <input name={`opt${idx}`} value={opt}/>
            </div>
        {/each}
        <button class="bg-cyan-700 text-white p-2 rounded" type="submit">Edit</button>
    </form>
</div>