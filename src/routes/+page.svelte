<script lang="ts">
	export let data;
</script>

<form method="POST" action="" class="text-center mb-6">
	<button type="submit" aria-label="startWorkout" class="btn">Start New Workout</button>
</form>

<ul>
	{#each data.workouts as item}
		<a href={`workouts/${item.id}`}>
			<li class="bg-base-200 p-4 m-1" data-testid="workoutListItem">
				{item.id}
			</li>
		</a>
	{/each}
</ul>
