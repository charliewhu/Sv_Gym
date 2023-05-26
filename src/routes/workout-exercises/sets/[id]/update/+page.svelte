<script lang="ts">
	import SetsForm from '$lib/components/SetsForm.svelte';

	export let data;
</script>

<SetsForm data={data.form} action="" text="Update" label="submitSet" />
