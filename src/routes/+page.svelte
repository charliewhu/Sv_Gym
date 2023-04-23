<script lang="ts">
	export let data;
</script>

<form method="POST" action="">
	<button type="submit" aria-label="startWorkout" class="btn">Start New Workout</button>
</form>

<table>
	{#each data.workouts as item}
		<tr data-testid="workoutListItem">
			<td>
				<a href={`workouts/${item.id}`}>
					{item.id}
				</a>
			</td>
		</tr>
	{/each}
</table>
