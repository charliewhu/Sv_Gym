<script>
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Create Exercise</title>
</svelte:head>

<form method="POST" use:enhance class="text-center">
	<div class="pb-6">
		<input
			type="text"
			name="name"
			placeholder="Name"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>
	<div>
		<button aria-label="submitNewExercise" class="btn btn-primary w-2/12">Add</button>
	</div>
</form>
