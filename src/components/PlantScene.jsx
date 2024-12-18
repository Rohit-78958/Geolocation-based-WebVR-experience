import React, { useState, Suspense } from 'react';
import { Stats, Environment, Html, useProgress, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import ImagePlane from './ImagePlane';
import CameraLookAround from './CameraComponents/CameraLookAround';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className='w-screen h-screen flex justify-center items-center text-white bg-zinc-800'>
        {progress.toFixed(2)} % loaded
      </div>
    </Html>
  );
}

function BackgroundImage() {
  const texture = useTexture('images/showroom.jpg');

  return (
    <mesh position={[-600, 0, -50]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[2500, 1200]} /> {/* Adjust size */}
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function PlantScene({onBack}) {
  return (
    <>
        <PerspectiveCamera makeDefault fov={75} position={[100, 10, -8]} rotation={[0, Math.PI / 2, 0]} />
        {/* <Perf position="top-left" /> */}
        {/* <CameraLookAround /> */}
        <directionalLight position={[1, 10, 1]} />
        <Environment preset="warehouse" />
        {/* <Stats position="top-right" /> */}
        <Suspense fallback={<Loader />}>
          <BackgroundImage />

          {/* Add a back button */}
          <Html fullscreen>
            <button
              onClick={onBack}
              style={{
                position: 'absolute',
                left: '40px',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: '10'
              }}
            >
              Back
            </button>
          </Html>

          <ImagePlane position={[80, 7, -30]} />
          {/* <mesh position={[50, 1, -55]} rotation={[0, 0, 0]} receiveShadow>
            <cylinderGeometry args={[10, 10, 1, 64]} />
            <meshStandardMaterial color="white" />
          </mesh> */}

          <ImagePlane position={[80, 7, -15]} />
          {/* <mesh position={[40, 1, -108]} rotation={[0, 0, 0]} receiveShadow>
            <cylinderGeometry args={[10, 10, 1, 64]} />
            <meshStandardMaterial color="white" />
          </mesh> */}

          <ImagePlane position={[80, 7, 0]} />
          {/* <mesh position={[10, 1, -108]} rotation={[0, 0, 0]} receiveShadow>
            <cylinderGeometry args={[10, 10, 1, 64]} />
            <meshStandardMaterial color="white" />
          </mesh> */}

          <ImagePlane position={[80, 7, 15]} />
          {/* <mesh position={[-20, 1, -108]} rotation={[0, 0, 0]} receiveShadow>
            <cylinderGeometry args={[10, 10, 1, 64]} />
            <meshStandardMaterial color="white" />
          </mesh> */}
        </Suspense>
    </>
  );
}
