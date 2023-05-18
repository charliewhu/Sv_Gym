<script lang="ts">
	import { enhance } from '$app/forms';

	export let action: string;
	export let text: string;
	export let label: string;
	export let weight: number | null = null;
	export let reps: number | null = null;
	export let rir: number | null = null;
</script>

<form {action} method="POST" use:enhance class="text-center">
	<div class="flex justify-evenly">
		<div class="pb-4">
			<input
				type="text"
				name="weight"
				placeholder="Weight"
				class="input input-bordered w-full max-w-xs flex flex-col"
				value={weight}
			/>
		</div>
		<div class="pb-4">
			<input
				type="text"
				name="reps"
				placeholder="Reps"
				class="input input-bordered w-full max-w-xs"
				value={reps}
			/>
		</div>
		<div class="pb-4">
			<input
				type="text"
				name="rir"
				placeholder="RIR"
				class="input input-bordered w-full max-w-xs"
				value={rir}
			/>
		</div>
	</div>
	<div>
		<button aria-label={label} class="btn btn-primary w-10/12">
			{text}
		</button>
	</div>
</form>
