/*	
  	TIME BASED ANIMATION:
  	---------------------
  	To keep things moving at a constant time-based rate instead of varying
  	frame-based, multiply your movement by APP.deltaTime
  	
  	BAD: 100 pixels per frame (BOO... movement is tied to framerate)
  	var velocity = 100; 
  	
  	BETTER: 100 pixels per second (Horray! Framerate independence!)
  	var velocity = 100 * APP.deltaTime;
  	
  	EXAMPLE:		
  	thing.x += velocity // moves thing at 100 pixels per second
*/
export class AnimationLoop {
	private then: number = Date.now();
	private delta: number = Date.now() - this.then;
	private animationFrameLoop = 0;
	private systems: Array<(delta: number) => void> = [];

	// var velocity = 100 * APP.deltaTime;
	// thing.x += velocity;
	public update?: (delta: number) => void;

	public loop() {
		this.animationFrameLoop = window.requestAnimationFrame(this._frame);
	}

	public pause() {
		window.cancelAnimationFrame(this.animationFrameLoop);
	}

	public addSystem(system: (delta: number) => void) {
		this.systems.push(system);
	}

	public removeSystem(system: (delta: number) => void) {
		this.systems = this.systems.filter(s => s !== system);
	}

	public resume() { 
		this.then = Date.now();
		this.loop();
	}

	private _frame(now: number) {
		this.delta = now - this.then;
		this.then = now;
		this.systems.forEach(system => system(this.delta));
		this.loop();
	}
}