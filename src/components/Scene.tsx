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
    part1Color: string
    part2Color: string
    part3Color?: string    // Optional - only for 4-piece model
    part4Color?: string    // Optional - only for 4-piece model
    selectedModel: string
  }
}

function GLBModel({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  const group = useRef<THREE.Group>(null)
  
  let gltf
  try {
    const modelPath = `/models/${lightingSettings.selectedModel}`
    gltf = useGLTF(modelPath)
  } catch (error) {
    console.error('Error loading GLB:', error)
    throw error // This will cause Suspense to show fallback
  }

  useEffect(() => {
    if (!gltf?.scene) return

    const applyMaterialSettings = () => {
      try {
        // Apply material settings and colors to specific parts
        gltf.scene.traverse((child) => {
          try {
            if (child instanceof THREE.Mesh && child.material) {
              // Handle both single materials and material arrays
              const materials = Array.isArray(child.material) ? child.material : [child.material]
              
              materials.forEach((material, index) => {
                try {
                  if (material instanceof THREE.MeshStandardMaterial) {
                    // Clone material if it's shared to avoid affecting other meshes
                    if (!material.userData.isCloned) {
                      const clonedMaterial = material.clone()
                      clonedMaterial.userData.isCloned = true
                      
                      if (Array.isArray(child.material)) {
                        child.material[index] = clonedMaterial
                      } else {
                        child.material = clonedMaterial
                      }
                      material = clonedMaterial
                    }
                    
                    // Apply global material properties safely
                    if (typeof lightingSettings.roughness === 'number' && !isNaN(lightingSettings.roughness)) {
                      material.roughness = Math.max(0, Math.min(1, lightingSettings.roughness))
                    }
                    if (typeof lightingSettings.metalness === 'number' && !isNaN(lightingSettings.metalness)) {
                      material.metalness = Math.max(0, Math.min(1, lightingSettings.metalness))
                    }
                    
                    // Apply specific colors based on part name and model
                    const partName = child.name.toLowerCase();
                    
                    if (lightingSettings.selectedModel === '2-piece.glb') {
                      // 2-piece model part matching
                      if (partName.includes('part1.006') || partName.includes('part1006')) {
                        if (lightingSettings.part1Color) {
                          material.color.set(lightingSettings.part1Color)
                        }
                      } else if (partName.includes('part2.006') || partName.includes('part2006')) {
                        if (lightingSettings.part2Color) {
                          material.color.set(lightingSettings.part2Color)
                        }
                      }
                    } else {
                      // 4-piece model part matching
                      if (partName.includes('Part1002') || partName.includes('part1002')) {
                        if (lightingSettings.part1Color) {
                          material.color.set(lightingSettings.part1Color)
                        }
                      } else if (partName.includes('Part2002') || partName.includes('part2002')) {
                        if (lightingSettings.part2Color) {
                          material.color.set(lightingSettings.part2Color)
                        }
                        } else if (partName.includes('Part3004') || partName.includes('part3004')) {
                          if (lightingSettings.part3Color) {
                            material.color.set(lightingSettings.part3Color)
                          }
                        } else if (partName.includes('Part4004') || partName.includes('part4004')) {
                          if (lightingSettings.part4Color) {
                            material.color.set(lightingSettings.part4Color)
                          }
                        }
                    }
                    
                    material.needsUpdate = true
                  }
                } catch (materialError) {
                  console.warn('Error processing material:', materialError)
                }
              })
            }
          } catch (childError) {
            console.warn('Error processing child:', childError)
          }
        })
      } catch (error) {
        console.error('Error applying materials:', error)
      }
    }

    // Use requestAnimationFrame to ensure the update happens at the right time
    const frameId = requestAnimationFrame(applyMaterialSettings)
    
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [gltf, lightingSettings.selectedModel, lightingSettings.roughness, lightingSettings.metalness, lightingSettings.part1Color, lightingSettings.part2Color, lightingSettings.part3Color, lightingSettings.part4Color])

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  )
}

function FallbackModel({ lightingSettings }: { lightingSettings: SceneProps['lightingSettings'] }) {
  const group = useRef<THREE.Group>(null)

  return (
    <group ref={group} scale={[3, 3, 3]}>
      {/* Part1002 representation */}
      <mesh position={[0, 0, 0]} name="Part1002">
        <cylinderGeometry args={[0.8, 0.8, 2]} />
        <meshStandardMaterial 
          color={lightingSettings.part1Color}
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
      {/* Part2002 representation */}
      <mesh position={[3, 0, 0]} name="Part2002">
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color={lightingSettings.part2Color}
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
      {/* Part3004 representation */}
      <mesh position={[-3, 0, 0]} name="Part3004">
        <sphereGeometry args={[1]} />
        <meshStandardMaterial 
          color={lightingSettings.part3Color}
          roughness={lightingSettings.roughness}
          metalness={lightingSettings.metalness}
        />
      </mesh>
      {/* Part4004 representation */}
      <mesh position={[0, 3, 0]} name="Part4004">
        <torusGeometry args={[0.8, 0.2]} />
        <meshStandardMaterial 
          color={lightingSettings.part4Color}
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
    try {
      if (directionalLightRef.current && typeof lightingSettings.directionalLightAngle === 'number') {
        const angle = (lightingSettings.directionalLightAngle * Math.PI) / 180
        if (!isNaN(angle)) {
          directionalLightRef.current.position.set(
            Math.sin(angle) * 10,
            5,
            Math.cos(angle) * 10
          )
        }
      }
    } catch (error) {
      console.warn('Error updating directional light position:', error)
    }
  }, [lightingSettings.directionalLightAngle])

  return (
    <>
      {/* Ambient Light */}
      <ambientLight 
        color={lightingSettings.ambientLightColor || '#ffffff'} 
        intensity={Math.max(0, Math.min(5, lightingSettings.ambientLightIntensity || 0.5))} 
      />
      
      {/* Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        intensity={Math.max(0, Math.min(10, lightingSettings.directionalLightIntensity || 1))}
        castShadow={Boolean(lightingSettings.enableShadows)}
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
        camera={{ position: [15, 10, 15], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <SceneBackground lightingSettings={lightingSettings} />
          <Lighting lightingSettings={lightingSettings} />
          
          <Model lightingSettings={lightingSettings} />
          
          {lightingSettings.enableShadows && (
            <ContactShadows
              opacity={lightingSettings.shadowOpacity}
              scale={20}
              blur={1}
              far={20}
              resolution={256}
              color="#000000"
            />
          )}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
