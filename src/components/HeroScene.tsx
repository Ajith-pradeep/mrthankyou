"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (error) {
      console.error("The 3D hero scene could not start.", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.2, 9.4);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    element.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    const gold = new THREE.MeshStandardMaterial({
      color: 0xd9ff63,
      metalness: 0.55,
      roughness: 0.28,
    });
    const ink = new THREE.MeshStandardMaterial({
      color: 0x1c201b,
      metalness: 0.2,
      roughness: 0.45,
    });
    const cream = new THREE.MeshStandardMaterial({
      color: 0xf3f0e4,
      metalness: 0.08,
      roughness: 0.62,
    });

    const stackGeo = new THREE.BoxGeometry(1.35, 0.16, 0.72);
    for (let i = 0; i < 7; i += 1) {
      const note = new THREE.Mesh(stackGeo, i % 2 === 0 ? gold : cream);
      note.position.set(-2.6, -1.1 + i * 0.18, 0.4);
      note.rotation.y = -0.35 + i * 0.04;
      world.add(note);
    }

    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
    const coins: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i += 1) {
      const coin = new THREE.Mesh(coinGeo, gold);
      coin.rotation.x = Math.PI / 2;
      coin.position.set(2.2 + (i % 2) * 0.35, -0.8 + i * 0.42, -0.2);
      coins.push(coin);
      world.add(coin);
    }

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.018, 8, 140),
      new THREE.MeshBasicMaterial({
        color: 0x1c201b,
        transparent: true,
        opacity: 0.22,
      }),
    );
    ring.rotation.x = 1.15;
    world.add(ring);

    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.05, 0.18),
      ink,
    );
    blade.position.set(0.3, 1.55, -0.4);
    world.add(blade);
    const rotor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16),
      ink,
    );
    rotor.position.set(0.3, 1.28, -0.4);
    world.add(rotor);
    const cabin = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), cream);
    cabin.scale.set(1.4, 0.7, 0.9);
    cabin.position.set(0.3, 0.82, -0.4);
    world.add(cabin);

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const fill = new THREE.PointLight(0xd9ff63, 8, 18);
    fill.position.set(3, 1, 4);
    scene.add(fill);

    const pointer = { x: 0, y: 0 };
    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 11.2 : 9.4;
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
      elapsed += 0.012;
      world.rotation.y = pointer.x + Math.sin(elapsed * 0.35) * 0.12;
      world.rotation.x = -pointer.y + Math.sin(elapsed * 0.28) * 0.05;
      blade.rotation.y = elapsed * 4.2;
      coins.forEach((coin, i) => {
        coin.rotation.z = elapsed * 0.8 + i;
        coin.position.y = -0.8 + i * 0.42 + Math.sin(elapsed * 1.2 + i) * 0.08;
      });
      ring.rotation.z = elapsed * 0.15;
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
      stackGeo.dispose();
      coinGeo.dispose();
      gold.dispose();
      ink.dispose();
      cream.dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      blade.geometry.dispose();
      rotor.geometry.dispose();
      cabin.geometry.dispose();
      renderer.dispose();
      if (element.contains(renderer.domElement)) {
        element.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="hero-scene"
      ref={host}
      aria-hidden="true"
    />
  );
}
