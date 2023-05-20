<script>
	import '../app.css';
</script>

<nav class="navbar bg-base-300 mb-6">
	<div class="container mx-auto max-w-5xl">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Gymboost</a>
		</div>

		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</label>
			<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-40">
				<li>
					<a href="/">Workouts</a>
				</li>
				<li>
					<a href="/exercises">Exercises</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<div class="container mx-auto max-w-4xl">
	<slot />
</div>
