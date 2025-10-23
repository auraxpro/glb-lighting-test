'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  lightingSettings: {
    hdriIntensity: number
    directionalLightIntensity: number
    directionalLightAngle: number
    ambientLightColor: string
    ambientLightIntensity: number
    environmentRotation: number
    roughness: number
    metalness: number
    backgroundType: 'hdri' | 'color' | 'studio'
    backgroundColor: string
    enableShadows: boolean
    shadowOpacity: number
  }
}

function GLBModel({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  const group = useRef<THREE.Group>(null)
  const gltf = useGLTF('/models/4-piece.glb')

  useEffect(() => {
    if (gltf?.scene) {
      // Apply material settings to all meshes in the model
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = lightingSettings.roughness
            child.material.metalness = lightingSettings.metalness
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [gltf, lightingSettings.roughness, lightingSettings.metalness])

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  )
}

function FallbackModel({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  const group = useRef<THREE.Group>(null)

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#888888"
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2]} />
        <meshStandardMaterial 
          color="#666666"
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
      <mesh position={[-3, 0, 0]}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial 
          color="#aaaaaa"
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
    </group>
  )
}

function Model({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  return (
    <Suspense fallback={<FallbackModel lightingSettings={lightingSettings} />}>
      <GLBModel lightingSettings={lightingSettings} />
    </Suspense>
  )
}

function Lighting({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)

  useEffect(() => {
    if (directionalLightRef.current) {
      const angle = (lightingSettings.directionalLightAngle * Math.PI) / 180
      directionalLightRef.current.position.set(
        Math.sin(angle) * 10,
        5,
        Math.cos(angle) * 10
      )
    }
  }, [lightingSettings.directionalLightAngle])

  return (
    <>
      {/* Ambient Light */}
      <ambientLight 
        color={lightingSettings.ambientLightColor} 
        intensity={lightingSettings.ambientLightIntensity} 
      />
      
      {/* Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        intensity={lightingSettings.directionalLightIntensity}
        castShadow={lightingSettings.enableShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}

function SceneBackground({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  if (lightingSettings.backgroundType === 'hdri') {
    return (
      <>
        <Environment
          files="/hdri/studio_small_09_1k.hdr"
          background
        />
        <ambientLight intensity={lightingSettings.hdriIntensity * 0.5} />
      </>
    )
  }

  if (lightingSettings.backgroundType === 'studio') {
    return (
      <>
        <Environment preset="studio" />
        <ambientLight intensity={lightingSettings.hdriIntensity * 0.5} />
        <color attach="background" args={['#f0f0f0']} />
      </>
    )
  }

  // Color background
  return <color attach="background" args={[lightingSettings.backgroundColor]} />
}

export default function Scene({ lightingSettings }: SceneProps) {
  return (
    <div className="scene-container">
      <Canvas
        shadows={lightingSettings.enableShadows}
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <SceneBackground lightingSettings={lightingSettings} />
          <Lighting lightingSettings={lightingSettings} />
          
          <Model lightingSettings={lightingSettings} />
          
          {lightingSettings.enableShadows && (
            <ContactShadows
              opacity={lightingSettings.shadowOpacity}
              scale={10}
              blur={1}
              far={10}
              resolution={256}
              color="#000000"
            />
          )}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
      
      <div className="loading">
        Loading 3D Scene...
      </div>
    </div>
  )
}
