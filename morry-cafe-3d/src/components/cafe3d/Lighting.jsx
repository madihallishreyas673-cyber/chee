import { useMemo } from 'react'
import { RectAreaLight, SpotLight } from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

function Lighting() {
  const rectLights = useMemo(() => {
    RectAreaLightUniformsLib.init()
    return []
  }, [])

  return (
    <>
      {/* Warm accent spots on tables */}
      {[
        [-6, 4, -6], [-2, 4, -6], [2, 4, -6], [6, 4, -6],
        [-6, 4, -1.5], [-2, 4, -1.5], [2, 4, -1.5], [6, 4, -1.5],
        [-6, 4, 3], [-2, 4, 3], [2, 4, 3], [6, 4, 3]
      ].map((pos, i) => (
        <SpotLight
          key={`table-spot-${i}`}
          position={pos}
          target={[pos[0], 0, pos[2]]}
          color="#ffd7a0"
          intensity={0.3}
          angle={0.4}
          penumbra={0.5}
          decay={2}
          distance={10}
          castShadow={false}
        />
      ))}

      {/* Counter accent lights */}
      <SpotLight
        position={[-6, 4, -12]}
        target={[-6, 1.2, -12]}
        color="#ffd7a0"
        intensity={0.5}
        angle={0.3}
        penumbra={0.4}
        decay={2}
        distance={8}
      />
      <SpotLight
        position={[0, 4, -12]}
        target={[0, 1.2, -12]}
        color="#ffd7a0"
        intensity={0.5}
        angle={0.3}
        penumbra={0.4}
        decay={2}
        distance={8}
      />
      <SpotLight
        position={[6, 4, -12]}
        target={[6, 1.2, -12]}
        color="#ffd7a0"
        intensity={0.5}
        angle={0.3}
        penumbra={0.4}
        decay={2}
        distance={8}
      />

      {/* Window rim light */}
      <SpotLight
        position={[0, 4, 13]}
        target={[0, 2, 10]}
        color="#8ab4f8"
        intensity={0.2}
        angle={0.8}
        penumbra={1}
        decay={2}
        distance={30}
      />

      {/* Cozy corner lights */}
      <SpotLight
        position={[-10, 3, -10]}
        target={[-10, 1, -10]}
        color="#ffb360"
        intensity={0.25}
        angle={0.5}
        penumbra={0.6}
        decay={2}
        distance={8}
      />
      <SpotLight
        position={[10, 3, -10]}
        target={[10, 1, -10]}
        color="#ffb360"
        intensity={0.25}
        angle={0.5}
        penumbra={0.6}
        decay={2}
        distance={8}
      />
      <SpotLight
        position={[-10, 3, 10]}
        target={[-10, 1, 10]}
        color="#ffb360"
        intensity={0.2}
        angle={0.5}
        penumbra={0.6}
        decay={2}
        distance={8}
      />
      <SpotLight
        position={[10, 3, 10]}
        target={[10, 1, 10]}
        color="#ffb360"
        intensity={0.2}
        angle={0.5}
        penumbra={0.6}
        decay={2}
        distance={8}
      />
    </>
  )
}

export default Lighting