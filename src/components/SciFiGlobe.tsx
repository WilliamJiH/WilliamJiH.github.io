'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// ── Constants ──────────────────────────────────────────────
const GLOBE_RADIUS = 1.8;
const ROTATION_SPEED = 0.08;

const COLORS = {
  land: '#00d4ff',
  grid: '#0a2040',
  marker: '#00d4ff',
  arc: '#00d4ff',
  atmosphere: [0, 0.75, 1.0] as const,
};

interface City {
  name: string;
  lat: number;
  lng: number;
}

const CITIES: City[] = [
  { name: 'TORONTO', lat: 43.6532, lng: -79.3832 },       // 0
  { name: 'NEWCASTLE', lat: 54.9783, lng: -1.6178 },      // 1
  { name: 'LONDON', lat: 51.5074, lng: -0.1278 },         // 2
  { name: 'VANCOUVER', lat: 49.2827, lng: -123.1207 },    // 3
  { name: 'DALIAN', lat: 38.914, lng: 121.6147 },         // 4
  { name: 'BEIJING', lat: 39.9042, lng: 116.4074 },       // 5
  { name: 'DUBAI', lat: 25.2048, lng: 55.2708 },          // 6
  { name: 'CANCUN', lat: 21.1619, lng: -86.8515 },        // 7
  { name: 'PARIS', lat: 48.8566, lng: 2.3522 },           // 8
  { name: 'NEW YORK', lat: 40.7128, lng: -74.006 },       // 9
];

const CONNECTIONS: [number, number][] = [
  [0, 3],  // Toronto ↔ Vancouver
  [0, 2],  // Toronto ↔ London
  [0, 9],  // Toronto ↔ New York
  [2, 1],  // London ↔ Newcastle
  [2, 5],  // London ↔ Beijing
  [2, 8],  // London ↔ Paris
  [5, 4],  // Beijing ↔ Dalian
  [3, 4],  // Vancouver ↔ Dalian
  [6, 5],  // Dubai ↔ Beijing
  [6, 8],  // Dubai ↔ Paris
  [7, 0],  // Cancun ↔ Toronto
  [9, 2],  // New York ↔ London
];

// ── Utilities ──────────────────────────────────────────────
function latLngToVec3(lat: number, lng: number, r = GLOBE_RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function createArcPoints(from: City, to: City, segments = 64): [number, number, number][] {
  const start = latLngToVec3(from.lat, from.lng);
  const end = latLngToVec3(to.lat, to.lng);
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(GLOBE_RADIUS);
    const lift = Math.sin(t * Math.PI) * 0.12;
    p.multiplyScalar(1 + lift);
    pts.push([p.x, p.y, p.z]);
  }
  return pts;
}

// ── Globe wireframe grid (lat / lng lines) ─────────────────
function GlobeGrid() {
  const geometry = useMemo(() => {
    const pts: number[] = [];
    const r = GLOBE_RADIUS * 0.998;

    // Latitude lines every 15°
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lng = -180; lng < 180; lng += 3) {
        const a = latLngToVec3(lat, lng, r);
        const b = latLngToVec3(lat, lng + 3, r);
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    // Longitude lines every 15°
    for (let lng = -180; lng < 180; lng += 15) {
      for (let lat = -75; lat < 75; lat += 3) {
        const a = latLngToVec3(lat, lng, r);
        const b = latLngToVec3(lat + 3, lng, r);
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={COLORS.grid} transparent opacity={0.35} />
    </lineSegments>
  );
}

// ── Land mass: filled polygons + outlines (fetched from CDN) ──
function LandMass() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [outlineGeo, setOutlineGeo] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json',
        );
        const topo = await res.json();
        const { arcs: rawArcs, transform } = topo;
        const { scale, translate } = transform;

        // Delta-decode arcs → absolute [lng, lat]
        const decoded: [number, number][][] = rawArcs.map(
          (arc: number[][]) => {
            let x = 0,
              y = 0;
            return arc.map(([dx, dy]: number[]) => {
              x += dx;
              y += dy;
              return [
                x * scale[0] + translate[0],
                y * scale[1] + translate[1],
              ] as [number, number];
            });
          },
        );

        // ── Build a canvas texture with filled land ──
        const W = 2048, H = 1024;
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.18)';

        function getRingCoords(arcIndices: number[]): [number, number][] {
          const coords: [number, number][] = [];
          for (const idx of arcIndices) {
            const arc = idx >= 0 ? decoded[idx] : [...decoded[~idx]].reverse();
            for (let i = 0; i < arc.length; i++) {
              if (i === 0 && coords.length > 0) continue; // skip duplicate join point
              coords.push(arc[i]);
            }
          }
          return coords;
        }

        function drawRing(coords: [number, number][]) {
          ctx.beginPath();
          for (let i = 0; i < coords.length; i++) {
            const [lng, lat] = coords[i];
            const x = ((lng + 180) / 360) * W;
            const y = ((90 - lat) / 180) * H;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function walkCanvas(g: any) {
          if (g.type === 'GeometryCollection') g.geometries.forEach(walkCanvas);
          else if (g.type === 'Polygon') drawRing(getRingCoords(g.arcs[0]));
          else if (g.type === 'MultiPolygon')
            g.arcs.forEach((poly: number[][]) => drawRing(getRingCoords(poly[0])));
        }

        walkCanvas(topo.objects.land);

        // ── Build outline geometry ──
        const pts: number[] = [];

        function addArc(idx: number) {
          const arc = idx >= 0 ? decoded[idx] : [...decoded[~idx]].reverse();
          for (let i = 0; i < arc.length - 1; i++) {
            const a = latLngToVec3(arc[i][1], arc[i][0]);
            const b = latLngToVec3(arc[i + 1][1], arc[i + 1][0]);
            pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function walkOutline(g: any) {
          if (g.type === 'GeometryCollection') g.geometries.forEach(walkOutline);
          else if (g.type === 'Polygon')
            g.arcs.forEach((r: number[]) => r.forEach(addArc));
          else if (g.type === 'MultiPolygon')
            g.arcs.forEach((p: number[][]) =>
              p.forEach((r: number[]) => r.forEach(addArc)),
            );
        }

        walkOutline(topo.objects.land);

        if (!cancelled) {
          const tex = new THREE.CanvasTexture(canvas);
          setTexture(tex);

          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
          setOutlineGeo(geo);
        }
      } catch (err) {
        console.error('Globe: failed to load land data', err);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* Back-side land — faint, renders first */}
      {texture && (
        <mesh renderOrder={0}>
          <sphereGeometry args={[GLOBE_RADIUS * 0.997, 64, 64]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} opacity={0.15} side={THREE.BackSide} />
        </mesh>
      )}
      {/* Front-side land — solid, covers the back */}
      {texture && (
        <mesh renderOrder={1}>
          <sphereGeometry args={[GLOBE_RADIUS * 0.999, 64, 64]} />
          <meshBasicMaterial map={texture} transparent depthWrite={true} side={THREE.FrontSide} />
        </mesh>
      )}
      {/* Land outlines for definition */}
      {outlineGeo && (
        <lineSegments geometry={outlineGeo}>
          <lineBasicMaterial color={COLORS.land} transparent opacity={0.45} />
        </lineSegments>
      )}
    </>
  );
}

// ── City marker with pulsing ring + label (label on hover only) ──
function CityMarker({
  city,
  groupRef,
}: {
  city: City;
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const ref = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isFrontSide = useRef(true);
  const pos = useMemo(
    () => latLngToVec3(city.lat, city.lng, GLOBE_RADIUS * 1.005),
    [city],
  );
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current || !groupRef.current) return;

    // Pulse ring
    if (ringRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.25;
      ringRef.current.scale.set(s, s, s);
    }

    // Track front/back side for label visibility
    const wp = new THREE.Vector3();
    ref.current.getWorldPosition(wp);
    const dot = camera.position.clone().normalize().dot(wp.clone().normalize());
    isFrontSide.current = dot > 0.15;

    // Show label only when hovered AND on front side
    if (labelRef.current) {
      labelRef.current.style.opacity = hovered && isFrontSide.current ? '1' : '0';
    }
  });

  return (
    <group ref={ref} position={pos}>
      {/* Invisible hit area (larger sphere for easier hover) */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Bright marker dot */}
      <mesh>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color={COLORS.marker} />
      </mesh>
      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.05, 24]} />
        <meshBasicMaterial
          color={COLORS.marker}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Floating label — hidden by default, shown on hover */}
      <Html center distanceFactor={6.5} style={{ pointerEvents: 'none' }}>
        <div
          ref={labelRef}
          style={{
            color: '#00d4ff',
            fontSize: '7px',
            fontFamily: 'var(--font-brandon), system-ui, sans-serif',
            letterSpacing: '0.12em',
            whiteSpace: 'nowrap',
            background: 'rgba(0, 8, 20, 0.75)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            padding: '1px 4px',
            marginTop: '-18px',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          {city.name}
        </div>
      </Html>
    </group>
  );
}

// ── Glowing connection arcs ─────────────────────────────────
function ConnectionArcs() {
  const arcs = useMemo(
    () =>
      CONNECTIONS.map(([a, b]) => createArcPoints(CITIES[a], CITIES[b])),
    [],
  );

  return (
    <>
      {arcs.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={COLORS.arc}
          lineWidth={1.2}
          transparent
          opacity={0.3}
        />
      ))}
    </>
  );
}

// ── Fresnel atmosphere glow ─────────────────────────────────
const atmosphereVertex = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const atmosphereFragment = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = 1.0 - abs(dot(vViewDir, vWorldNormal));
    float intensity = pow(fresnel, 3.0) * 0.2;
    gl_FragColor = vec4(${COLORS.atmosphere.join(',')}, intensity);
  }
`;

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 1.12, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
      />
    </mesh>
  );
}

// ── Assembled scene ─────────────────────────────────────────
function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current && !prefersReducedMotion.current) {
      groupRef.current.rotation.y += delta * ROTATION_SPEED;
    }
  });

  return (
    <>
      {/* Rotating globe group */}
      <group ref={groupRef} rotation={[0.1, -0.3, 0]}>
        <LandMass />
        <ConnectionArcs />
        {CITIES.map((city) => (
          <CityMarker key={city.name} city={city} groupRef={groupRef} />
        ))}
      </group>
      {/* Atmosphere sits outside the rotating group for correct Fresnel */}
      <Atmosphere />
    </>
  );
}

// ── WebGL support check ─────────────────────────────────────
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// ── Main export ─────────────────────────────────────────────
export default function SciFiGlobe() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) setSupported(false);
  }, []);

  if (!supported) return null; // Graceful fallback — hide globe if no WebGL

  return (
    <div className='w-full h-full'>
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        onError={() => setSupported(false)}
      >
        <GlobeScene />
      </Canvas>
    </div>
  );
}
