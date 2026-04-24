import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons';
import Model from './model';

function ModelViewer(id: string, cameraPos: THREE.Vector3, name: string, path: string, target: THREE.Vector3 = new THREE.Vector3(0, 5, 0)) {
	let canvas = document.querySelector(id)
	if (canvas == null) return;

	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.shadowMap.enabled = true
	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.add(cameraPos)

	const controls = new OrbitControls( camera, canvas );
	controls.target.add(target)
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( '#09bfff' );

	let model = new Model(name, path)
	// canvas.parentElement.append(model.playButton)
	// canvas.parentElement.append(model.wireButton)

	scene.add(model.group)
	{
		const color = 0xFFFFFF;
		const intensity = 5;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );
	}

	{
		const color = 0xFFFFFF;
		const intensity = 5;
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

		renderer.render( scene, camera );
	}

	requestAnimationFrame( render );
}

function main() {
	const canvas: HTMLCanvasElement | null = document.querySelector( '#c' );
    if (canvas == null) return;
	const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
	renderer.shadowMap.enabled = true
	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( '#09bfff' );

	{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		mesh.receiveShadow = true
		scene.add( mesh );

	}
	
	let slotMachine = new Model("Slot Machine", "src/slotmachine3.glb")
	let clawMachine = new Model("Claw Machine", "src/clawMachine.glb")
	let robot = new Model("Robot", "src/robot.glb")
	robot.group.scale.set(0.2, 0.2, 0.2)

	slotMachine.setPosition(10, 0, -10)
	slotMachine.setRotation(0, -90, 0)

	clawMachine.setPosition(-10, 0, -10)
	clawMachine.setRotation(0, -45, 0)

	scene.add(slotMachine.group)
	scene.add(clawMachine.group)
	scene.add(robot.group)

	{
		const light = new THREE.PointLight(0xffffff, 100, 100);
		light.position.set(clawMachine.group.position.x, clawMachine.group.position.y+12, clawMachine.group.position.z)
		
		scene.add(light)

	}

	{
		const color = 0xFFFFFF;
		const intensity = 4;
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

		clawMachine.update()
		slotMachine.update()

		renderer.render( scene, camera );
	}

	requestAnimationFrame( render );
}

main();
ModelViewer("#slotmachine", new THREE.Vector3(0, 20, 25), "Slot Machine", "src/slotmachine3.glb")
ModelViewer("#robot", new THREE.Vector3(0, 30, 40), "Robot", "src/robot.glb", new THREE.Vector3(0, 10, 0))
ModelViewer("#clawmachine", new THREE.Vector3(0, 20, 25), "Claw Machine", "src/clawmachine.glb")
