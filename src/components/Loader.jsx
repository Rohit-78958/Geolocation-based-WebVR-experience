import { Html, useProgress } from '@react-three/drei'


export default function Loader() {
  const { progress } = useProgress()
  return <Html center>
  <div className='w-screen h-screen flex justify-center items-center text-white bg-zinc-800'>
    {progress.toFixed(2)} % loaded
  </div>
</Html>
}