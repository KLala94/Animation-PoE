import * as THREE from './build/three.module.js'
import { OrbitControls } from './OrbitControls.js';
import { OBJLoader } from './OBJLoader.js';
import { MTLLoader } from './MTLLoader.js';
var PoE;
const mtlLoader = new MTLLoader();
        mtlLoader.load('./data/Poe.mtl', (mtl) => {
            mtl.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(mtl);
            objLoader.load('./data/Poe.obj', async(root) => {
                PoE = await root;
                scene.add(PoE);
            });
        });
        var scene;
        function init() {
            scene = new THREE.Scene();

    //start lights_____________________________________________________________
    // light one
    var spotLight = new THREE.SpotLight(0xffffff);
    var spotLight = getSpotLight(1);
    spotLight.position.set(0, 20, 150);
    spotLight.position.y = 20;
    spotLight.intensity = 2;
    spotLight.castShadow = true;

    // light two
    var spotLight2 = new THREE.SpotLight(0xffffff);
    var spotLight2 = getSpotLight(1);
    spotLight2.position.set(7, 7, 7);


    spotLight2.castShadow = true;
    // spotLight
    function getSpotLight(intensity) {
        var spotLight = new THREE.SpotLight(0xffffff, intensity);
        spotLight.castShadow = true;

        spotLight.shadow.bias = 0.001;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        return spotLight;
    }
    //end lights_______________________________________________________________
    //Start Camera ____________________________________________________________
    var camera = new THREE.PerspectiveCamera(65, 1000 / 1000, 1, 3000);
    // var camera = new THREE.OrthographicCamera(-15, 15, 15, -15, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 29;
    camera.position.z = 150;
    camera.lookAt(new THREE.Vector3(1, 1, 1));

    //End   Camera ___________________________________________________________

    // Add items to the scene
    // scene.add(Metal.object);
    // scene.add(PoE);

    // scene.add(plane);
    scene.add(spotLight);
    scene.add(spotLight2);


    // renderer here
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(500, 500);
    renderer.setClearColor('rgb(0,0,128)');
    document.getElementById('webgl').appendChild(renderer.domElement);
    // document.getElementById("webgl").width = "10";
    var controls = new OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls, PoE);

    return scene;
        };

        function update(renderer, scene, camera, controls, Machine, Metal, moveObjectfw) {
            renderer.render(scene, camera);
        
        
            scene.traverse(function(chld) {
        
            });
            requestAnimationFrame(function() {
                update(renderer, scene, camera, controls, Machine, Metal);
            });
        
        };
        init();