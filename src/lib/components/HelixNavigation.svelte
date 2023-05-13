<script lang="ts">
	import { matrix3dToRotateY, type Matrix3D, matrix3dToRotateYRad, rotateAbout } from "$lib/util/rotate-helpers";

	export let barCount = 12;

	const TAU = 6.283185307179586;
	const PI = Math.PI;
	let hoverState: 'hover' | 'none' = 'none';

	const items = Array.from(Array(barCount)).map((_, index) => ({...rotateAbout(index + 1), order: index}));

	const links = [
		{
			label: 'Home',
			href: '/',
			idx: 2
		},
		{
			label: 'About',
			href: '/about',
			idx: 3
		},
		{
			label: 'Contact',
			href: '/contact',
			idx: 4
		}
	];

	type ItemLink = {
		start: string;
		end: string;
		backStart: string;
		backEnd: string;
		order: number;
		label?: string;
		href?: string;
	};

	let linkedItems: Array<ItemLink> = items.map((item, index) => {
		const link = links.find((link) => link.idx === index);
		if (link && link.idx) {
			return {
				...item,
				...link
			};
		}
		return item;
	});



	let hoveredIndex = 0;
	function onMouseEnter(event: MouseEvent, item: ItemLink, idx: number) {
		// const style = getComputedStyle();
		hoverState = 'hover';
		hoveredIndex = idx;
		const element = (event.target as HTMLLIElement)
			.getElementsByTagName('div')
			.item(0) as HTMLDivElement;
		const matrix = getComputedStyle(element).transform;

		const matrixArray = matrix.split('(')[1].split(')')[0].split(',').map(x => +x.trim()) as Matrix3D;
		const currentY = matrix3dToRotateYRad(matrixArray);

		const hoveredItem = linkedItems.at(idx)!;
		hoveredItem.end = `${currentY}rad`;
		hoveredItem.backEnd = `${currentY + PI}rad`;

		const before = linkedItems.slice(0, idx);
		const after = linkedItems.slice(idx + 1);

		const sequence: Array<ItemLink> = [...after, ...before].map(({order, label, href}, index) => ({...rotateAbout(index+1), order, label, href}));
		sequence.push(hoveredItem);
		sequence.sort((a, b) => a.order - b.order);
		console.log(sequence);
		linkedItems = sequence;
	}

	function onMouseExit(event: MouseEvent) {
		hoverState = 'none';
	}

</script>

<nav class="relative w-48 min-w-48 max-w-48 overflow-hidden">
	<ul class="z-10 relative flex-(~ col) items-center gap-3"
		on:mouseleave={e => onMouseExit(e)}>
		{#each linkedItems as item, idx}
			<li
				data-item={item.href ? 'link' : 'item'}
				class="group/item flex w-full h-5 items-center justify-center"
				on:mouseenter|preventDefault={(e) => onMouseEnter(e, item, idx)}
			>
				{#if item.href}
					<a
						class="peer group relative flex w-full justify-center items-center z-10 text-(lg slate-50) uppercase"
						href={item.href}
					>
						<span
							data-state={hoverState}
							class="absolute z-10 backface-hidden font-bold text-purple-300 group-hover:text-purple-400 transition duration-300 data-none:animate-rotate transition data-hover:rotate-y-[var(--rotate-start)] data-hover:duration-1000 animate-fill-forwards"
							style:--rotate-start={item.start}
							style:--rotate-end={item.end}
							>{item.label}
						</span>

						<span
							data-state={hoverState}
							class="absolute z-10 backface-hidden font-bold text-purple-400 group-hover:text-purple-500 transition duration-300 data-none:animate-rotate transition data-hover:rotate-y-[var(--rotate-start)] data-hover:duration-1000 animate-fill-forwards"
							style:--rotate-start={item.backStart}
							style:--rotate-end={item.backEnd}
						>
							<span class="rotate-180">
								{item.label}
							</span>
						</span>
					</a>
				{/if}

				<div
					data-state={hoverState}
					data-item={item.href ? 'link' : 'item'}
					class="absolute backface-hidden -z-20 w-9/10 h-5 transition-opacity duration-300 opacity-20 group-hover/item:opacity-40 bg-slate-400 flex items-center justify-center data-none:animate-rotate transition data-hover:rotate-y-[var(--rotate-start)] data-hover:duration-1000 animate-fill-forwards cursor-pointer mix-blend-overlay"
					style:--rotate-start={item.start}
					style:--rotate-end={item.end}
				>
					<div
						class="absolute -left-2 rounded-full h-8 w-8 bg-violet-500 group-hover/item:bg-red-500 transition-colors duration-1000"
					/>
					<div
						class="absolute -right-2 rounded-full h-8 w-8 bg-fuchsia-500 group-hover/item:bg-green-500 transition-colors duration-1000"
					/>
				</div>

				<div
					data-state={hoverState}
					data-item={item.href ? 'link' : 'item'}
					class="absolute backface-hidden -z-20 w-9/10 h-5 transition-opacity duration-300 opacity-20 group-hover/item:opacity-40 bg-slate-500 flex items-center justify-center data-none:animate-rotate transition data-hover:rotate-y-[var(--rotate-start)] data-hover:duration-1000 animate-fill-forwards cursor-pointer mix-blend-overlay"
					style:--rotate-start={item.backStart}
					style:--rotate-end={item.backEnd}
				>
					<div
						class="absolute -left-2 rounded-full h-8 w-8 bg-violet-700 group-hover/item:bg-red-700 transition-colors duration-1000"
					/>
					<div
						class="absolute -right-2 rounded-full h-8 w-8 bg-fuchsia-700 group-hover/item:bg-green-700 transition-colors duration-1000"
					/>
				</div>
			</li>
		{/each}
	</ul>
</nav>
