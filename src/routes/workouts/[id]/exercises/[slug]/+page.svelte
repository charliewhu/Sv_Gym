<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.params.slug}</title>
</svelte:head>

<form>
	<input type="text" placeholder="Weight" />
	<input type="text" placeholder="Reps" />
	<input type="text" placeholder="RIR" />
	<button aria-label="submitSet" class="btn">Add</button>
</form>
