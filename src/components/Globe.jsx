import React, { useEffect, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import InfoPoint from './InfoPoints';
import gsap from 'gsap';


// Helper function: Convert lat/lon to 3D sphere position
function latLonToXYZ(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

// Globe with clouds
const GlobeWithClouds = () => {
  const [cloudsTexture, setCloudsTexture] = useState(null);

  // Load textures
  const globeTexture = useTexture('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const bumpTexture = useTexture('https://unpkg.com/three-globe/example/img/earth-topology.png');

  useEffect(() => {
    new THREE.TextureLoader().load('./clouds.png', setCloudsTexture);
  }, []);

  return (
    <>
      {/* Globe */}
      <mesh scale={1.5}>
        <sphereGeometry args={[2, 50, 50]} />
        <ambientLight intensity={2} />
        <meshStandardMaterial
          map={globeTexture}
          bumpMap={bumpTexture}
          bumpScale={0.1}
        />
      </mesh>

      {/* Clouds */}
      {cloudsTexture && (
        <mesh>
          <sphereGeometry args={[2.02, 75, 75]} />
          <meshPhongMaterial map={cloudsTexture} transparent opacity={0.6} />
        </mesh>
      )}
    </>
  );
};

// Main Scene
const GlobeScene = ({ onSwitchToPlantScene }) => {
  const { camera } = useThree();
  
  // Add useEffect to reset camera position when component mounts
  useEffect(() => {
    gsap.to(camera.position, {
      duration: 1.5,
      x: 0,
      y: 0,
      z: 8, // Initial camera distance from globe
      ease: "power2.inOut"
    });
  }, [camera]);

  const handleInfoPointClick = useCallback((position) => {
    // Get the current camera direction
    const direction = position.map(coord => coord / Math.sqrt(position.reduce((sum, coord) => sum + coord * coord, 0)));

    // Make camera look at the clicked point
    gsap.to(camera.lookAt, {
      duration: 1.5,
      x: position[0],
      y: position[1],
      z: position[2],
      ease: "power2.inOut"
    });
    
    // Calculate a closer position along the same line of sight
    gsap.to(camera.position, {
      duration: 1.5,
      x: direction[0] * 2.5, // Reduced from 4 to 2.5 for closer zoom
      y: direction[1] * 2.5,
      z: direction[2] * 2.5,
      ease: "power2.inOut",
      onComplete: () => onSwitchToPlantScene()
    });

  }, [camera, onSwitchToPlantScene]);

  const pinpoints = [
    { lat: 12.9749, lon: 77.4194, info: 'Bangalore', imageUrl: 'https://example.com/sf.jpg' },
    { lat: 28.8566, lon: 77.2522, info: 'Delhi', imageUrl: 'https://example.com/paris.jpg' },
    { lat: 18.6895, lon: 73.6917, info: 'Pune', imageUrl: 'https://example.com/tokyo.jpg' },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Controls */}
      <OrbitControls zoomSpeed={0.25} 
      minDistance={3.1} 
      maxDistance={5.5} 
      rotateSpeed={0.25} 
      />

      {/* Stars Background */}
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={2} />

      {/* Globe with Clouds */}
      <GlobeWithClouds />

      {/* Info Points */}
      {pinpoints.map((pin, index) => {
        const position = latLonToXYZ(pin.lat, pin.lon, 3);
        return (
          <InfoPoint
            key={index}
            position={position}
            info={pin.info}
            imageUrl={pin.imageUrl}
            onClick={() => handleInfoPointClick(position)}
          />
        );
      })}
    </>
  );
};

export default GlobeScene;
