import React from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { mockArchitecture } from '../data/mockData';
import { Layers, Shield, Cpu, Network } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Repository Architecture
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Visualize how the major parts of your repository connect.
        </p>
      </div>

      {/* Main Interactive Diagram */}
      <ArchitectureDiagram />

      {/* Architectural Layer Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockArchitecture.layers.map((layer) => (
          <div
            key={layer.name}
            className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="text-base font-bold text-text-main">{layer.name}</h3>
              <span className="text-[11px] font-mono text-purple-bright bg-purple-primary/10 px-2 py-0.5 rounded border border-purple-primary/20">
                {layer.role}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {layer.nodes.map((node) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-xl bg-background-main/70 border border-border-subtle"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-main font-mono">
                      {node.title}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono bg-card-main px-1.5 py-0.5 rounded">
                      {node.tech}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-text-secondary">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
