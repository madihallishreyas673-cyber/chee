import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html, ContactShadows } from '@react-three/drei'
import CafeScene from './components/cafe3d/CafeScene'
import Header from './components/ui/Header'
import QRPanel from './components/ui/QRPanel'
import OrderModal from './components/ordering/OrderModal'
import CartSidebar from './components/ordering/CartSidebar'
import StaffDashboard from './components/staff/StaffDashboard'
import LoadingScreen from './components/ui/LoadingScreen'
import ToastContainer from './components/ui/ToastContainer'
import { useAppStore } from './store/appStore'
import { useSocket } from './hooks/useSocket'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showStaff, setShowStaff] = useState(false)
  const { initSocket } = useSocket()
  const { setTables, addNotification } = useAppStore()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    initSocket()
    // Initialize demo tables
    const tables = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      position: [0, 0, 0],
      status: Math.random() > 0.7 ? 'occupied' : 'available',
      currentOrder: null
    }))
    setTables(tables)
  }, [initSocket, setTables])

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <div className="app">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        style={{ touchAction: 'none' }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor(0x0f0f1a, 1)
          gl.toneMapping = 3
          gl.toneMappingExposure = 1.1
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 8, 12]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={8}
          maxDistance={25}
          target={[0, 0, 0]}
        />
        <ambientLight color="#ffffff" intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <directionalLight position={[-10, 15, -10]} intensity={0.4} color="#ffd7a0" />
        <CafeScene />
        <ContactShadows opacity={0.15} scale={20} blur={2} far={10} />
      </Canvas>

      <div className="overlay-ui">
        <Header onStaffClick={() => setShowStaff(true)} />
        <QRPanel />
        <OrderModal />
        <CartSidebar />
        {showStaff && <StaffDashboard onClose={() => setShowStaff(false)} />}
        <ToastContainer />
      </div>
    </div>
  )
}

export default App