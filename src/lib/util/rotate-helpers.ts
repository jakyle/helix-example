const TAU = 6.283185307179586;
const PI = Math.PI;

export type RotateData = {
	start: number,
	startTransform: RotateY,
	end: number,
	endTransform: RotateY,
	backStart: number,
	backStartTransform: RotateY,
	backEnd: number,
	backEndTransform: RotateY
}

export type Matrix3D = [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];
export type Deg = `${number}deg`;
export type Turn = `${number}turn`;
export type Grad = `${number}grad`;
export type Rad = `${number}rad`;
export type RotationType = Deg | Turn | Grad | Rad;
export type RotateY = `rotateY(${RotationType})`;

export function rotateAbout(indexPosition: number, gapPercent = 0.035): RotateData {
	const GAP = TAU * gapPercent;
	const rotation = (indexPosition * GAP) % TAU;
	return { 
		start: rotation,
		get startTransform(): RotateY {
			return `rotateY(${this.start}rad)`;
		},
		end: rotation * TAU,
		get endTransform(): RotateY {
			return `rotateY(${this.end}rad)`;
		},
		backStart: rotation + PI,
		get backStartTransform(): RotateY {
			return `rotateY(${this.backStart}rad)`
		},
		backEnd: rotation + TAU + PI,
		get backEndTransform(): RotateY {
			return `rotateY(${this.backEnd}rad)`
		}
	};
}

export function matrix3dToRotateY(matrix: Matrix3D): number {
	const a = matrix[0];
	const b = matrix[1];
	const c = matrix[2];

	const angleRadians = Math.atan2(-c, Math.sqrt(a * a + b * b));
	let angleDegrees = ((angleRadians + Math.PI * 2) % (Math.PI * 2))
	if (angleDegrees < 0) {
		angleDegrees += TAU;
	}

	return angleDegrees;
}

export function matrix3dToRotateYRad(matrix: Matrix3D): Rad {
	return `${matrix3dToRotateY(matrix)}rad`;
}
