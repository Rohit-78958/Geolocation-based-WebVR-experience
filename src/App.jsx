import { Canvas } from '@react-three/fiber'
import React, {useState,Suspense} from 'react'
import { Html, useProgress } from '@react-three/drei'
import GlobeScene from './components/Globe'
import PlantScene from './components/PlantScene'
import Loader from './components/Loader'

function App() {
  const [currentScene, setCurrentScene] = useState('globe')

  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }}>
      <Suspense fallback={<Loader />}>
        {currentScene === 'globe' ? (
          <GlobeScene onSwitchToPlantScene={() => setCurrentScene('plant')} />
        ) : (
          <PlantScene onBack={() => setCurrentScene('globe')} />
        )}
      </Suspense>
    </Canvas>
  )
}

export default App