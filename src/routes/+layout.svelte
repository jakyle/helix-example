<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'uno.css';
	import HelixNavigation from '../lib/components/HelixNavigation.svelte';

</script>

<main class="w-screen h-screen bg-slate-700 flex-(~ row)">
	<HelixNavigation barCount={30} />
	<div class="flex-1 p-4 text-(lg slate-200)">
		<slot />
	</div>
</main>
