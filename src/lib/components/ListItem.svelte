<script lang="ts">
	export let href: string = '#';
	export let testId: string;
</script>

<a {href}>
	<li class="bg-base-200 hover:bg-base-300 p-4 m-3" data-testid={testId}>
		<slot />
	</li>
</a>
