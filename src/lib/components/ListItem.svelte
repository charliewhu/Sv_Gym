<script lang="ts">
	export let href: string = '#';
	export let testId: string;
	export let content: any;
</script>

<a {href}>
	<li class="bg-base-300 hover:bg-base-200 p-4 m-3" data-testid={testId}>
		{content}
	</li>
</a>
