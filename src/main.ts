import * as THREE from 'three';
import GUI from 'lil-gui'; // Import lil-gui
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import ppVertexShader from './shaders/ppvertex.glsl';
import ppFragmentShader from './shaders/ppfragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

class App {
  private scene: THREE.Scene;
  private composer: EffectComposer;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private startTime: number;
  private gui: GUI;
  private controls: OrbitControls;
  private camConfig = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
  };

  private uniforms = {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_speed: { value: 1.0 },
  };
  private ppUniforms = {

    tDiffuse: {value: null},
    u_time: {value: this.uniforms.u_time.value},
    u_luminance: {value: new THREE.Vector3(0.3086, 0.6094,0.0820)},
    u_baseColor: {value: new THREE.Vector3(0.2, 1.0,0.4)},
    u_contrast: {value: 1.2},
    u_noise: {value: 0.5},
    u_behavior: { value: 0 },
  }

  constructor() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0x00002f);

    this.camera = new THREE.PerspectiveCamera(
      this.camConfig.fov,
      this.camConfig.aspect,
      this.camConfig.near,
      this.camConfig.far
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const postProcessShader = {
      uniforms: this.ppUniforms,
      vertexShader: ppVertexShader,
      fragmentShader: ppFragmentShader,
    }
    const screenPass = new ShaderPass(postProcessShader);
    screenPass.renderToScreen = true;

    this.composer.addPass(screenPass);

    if (!this.renderer.capabilities.isWebGL2) {
      console.warn('WebGL 2.0 is not available on this browser.');
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Set up OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth camera movement
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation

    // Create shader material
    this.geometry = new THREE.PlaneGeometry(2, 2, 1000, 1000);

    this.material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: this.uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });

    // Create mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.camera.position.z = 1.5;

    this.startTime = Date.now();
    this.onWindowResize();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener('resize', this.onWindowResize);
    this.gui = new GUI();
    this.guiSetup();

    this.animate();
  }

  private guiSetup() {
    
    this.gui.add(this.ppUniforms.u_noise, 'value', 0.1, 1.0).name('Noise Level');
    this.gui.add(this.ppUniforms.u_contrast, 'value', 0.1, 2.0).name('Contrast Level');
    this.gui.add(this.ppUniforms.u_behavior, 'value', { NightVision: 0, ChromaticAberration: 1 }).name('Effect Type');
  }

  private animate(): void {
    requestAnimationFrame(this.animate);
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    this.material.uniforms.u_time.value = elapsedTime * this.uniforms.u_speed.value * 0.5;

    (this.composer.passes[1] as ShaderPass).uniforms.u_time.value = this.material.uniforms.u_time.value; 
    (this.composer.passes[1] as ShaderPass).uniforms.u_noise.value = this.ppUniforms.u_noise.value; 
    (this.composer.passes[1] as ShaderPass).uniforms.u_contrast.value = this.ppUniforms.u_contrast.value; 
    (this.composer.passes[1] as ShaderPass).uniforms.u_behavior.value = this.ppUniforms.u_behavior.value; 

    this.controls.update();
    
    //this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  }
}

const myApp = new App();
