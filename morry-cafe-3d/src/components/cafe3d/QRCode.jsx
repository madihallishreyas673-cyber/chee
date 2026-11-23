import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, BoxGeometry, MeshStandardMaterial } from 'three'
import { Html } from '@react-three/drei'
import QRCode from 'qrcode.react'

function QRCodeComponent({ tableId, position, status }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const orderUrl = `${baseUrl}/order/${tableId}`

  return (
    <Group position={position}>
      {/* QR Code stand */}
      <Mesh
        castShadow
        position={[0, 0.05, 0]}
        scale={[0.03, 0.1, 0.03]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.6} metalness={0.1} />
      </Mesh>

      {/* QR Code card */}
      <Mesh
        castShadow
        position={[0, 0.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.4, 0.4, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#ffffff" roughness={0.1} metalness={0} />
      </Mesh>

      {/* QR Code HTML overlay */}
      <Html
        transform
        position={[0, 0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.0015}
        fullscreen
        distanceFactor={5}
        zIndexRange={[100, 100]}
      >
        <div style={{
          background: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          minWidth: '200px'
        }}>
          <QRCode
            value={orderUrl}
            size={120}
            level="M"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#1a1a2e"
          />
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#1a1a2e',
            textAlign: 'center'
          }}>
            Table {tableId}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            color: '#7a7568',
            textAlign: 'center'
          }}>
            Scan to Order
          </div>
        </div>
      </Html>

      {/* Status indicator on QR stand */}
      <Mesh
        position={[0, 0.38, 0]}
        scale={[0.12, 0.12, 0.02]}
      >
        <CylinderGeometry args={[1, 1, 1, 16]} />
        <MeshStandardMaterial
          color={status === 'occupied' ? '#e86c5a' : '#4ade80'}
          emissive={status === 'occupied' ? '#e86c5a' : '#4ade80'}
          emissiveIntensity={0.5}
        />
      </Mesh>
    </Group>
  )
}

export default QRCodeComponent