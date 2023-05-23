<script lang="ts">
	import SetsForm from '$lib/components/SetsForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors } = superForm(data.form);
</script>

<SetsForm form={$form} errors={$errors} action="" text="Update" label="submitSet" />
