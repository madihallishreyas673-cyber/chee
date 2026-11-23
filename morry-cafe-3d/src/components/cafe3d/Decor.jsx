import { Group, Mesh, BoxGeometry, CylinderGeometry, SphereGeometry, ConeGeometry, MeshStandardMaterial, TorusGeometry, PlaneGeometry } from 'three'

function Decor() {
  return (
    <Group>
      {/* Hanging pendant lights */}
      <PendantLights />

      {/* Wall sconces */}
      <WallSconces />

      {/* Plants */}
      <Plants />

      {/* Wall art */}
      <WallArt />

      {/* Ceiling beams */}
      <CeilingBeams />
    </Group>
  )
}

function PendantLights() {
  const positions = [
    [-4, 4.5, -4], [4, 4.5, -4],
    [-4, 4.5, 2], [4, 4.5, 2],
    [0, 4.5, -8]
  ]

  return (
    <Group>
      {positions.map((pos, i) => (
        <Group key={i} position={pos}>
          {/* Cord */}
          <Mesh
            position={[0, 3.5, 0]}
            scale={[0.015, 3.5, 0.015]}
          >
            <CylinderGeometry args={[1, 1, 1, 8]} />
            <MeshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0} />
          </Mesh>
          {/* Light fixture */}
          <Mesh
            castShadow
            position={[0, 2.2, 0]}
            scale={[0.4, 0.3, 0.4]}
          >
            <ConeGeometry args={[1, 1, 16]} />
            <MeshStandardMaterial
              color="#1a1a1a"
              roughness={0.3}
              metalness={0.7}
            />
          </Mesh>
          {/* Inner glow */}
          <Mesh
            position={[0, 2.3, 0]}
            scale={[0.35, 0.1, 0.35]}
          >
            <CylinderGeometry args={[1, 1, 1, 16]} />
            <MeshStandardMaterial
              color="#ffd7a0"
              emissive="#ffd7a0"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </Mesh>
        </Group>
      ))}
    </Group>
  )
}

function WallSconces() {
  const positions = [
    [-13.9, 2, -10], [-13.9, 2, -5], [-13.9, 2, 0], [-13.9, 2, 5], [-13.9, 2, 10],
    [13.9, 2, -10], [13.9, 2, -5], [13.9, 2, 0], [13.9, 2, 5], [13.9, 2, 10]
  ]

  return (
    <Group>
      {positions.map((pos, i) => (
        <Group key={i} position={pos} rotation={[0, pos[0] > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <Mesh
            castShadow
            position={[0.15, 0, 0]}
            scale={[0.15, 0.2, 0.3]}
          >
            <BoxGeometry />
            <MeshStandardMaterial color="#c0a060" roughness={0.3} metalness={0.6} />
          </Mesh>
          <Mesh
            position={[0.35, 0, 0]}
            scale={[0.05, 0.15, 0.2]}
          >
            <BoxGeometry />
            <MeshStandardMaterial
              color="#ffd7a0"
              emissive="#ffd7a0"
              emissiveIntensity={1.5}
              transparent
              opacity={0.9}
            />
          </Mesh>
        </Group>
      ))}
    </Group>
  )
}

function Plants() {
  const plants = [
    { pos: [-12, 0, -12], height: 2.5, type: 'large' },
    { pos: [12, 0, -12], height: 2.5, type: 'large' },
    { pos: [-12, 0, 12], height: 2, type: 'medium' },
    { pos: [12, 0, 12], height: 2, type: 'medium' },
    { pos: [-8, 0.75, -8], height: 1, type: 'small', onTable: true },
    { pos: [8, 0.75, -8], height: 1, type: 'small', onTable: true },
    { pos: [0, 0.75, 4], height: 1, type: 'small', onTable: true }
  ]

  return (
    <Group>
      {plants.map((plant, i) => (
        <Plant key={i} {...plant} />
      ))}
    </Group>
  )
}

function Plant({ pos, height, type, onTable }) {
  const colors = {
    large: ['#2a4a2a', '#3a5a3a', '#1a3a1a'],
    medium: ['#3a5a3a', '#4a6a4a', '#2a4a2a'],
    small: ['#4a6a4a', '#5a7a5a', '#3a5a3a']
  }

  const plantColors = colors[type]
  const trunkHeight = onTable ? 0.3 : height * 0.3
  const foliageHeight = height - trunkHeight

  return (
    <Group position={pos}>
      {/* Pot */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, onTable ? 0.75 : 0.2, 0]}
        scale={[onTable ? 0.15 : 0.3, onTable ? 0.15 : 0.2, onTable ? 0.15 : 0.3]}
      >
        <CylinderGeometry args={[1, 0.8, 1, 12]} />
        <MeshStandardMaterial color="#3a2518" roughness={0.9} metalness={0} />
      </Mesh>

      {/* Soil */}
      <Mesh
        position={[0, onTable ? 0.85 : 0.35, 0]}
        scale={[onTable ? 0.13 : 0.25, 0.03, onTable ? 0.13 : 0.25]}
      >
        <CylinderGeometry args={[1, 1, 1, 12]} />
        <MeshStandardMaterial color="#1a1008" roughness={1} metalness={0} />
      </Mesh>

      {/* Trunk */}
      <Mesh
        castShadow
        position={[0, onTable ? 0.95 : 0.5, 0]}
        scale={[0.03, trunkHeight, 0.03]}
      >
        <CylinderGeometry args={[1, 0.8, 1, 8]} />
        <MeshStandardMaterial color="#2a1a0a" roughness={0.9} metalness={0} />
      </Mesh>

      {/* Foliage layers */}
      {Array.from({ length: type === 'large' ? 4 : type === 'medium' ? 3 : 2 }, (_, i) => (
        <Mesh
          key={i}
          castShadow
          position={[
            0,
            onTable ? 0.95 + trunkHeight + i * (foliageHeight / (type === 'large' ? 4 : 3)) : 0.5 + trunkHeight + i * (foliageHeight / (type === 'large' ? 4 : 3)),
            0
          ]}
          scale={[
            (type === 'large' ? 0.8 : type === 'medium' ? 0.6 : 0.4) * (1 - i * 0.15),
            foliageHeight / (type === 'large' ? 4 : type === 'medium' ? 3 : 2),
            (type === 'large' ? 0.8 : type === 'medium' ? 0.6 : 0.4) * (1 - i * 0.15)
          ]}
        >
          <SphereGeometry args={[1, 12, 12]} />
          <MeshStandardMaterial
            color={plantColors[i % plantColors.length]}
            roughness={0.95}
            metalness={0}
          />
        </Mesh>
      ))}
    </Group>
  )
}

function WallArt() {
  const arts = [
    { pos: [-13.95, 2.5, -8], size: [1.5, 1], rotation: Math.PI / 2 },
    { pos: [-13.95, 2.5, 0], size: [1.5, 1], rotation: Math.PI / 2 },
    { pos: [-13.95, 2.5, 8], size: [1.5, 1], rotation: Math.PI / 2 },
    { pos: [13.95, 2.5, -6], size: [2, 1.2], rotation: -Math.PI / 2 },
    { pos: [13.95, 2.5, 6], size: [2, 1.2], rotation: -Math.PI / 2 }
  ]

  return (
    <Group>
      {arts.map((art, i) => (
        <Group key={i} position={art.pos} rotation={[0, art.rotation, 0]}>
          {/* Frame */}
          <Mesh
            castShadow
            position={[0.03, 0, 0]}
            scale={[art.size[0] + 0.1, art.size[1] + 0.1, 0.05]}
          >
            <BoxGeometry />
            <MeshStandardMaterial color="#2a2018" roughness={0.6} metalness={0.2} />
          </Mesh>
          {/* Art canvas */}
          <Mesh
            position={[0.06, 0, 0]}
            scale={[art.size[0], art.size[1], 0.02]}
          >
            <BoxGeometry />
            <MeshStandardMaterial
              color={i % 2 === 0 ? '#2a1a1a' : '#1a2a2a'}
              roughness={0.8}
              metalness={0.05}
            />
          </Mesh>
          {/* Gold accent line */}
          <Mesh
            position={[0.07, art.size[1] * 0.3, 0]}
            scale={[art.size[0] * 0.6, 0.01, 0.03]}
          >
            <BoxGeometry />
            <MeshStandardMaterial color="#d4a843" roughness={0.3} metalness={0.8} />
          </Mesh>
        </Group>
      ))}
    </Group>
  )
}

function CeilingBeams() {
  return (
    <Group>
      {/* Main beams */}
      <Mesh
        castShadow
        position={[0, 5, -8]}
        scale={[26, 0.25, 0.25]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 5, 0]}
        scale={[26, 0.25, 0.25]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 5, 8]}
        scale={[26, 0.25, 0.25]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.1} />
      </Mesh>

      {/* Cross beams */}
      <Mesh
        castShadow
        position={[-8, 5, 0]}
        scale={[0.25, 0.25, 20]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        position={[8, 5, 0]}
        scale={[0.25, 0.25, 20]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.1} />
      </Mesh>
    </Group>
  )
}

export default Decor