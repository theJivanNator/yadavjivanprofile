import * as THREE from './three.module.js';
// import * as THREE from './three.js';
import { OrbitControls } from './OrbitControls.js';
import { FlakesTexture } from './FlakesTexture.js';
import { RGBELoader } from './RGBELoader.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';
let scene, camera, renderer, controls, pointlight;
function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 500);
    controls = new OrbitControls(camera, renderer.domElement);
    renderer.setSize(window.innerWidth-17,window.innerHeight-100);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.noPan = true;
    controls.maxDistance = controls.minDistance = 500;
    controls.noKeys = true;
    controls.noRotate = true;
    controls.noZoom = true;
    pointlight = new THREE.PointLight(0xffffff, 1);
    pointlight.position.set(200, 200, 200);
    scene.add(pointlight);
    // TEXT

    const loader = new FontLoader();

    loader.load('./fontsbold.json', function (font) {
        const geometry = new TextGeometry('Yadav Jivan', {
            font: font,
            size: 20,
            height: 5,
            curveSegments: 10,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x0080FF }), // front
            new THREE.MeshPhongMaterial({ color: 0xFF0000 }) // side
        ];
        const textMesh1 = new THREE.Mesh(geometry, materials);
        textMesh1.castShadow = true
        textMesh1.position.y += 10
        textMesh1.position.x -= 6
        textMesh1.rotation.y = 0.25
        textMesh1.position.set(100, 0.5, 0.0);
        scene.add(textMesh1)
    });

    var bgTexture = new THREE.TextureLoader().load("./1314204.jpg");
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;
    

    let envmaploader = new THREE.PMREMGenerator(renderer);

    new RGBELoader().setPath('textures/').load('snow_field_4k.hdr', function (hdrmap) {

        let envmap = envmaploader.fromCubemap(hdrmap);
        let texture = new THREE.CanvasTexture(new FlakesTexture());
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 6;

        const ballMaterial = {
            clearcoat: 1.0,
            cleacoatRoughness: 0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0x8418ca,
            normalMap: texture,
            normalScale: new THREE.Vector2(0.15, 0.15),
            envMap: envmap.texture
        };

        let ballGeo = new THREE.SphereGeometry(90, 57.6, 57.6);
        let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
        let ballMesh = new THREE.Mesh(ballGeo, ballMat);
        scene.add(ballMesh);

       
        animate();
    });
 
    new RGBELoader().setPath('textures/').load('kloppenheim_02_4k.hdr', function (hdrmap) {

        let envmap = envmaploader.fromCubemap(hdrmap);
        let texture = new THREE.CanvasTexture(new FlakesTexture());
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 6;
    
        const ballMaterial = {
            clearcoat: 1.0,
            cleacoatRoughness: 0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0xf44336,
            normalMap: texture,
            normalScale: new THREE.Vector2(0.15, 0.15),
            envMap: envmap.texture
        };
    
        let ballGeo = new THREE.SphereGeometry(50, 32, 32);
        let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
        let ballMesh = new THREE.Mesh(ballGeo, ballMat);
        ballMesh.position.set(210, 100, 0.0);
        scene.add(ballMesh);
    
        animate();
    
    });
}

///
init();

function animate() {

    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}




