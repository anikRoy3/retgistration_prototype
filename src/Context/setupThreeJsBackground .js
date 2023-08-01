import * as THREE from "three";

const setupThreeJsBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.Camera();

    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load("/image-two.jpg");

    const backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({ map: backgroundTexture })
    );

    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;

    backgroundScene.add(backgroundCamera);
    backgroundScene.add(backgroundMesh);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    function animate() {
        requestAnimationFrame(animate);

        // Update your animations or controls here if needed

        renderer.autoClear = false;
        renderer.clear();
        renderer.render(backgroundScene, backgroundCamera);
        renderer.render(scene, camera);
    }

    animate(); // Call the animate function here
};

export default setupThreeJsBackground;
