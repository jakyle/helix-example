const TAU = 6.283185307179586;
const PI = Math.PI;

export type Matrix3D = [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];
export type Rad = `${number}rad`;

export function rotateAbout(base: number): { start: Rad, end: Rad, backStart: Rad, backEnd: Rad } {
	const GAP = TAU * 0.035;
	const rotation = (base * GAP) % TAU;

	const start: Rad = `${rotation}rad`;
	const end: Rad = `${rotation + TAU}rad`;

	const backStart: Rad = `${rotation + PI}rad`;
	const backEnd: Rad = `${rotation + TAU + PI}rad`;
	return { start, end, backStart, backEnd };
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
