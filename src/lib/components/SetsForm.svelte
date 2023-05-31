<script lang="ts">
	import type { Validation } from 'sveltekit-superforms';
	import { workoutExerciseSetSchema, type WorkoutExerciseSetSchema } from '$lib/schema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: Validation<WorkoutExerciseSetSchema>;

	const { form, errors, enhance } = superForm(data, { validators: workoutExerciseSetSchema });

	export let action: string;
	export let text: string;
	export let label: string;
</script>

<form {action} method="POST" use:enhance class="text-center">
	<div class="grid grid-cols-3 gap-2 mb-4">
		<div>
			<label class="label" for="weight">
				<span class="label-text">Weight</span>
			</label>
			<input
				type="number"
				inputmode="decimal"
				step="0.5"
				name="weight"
				placeholder="Weight"
				class="input input-bordered w-full max-w-xs"
				bind:value={$form.weight}
			/>
		</div>
		<div>
			<label class="label" for="reps">
				<span class="label-text">Reps</span>
			</label>
			<input
				type="number"
				inputmode="decimal"
				name="reps"
				placeholder="Reps"
				class="input input-bordered w-full max-w-xs"
				bind:value={$form.reps}
			/>
		</div>
		<div>
			<label class="label" for="rir">
				<span class="label-text">RIR</span>
			</label>
			<input
				type="number"
				inputmode="decimal"
				name="rir"
				placeholder="RIR"
				class="input input-bordered w-full max-w-xs"
				bind:value={$form.rir}
			/>
		</div>
	</div>
	<div class="flex flex-col mb-4">
		{#if $errors?._errors}
			{#each $errors._errors as error}
				<small class="text-error">{error}</small>
			{/each}
		{/if}
		{#if $errors?.weight}
			<small class="text-error">{$errors.weight[0]}</small>
		{/if}
		{#if $errors?.reps}
			<small class="text-error">{$errors.reps[0]}</small>
		{/if}
		{#if $errors?.rir}
			<small class="text-error">{$errors.rir[0]}</small>
		{/if}
	</div>
	<div>
		<button aria-label={label} class="btn btn-primary w-10/12">
			{text}
		</button>
	</div>
</form>
