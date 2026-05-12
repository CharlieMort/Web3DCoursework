import * as THREE from "three"

export default class Box {
    x: any;
    y: any;
    scale: THREE.Vector3;
    geometry: THREE.BoxGeometry;
    material: THREE.MeshStandardMaterial;
    mesh: THREE.Mesh<any, any, THREE.Object3DEventMap>;
    constructor(x: number, y: number, z:number, width: number, height: number, depth:number) {
        this.scale = new THREE.Vector3(width, height, depth)
        this.geometry = new THREE.BoxGeometry(this.scale.x, this.scale.y, this.scale.z);
        this.material = new THREE.MeshStandardMaterial({color: 0xff0000})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(x, y, z)
    }

    setColor(color: THREE.Color) {
        this.material.color = color;
    }
}