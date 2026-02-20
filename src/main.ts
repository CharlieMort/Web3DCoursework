import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons';


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

	const clock = new THREE.Clock()
	let mixer: THREE.AnimationMixer;
	let actions: THREE.AnimationAction[] = []
	let machineSpinning = false;

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

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
	
	let slotMachine: GLTF
	{
		const loader = new GLTFLoader();
		loader.load("src/slotmachine2.glb", (x) => {
			slotMachine = x;
			slotMachine.scene.rotation.y -= 90
			slotMachine.scene.position.set(10, 0, -10)
			scene.add(slotMachine.scene)
			mixer = new THREE.AnimationMixer(slotMachine.scene)
			const animations = slotMachine.animations

			animations.forEach(clip => {
				const action = mixer.clipAction(clip)
				actions.push(action)
			})
			console.log(actions)
		})
	}
	{
		const btn = document.getElementById("animPlay")
		btn?.addEventListener("click", () => {
			console.log("SLOTS")
			actions.forEach(action => {
				console.log("playing" + action.getClip().name)
				action.timeScale = 1
				action.setLoop(THREE.LoopOnce, 1)
				action.reset()
				action.play();
			})
		})
	}

	class ColorGUIHelper {
        object: any;
        prop: any;

		constructor( object: any, prop: any ) {
			this.object = object;
			this.prop = prop;
		}
		get value() {

			return `#${this.object[ this.prop ].getHexString()}`;

		}
		set value( hexString ) {

			this.object[ this.prop ].set( hexString );

		}

	}

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.AmbientLight( color, intensity );
		scene.add( light );

		const gui = new GUI();
		gui.addColor( new ColorGUIHelper( light, 'color' ), 'value' ).name( 'color' );
		gui.add( light, 'intensity', 0, 5, 0.01 );

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

		if (mixer) {
			mixer.update(clock.getDelta())
		}

		renderer.render( scene, camera );
	}

	requestAnimationFrame( render );
}

main();