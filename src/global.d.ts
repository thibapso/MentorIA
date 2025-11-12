export {};

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare module 'three.meshline' {
  import * as THREE from 'three';
  export class MeshLine extends THREE.BufferGeometry {
    setPoints(points: THREE.Vector3[]): void;
    geometry: any;
  }
  export class MeshLineMaterial extends THREE.Material {
    color: THREE.Color;
    lineWidth: number;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
