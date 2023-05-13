import {
	defineConfig,
	presetAttributify,
	presetTagify,
	presetUno,
	transformerCompileClass,
	transformerVariantGroup,
} from "unocss";
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
	extractors: [extractorSvelte],
	rules: [
		[/^(-)?(top|left|right|bottom)-of-(\d+|\d+\.\d+)$/, ([, negative, pos, d]) => {

			const positionMap = {
				bottom: 'top',
				top: 'bottom',
				left: 'right',
				right: 'left',
			}

			return { [positionMap[pos]]: `calc(100% ${negative ?? '+'} ${+d / 4}rem)` };
		}],
		[/^rotate-y-(\d+)$/, ([, d]) => { 
			return {'transform': `rotateY(${+d}rad)`}
		}]
	],
	theme: {
		data: {
			open: 'opened~="open"',
			close: 'opened~="close"',
			link: 'item~="link"',
			item: 'item~="item"',
			hover: 'state~="hover"',
			none: 'state~="none"',
		},
		animation: {
			keyframes: {
				'rotate': `{
					from {
						transform:rotateY(var(--rotate-start))
					}
					to {
						transform:rotateY(var(--rotate-end))
					}
				}`,

				'rotate-fix': `{
					to {
						transform:rotateY(0deg)
					}
				}`,

				'rotate-set': `{
					to {
						transform:rotateY(var(--rotate-start))
					}
				}`,
			},
			durations: {
				'rotate': '8s',
				'rotate-fix': '10s',
				'rotate-set': '5s'
			},
			counts: {
				'rotate': 'infinite',
				'rotate-fix': '1',
				'rotate-set': '1'
			},
			timingFns: {
				'rotate': 'linear',
				'rotate-fix': 'linear',
				'rotate-set': 'linear'
			}
		}
	},
	presets: [
		presetUno(),
		presetAttributify(),
		presetTagify(),
	],
	transformers: [
		transformerVariantGroup(),
		transformerCompileClass()
	],
	envMode: 'dev',
});