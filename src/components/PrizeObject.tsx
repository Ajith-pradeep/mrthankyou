"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PrizeObject() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (error) {
      console.error("The 3D prize illustration could not start.", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    element.appendChild(renderer.domElement);

    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    const coinArtwork = document.createElement("canvas");
    coinArtwork.width = 512;
    coinArtwork.height = 512;
    const context = coinArtwork.getContext("2d");
    if (!context) {
      renderer.dispose();
      element.removeChild(renderer.domElement);
      console.error("The 3D prize illustration could not draw its canvas texture.");
      return;
    }

    context.fillStyle = "#d9ff63";
    context.fillRect(0, 0, 512, 512);
    context.strokeStyle = "#26301b";
    context.lineWidth = 8;
    context.beginPath();
    context.arc(256, 256, 222, 0, Math.PI * 2);
    context.stroke();
    context.textAlign = "center";
    context.fillStyle = "#172018";
    context.font = "700 38px Arial, sans-serif";
    context.letterSpacing = "8px";
    context.fillText("A LITTLE", 256, 192);
    context.font = "700 74px Arial, sans-serif";
    context.letterSpacing = "1px";
    context.fillText("THANK", 256, 279);
    context.fillText("YOU!", 256, 363);
    context.font = "700 22px Arial, sans-serif";
    context.letterSpacing = "5px";
    context.fillText("PASS IT ON", 256, 420);

    const artwork = new THREE.CanvasTexture(coinArtwork);
    artwork.colorSpace = THREE.SRGBColorSpace;
    const faceMaterial = new THREE.MeshStandardMaterial({
      map: artwork,
      metalness: 0.24,
      roughness: 0.38,
    });
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xb2ce49,
      metalness: 0.82,
      roughness: 0.25,
    });
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.16, 1.16, 0.16, 96, 1, false),
      [edgeMaterial, faceMaterial, faceMaterial],
    );
    coin.rotation.x = Math.PI / 2;
    coinGroup.add(coin);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.56, 0.018, 10, 120),
      new THREE.MeshBasicMaterial({ color: 0xf3f5e4, transparent: true, opacity: 0.72 }),
    );
    halo.rotation.x = -0.18;
    coinGroup.add(halo);

    const innerHalo = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xf3f5e4, transparent: true, opacity: 0.35 }),
    );
    innerHalo.rotation.x = 0.24;
    coinGroup.add(innerHalo);

    scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(-3, 4, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xd9ff63, 14, 12);
    rimLight.position.set(2, -1, 3);
    scene.add(rimLight);

    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.025, 12, 12);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xf1f4dc });
    for (let index = 0; index < 18; index += 1) {
      const angle = (index / 18) * Math.PI * 2;
      const radius = 1.88 + (index % 3) * 0.1;
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      particles.add(particle);
    }
    scene.add(particles);

    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 500 ? 7.8 : 6.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let elapsed = 0;
    const animate = () => {
      elapsed += 0.008;
      coinGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.34;
      coinGroup.rotation.x = Math.PI / 2 + Math.sin(elapsed * 0.62) * 0.045;
      coinGroup.position.y = Math.sin(elapsed * 0.8) * 0.065;
      particles.rotation.z = elapsed * 0.055;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    if (!reduceMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      coin.geometry.dispose();
      edgeMaterial.dispose();
      faceMaterial.dispose();
      artwork.dispose();
      halo.geometry.dispose();
      halo.material.dispose();
      innerHalo.geometry.dispose();
      innerHalo.material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (element.contains(renderer.domElement)) {
        element.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="prize-stage" ref={host} role="img" aria-label="A slowly spinning thank-you coin">
      <div className="coin-fallback" aria-hidden="true">
        <span>A LITTLE</span>
        <strong>THANK<br />YOU!</strong>
        <span>PASS IT ON</span>
      </div>
    </div>
  );
}
