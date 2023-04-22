<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.workoutExercise.exercise.name}</title>
</svelte:head>

<form>
	<input type="text" name="weight" placeholder="Weight" />
	<input type="text" name="reps" placeholder="Reps" />
	<input type="text" name="rir" placeholder="RIR" />
	<button aria-label="submitSet" class="btn">Add</button>
</form>

<table>
	{#each data.workoutExercise.workoutExerciseSets as item}
		<tr id="setListItem">
			<td>{item.weight}</td>
			<td>{item.reps}</td>
			<td>{item.rir}</td>
		</tr>
	{/each}
</table>
