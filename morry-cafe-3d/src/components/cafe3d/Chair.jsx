import { Group, Mesh, BoxGeometry, CylinderGeometry, MeshStandardMaterial } from 'three'

function Chair({ position = [0, 0, 0], rotation = 0 }) {
  return (
    <Group position={position} rotation={[0, rotation, 0]}>
      {/* Chair legs */}
      <Mesh
        castShadow
        receiveShadow
        position={[-0.3, 0.225, -0.3]}
        scale={[0.04, 0.45, 0.04]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.7} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        receiveShadow
        position={[0.3, 0.225, -0.3]}
        scale={[0.04, 0.45, 0.04]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.7} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        receiveShadow
        position={[-0.3, 0.225, 0.3]}
        scale={[0.04, 0.45, 0.04]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.7} metalness={0.1} />
      </Mesh>
      <Mesh
        castShadow
        receiveShadow
        position={[0.3, 0.225, 0.3]}
        scale={[0.04, 0.45, 0.04]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#1a120a" roughness={0.7} metalness={0.1} />
      </Mesh>

      {/* Seat */}
      <Mesh
        castShadow
        receiveShadow
        position={[0, 0.48, 0]}
        scale={[0.5, 0.06, 0.45]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a1f14" roughness={0.8} metalness={0.02} />
      </Mesh>

      {/* Seat cushion */}
      <Mesh
        castShadow
        position={[0, 0.52, 0]}
        scale={[0.48, 0.04, 0.43]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#3a2518" roughness={0.9} metalness={0} />
      </Mesh>

      {/* Backrest */}
      <Mesh
        castShadow
        position={[0, 0.85, -0.2]}
        scale={[0.5, 0.7, 0.06]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#2a1f14" roughness={0.8} metalness={0.02} />
      </Mesh>

      {/* Backrest slats */}
      <Mesh
        position={[0, 0.65, -0.23]}
        scale={[0.45, 0.15, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#3a2518" roughness={0.8} metalness={0} />
      </Mesh>
      <Mesh
        position={[0, 0.85, -0.23]}
        scale={[0.45, 0.15, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#3a2518" roughness={0.8} metalness={0} />
      </Mesh>
      <Mesh
        position={[0, 1.05, -0.23]}
        scale={[0.45, 0.15, 0.02]}
      >
        <BoxGeometry />
        <MeshStandardMaterial color="#3a2518" roughness={0.8} metalness={0} />
      </Mesh>
    </Group>
  )
}

export default Chair