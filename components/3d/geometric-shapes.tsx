"use client"

import { useEffect } from "react"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import type * as THREE from "three"

export const GeometricShape = ({ position = [0, 0, 0], rotation = [0, 0, 0], type }: any) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  if (type === "pyramid") {
    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        <mesh ref={meshRef} position={[0, 0.5, 0]}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.9} />
        </mesh>
        <Sphere args={[0.2, 32, 32]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
        </Sphere>
        <mesh>
          <cylinderGeometry args={[0.01, 0.01, 2, 8]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>
    )
  }

  if (type === "hexagon") {
    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.9} />
        </mesh>
        <Sphere args={[0.2, 32, 32]} position={[0.8, -0.5, 0]}>
          <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
        </Sphere>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 2.5, 8]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>
    )
  }

  // Rings
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.8, 0.15, 16, 50]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.15, 16, 50]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.8, 0.15, 16, 50]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.9} />
      </mesh>
      <Sphere args={[0.2, 32, 32]} position={[0.7, 0.7, 0]}>
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
      </Sphere>
    </group>
  )
}

export const Logo3D = ({ position = [0, 0, 0] }: { position?: number[] }) => {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={meshRef} position={[position[0], position[1], position[2]]}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[3, 0.3, 0.3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[3, 0.3, 0.3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <boxGeometry args={[2, 0.3, 0.3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
        <boxGeometry args={[2, 0.3, 0.3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export const Scene3D = ({ type, position = [0, 0, 0] }: { type: string; position?: number[] }) => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#e0e0ff" />
      {type === "logo" ? (
        <Logo3D position={position as [number, number, number]} />
      ) : (
        <GeometricShape position={position} rotation={[0, 0, 0]} type={type} />
      )}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export function Shape3DCanvas({
  type,
  height = "100%",
  width = "100%",
}: { type: string; height?: string; width?: string }) {
  return (
    <Canvas style={{ width, height }}>
      <Scene3D type={type} />
    </Canvas>
  )
}
