"use client"

import { Canvas } from "@react-three/fiber"
import HeroShader from "./HeroShader"

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#0c0a09"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#d97706" />
        <HeroShader />
      </Canvas>
    </div>
  )
}
