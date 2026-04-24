import * as THREE from 'three';
import { DRACOLoader, GLTF, GLTFLoader } from 'three/examples/jsm/Addons';

class Model {
    clock: THREE.Clock;
    scene: THREE.Scene
    mixer: THREE.AnimationMixer
    actions: THREE.AnimationAction[];
    model: GLTF
    modelScene: GLTF["scene"]
    name: string
    group: THREE.Group<THREE.Object3DEventMap>;
    path: string;
    wireframe: boolean;
    playButton: HTMLButtonElement;
    wireButton: HTMLButtonElement;

    constructor(name: string, path: string) {
        this.clock = new THREE.Clock()
        this.name = name;
        this.group = new THREE.Group()
        this.path = path;
        this.wireframe = false;
        this.loadModel()
        this.loadButtons()
    }

    toggleWireframe() {
        this.wireframe = !this.wireframe

        if (this.model) {
            this.model.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.wireframe = this.wireframe;
                }
            })
        }
    }

    loadModel() {
        const loader = new GLTFLoader();
        this.actions = []
        loader.load(this.path, (x) => {
            this.model = x;
            this.modelScene = x.scene
            this.group.add(this.model.scene)
            this.mixer = new THREE.AnimationMixer(this.model.scene)
            const animations = this.model.animations;
            animations.forEach(clip => {
                const action = this.mixer.clipAction(clip)
                this.actions.push(action)
            })
        })
    }

    loadButtons() {
        this.playButton = document.createElement("button")
        this.playButton.innerText = "Play Animation"
        this.playButton.addEventListener("click", () => {
            console.log("playing animation for " + this.name)
            this.actions.forEach(action => {
                action.timeScale = 1;
                action.setLoop(THREE.LoopOnce, 1)
                action.reset()
                action.play()
            }) 
        })

        this.wireButton = document.createElement("button")
        this.wireButton.innerText = "Toggle WireFrame"
        this.wireButton.addEventListener("click", () => {
            this.toggleWireframe()
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