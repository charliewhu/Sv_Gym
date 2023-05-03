<script lang="ts">
	export let href: string = '#';
	export let testId: string;
</script>

<a {href}>
	<li class="bg-neutral hover:bg-neutral-focus p-4 m-3" data-testid={testId}>
		<slot />
	</li>
</a>
