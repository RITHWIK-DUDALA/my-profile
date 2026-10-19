'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  history: { x: number; y: number }[];
  maxHistory: number;
  color: string;
}

export default function TrajectoryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse interactive target
    const mouse = { x: width * 0.7, y: height * 0.45, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = width * 0.7;
      mouse.y = height * 0.45;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles for path trajectories
    const particleCount = prefersReduced ? 15 : 45;
    const particles: Particle[] = [];
    const colors = ['#D5360C', '#E6D5BD', '#F2E9DC', '#C7B69F'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        history: [],
        maxHistory: Math.floor(Math.random() * 20 + 10),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Waypoints for vehicle-like path planning simulation
    const waypoints = [
      { x: width * 0.15, y: height * 0.8 },
      { x: width * 0.4, y: height * 0.6 },
      { x: width * 0.65, y: height * 0.7 },
      { x: width * 0.85, y: height * 0.35 },
    ];

    let t = 0;

    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle technical coordinate grid & axes
      ctx.strokeStyle = 'rgba(230, 213, 189, 0.08)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw simulated Frenet spline trajectory reference curve in Burnt Orange
      ctx.beginPath();
      ctx.moveTo(waypoints[0].x, waypoints[0].y);
      for (let i = 1; i < waypoints.length; i++) {
        const xc = (waypoints[i - 1].x + waypoints[i].x) / 2;
        const yc = (waypoints[i - 1].y + waypoints[i].y) / 2;
        ctx.quadraticCurveTo(waypoints[i - 1].x, waypoints[i - 1].y, xc, yc);
      }
      ctx.strokeStyle = 'rgba(213, 54, 12, 0.55)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw active vehicle node following spline
      const splineT = (Math.sin(t * 0.8) + 1) / 2;
      const leadX =
        Math.pow(1 - splineT, 3) * waypoints[0].x +
        3 * Math.pow(1 - splineT, 2) * splineT * waypoints[1].x +
        3 * (1 - splineT) * Math.pow(splineT, 2) * waypoints[2].x +
        Math.pow(splineT, 3) * waypoints[3].x;
      const leadY =
        Math.pow(1 - splineT, 3) * waypoints[0].y +
        3 * Math.pow(1 - splineT, 2) * splineT * waypoints[1].y +
        3 * (1 - splineT) * Math.pow(splineT, 2) * waypoints[2].y +
        Math.pow(splineT, 3) * waypoints[3].y;

      // Draw target vehicle indicator in Burnt Orange
      ctx.beginPath();
      ctx.arc(leadX, leadY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#D5360C';
      ctx.fill();
      ctx.strokeStyle = '#F2E9DC';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw heading vector
      ctx.beginPath();
      ctx.moveTo(leadX, leadY);
      const headingAngle = Math.cos(t * 0.8);
      ctx.lineTo(leadX + Math.cos(headingAngle) * 24, leadY + Math.sin(headingAngle) * 24);
      ctx.strokeStyle = '#D5360C';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw radar arc / detection cone
      ctx.beginPath();
      ctx.arc(leadX, leadY, 45, headingAngle - 0.5, headingAngle + 0.5);
      ctx.strokeStyle = 'rgba(213, 54, 12, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Telemetry text overlay in Warm Ivory
      ctx.font = '10px monospace';
      ctx.fillStyle = '#F2E9DC';
      ctx.fillText(`POSE [X:${leadX.toFixed(1)}, Y:${leadY.toFixed(1)}]`, leadX + 12, leadY - 12);
      ctx.fillStyle = '#E6D5BD';
      ctx.fillText(`THETA: ${(headingAngle * 57.3).toFixed(1)}°`, leadX + 12, leadY);

      // Update and draw vector field particles
      particles.forEach((p) => {
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > p.maxHistory) {
          p.history.shift();
        }

        // Slight attraction toward mouse or lead vehicle
        const targetX = mouse.active ? mouse.x : leadX;
        const targetY = mouse.active ? mouse.y : leadY;
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10 && dist < 300) {
          p.vx += (dx / dist) * 0.04;
          p.vy += (dy / dist) * 0.04;
        }

        // Limit speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle trail
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i = 1; i < p.history.length; i++) {
            ctx.lineTo(p.history[i].x, p.history[i].y);
          }
          ctx.strokeStyle = p.color === '#D5360C' ? 'rgba(213, 54, 12, 0.6)' : 'rgba(230, 213, 189, 0.35)';
          ctx.lineWidth = p.color === '#D5360C' ? 1.4 : 0.8;
          ctx.stroke();
        }

        // Draw head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.color === '#D5360C' ? 2.2 : 1.4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[580px] overflow-hidden rounded-none border border-[#35302C] bg-[#101010]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        aria-label="Interactive Autonomous Trajectory and Vector Field Canvas"
      />
      <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 bg-[#E6D5BD] border border-[#35302C] text-[10px] font-mono text-[#101010] pointer-events-none shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5360C] animate-pulse" />
        <span className="font-bold text-[#101010]">SIM // FRENET TRAJECTORY GENERATION</span>
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#101010] bg-[#E6D5BD] px-2.5 py-1 border border-[#35302C] pointer-events-none shadow-xs font-semibold">
        INTERACTIVE: MOVE CURSOR TO INFLUENCE TRAJECTORY
      </div>
    </div>
  );
}
