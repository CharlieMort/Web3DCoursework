import * as THREE from 'three';;
import Model from './model';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ModelViewer(id: string, cameraPos: THREE.Vector3, name: string, path: string, target: THREE.Vector3 = new THREE.Vector3(0, 5, 0)) {
	let canvas: HTMLElement | null = document.getElementById(id)
	if (canvas == null) return;

	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.shadowMap.enabled = true
	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	const controls = new OrbitControls(camera, renderer.domElement)
	
	camera.position.add(cameraPos)
	controls.target = target

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( '#09bfff' );

	let model = new Model(name, path)

	// canvas.parentElement.append(model.playButton)
	// canvas.parentElement.append(model.wireButton)

	scene.add(model.group)
	{
		const color = 0xFFFFFF;
		const intensity = 2;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );
	}

	{
		const color = 0xFFFFFF;
		const intensity = 2;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(50,50,50)
		light.lookAt(new THREE.Vector3(0,0,0))
		light.castShadow = true
		scene.add (light)
	}

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

	function render() {
		requestAnimationFrame( render );
		if ( resizeRendererToDisplaySize( renderer ) ) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		model.update()
		model.group.rotation.y += 0.01;

		controls.update()
		renderer.render( scene, camera );
	}

	let frameIdx = Math.floor(Math.random()*3)+1;
	let frameElement = document.getElementById(`${id}frame`)
	setInterval(() => {
		if (frameElement instanceof HTMLImageElement) {
			frameElement.src = `./frameborder${frameIdx}.png`
			frameIdx ++;
			if (frameIdx > 3) {
				frameIdx = 1
			}
		}
	}, Math.random()*250+300)

	let button1Idx = Math.floor(Math.random()*4)+1;
	let button1Element = document.getElementById(`${id}wireframe`)
	setInterval(() => {
		button1Element!.style = `background-image: url("./button${button1Idx}.png");`
		button1Idx ++;
		if (button1Idx > 4) {
			button1Idx = 1
		}
	}, Math.random()*250+300)

	button1Element!.onclick = () => {
		model.toggleWireframe()
	}

	let button2Idx = Math.floor(Math.random()*4)+1;
	let button2Element = document.getElementById(`${id}animation`)
	setInterval(() => {
		button2Element!.style = `background-image: url("./button${button2Idx}.png");`
		button2Idx ++;
		if (button2Idx > 4) {
			button2Idx = 1
		}
	}, Math.random()*250+300)

	button2Element!.onclick = () => {
		model.playAnimations()
	}

	requestAnimationFrame( render );
}

let slot = ModelViewer("slotmachine", new THREE.Vector3(0, 20, 25), "Slot Machine", "./src/slotmachine.glb")
let robot = ModelViewer("robot", new THREE.Vector3(0, 30, 40), "Robot", "./src/robot.glb", new THREE.Vector3(0, 12, 0))
let claw = ModelViewer("clawmachine", new THREE.Vector3(0, 20, 25), "Claw Machine", "./src/clawmachine.glb")