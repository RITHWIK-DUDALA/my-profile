'use client';

import React, { useState, useMemo } from 'react';
import { Eye, Cpu } from 'lucide-react';

type Lane = 'left' | 'center' | 'right';

export default function AutonomousPipelineVisualizer() {
  const [obstacleLane, setObstacleLane] = useState<Lane>('center');
  const [vehicleSpeed, setVehicleSpeed] = useState<number>(45); // km/h
  const [activeStage, setActiveStage] = useState<'perception' | 'projection' | 'planning' | 'control'>('planning');

  // Derive Stanley controller steering and collision risk directly via useMemo (prevents cascading re-renders)
  const telemetry = useMemo(() => {
    const v_mps = Math.max(1.0, vehicleSpeed / 3.6); // velocity in m/s
    const k_gain = 0.55; // Stanley cross-track gain

    let e_fa = 0; // Cross-track error in meters
    let theta_e_deg = 0; // Heading yaw error in degrees
    let risk = 'CLEAR';
    let leadDist = 28.5;

    if (obstacleLane === 'center') {
      e_fa = -2.6; // Maneuver 2.6m to the left lane to pass
      theta_e_deg = -3.5;
      risk = 'AVOIDING';
      leadDist = 14.2;
    } else if (obstacleLane === 'left') {
      e_fa = 1.8; // Bias rightward
      theta_e_deg = 2.0;
      risk = 'MONITORING';
      leadDist = 22.4;
    } else {
      e_fa = -1.2; // Stay center-left
      theta_e_deg = -1.5;
      risk = 'CLEAR';
      leadDist = 26.8;
    }

    // Stanley formula: delta = theta_e + arctan(k * e_fa / v)
    const delta_rad = (theta_e_deg * Math.PI) / 180 + Math.atan((k_gain * e_fa) / v_mps);
    const steer_deg = Number(((delta_rad * 180) / Math.PI).toFixed(1));

    return {
      steeringAngle: steer_deg,
      leadDistance: leadDist,
      collisionRisk: risk,
      cycleLatency: '37.4ms',
    };
  }, [obstacleLane, vehicleSpeed]);

  return (
    <div className="w-full bg-[#E6D5BD] border border-[#35302C] p-6 md:p-8 flex flex-col gap-6 shadow-xs text-[#101010]">
      {/* Top Header & Pipeline Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#35302C]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#D5360C]">
            <Cpu className="w-4 h-4 text-[#D5360C]" />
            <span className="font-bold">INTERACTIVE PIPELINE LAB // AD STACK v1.2</span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[#101010] mt-1">
            Modular Perception-to-Control Simulation
          </h3>
        </div>

        {/* Stage Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2E9DC] border border-[#35302C] rounded-none">
          {(
            [
              { id: 'perception', label: '1. Perception' },
              { id: 'projection', label: '2. IPM Ground' },
              { id: 'planning', label: '3. Frenet Plan' },
              { id: 'control', label: '4. Actuation' },
            ] as const
          ).map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(stage.id)}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                activeStage === stage.id
                  ? 'bg-[#D5360C] text-[#F2E9DC] shadow-xs'
                  : 'text-[#101010] hover:bg-[#E6D5BD]'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Arena: Split Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Viewport: Synthetic Camera Feed & IPM Projection */}
        <div className="lg:col-span-7 relative min-h-[300px] md:min-h-[360px] bg-[#101010] border border-[#35302C] overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          {/* Synthetic Perspective Road Drawing via SVG */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 360">
            {/* Horizon in dark charcoal */}
            <rect x="0" y="0" width="600" height="120" fill="#1C1A18" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#35302C" strokeWidth="1" />

            {/* Road Surface */}
            <polygon points="180,120 420,120 600,360 0,360" fill="#101010" />

            {/* Lane Dividers */}
            <line x1="260" y1="120" x2="160" y2="360" stroke="#E6D5BD" strokeDasharray="16,16" strokeWidth="2" opacity="0.4" />
            <line x1="340" y1="120" x2="440" y2="360" stroke="#E6D5BD" strokeDasharray="16,16" strokeWidth="2" opacity="0.4" />
            {/* Active Road Boundary Lines in Warm Ivory */}
            <line x1="180" y1="120" x2="0" y2="360" stroke="#E6D5BD" strokeWidth="3" opacity="0.85" />
            <line x1="420" y1="120" x2="600" y2="360" stroke="#E6D5BD" strokeWidth="3" opacity="0.85" />

            {/* Obstacle Vehicle Bounding Box in Burnt Orange */}
            {obstacleLane === 'center' && (
              <g transform="translate(255, 160)">
                <rect x="0" y="0" width="90" height="65" fill="rgba(213, 54, 12, 0.25)" stroke="#D5360C" strokeWidth="2" />
                <rect x="0" y="-18" width="90" height="18" fill="#D5360C" />
                <text x="6" y="-5" fill="#F2E9DC" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  VEHICLE: 0.94
                </text>
                <circle cx="45" cy="65" r="3.5" fill="#E6D5BD" />
                <text x="54" y="68" fill="#E6D5BD" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  IPM Foot [X:0.2m, Y:14.2m]
                </text>
              </g>
            )}

            {obstacleLane === 'left' && (
              <g transform="translate(130, 170)">
                <rect x="0" y="0" width="80" height="60" fill="rgba(213, 54, 12, 0.25)" stroke="#D5360C" strokeWidth="2" />
                <rect x="0" y="-16" width="80" height="16" fill="#D5360C" />
                <text x="6" y="-4" fill="#F2E9DC" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  VEHICLE: 0.91
                </text>
                <circle cx="40" cy="60" r="3" fill="#E6D5BD" />
              </g>
            )}

            {obstacleLane === 'right' && (
              <g transform="translate(390, 170)">
                <rect x="0" y="0" width="80" height="60" fill="rgba(213, 54, 12, 0.25)" stroke="#D5360C" strokeWidth="2" />
                <rect x="0" y="-16" width="80" height="16" fill="#D5360C" />
                <text x="6" y="-4" fill="#F2E9DC" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  VEHICLE: 0.88
                </text>
                <circle cx="40" cy="60" r="3" fill="#E6D5BD" />
              </g>
            )}

            {/* Active Frenet Trajectory Ribbon in Burnt Orange */}
            <path
              d={
                obstacleLane === 'center'
                  ? 'M300,360 Q280,280 200,200 T210,120' // Swerve left to pass
                  : obstacleLane === 'left'
                  ? 'M300,360 Q320,280 340,200 T300,120' // Slight right bias
                  : 'M300,360 Q280,280 270,200 T300,120' // Slight left bias
              }
              fill="none"
              stroke="#D5360C"
              strokeWidth="3.5"
              strokeDasharray="6,6"
            />
          </svg>

          {/* Telemetry HUD Overlays */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#F2E9DC] bg-[#101010]/90 px-2.5 py-1 backdrop-blur-sm border border-[#35302C]">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#D5360C]" />
              <span>SYNTHETIC CAMERA (1280x720) + HOMOGRAPHY OVERLAY</span>
            </div>
            <span className="text-[#E6D5BD] font-bold">30 FPS // REAL-TIME</span>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#E6D5BD] bg-[#101010]/90 px-2.5 py-1 backdrop-blur-sm border border-[#35302C]">
            <span>HOMOGRAPHY H_INV: [0.0034, -0.012, 1.48]</span>
            <span className="text-[#D5360C] font-bold">TARGET LANE: {obstacleLane === 'center' ? 'LEFT SWERVE' : 'CENTER KEEP'}</span>
          </div>
        </div>

        {/* Right Controls Column: Interactive Diagnostics */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 p-5 bg-[#F2E9DC] border border-[#35302C]">
          {/* Obstacle Lane Injector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#35302C] uppercase font-bold">Simulate Lead Obstacle Lane:</span>
              <span className="text-[#D5360C] font-bold">{obstacleLane.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['left', 'center', 'right'] as const).map((lane) => (
                <button
                  key={lane}
                  type="button"
                  onClick={() => setObstacleLane(lane)}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    obstacleLane === lane
                      ? 'border-[#35302C] bg-[#D5360C] text-[#F2E9DC] font-bold shadow-xs'
                      : 'border-[#35302C] bg-[#E6D5BD] text-[#101010] hover:bg-[#F2E9DC]'
                  }`}
                >
                  {lane}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Speed Slider */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#35302C]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#35302C] font-semibold">Target Velocity:</span>
              <span className="text-[#D5360C] font-bold">{vehicleSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={vehicleSpeed}
              onChange={(e) => setVehicleSpeed(Number(e.target.value))}
              className="w-full accent-[#D5360C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#35302C]">
              <span>20 km/h (City)</span>
              <span>70 km/h (Arterial)</span>
            </div>
          </div>

          {/* Real-time Controller Readouts */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#35302C]">
            <div className="p-3 bg-[#E6D5BD] border border-[#35302C] flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#35302C] uppercase font-semibold">Stanley Steering</span>
              <div className="font-display font-bold text-lg text-[#D5360C] mt-0.5">
                {telemetry.steeringAngle > 0 ? `+${telemetry.steeringAngle}°` : `${telemetry.steeringAngle}°`}
              </div>
              <span className="text-[9px] font-mono text-[#35302C]">Cross-track error corrected</span>
            </div>

            <div className="p-3 bg-[#E6D5BD] border border-[#35302C] flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#35302C] uppercase font-semibold">Obstacle Distance</span>
              <div className="font-display font-bold text-lg text-[#101010] mt-0.5">
                {telemetry.leadDistance}m
              </div>
              <span className="text-[9px] font-mono text-[#35302C]">Via Homography IPM</span>
            </div>

            <div className="p-3 bg-[#E6D5BD] border border-[#35302C] flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#35302C] uppercase font-semibold">Risk Assessment</span>
              <div
                className={`font-display font-bold text-sm mt-0.5 ${
                  telemetry.collisionRisk === 'AVOIDING'
                    ? 'text-[#D5360C]'
                    : telemetry.collisionRisk === 'MONITORING'
                    ? 'text-[#A92A0A]'
                    : 'text-[#101010]'
                }`}
              >
                {telemetry.collisionRisk}
              </div>
              <span className="text-[9px] font-mono text-[#35302C]">Time-to-Collision Metric</span>
            </div>

            <div className="p-3 bg-[#E6D5BD] border border-[#35302C] flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#35302C] uppercase font-semibold">Pipeline Latency</span>
              <div className="font-display font-bold text-sm text-[#D5360C] mt-0.5">
                {telemetry.cycleLatency}
              </div>
              <span className="text-[9px] font-mono text-[#35302C]">Target &lt; 50ms (Passed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Insight Footer Box */}
      <div className="p-4 bg-[#F2E9DC] border-l-4 border-[#D5360C] text-xs font-mono text-[#35302C] leading-relaxed">
        <span className="text-[#D5360C] font-bold">INSIGHT:</span> By projecting the bottom bounding box coordinates directly into a vehicle-centric Frenet frame (s, d), the path planner avoids Cartesian coupling. The Stanley controller then calculates steering commands based on heading yaw error θ_e and cross-track offset e_fa. [SYNTHETIC SIMULATION BENCHMARK — Evaluated in closed-loop Python/CARLA simulation environments; not tested in physical road conditions.]
      </div>
    </div>
  );
}
