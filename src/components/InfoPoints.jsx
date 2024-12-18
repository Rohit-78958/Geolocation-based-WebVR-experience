import React, { useRef, useState, useCallback } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const InfoPoint = ({ position, info, imageUrl, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const sphereRef = useRef()

  const handleClick = useCallback(() => {
    const targetPosition = [...position]
    targetPosition[0] *= 1.5
    targetPosition[1] *= 1.5
    targetPosition[2] *= 1.5

    setTimeout(() => {
      onClick()
    }, 1000)
  }, [position, onClick])

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(hovered ? 2.4 : 1.4 + Math.sin(state.clock.elapsedTime * 5) * 0.1)
    }
  })

  return (
    <group position={position} scale={0.18}>
      <mesh
        ref={sphereRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color={hovered ? 'red' : 'yellow'} />
        {hovered &&
          <Html distanceFactor={4}>
            <div className="bg-white/90 p-2 rounded-lg shadow-lg">
              <p className="text-xs font-bold text-center">
                {info}
              </p>
            </div>
          </Html>
        }
      </mesh>
    </group>
  )
}

export default InfoPoint