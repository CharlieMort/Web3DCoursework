import * as THREE from 'three';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons';

class Model {
    clock: THREE.Clock;
    scene: THREE.Scene
    mixer: THREE.AnimationMixer
    actions: THREE.AnimationAction[];
    model: GLTF
    name: string
    group: THREE.Group<THREE.Object3DEventMap>;

    constructor(name: string, path: string) {
        this.clock = new THREE.Clock()
        this.name = name;
        this.group = new THREE.Group()
        this.loadModel(path)
        
    }

    loadModel(path: string) {
        const loader = new GLTFLoader();
        this.actions = []
        loader.load(path, (x) => {
            this.model = x;
            this.group.add(this.model.scene)
            this.mixer = new THREE.AnimationMixer(this.model.scene)
            const animations = this.model.animations;
            animations.forEach(clip => {
                const action = this.mixer.clipAction(clip)
                this.actions.push(action)
            })

            let playButton = document.createElement("button")
            playButton.innerText = "Play " + this.name
            playButton.addEventListener("click", () => {
                console.log("playing animation for " + this.name)
                this.actions.forEach(action => {
                    action.timeScale = 1;
                    action.setLoop(THREE.LoopOnce, 1)
                    action.reset()
                    action.play()
                }) 
            })

            document.body.append(playButton)
        })
    }

    update() {
        if (this.mixer) {
            this.mixer.update(this.clock.getDelta())
        }
    }

    setPosition(x: number, y: number, z: number) {
        this.group.position.set(x, y, z)
    }

    setRotation(x: number, y: number, z: number) {
        this.group.rotation.set(x, y, z)
    }
}

export default Model;