"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragment = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.08;

  float wave = sin(uv.x * 6.0 + t) * 0.02;
  vec2 dUv = uv + vec2(wave, wave * 0.5);

  float n = noise(dUv * 4.0 + t * 0.15);

  float mi = 0.0;
  if (uMouse.x > 0.0) {
    float d = distance(dUv, uMouse);
    mi = 0.12 * exp(-d * 5.0);
  }
  n += mi;

  vec3 color1 = vec3(0.85, 0.55, 0.04);
  vec3 color2 = vec3(0.10, 0.07, 0.04);
  vec3 color = mix(color1, color2, smoothstep(0.2, 0.7, n));

  gl_FragColor = vec4(color, 0.12);
}
`

export default function HeroShader() {
  const mesh = useRef<THREE.Mesh>(null!)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const { gl, size } = useThree()

  useMemo(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = 1 - e.clientY / window.innerHeight
    }
    gl.domElement.addEventListener("pointermove", onMove)
    return () => gl.domElement.removeEventListener("pointermove", onMove)
  }, [gl])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uMouse.value.lerp(mouse.current, 0.04)
  })

  return (
    <mesh ref={mesh} scale={[8, 6, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
