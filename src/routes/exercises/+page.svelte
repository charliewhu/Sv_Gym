<script lang="ts">
	export let data;
</script>

{#each data.exercises as exercise}
	<p data-testid="exerciseListItem">{exercise.name}</p>
{/each}
