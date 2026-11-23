import { useMemo } from 'react'
import { Group, Mesh, PlaneGeometry, MeshStandardMaterial, BoxGeometry, CylinderGeometry, TorusGeometry, SphereGeometry, RingGeometry, Vector3 } from 'three'
import Table from './Table'
import Chair from './Chair'
import Decor from './Decor'
import Lighting from './Lighting'
import { useAppStore } from '../../store/appStore'

const TABLE_LAYOUT = [
  // Row 1 (near window)
  { id: 1, position: [-6, 0, -6], rotation: 0, chairs: 4 },
  { id: 2, position: [-2, 0, -6], rotation: 0, chairs: 2 },
  { id: 3, position: [2, 0, -6], rotation: 0, chairs: 2 },
  { id: 4, position: [6, 0, -6], rotation: 0, chairs: 4 },

  // Row 2 (middle)
  { id: 5, position: [-6, 0, -1.5], rotation: 0, chairs: 4 },
  { id: 6, position: [-2, 0, -1.5], rotation: 0, chairs: 2 },
  { id: 7, position: [2, 0, -1.5], rotation: 0, chairs: 2 },
  { id: 8, position: [6, 0, -1.5], rotation: 0, chairs: 4 },

  // Row 3 (back)
  { id: 9, position: [-6, 0, 3], rotation: 0, chairs: 4 },
  { id: 10, position: [-2, 0, 3], rotation: 0, chairs: 2 },
  { id: 11, position: [2, 0, 3], rotation: 0, chairs: 2 },
  { id: 12, position: [6, 0, 3], rotation: 0, chairs: 4 }
]

function CafeScene() {
  const { tables } = useAppStore()

  const tableData = useMemo(() => {
    return TABLE_LAYOUT.map((layout) => {
      const tableInfo = tables.find((t) => t.id === layout.id)
      return {
        ...layout,
        status: tableInfo?.status || 'available',
        currentOrder: tableInfo?.currentOrder || null
      }
    })
  }, [tables])

  return (
    <Group>
      <Lighting />
      <Floor />
      <Walls />
      <Counter />
      <Decor />
      {tableData.map((table) => (
        <Table key={table.id} data={table} />
      ))}
    </Group>
  )
}

function Floor() {
  return (
    <Group>
      <Mesh
        receiveShadow
        position={[0, -0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <PlaneGeometry args={[28, 28, 50, 50]} />
        <MeshStandardMaterial
          color="#1a1a2e"
          roughness={0.9}
          metalness={0.05}
        />
      </Mesh>

      {/* Area rugs */}
      <Mesh
        receiveShadow
        position={[-4, 0.01, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <CylinderGeometry args={[3.5, 3.5, 0.05, 32]} />
        <MeshStandardMaterial
          color="#2a1a1a"
          roughness={0.95}
          metalness={0}
        />
      </Mesh>

      <Mesh
        receiveShadow
        position={[4, 0.01, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <CylinderGeometry args={[3.5, 3.5, 0.05, 32]} />
        <MeshStandardMaterial
          color="#2a1a1a"
          roughness={0.95}
          metalness={0}
        />
      </Mesh>

      <Mesh
        receiveShadow
        position={[0, 0.01, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <CylinderGeometry args={[4, 4, 0.05, 32]} />
        <MeshStandardMaterial
          color="#1a2a2a"
          roughness={0.95}
          metalness={0}
        />
      </Mesh>
    </Group>
  )
}

function Walls() {
  return (
    <Group>
      {/* Back wall */}
      <Mesh
        receiveShadow
        position={[0, 2.5, -14]}
        scale={[28, 5, 0.2]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a1510"
          roughness={0.9}
          metalness={0.05}
        />
      </Mesh>

      {/* Side walls */}
      <Mesh
        receiveShadow
        position={[-14, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[28, 5, 0.2]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a1510"
          roughness={0.9}
          metalness={0.05}
        />
      </Mesh>

      <Mesh
        receiveShadow
        position={[14, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[28, 5, 0.2]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a1510"
          roughness={0.9}
          metalness={0.05}
        />
      </Mesh>

      {/* Window wall (front) - glass */}
      <Mesh
        position={[0, 2.5, 14]}
        scale={[28, 5, 0.1]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a2a3a"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.3}
          transmission={0.8}
          thickness={0.5}
        />
      </Mesh>

      {/* Window frames */}
      <WindowFrames />
    </Group>
  )
}

function WindowFrames() {
  const frames = []
  for (let i = 0; i < 7; i++) {
    const x = -12 + i * 4
    frames.push(
      <Mesh
        key={`frame-v-${i}`}
        position={[x, 2.5, 14.05]}
        scale={[0.08, 5, 0.1]}
        castShadow
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.2} />
      </Mesh>
    )
  }
  frames.push(
    <Mesh
      key="frame-h-top"
      position={[0, 5, 14.05]}
      scale={[28, 0.08, 0.1]}
      castShadow
    >
      <BoxGeometry />
      <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.2} />
    </Mesh>
  )
  frames.push(
    <Mesh
      key="frame-h-bottom"
      position={[0, 0, 14.05]}
      scale={[28, 0.08, 0.1]}
      castShadow
    >
      <BoxGeometry />
      <MeshStandardMaterial color="#2a2018" roughness={0.8} metalness={0.2} />
    </Mesh>
  )
  return <Group>{frames}</Group>
}

function Counter() {
  return (
    <Group position={[0, 0, -12]}>
      {/* Main counter */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, 0.6, 0]}
        scale={[20, 1.2, 2.5]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#2a2018"
          roughness={0.7}
          metalness={0.1}
        />
      </Mesh>

      {/* Counter top */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, 1.3, 0]}
        scale={[20.5, 0.1, 2.8]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a120a"
          roughness={0.3}
          metalness={0.2}
        />
      </Mesh>

      {/* Espresso machine */}
      <EspressoMachine position={[-6, 1.35, 0]} />

      {/* Grinder */}
      <Grinder position={[-8, 1.35, 0.8]} />
      <Grinder position={[-8, 1.35, -0.8]} />

      {/* Display case */}
      <DisplayCase position={[4, 1.35, 0]} />

      {/* Coffee beans jars */}
      <BeansJar position={[-4, 1.5, 1]} />
      <BeansJar position={[-4.5, 1.5, -1]} />

      {/* Till/Register */}
      <Register position={[8, 1.35, 0]} />

      {/* Menu board */}
      <MenuBoard position={[0, 3.5, -1.5]} />
    </Group>
  )
}

function EspressoMachine({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        position={[0, 0.25, 0]}
        scale={[1.2, 0.5, 0.8]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 0.6, 0]}
        scale={[0.8, 0.2, 0.6]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
      </Mesh>
      {/* Group heads */}
      <Mesh
        castShadow
        position={[-0.3, 0.75, 0.2]}
        scale={[0.15, 0.3, 0.15]}
      >
        <CylinderGeometry args={[0.5, 0.5, 1, 16]} />
        <MeshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </Mesh>
      <Mesh
        castShadow
        position={[0.3, 0.75, 0.2]}
        scale={[0.15, 0.3, 0.15]}
      >
        <CylinderGeometry args={[0.5, 0.5, 1, 16]} />
        <MeshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </Mesh>
      {/* Steam wands */}
      <Mesh
        position={[-0.55, 0.7, 0.4]}
        rotation={[-0.3, 0, 0]}
        scale={[0.03, 0.4, 0.03]}
      >
        <CylinderGeometry args={[1, 1, 1, 8]} />
        <MeshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </Mesh>
      <Mesh
        position={[0.55, 0.7, 0.4]}
        rotation={[-0.3, 0, 0]}
        scale={[0.03, 0.4, 0.03]}
      >
        <CylinderGeometry args={[1, 1, 1, 8]} />
        <MeshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </Mesh>
      {/* Pressure gauge */}
      <Mesh
        castShadow
        position={[0, 0.9, -0.3]}
        scale={[0.2, 0.2, 0.1]}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </Mesh>
    </Group>
  )
}

function Grinder({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        position={[0, 0.15, 0]}
        scale={[0.25, 0.3, 0.25]}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 0.4, 0]}
        scale={[0.15, 0.2, 0.15]}
      >
        <CylinderGeometry args={[1, 0.7, 1, 16]} />
        <MeshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </Mesh>
    </Group>
  )
}

function DisplayCase({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        receiveShadow
        position={[0, 0.2, 0]}
        scale={[1.5, 0.4, 0.8]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </Mesh>
      <Mesh
        position={[0, 0.5, 0]}
        scale={[1.4, 0.3, 0.7]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#1a2a2a"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.4}
          transmission={0.9}
        />
      </Mesh>
      {/* Pastries inside */}
      <Mesh
        castShadow
        position={[-0.4, 0.45, 0.1]}
        scale={[0.15, 0.08, 0.15]}
      >
        <SphereGeometry args={[1, 16, 16]} />
        <MeshStandardMaterial color="#d4a843" roughness={0.8} metalness={0} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 0.45, -0.1]}
        scale={[0.12, 0.06, 0.12]}
      >
        <SphereGeometry args={[1, 16, 16]} />
        <MeshStandardMaterial color="#c47030" roughness={0.8} metalness={0} />
      </Mesh>
      <Mesh
        castShadow
        position={[0.4, 0.45, 0.1]}
        scale={[0.1, 0.05, 0.2]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#e8c56d" roughness={0.8} metalness={0} />
      </Mesh>
    </Group>
  )
}

function BeansJar({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        position={[0, 0.15, 0]}
        scale={[0.18, 0.3, 0.18]}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial
          color="#1a2a2a"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
          transmission={0.8}
        />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 0.3, 0]}
        scale={[0.16, 0.05, 0.16]}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.9} />
      </Mesh>
      {/* Beans */}
      <Mesh
        position={[0, 0.15, 0]}
        scale={[0.15, 0.25, 0.15]}
      >
        <SphereGeometry args={[0.3, 8, 8]} />
        <MeshStandardMaterial color="#2a1810" roughness={0.9} metalness={0} />
      </Mesh>
    </Group>
  )
}

function Register({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        position={[0, 0.15, 0]}
        scale={[0.5, 0.3, 0.4]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </Mesh>
      <Mesh
        castShadow
        position={[0, 0.35, -0.15]}
        scale={[0.4, 0.2, 0.05]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#0a1a0a" roughness={0.1} metalness={0.8} />
      </Mesh>
    </Group>
  )
}

function MenuBoard({ position }) {
  return (
    <Group position={position}>
      <Mesh
        castShadow
        position={[0, 0, 0]}
        scale={[4, 2, 0.05]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.8} metalness={0.1} />
      </Mesh>
      <Mesh
        position={[0, 0.6, 0.06]}
        scale={[3.5, 0.5, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial
          color="#d4a843"
          roughness={0.2}
          metalness={0.5}
          emissive="#d4a843"
          emissiveIntensity={0.3}
        />
      </Mesh>
      <Mesh
        position={[0, -0.6, 0.06]}
        scale={[3.5, 0.8, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#3a3020" roughness={0.8} metalness={0.1} />
      </Mesh>
    </Group>
  )
}

export default CafeScene