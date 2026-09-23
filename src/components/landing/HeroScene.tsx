import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

function CadastralTransformation() {
  const groupRef = useRef<THREE.Group>(null);
  const boundaryRef = useRef<any>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);
  const buildingRef = useRef<THREE.Group>(null);
  const floorsRef = useRef<THREE.Group>(null);
  const undergroundRef = useRef<THREE.Group>(null);
  const zAxisRef = useRef<THREE.Group>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const numFloors = 8;
  const floorHeight = 1.2;

  useFrame(({ clock, camera, pointer }) => {
    const t = clock.elapsedTime;

    // Slight parallax based on pointer
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.1,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.1,
        0.05,
      );
    }

    // Animation Timings (staggered)
    // p1: Boundary (0-1s)
    const p1 = Math.min(1, Math.max(0, t * 1.5));
    // p2: Surface (1-2s)
    const p2 = Math.min(1, Math.max(0, (t - 0.8) * 1.5));
    // p3/p4: Extrude building (2-3.5s)
    const p4 = Math.min(1, Math.max(0, (t - 1.6) * 1.5));
    // p5: Floor separation (3.5-5s)
    const p5 = Math.min(1, Math.max(0, (t - 2.8) * 1.5));
    // p6: Vertical units (handled via floor texture/opacity)
    const p6 = Math.min(1, Math.max(0, (t - 3.5) * 1.5));
    // p7: Underground (4-5.5s)
    const p7 = Math.min(1, Math.max(0, (t - 4.2) * 1.5));
    // p8: Z-axis (5-6.5s)
    const p8 = Math.min(1, Math.max(0, (t - 5.0) * 1.5));
    // p9: Panel (6-7s)
    const p9 = Math.min(1, Math.max(0, (t - 6.0) * 1.5));

    if (boundaryRef.current) {
      (boundaryRef.current.material as THREE.LineBasicMaterial).opacity = p1;
    }
    if (surfaceRef.current) {
      (surfaceRef.current.material as THREE.MeshBasicMaterial).opacity = p2 * 0.2;
    }
    if (buildingRef.current) {
      buildingRef.current.scale.y = p4;
      buildingRef.current.position.y = (numFloors * floorHeight * p4) / 2;
      ((buildingRef.current.children[0] as THREE.Mesh).material as THREE.Material).opacity = (1 - p5) * p4; // fades out as floors separate
    }

    if (floorsRef.current) {
      floorsRef.current.children.forEach((floor, idx) => {
        // Spread out floors based on p5
        const targetY = idx * floorHeight;
        const offset = idx * 0.2 * p5; // spacing
        floor.position.y = targetY + offset;
        const mesh = floor as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.Material).opacity = p5 * 0.8;
        }
      });
    }

    if (undergroundRef.current) {
      undergroundRef.current.position.y = -2 * p7;
      undergroundRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) (mesh.material as THREE.Material).opacity = p7 * 0.6;
      });
    }

    if (zAxisRef.current) {
      zAxisRef.current.scale.y = p8;
      zAxisRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) (mesh.material as THREE.Material).opacity = p8;
      });
    }

    if (panelRef.current) {
      panelRef.current.style.opacity = p9.toString();
      panelRef.current.style.transform = `translate3d(0, ${(1 - p9) * 20}px, 0)`;
    }
  });

  const parcelPoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector3(-4, 0, -3));
    pts.push(new THREE.Vector3(4, 0, -2));
    pts.push(new THREE.Vector3(3, 0, 4));
    pts.push(new THREE.Vector3(-3, 0, 3));
    pts.push(new THREE.Vector3(-4, 0, -3));
    return pts;
  }, []);

  const parcelShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-4, -3);
    shape.lineTo(4, -2);
    shape.lineTo(3, 4);
    shape.lineTo(-3, 3);
    shape.lineTo(-4, -3);
    return shape;
  }, []);

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* 1. Parcel Boundary */}
      <line ref={boundaryRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#4ade80" transparent opacity={0} />
      </line>
      <Line points={parcelPoints} color="#4ade80" lineWidth={2} transparent opacity={0} />

      {/* 2. Parcel Surface */}
      <mesh ref={surfaceRef} rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[parcelShape]} />
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3 & 4. Building Block (solid initially) */}
      <group ref={buildingRef}>
        <Box args={[4, numFloors * floorHeight, 4]}>
          <meshStandardMaterial
            color="#0ea5e9"
            transparent
            opacity={0}
            roughness={0.2}
            metalness={0.8}
          />
        </Box>
      </group>

      {/* 5 & 6. Floors / Units (appear when p5 kicks in) */}
      <group ref={floorsRef}>
        {Array.from({ length: numFloors }).map((_, i) => (
          <Box key={i} args={[3.9, floorHeight - 0.1, 3.9]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color={i === numFloors - 1 ? "#38bdf8" : "#0284c7"}
              transparent
              opacity={0}
              roughness={0.3}
              metalness={0.5}
            />
          </Box>
        ))}
      </group>

      {/* 7. Underground utilities */}
      <group ref={undergroundRef}>
        <Box args={[6, 0.2, 0.4]} position={[0, 0, -1]}>
          <meshStandardMaterial color="#f59e0b" transparent opacity={0} />
        </Box>
        <Box args={[0.4, 0.2, 5]} position={[2, -1, 0]}>
          <meshStandardMaterial color="#ef4444" transparent opacity={0} />
        </Box>
        <Sphere args={[0.3]} position={[2, -1, -1]}>
          <meshStandardMaterial color="#ef4444" transparent opacity={0} />
        </Sphere>
      </group>

      {/* 8. Z-Axis Indicator */}
      <group ref={zAxisRef} position={[-3, 0, 3]}>
        <Box args={[0.05, 12, 0.05]} position={[0, 6, 0]}>
          <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
        </Box>
        {/* Hash marks */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box key={`hash-${i}`} args={[0.5, 0.02, 0.02]} position={[0, i * 2.5, 0]}>
            <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
          </Box>
        ))}
      </group>

      {/* 9. HTML ULPIN Panel */}
      <Html position={[3, 8, 0]} center>
        <div
          ref={panelRef}
          className="w-48 overflow-hidden rounded-md border border-primary/40 bg-background/80 p-3 shadow-2xl backdrop-blur-md transition-all"
          style={{ opacity: 0 }}
        >
          <div className="mb-2 border-b border-border pb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
            3D ULPIN (Demo)
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-foreground">MH-DEMO-07A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parcel</span>
              <span className="font-mono text-foreground">P-1024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level</span>
              <span className="font-mono text-foreground">07</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elev</span>
              <span className="font-mono text-foreground">21.4m - 24.6m</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-sm bg-success/15 px-2 py-1 text-[10px] uppercase tracking-wide text-success">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            Verified Spatial Bounds
          </div>
        </div>
      </Html>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas camera={{ position: [10, 8, 12], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        <CadastralTransformation />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
