import * as THREE from 'three';

declare global {
  interface Window {
    THREE: typeof THREE;
  }
}

const fftSize: number = 512;
let audio: THREE.Audio;
let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer, analyser: THREE.AudioAnalyser, uniforms: { tAudioData: { value: THREE.DataTexture } };
let mediaElement: HTMLAudioElement;

export type VisualizerArgs = {
  container: HTMLElement;
  audioSource: string;
  onEnded: () => void;
  onStateChange: (payload: string) => void;
}

export async function update({ container, audioSource, onEnded, onStateChange }: VisualizerArgs): Promise<void> {
  const THREE = global.window.THREE;

  if (renderer) {
    // renderer.clear();
    container?.removeChild(renderer.domElement);
  } else {
  }

  audio?.stop();
  audio?.disconnect();
  audio?.source?.disconnect();
  // audio?.context?.close();
  audio = null as any;
  mediaElement?.parentNode?.removeChild(mediaElement);
  mediaElement = null as any;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container?.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.Camera();

  const audioListener: THREE.AudioListener = new THREE.AudioListener();
  audio = new THREE.Audio(audioListener);
  const file: string = audioSource;
  // const file = '/src/assets/suzuki_sv650_yoshi.mp3';

  // console.log('file: ', file);

  // if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
  //   const loader: THREE.AudioLoader = new THREE.AudioLoader();
  //   loader.load(file, async function (buffer: any) {
  //     audio.setBuffer(buffer);
  //     audio.play();
  //   });
  // } else {
    mediaElement = new Audio(file);
    mediaElement.play();
    audio.setMediaElementSource(mediaElement);
  // }

  mediaElement.addEventListener('ended', () => {
    onEnded();
  });

  mediaElement.addEventListener('error', () => {
    onStateChange('error');
  });

  mediaElement.addEventListener('loadstart', () => {
    onStateChange('loadstart');
  });

  mediaElement.addEventListener('canplay', () => {
    onStateChange('canplay');
  });

  // mediaElement.addEventListener('progress', (event) => {
  //   const { loaded, total } = event;
  //   const progress = loaded / total;
  //   console.log(`Audio asset loading progress: ${progress}`);
  // });

  analyser = new THREE.AudioAnalyser(audio, fftSize);
  const format: THREE.PixelFormat = renderer.capabilities.isWebGL2 ? THREE.RedFormat : THREE.LuminanceFormat;
  uniforms = {
    tAudioData: { value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, format) },
  };
  const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
  });
  const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(2, 2);
  const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // loadBackground();
  window.addEventListener('resize', onWindowResize);

  animate();
}

  // function loadBackground(): void {
  //   const loader = new THREE.TextureLoader();
  //   loader.load(bikeSource, function (texture) {
  //     // Assuming you want the image to cover the whole scene background.
  //     // scene.background = texture;
//     // return
//     // Create a material with the loaded texture
//     const backgroundMaterial = new THREE.MeshBasicMaterial({ map: texture });

//     // Create a plane geometry with the desired size
//     const backgroundGeometry = new THREE.PlaneGeometry(2, 2);

//     // Create a mesh with the geometry and material
//     const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

//     // Position the background mesh at the center of the scene
//     backgroundMesh.position.set(0, 0, -1.1); // z-position is set to -1 to ensure it's behind other objects

//     // Add the background mesh to the scene
//     scene.add(backgroundMesh);
//   });
// }

// function drawBike(): void {
//   const loader = new THREE.ImageLoader();

//   loader.load(
//     // resource URL
//     'textures/skyboxsun25degtest.png',

//     // onLoad callback
//     function ( image ) {
//       // use the image, e.g. draw part of it on a canvas
//       const canvas = document.createElement( 'canvas' );
//       const context = canvas.getContext( '2d' );
//       context?.drawImage( image, 100, 100 );
//     },

//     // onProgress callback currently not supported
//     undefined,

//     // onError callback
//     function () {
//       console.error( 'An error happened.' );
//     }
//   );
// }

function onWindowResize() {
  // renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  analyser.getFrequencyData();
  uniforms.tAudioData.value.needsUpdate = true;
  renderer.render( scene, camera );
}

const vertexShader = `
  varying vec2 vUv;

  void main() {

    vUv = uv;

    gl_Position = vec4( position, 1.0 );

  }
`
const fragmentShader = `
  uniform sampler2D tAudioData;
  varying vec2 vUv;

  void main() {

    vec3 backgroundColor = vec3( 1,1,1 );
    vec3 color = vec3(0.8471, 0.0275, 0.0);

    float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;

    // float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );
    float i = step(vUv.y, f);

    gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );

  }
`
