<script lang="ts">
//add headers and footers here.

import '../app.css';
	let { children } = $props();
</script>

<div class="m-3">
{@render children()}
</div>
