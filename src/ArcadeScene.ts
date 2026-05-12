import * as THREE from "three"
import Box from "./Box"
import Model from "./model"
import { EffectComposer, OutlinePass, PointerLockControls, RenderPass } from "three/examples/jsm/Addons"

export const hoverables: THREE.Object3D[] = []

let models: Record<string, Model> = {};

class ArcadeScene {
    scene: THREE.Scene<THREE.Object3DEventMap>
    analyser: THREE.AudioAnalyser
    visualizer: Box[]
	robot1: Model
	robot2: Model
	clawMachine: Model
	slotMachine: Model
	updates: Model[]
    constructor(scene: THREE.Scene, analyser: THREE.AudioAnalyser) {
        this.scene = scene
        this.analyser = analyser
    }
    
    createScene() {
        this.visualizer = []
        let max = this.analyser.getFrequencyData().length*0.7 - 32
        let radius = 32
        for (let i = 0; i<max; i++) {
            const start = 0;
            const end = Math.PI * 2;

            const t = start + (i / (max - 1)) * (end - start);
            let x = radius * Math.cos(t)
            let z = radius * Math.sin(t)

            let box = new Box(x,0,z, 0.75, 2, 0.75)
            box.setColor(new THREE.Color().setHSL(THREE.MathUtils.mapLinear(i, 0, this.analyser.getFrequencyData().length*0.7 - 32, 0.75, 0.75), 1, 0.5))
            this.scene.add(box.mesh)
            this.visualizer.push(box)
        }

        let floor = new Box(0,-1,0,10,1,10)
        floor.setColor(new THREE.Color(0xffffff))
        this.scene.add(floor.mesh)
        

        let welcome = new Model("Welcome", "src/welcome-to-the-arcade.glb")
        welcome.group.scale.multiplyScalar(2)
        welcome.setRotation(90, 0, 0)
        welcome.setPosition(0,12,-40)
        this.scene.add(welcome.group)

		this.updates = []

		{
			let model = new Model("Claw Machine", "src/clawmachine.glb", true)
			model.group.scale.multiplyScalar(0.175)
			model.setPosition(4,-0.5,0)
			model.setRotation(0,-Math.PI,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Claw Machine", "src/clawmachine.glb", true)
			model.group.scale.multiplyScalar(0.175)
			model.setPosition(4,-0.5,2)
			model.setRotation(0,-Math.PI,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Claw Machine", "src/clawmachine.glb", true)
			model.group.scale.multiplyScalar(0.175)
			model.setPosition(4,-0.5,-2)
			model.setRotation(0,-Math.PI,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Claw Machine", "src/clawmachine.glb", true)
			model.group.scale.multiplyScalar(0.175)
			model.setPosition(4,-0.5,4)
			model.setRotation(0,-Math.PI,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}



		{
			let model = new Model("Slot Machine", "src/slotmachine.glb", true)
			model.group.scale.multiplyScalar(0.2)
			model.setPosition(-4,-0.5,0)
			model.setRotation(0,0,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Slot Machine", "src/slotmachine.glb", true)
			model.group.scale.multiplyScalar(0.2)
			model.setPosition(-4,-0.5,2)
			model.setRotation(0,0,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Slot Machine", "src/slotmachine.glb", true)
			model.group.scale.multiplyScalar(0.2)
			model.setPosition(-4,-0.5,-2)
			model.setRotation(0,0,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Slot Machine", "src/slotmachine.glb", true)
			model.group.scale.multiplyScalar(0.2)
			model.setPosition(-4,-0.5,4)
			model.setRotation(0,0,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}



		{
			let model = new Model("Robot1", "src/robot.glb", true)
			model.group.scale.multiplyScalar(0.75)
			model.setPosition(-15,-1,-50)
			model.setRotation(0,-Math.PI/2,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
		{
			let model = new Model("Robot2", "src/robot.glb", true)
			model.group.scale.multiplyScalar(0.75)
			model.setPosition(15,-1,-50)
			model.setRotation(0,-Math.PI/2,0)
			this.scene.add(model.group)
			setTimeout(() => {
				hoverables.push(model.modelScene)
			}, 500)
			this.updates.push(model)
		}
    }

    updateScene() {
        let data = this.analyser.getFrequencyData()
        let idx = 0;
        for (let i = 32; i<data.length*0.7; i++) {
            let newy = THREE.MathUtils.mapLinear(data[i], 0, 300, 0.5, 10)
            this.visualizer[idx].mesh.scale.set(0.75, newy, 0.75)
            this.visualizer[idx].mesh.position.set(
                this.visualizer[idx].mesh.position.x,
                newy,
                this.visualizer[idx].mesh.position.z
            )
            idx ++
        }
		
		this.updates.map((x) => {
			x.update()
		})
    }
}



function main() {
	const canvas: HTMLCanvasElement | null = document.querySelector( '#c' );
    if (canvas == null) return;
	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.shadowMap.enabled = true
	const fov = 45;
	const aspect = 2;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 1, 5 );
	camera.lookAt(new THREE.Vector3(0,2,-10))
	let velocity = new THREE.Vector3(0,0,0);
	const controls = new PointerLockControls(camera, document.body);
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	canvas.onclick = (e) => {
		controls.lock()
		window.addEventListener("click", onClick);
	}

	function RayCast(x: number, y:number) {
		for(let i = 0; i<hoverables.length; i++) {
			if (!hoverables[i]) {
				return
			}
		}
	
		mouse.x = (x / window.innerWidth) * 2 - 1;
		mouse.y = -(y / window.innerHeight) * 2 + 1;

		// Create ray from camera through mouse position
		raycaster.setFromCamera(mouse, camera);

		// Check intersections
		const intersects = raycaster.intersectObjects(hoverables, true);

		if (intersects.length > 0) {
			if (intersects.length > 0) {
				outlinePass.selectedObjects = [intersects[0].object.parent!];
				
			} else {
				outlinePass.selectedObjects = [];
			}
		}
	}

	function onClick(event: MouseEvent) {
		RayCast(event.clientX, event.clientY)
	}

	onmousemove = (event: MouseEvent) => {
		RayCast(event.clientX, event.clientY)
	}

	onkeydown = (e) => {
		switch(e.key.toLowerCase()) {
			case "w":
				velocity.z = 1
				break;
			case "s":
				velocity.z = -1
				break;
			case "a":
				velocity.x = -1
				break;
			case "d":
				velocity.x = 1
				break
			case "p":
				sound.play()
				break;
		}
	}

	onkeyup = (e) => {
		switch(e.key.toLowerCase()) {
			case "w":
				velocity.z = 0
				break;
			case "s":
				velocity.z = 0
				break;
			case "a":
				velocity.x = 0
				break;
			case "d":
				velocity.x = 0
				break
		}
	}

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( '#111' );

	const listener = new THREE.AudioListener()
	camera.add(listener)
	const sound = new THREE.Audio(listener)
	
	const audioLoader = new THREE.AudioLoader()
	audioLoader.load("src/Starjunk 95 Groove District.mp3", function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
	});

	document.getElementById("playpause")!.addEventListener("click", () => {
		if (sound.isPlaying) {
			sound.pause()
		} else {
			sound.play()
		}
	})

	document.getElementById("volume")!.addEventListener("input", (e: Event) => {
		const target = e.target as HTMLInputElement;
		sound.setVolume(parseFloat(target.value));
	});

	document.getElementById("fullscreen")!.addEventListener("click", async () => {
		await canvas.requestFullscreen()
	})

	document.getElementById("reload")!.addEventListener("click", () => {
		location.reload()
	})

	const analyser = new THREE.AudioAnalyser(sound, 512)

	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

	}

	{
		const color = 0xFFFFFF;
		const intensity = 6;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(100,100,100)
		light.lookAt(new THREE.Vector3(0,0,0))
		light.castShadow = true
		scene.add (light)
	}

	let arcade = new ArcadeScene(scene, analyser)
	arcade.createScene()

	function resizeRendererToDisplaySize( renderer: THREE.WebGLRenderer ) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}
		return needResize;
	}


	let mainClock = new THREE.Clock()
	let camClock = new THREE.Clock()

	const composer = new EffectComposer(renderer);

	renderer.setPixelRatio(window.devicePixelRatio);

	composer.setPixelRatio(window.devicePixelRatio);
	composer.setSize(window.innerWidth, window.innerHeight);

	composer.addPass(new RenderPass(scene, camera));

	const outlinePass = new OutlinePass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		scene,
		camera
	);

	outlinePass.edgeStrength = 20;
	outlinePass.edgeThickness = 10

	composer.addPass(outlinePass);

	function render() {
		requestAnimationFrame( render );
		if ( resizeRendererToDisplaySize( renderer ) ) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		const delta = camClock.getDelta();

		const forward = new THREE.Vector3();
		camera.getWorldDirection(forward);

		const right = new THREE.Vector3();
		right.crossVectors(forward, camera.up).normalize();

		// Apply movement
		camera.position.add(forward.multiplyScalar(velocity.z * 10 * delta));
		camera.position.add(right.multiplyScalar(velocity.x * 10 * delta));
		camera.position.set(
			camera.position.x,
			1,
			camera.position.z
		)

		arcade.updateScene()
		composer.render()
	}

	requestAnimationFrame( render );
}

main();