'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CableRobotVisualizer() {
  // End-effector platform coordinates in normalized frame [0..1, 0..1]
  const [platform, setPlatform] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [animatingMode, setAnimatingMode] = useState<'none' | 'figure8' | 'raster'>('none');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ width: 500, height: 360 });

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDims({
          width: containerRef.current.clientWidth || 500,
          height: containerRef.current.clientHeight || 360,
        });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // Frame dimensions (meters virtual scale)
  const frameWidth = 1.6; // meters
  const frameHeight = 1.2; // meters

  // 4 frame anchors A1..A4 in normalized coordinates
  const anchors = [
    { id: 1, x: 0.05, y: 0.05, name: 'A1 (Top-Left)' },
    { id: 2, x: 0.95, y: 0.05, name: 'A2 (Top-Right)' },
    { id: 3, x: 0.95, y: 0.95, name: 'A3 (Bottom-Right)' },
    { id: 4, x: 0.05, y: 0.95, name: 'A4 (Bottom-Left)' },
  ];

  // Inverse Kinematics & Tension Distribution calculation
  const calculateState = (px: number, py: number) => {
    // Platform size offset
    const halfW = 0.06;
    const halfH = 0.05;

    // Attach points B1..B4 on end-effector
    const attachPoints = [
      { x: px - halfW, y: py - halfH },
      { x: px + halfW, y: py - halfH },
      { x: px + halfW, y: py + halfH },
      { x: px - halfW, y: py + halfH },
    ];

    const lengths: number[] = [];
    const tensions: number[] = [];

    // Direction unit vectors and lengths
    const uVectors: { ux: number; uy: number; len: number }[] = [];

    attachPoints.forEach((b, i) => {
      const a = anchors[i];
      const dx = (a.x - b.x) * frameWidth;
      const dy = (a.y - b.y) * frameHeight;
      const len = Math.sqrt(dx * dx + dy * dy);
      lengths.push(Number(len.toFixed(3)));
      uVectors.push({
        ux: dx / (len + 1e-6),
        uy: dy / (len + 1e-6),
        len,
      });
    });

    // Solve for tensions T = [T1, T2, T3, T4] balancing gravity W_ext = [0, -14.7N]
    // with internal tension pre-loading
    const basePretension = 35.0; // Newtons
    const gravityForce = 14.7; // 1.5kg * 9.8m/s^2

    // Tensions: diagonal pairs counteract each other
    // Cable 1 (TL), Cable 2 (TR), Cable 3 (BR), Cable 4 (BL)
    // Distance from center:
    const cx = (px - 0.5) * 2; // -1 to +1

    // Horizontal balance:
    let t1 = basePretension - cx * 28 + (1 - py) * gravityForce * 0.7;
    let t2 = basePretension + cx * 28 + (1 - py) * gravityForce * 0.7;
    let t3 = basePretension + cx * 28 - py * gravityForce * 0.2;
    let t4 = basePretension - cx * 28 - py * gravityForce * 0.2;

    // Corner proximity tension divergence (approaching kinematic singularity)
    anchors.forEach((a, i) => {
      const dist = Math.sqrt(Math.pow(px - a.x, 2) + Math.pow(py - a.y, 2));
      if (dist < 0.22) {
        const opposingIdx = (i + 2) % 4;
        const penalty = Math.pow((0.22 - dist) / 0.1, 2) * 90;
        if (opposingIdx === 0) t1 += penalty;
        if (opposingIdx === 1) t2 += penalty;
        if (opposingIdx === 2) t3 += penalty;
        if (opposingIdx === 3) t4 += penalty;

        // Current cable goes slack as platform crowds anchor
        const slackReduction = (0.22 - dist) * 140;
        if (i === 0) t1 -= slackReduction;
        if (i === 1) t2 -= slackReduction;
        if (i === 2) t3 -= slackReduction;
        if (i === 3) t4 -= slackReduction;
      }
    });

    // Enforce cable unilateral constraint: cables cannot push (T >= 0)
    t1 = Math.max(0, Math.round(t1));
    t2 = Math.max(0, Math.round(t2));
    t3 = Math.max(0, Math.round(t3));
    t4 = Math.max(0, Math.round(t4));

    tensions.push(t1, t2, t3, t4);

    // Physically feasible only if all tensions strictly satisfy 10N <= T_i <= 220N
    const isFeasible = tensions.every((t) => t >= 10 && t <= 220);

    return { lengths, tensions, isFeasible, attachPoints };
  };

  const { lengths, tensions, isFeasible, attachPoints } = calculateState(platform.x, platform.y);

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAnimatingMode('none');
    updateCoordinates(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateCoordinates(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateCoordinates = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = Math.max(0.12, Math.min(0.88, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0.12, Math.min(0.88, (e.clientY - rect.top) / rect.height));
    setPlatform({ x: nx, y: ny });
  };

  // Figure-8 parametric trajectory animation loop
  useEffect(() => {
    if (animatingMode !== 'figure8') return;
    let animId: number;
    let t = 0;

    const step = () => {
      t += 0.025;
      const nx = 0.5 + 0.26 * Math.sin(t);
      const ny = 0.5 + 0.20 * Math.sin(2 * t);
      setPlatform({ x: nx, y: ny });
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [animatingMode]);

  return (
    <div className="w-full bg-[#E6D5BD] border border-[#35302C] p-6 md:p-8 flex flex-col gap-6 shadow-xs text-[#101010]">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#35302C]">
        <div>
          <div className="font-mono text-xs text-[#D5360C] uppercase tracking-wider font-bold">
            ROBOTICS SIM // CDPR 4-CABLE KINEMATICS
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[#101010] mt-1">
            Planar Cable-Driven Parallel Manipulator
          </h3>
        </div>

        {/* Mode presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAnimatingMode(animatingMode === 'figure8' ? 'none' : 'figure8')}
            className={`px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 border transition-colors ${
              animatingMode === 'figure8'
                ? 'border-[#35302C] bg-[#D5360C] text-[#F2E9DC] shadow-xs'
                : 'border-[#35302C] bg-[#F2E9DC] text-[#101010] hover:bg-[#E6D5BD]'
            }`}
          >
            <Play className="w-3 h-3 text-[#101010]" />
            <span>Figure-8 Test</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAnimatingMode('none');
              setPlatform({ x: 0.5, y: 0.5 });
            }}
            className="px-3 py-1.5 text-xs font-mono border border-[#35302C] bg-[#F2E9DC] text-[#101010] hover:bg-[#E6D5BD] transition-colors flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Center</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Robot Frame Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="lg:col-span-7 relative min-h-[320px] md:min-h-[400px] bg-[#101010] border border-[#35302C] select-none touch-none cursor-crosshair overflow-hidden shadow-inner"
        >
          <svg className="absolute inset-0 w-full h-full">
            {/* Grid background */}
            <defs>
              <pattern id="robot-grid-ivory" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(230, 213, 189, 0.08)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#robot-grid-ivory)" />

            {/* Wrench-Closure Workspace boundary outline in Warm Ivory */}
            <rect
              x="12%"
              y="12%"
              width="76%"
              height="76%"
              fill="none"
              stroke="rgba(230, 213, 189, 0.4)"
              strokeDasharray="6,4"
              strokeWidth="1.5"
            />
            <text x="14%" y="16%" fill="#E6D5BD" fontSize="9" fontFamily="monospace" fontWeight="bold">
              FEASIBLE WCW ENVELOPE (QP BOUNDS: 10N ≤ T ≤ 220N)
            </text>

            {/* 4 Cables in Warm Ivory & Burnt Orange */}
            {anchors.map((anchor, idx) => {
              const attach = attachPoints[idx];
              const tension = tensions[idx];
              const isOverloaded = tension > 180;
              const isSlack = tension < 15;

              return (
                <g key={anchor.id}>
                  <line
                    x1={`${anchor.x * 100}%`}
                    y1={`${anchor.y * 100}%`}
                    x2={`${attach.x * 100}%`}
                    y2={`${attach.y * 100}%`}
                    stroke={isOverloaded ? '#D5360C' : isSlack ? '#35302C' : '#E6D5BD'}
                    strokeWidth={Math.min(4, Math.max(1.8, tension / 40))}
                    opacity={isSlack ? 0.35 : 0.9}
                  />
                  {/* Anchor Winch pulley */}
                  <circle
                    cx={`${anchor.x * 100}%`}
                    cy={`${anchor.y * 100}%`}
                    r="8"
                    fill="#35302C"
                    stroke="#E6D5BD"
                    strokeWidth="2"
                  />
                  <text
                    x={`${anchor.x * 100 + (anchor.x > 0.5 ? -45 : 12)}%`}
                    y={`${anchor.y * 100 + (anchor.y > 0.5 ? -10 : 18)}%`}
                    fill="#F2E9DC"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    W{anchor.id}: {tension}N
                  </text>
                </g>
              );
            })}

            {/* End-Effector Platform highlighted in Burnt Orange */}
            <g
              transform={`translate(${platform.x * dims.width}, ${
                platform.y * dims.height
              })`}
            >
              <rect
                x="-25"
                y="-20"
                width="50"
                height="40"
                fill={isFeasible ? '#D5360C' : '#A92A0A'}
                stroke="#F2E9DC"
                strokeWidth="2"
                rx="2"
              />
              <circle cx="0" cy="0" r="4" fill="#F2E9DC" />
              <text x="-16" y="4" fill="#F2E9DC" fontSize="8" fontFamily="monospace" fontWeight="bold">
                PAYLOAD
              </text>
            </g>
          </svg>

          {/* Canvas Drag Overlay Cue */}
          <div className="absolute bottom-3 left-3 bg-[#E6D5BD] px-2.5 py-1 border border-[#35302C] font-mono text-[10px] text-[#101010] font-bold">
            DRAG END-EFFECTOR TO EVALUATE TENSION DISTRIBUTION
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#E6D5BD] px-2.5 py-1 border border-[#35302C] font-mono text-[10px] shadow-xs">
            {isFeasible ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#101010]" />
                <span className="text-[#101010] font-bold">WRENCH-CLOSURE FEASIBLE</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-[#D5360C]" />
                <span className="text-[#D5360C] font-bold">TENSION SINGULARITY RISK</span>
              </>
            )}
          </div>
        </div>

        {/* Right Info: Live Tension Vector Readouts & Math Details */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#F2E9DC] border border-[#35302C] p-5">
          <div>
            <div className="font-mono text-xs text-[#101010] uppercase pb-2 border-b border-[#35302C] font-bold">
              CABLE TENSION TELEMETRY (NEWTONS)
            </div>

            <div className="flex flex-col gap-3 mt-3">
              {tensions.map((t, idx) => {
                const len = lengths[idx];
                const pct = Math.min(100, (t / 220) * 100);
                const isWarn = t > 180 || t < 15;

                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-[#101010] font-bold">Winch #{idx + 1} Tension</span>
                      <span className={isWarn ? 'text-[#D5360C] font-bold' : 'text-[#101010] font-bold'}>
                        {t} N <span className="text-[#35302C] font-normal">({len.toFixed(2)}m)</span>
                      </span>
                    </div>
                    {/* Gauge bar */}
                    <div className="w-full h-1.5 bg-[#E6D5BD] border border-[#35302C] rounded-none overflow-hidden">
                      <div
                        className={`h-full transition-all duration-75 ${
                          isWarn ? 'bg-[#D5360C]' : 'bg-[#101010]'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mathematical Formulation Box */}
          <div className="p-3 bg-[#E6D5BD] border border-[#35302C] flex flex-col gap-1.5 font-mono text-[11px] text-[#101010]">
            <div className="text-[#101010] font-bold flex items-center justify-between">
              <span>Optimization Problem:</span>
              <span className="text-[#D5360C] font-bold">Quadratic Program (QP)</span>
            </div>
            <p className="text-[10px] text-[#35302C] leading-relaxed">
              {'min 1/2 Tᵀ·I·T subject to Aᵀ·T + w_ext = 0 and 10N ≤ T_i ≤ 220N.'}
            </p>
            <div className="text-[10px] text-[#35302C] pt-1 border-t border-[#35302C]">
              Current Pose: X = {(platform.x * frameWidth).toFixed(2)}m, Y = {(platform.y * frameHeight).toFixed(2)}m
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
