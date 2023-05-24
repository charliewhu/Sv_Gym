<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: any;
	export let errors: any;
	export let action: string;
	export let text: string;
	export let label: string;
</script>

<form {action} method="POST" use:enhance class="text-center">
	<div class="flex justify-evenly mb-4">
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
				class="input input-bordered w-full max-w-xs flex flex-col"
				value={form.weight === 0 ? null : form.weight}
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
				value={form.reps === 0 ? null : form.reps}
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
				value={form.rir === 0 ? null : form.rir}
			/>
		</div>
	</div>
	<div class="flex flex-col mb-4">
		{#if errors?._errors}
			{#each errors._errors as error}
				<small class="text-error">{error}</small>
			{/each}
		{/if}
		{#if errors?.weight}
			<small class="text-error">{errors.weight[0]}</small>
		{/if}
	</div>
	<div>
		<button aria-label={label} class="btn btn-primary w-10/12">
			{text}
		</button>
	</div>
</form>
