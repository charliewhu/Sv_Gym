<script lang="ts">
	export let data;
</script>

<a href="/exercises/create" aria-label="createExercise" class="btn">Create New</a>

{#each data.exercises as exercise}
	<p data-testid="exerciseListItem">{exercise.name}</p>
{/each}
