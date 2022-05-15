import * as THREE from './three.module.js';
// import * as THREE from './three.js';
import { OrbitControls } from './OrbitControls.js';
import { FlakesTexture } from './FlakesTexture.js';
import { RGBELoader } from './RGBELoader.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';
function init() {
    // SCENE
    const scene = new THREE.Scene();
    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // INIT CAMERA
    // camera.position.z = 45;
    // camera.position.x = 3;
    // camera.position.y = 20;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth-17,window.innerHeight-300);
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    // RESIZE HAMDLER
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // SCENE
    //scene.background = new THREE.Color(0x000000);

    let starWarsText;
    // TEXT
    const loader = new FontLoader();
   
    if(window.innerWidth<500){
        loader.load('fontsbold.json', function (font) {

            const lorem = 'A time not so long ago .....\n\n'+
            'Yadav Jivan... A up and coming Software developer\n'+
            'That loves to work in a team a fast learner and\n'+
            'communicates well.'+'He is passionate about\n'+
            'programming and taking real word problem'+'and\n'+
            'solving it digitally.'+'He programs fluently in\n'+
            '8 programing '+'languages and comfortable with azure\n'+
            'With 6 years of programming'+'experience.\n'+
            'Skilful at hardware and software.\n'+
            'There is not better a '+'package!\n\n\nI am Yadav and this is my profile'
    
            const geometry = new TextGeometry(lorem, {
                font: font,
                size: 0.3,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelOffset: 0,
                bevelSegments: 1,
                bevelSize: 0.3,
                bevelThickness: 1
            });
            const materials = [
                new THREE.MeshPhongMaterial({ color: 0xFFFF00 }), // front
                new THREE.MeshPhongMaterial({ color: 0x999999 }) // side
            ];
            starWarsText = new THREE.Mesh(geometry, materials);
            starWarsText.castShadow = true
            starWarsText.position.z = -50
            starWarsText.position.y = -10
            starWarsText.position.x = -30
            starWarsText.rotation.x = - Math.PI / 4
            scene.add(starWarsText)
        });
    }else{
        loader.load('fontsbold.json', function (font) {

            const lorem = 'A time not so long ago .....\n\n'+
            'Yadav Jivan... A up and coming Software developer\n'+
            'That loves to work in a team a fast learner and\n'+
            'communicates well.'+'He is passionate about\n'+
            'programming and taking real word problem'+'and\n'+
            'solving it digitally.'+'He programs fluently in\n'+
            '8 programing '+'languages and comfortable with azure\n'+
            'With 6 years of programming '+'experience.\n'+
            'Skilful at hardware and software.\n'+
            'There is not better a '+'package!\n\n\nI am Yadav and this is my profile'
    
            const geometry = new TextGeometry(lorem, {
                font: font,
                size: 2,
                height: 0,
                curveSegments: 10,
                bevelEnabled: false,
                bevelOffset: 0,
                bevelSegments: 1,
                bevelSize: 0.3,
                bevelThickness: 1
            });
            const materials = [
                new THREE.MeshPhongMaterial({ color: 0xFFFF00 }), // front
                new THREE.MeshPhongMaterial({ color: 0x999999 }) // side
            ];
            starWarsText = new THREE.Mesh(geometry, materials);
            starWarsText.castShadow = true
            starWarsText.position.z = -50
            starWarsText.position.y = -10
            starWarsText.position.x = -30
            starWarsText.rotation.x = - Math.PI / 4
            scene.add(starWarsText)
        });
    }
   
    var bgTexture = new THREE.TextureLoader().load("./794392.jpg");
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;

    // ANIMATE
    function animate() {
        if (starWarsText) {
            starWarsText.position.y += 0.02;
            starWarsText.position.z -= 0.02;

            if( starWarsText.position.y>35){
                starWarsText.position.z = -50
                starWarsText.position.y = -10
                starWarsText.position.x = -30
               
            }
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();

}
init();