<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Exercise } from '@prisma/client';

	export let action: string;
	export let exercises: Exercise[];
</script>

<form {action} method="POST" use:enhance class="flex flex-row mb-4">
	<select name="exercise" aria-label="exerciseDropdown" class="select select-bordered grow mx-2">
		<option value="" />
		{#each exercises as exercise}
			<option data-testid="exerciseDropdownItem" value={exercise.id}>
				{exercise.name}
			</option>
		{/each}
	</select>
	<button aria-label="addExercise" class="btn btn-primary mx-2">Add</button>
</form>
