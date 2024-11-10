<script lang="ts">
 let heading = $state('no heading')
 let options : string[] = $state(['new value 1'])

 function handleCreatePoll() {
    fetch('/create', {method : "POST", body : JSON.stringify({
        userId : Math.floor(Math.random() * 60) + 1,
        heading,
        options,
    })})
 }
</script>

<div>
    <h1 class="text-2xl p-4 text-center">Poll creation Page</h1>
</div>

<div class="bg-cyan-500 p-4">
    <label class="text-white font-bold" for="heading">Poll title</label>
    <input name=heading bind:value={heading}>
    <div class="flex flex-col">
    {#each options as opt, idx}
    <div class="bg-blue-500 my-2 rounded p-4">
    <input type="checkbox">
    <input name="label" value={opt} onchange={(event) => options[idx] = event.currentTarget.value}/>
    </div>
    {/each}
    </div>
    
    <div class="flex flex-col w-1/2 m-auto space-y-2 w-full my-2">
        <button class="bg-blue-700 text-white rounded py-2 px-4 "
        onclick={() => options.push(`new value ${options.length + 1}`)}>
        + Add Option</button>
        <button class="bg-green-700 text-white rounded py-2 px-4" onclick={handleCreatePoll}>Create Poll </button>
    </div>
</div>

    <a class="float-right m-2 bg-green-200 rounded p-2" href="/">Home</a>
