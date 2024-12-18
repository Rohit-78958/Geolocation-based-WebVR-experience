import { Canvas } from '@react-three/fiber'
import React, {useState,Suspense} from 'react'
import { Html, useProgress } from '@react-three/drei'
import GlobeScene from './components/ModelComponents/Globe'
import PlantScene from './components/PlantScene'

function Loader() {
  const { progress } = useProgress()
  return <Html center>
  <div className='w-screen h-screen flex justify-center items-center text-white bg-zinc-800'>
    {progress.toFixed(2)} % loaded
  </div>
</Html>
}

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