'use client';

import React, { useState } from 'react';
import { RefreshCw, Network } from 'lucide-react';

interface BayesNode {
  id: string;
  name: string;
  short: string;
  x: number; // percentage
  y: number; // percentage
  marginalTrue: number; // 0..1
  evidence: boolean | null; // null = unobserved, true/false = clamped
  parents: string[];
}

export default function ProbabilisticGraphVisualizer() {
  const initialNodes: BayesNode[] = [
    {
      id: 'weather',
      name: 'Adverse Weather',
      short: 'W',
      x: 25,
      y: 20,
      marginalTrue: 0.2,
      evidence: null,
      parents: [],
    },
    {
      id: 'sensor_noise',
      name: 'Camera Blur / Noise',
      short: 'S',
      x: 75,
      y: 20,
      marginalTrue: 0.15,
      evidence: null,
      parents: [],
    },
    {
      id: 'detection',
      name: 'Obstacle Detection',
      short: 'D',
      x: 50,
      y: 55,
      marginalTrue: 0.264,
      evidence: null,
      parents: ['weather', 'sensor_noise'],
    },
    {
      id: 'brake',
      name: 'Brake Trigger Action',
      short: 'B',
      x: 50,
      y: 88,
      marginalTrue: 0.272,
      evidence: null,
      parents: ['detection'],
    },
  ];

  const [nodes, setNodes] = useState<BayesNode[]>(initialNodes);

  // Exact Bayesian inference via full joint distribution marginalization over CPTs
  const computeBeliefs = (currentNodes: BayesNode[]) => {
    const weatherEv = currentNodes.find((n) => n.id === 'weather')!.evidence;
    const sensorEv = currentNodes.find((n) => n.id === 'sensor_noise')!.evidence;
    const detectEv = currentNodes.find((n) => n.id === 'detection')!.evidence;
    const brakeEv = currentNodes.find((n) => n.id === 'brake')!.evidence;

    // Conditional Probability Tables (CPTs)
    const P_W = (w: boolean) => (w ? 0.20 : 0.80);
    const P_S = (s: boolean) => (s ? 0.15 : 0.85);

    const P_D_given_WS = (d: boolean, w: boolean, s: boolean) => {
      let pTrue = 0.10; // baseline false alarm rate
      if (w && s) pTrue = 0.85;
      else if (w && !s) pTrue = 0.65;
      else if (!w && s) pTrue = 0.50;
      return d ? pTrue : 1 - pTrue;
    };

    const P_B_given_D = (b: boolean, d: boolean) => {
      const pTrue = d ? 0.92 : 0.04;
      return b ? pTrue : 1 - pTrue;
    };

    // Calculate unnormalized joint probabilities across all 16 states consistent with evidence
    const booleanStates = [false, true];
    let totalConsistentMass = 0;
    const marginalTrueMass: Record<string, number> = {
      weather: 0,
      sensor_noise: 0,
      detection: 0,
      brake: 0,
    };

    for (const w of booleanStates) {
      if (weatherEv !== null && weatherEv !== w) continue;
      for (const s of booleanStates) {
        if (sensorEv !== null && sensorEv !== s) continue;
        for (const d of booleanStates) {
          if (detectEv !== null && detectEv !== d) continue;
          for (const b of booleanStates) {
            if (brakeEv !== null && brakeEv !== b) continue;

            // Joint P(W, S, D, B) = P(W) * P(S) * P(D|W,S) * P(B|D)
            const pState = P_W(w) * P_S(s) * P_D_given_WS(d, w, s) * P_B_given_D(b, d);
            totalConsistentMass += pState;

            if (w) marginalTrueMass.weather += pState;
            if (s) marginalTrueMass.sensor_noise += pState;
            if (d) marginalTrueMass.detection += pState;
            if (b) marginalTrueMass.brake += pState;
          }
        }
      }
    }

    const Z = totalConsistentMass > 0 ? totalConsistentMass : 1e-9;

    return currentNodes.map((n) => {
      let marginal: number;
      if (n.evidence !== null) {
        marginal = n.evidence ? 1.0 : 0.0;
      } else {
        marginal = marginalTrueMass[n.id] / Z;
      }

      return {
        ...n,
        marginalTrue: Math.min(1.0, Math.max(0.0, marginal)),
      };
    });
  };

  const toggleEvidence = (nodeId: string) => {
    setNodes((prev) => {
      const updated = prev.map((node) => {
        if (node.id === nodeId) {
          const nextEvidence =
            node.evidence === null ? true : node.evidence === true ? false : null;
          return { ...node, evidence: nextEvidence };
        }
        return node;
      });
      return computeBeliefs(updated);
    });
  };

  const resetGraph = () => {
    setNodes(initialNodes);
  };

  return (
    <div className="w-full bg-[#E6D5BD] border border-[#35302C] p-6 md:p-8 flex flex-col gap-6 shadow-xs text-[#101010]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#35302C]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#D5360C] font-bold">
            <Network className="w-4 h-4 text-[#D5360C]" />
            <span>EXACT INFERENCE // BELIEF PROPAGATION</span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[#101010] mt-1">
            Probabilistic Graphical Model Diagnostic
          </h3>
        </div>

        <button
          type="button"
          onClick={resetGraph}
          className="px-3.5 py-1.5 text-xs font-mono border border-[#35302C] bg-[#F2E9DC] text-[#101010] hover:bg-[#E6D5BD] transition-colors flex items-center gap-1.5 shadow-xs font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Evidence</span>
        </button>
      </div>

      {/* Graph Visual Area */}
      <div className="relative w-full h-[380px] bg-[#101010] border border-[#35302C] overflow-hidden shadow-inner">
        {/* SVG Directed Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrow-orange"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#D5360C" />
            </marker>
            <marker
              id="arrow-ivory"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#E6D5BD" />
            </marker>
          </defs>

          {/* Edges from weather to detection */}
          <line
            x1="25%"
            y1="22%"
            x2="50%"
            y2="55%"
            stroke="#E6D5BD"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            opacity="0.85"
            markerEnd="url(#arrow-ivory)"
          />

          {/* Edges from sensor noise to detection */}
          <line
            x1="75%"
            y1="22%"
            x2="50%"
            y2="55%"
            stroke="#E6D5BD"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            opacity="0.85"
            markerEnd="url(#arrow-ivory)"
          />

          {/* Edge from detection to brake in Burnt Orange */}
          <line
            x1="50%"
            y1="57%"
            x2="50%"
            y2="88%"
            stroke="#D5360C"
            strokeWidth="2.5"
            opacity="0.95"
            markerEnd="url(#arrow-orange)"
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isClamped = node.evidence !== null;
          const probPct = Math.round(node.marginalTrue * 100);

          return (
            <div
              key={node.id}
              onClick={() => toggleEvidence(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleEvidence(node.id)}
              aria-label={`Toggle evidence on ${node.name}`}
            >
              <div
                className={`p-3.5 rounded border transition-all duration-200 min-w-[155px] shadow-md ${
                  isClamped
                    ? 'bg-[#E6D5BD] border-2 border-[#D5360C] ring-2 ring-[#D5360C]/40 text-[#101010]'
                    : 'bg-[#F2E9DC] border-[#35302C] hover:border-[#101010] text-[#101010]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-[#35302C]">
                  <span className="font-bold text-[#101010] group-hover:text-[#D5360C] transition-colors">
                    {node.name}
                  </span>
                  {isClamped ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#D5360C] text-[#F2E9DC] font-bold">
                      {node.evidence ? 'OBS: TRUE' : 'OBS: FALSE'}
                    </span>
                  ) : (
                    <span className="text-[9px] text-[#35302C] font-semibold">CLICK CLAMP</span>
                  )}
                </div>

                {/* Marginal Probability Bar */}
                <div className="mt-2.5 flex flex-col gap-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-[#35302C] font-semibold">P(True | e):</span>
                    <span className="font-bold text-[#D5360C]">{probPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E6D5BD] border border-[#35302C] rounded-none overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isClamped ? 'bg-[#D5360C]' : 'bg-[#101010]'
                      }`}
                      style={{ width: `${probPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 bg-[#E6D5BD] px-2.5 py-1 border border-[#35302C] font-mono text-[10px] text-[#101010] pointer-events-none shadow-xs font-semibold">
          CLICK ANY NODE TO CLAMP EVIDENCE AND TRIGGER MESSAGE PASSING
        </div>
      </div>

      <div className="p-4 bg-[#F2E9DC] border-l-4 border-[#D5360C] text-xs font-mono text-[#35302C] leading-relaxed">
        <span className="text-[#D5360C] font-bold">REASONING:</span>{' '}
        Clicking <strong className="text-[#101010]">Obstacle Detection</strong> to clamp it to <span className="text-[#D5360C] font-bold">True</span> causes backward belief propagation to both parent causes (Weather and Sensor Noise). Observing that Weather is also True decreases the posterior requirement on Sensor Noise—reproducing the textbook <em>explaining away</em> phenomenon.
      </div>
    </div>
  );
}
