<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>{$page.params.slug}</title>
</svelte:head>

<form>
	<input type="text" name="weight" placeholder="Weight" />
	<input type="text" name="reps" placeholder="Reps" />
	<input type="text" name="rir" placeholder="RIR" />
	<button aria-label="submitSet" class="btn">Add</button>
</form>

<table>
	{#each data.sets as item}
		<tr id="setListItem">
			<td>{item.weight}</td>
			<td>{item.reps}</td>
			<td>{item.rir}</td>
		</tr>
	{/each}
</table>
