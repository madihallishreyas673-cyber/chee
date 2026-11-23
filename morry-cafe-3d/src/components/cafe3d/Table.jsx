import { useRef, useState } from 'react'
import { Group, Mesh, CylinderGeometry, BoxGeometry, TorusGeometry, MeshStandardMaterial, RingGeometry, Vector3 } from 'three'
import { Html } from '@react-three/drei'
import Chair from './Chair'
import QRCode from './QRCode'

function Table({ data }) {
  const { id, position, rotation, chairs, status, currentOrder } = data
  const [isHovered, setIsHovered] = useState(false)
  const groupRef = useRef()

  const getStatusColor = () => {
    switch (status) {
      case 'occupied': return '#e86c5a'
      case 'reserved': return '#fbbf24'
      default: return '#4ade80'
    }
  }

  const getStatusEmoji = () => {
    switch (status) {
      case 'occupied': return '👥'
      case 'reserved': return '📅'
      default: return '✅'
    }
  }

  return (
    <Group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Table base */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, 0.35, 0]}
        scale={[0.15, 0.7, 0.15]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial
          color="#1a120a"
          roughness={0.6}
          metalness={0.1}
        />
      </Mesh>

      {/* Table top */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, 0.72, 0]}
        scale={[1.2, 0.06, 1.2]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <CylinderGeometry args={[1, 1, 1, 32]} />
        <MeshStandardMaterial
          color="#2a1f14"
          roughness={0.7}
          metalness={0.05}
        />
      </Mesh>

      {/* Table top surface detail */}
      <Mesh
        position={[0, 0.755, 0]}
        scale={[1.15, 0.01, 1.15]}
      >
        <CylinderGeometry args={[1, 1, 1, 32]} />
        <MeshStandardMaterial
          color="#3a2f22"
          roughness={0.8}
          metalness={0.02}
        />
      </Mesh>

      {/* Status indicator ring */}
      <Mesh
        position={[0, 0.77, 0]}
        scale={[1.4, 0.02, 1.4]}
      >
        <RingGeometry args={[1, 1.05, 32]} />
        <MeshStandardMaterial
          color={getStatusColor()}
          transparent
          opacity={isHovered ? 0.6 : 0.3}
          side={2}
          emissive={getStatusColor()}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </Mesh>

      {/* QR Code on table */}
      <QRCode tableId={id} position={[0, 0.8, 0]} status={status} />

      {/* Chairs */}
      {Array.from({ length: chairs }, (_, i) => {
        const angle = (i / chairs) * Math.PI * 2
        const radius = 1.5
        const chairX = Math.sin(angle) * radius
        const chairZ = Math.cos(angle) * radius
        const chairRotation = -angle + Math.PI
        return (
          <Chair
            key={i}
            position={[chairX, 0, chairZ]}
            rotation={chairRotation}
          />
        )
      })}

      {/* Hover info panel */}
      <Html
        transform
        position={[0, 1.8, 0]}
        style={{ pointerEvents: 'none' }}
        fullscreen
        distanceFactor={10}
      >
        <div
          className={`table-info-panel ${isHovered ? 'visible' : ''}`}
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
            transition: 'all 0.2s ease',
            pointerEvents: 'none'
          }}
        >
          <div className="table-info-card">
            <div className="table-number">Table {id}</div>
            <div className="table-status" style={{ color: getStatusColor() }}>
              <span className="status-dot" style={{ background: getStatusColor() }}></span>
              {status.charAt(0).toUpperCase() + status.slice(1)} {getStatusEmoji()}
            </div>
            {currentOrder && (
              <div className="table-order-preview">
                {currentOrder.items.length} items · ${currentOrder.total.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </Html>
    </Group>
  )
}

export default Table