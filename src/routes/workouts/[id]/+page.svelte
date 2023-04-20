<script lang="ts">
	export let data;
</script>

<form method="POST">
	<select name="exercise" aria-label="exerciseDropdown">
		<option value="" />
		{#each data.exercises as item}
			<option data-testid="exerciseDropdownItem" value={item.id}>
				{item.name}
			</option>
		{/each}
	</select>
	<button aria-label="addExercise" class="btn">Add</button>
</form>

{#if !!data.workoutExercises.length}
	<ul data-testid="exerciseList">Exercise List</ul>
{/if}
