<script lang="ts">
	export let data;
</script>

<form method="POST">
	<select name="" id="" aria-label="exerciseDropdown">
		<option value="" />
		{#each data.exercises as item}
			<option data-testid="exerciseDropdownItem" value={item.name}>{item.name}</option>
		{/each}
	</select>
	<button aria-label="addExercise" class="btn">Add</button>
</form>
