import { AnimationLoop } from "$lib/util/animation-loop";
import { writable } from "svelte/store";


export function useAnimationLoop() {
	const { update } = writable(new AnimationLoop());

	return {
		addSystem: (system: (delta: number) => void) => update(animationLoop => {
			animationLoop.addSystem(system);
			return animationLoop;
		}),
		removeSystem: (system: (delta: number) => void) => update(animationLoop => {
			animationLoop.removeSystem(system);
			return animationLoop;
		}),
		start: () => update(animationLoop => {
			animationLoop.loop(); 
			return animationLoop;
		}),
		pause: () => update(animationLoop => {
			animationLoop.pause(); 
			return animationLoop;
		}),
	};
}