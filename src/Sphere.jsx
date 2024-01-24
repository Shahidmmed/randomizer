import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Sphere.scss";

const Sphere = () => {
  const containerRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isDragging = useRef(false);

  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const maxPhrasesToShow = 3;

  const generateRandomPhrase = () => {
    const nouns = ["Sun", "Moon", "Star", "Planet", "Galaxy"];
    const verbs = [
      "shining",
      "exploding",
      "rotating",
      "discovering",
      "traveling",
    ];

    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];

    return `${randomNoun} is ${randomVerb} vibes`;
  };

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setClearColor(0x00000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    const geometry = new THREE.BufferGeometry();
    const particles = 1000;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());

      const x = Math.sin(phi) * Math.cos(theta) * 2;
      const y = Math.sin(phi) * Math.sin(theta) * 2;
      const z = Math.cos(phi) * 2;

      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const points = new THREE.Points(geometry, material);

    scene.add(points);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      points.rotation.x += 0.001;
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const handleMouseDown = (event) => {
      isDragging.current = true;
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    const handleMouseMove = (event) => {
      if (isDragging.current) {
        const deltaY = (event.clientY - mouseY.current) / window.innerHeight;
        controls.rotateUp(2 * Math.PI * deltaY);
        mouseY.current = event.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleSphereClick = () => {
    const randomPhrase = generateRandomPhrase();
    setGeneratedPhrases((prevPhrases) => [...prevPhrases, randomPhrase]);

    if (generatedPhrases.length > maxPhrasesToShow - 1) {
      setGeneratedPhrases((prevPhrases) => prevPhrases.slice(1));
    }
  };

  return (
    <div className="sphere" ref={containerRef} onClick={handleSphereClick}>
      {generatedPhrases.map((phrase, index) => (
        <div key={index} className="generated-phrase">
          {phrase}
        </div>
      ))}
    </div>
  );
};

export default Sphere;
