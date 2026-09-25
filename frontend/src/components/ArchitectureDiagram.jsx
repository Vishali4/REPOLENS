import React, { useState } from 'react';
import {
  Network,
  Server,
  Layers,
  Database,
  Globe,
  Cpu,
  ArrowDown,
  Sparkles,
  Info,
} from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState('repolens');

  const nodesInfo = {
    repolens: {
      title: 'RepoLens Orchestrator',
      description: 'Central pipeline coordinating static code analysis, route scheduling, and AI-grounded explanations.',
      tech: 'Core Engine',
    },
    frontend: {
      title: 'Frontend Client (React)',
      description: 'Fast single-page application built on Vite and Tailwind CSS. Renders interactive dashboards, language charts, and developer chat.',
      tech: 'React 18 + Vite',
    },
    backend: {
      title: 'Backend Gateway (FastAPI)',
      description: 'Asynchronous Python backend exposing clean REST APIs, handling rate limits, and securing environment secrets.',
      tech: 'FastAPI + Uvicorn',
    },
    scanner: {
      title: 'Repository Scanner Engine',
      description: 'Deterministic analyzer traversing Git tree structures, calculating file distributions, and classifying languages.',
      tech: 'PyGithub + Custom Parser',
    },
    github: {
      title: 'GitHub REST API',
      description: 'Upstream data provider for repository commits, tree hierarchies, metadata, and stars.',
      tech: 'api.github.com',
    },
    database: {
      title: 'Database & Vector Store (Planned)',
      description: 'Persistent caching layer and embedding storage for line-level code retrieval in future phases.',
      tech: 'PostgreSQL + Vector',
    },
  };

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Repository Architecture</h3>
            <p className="text-xs text-text-muted">Interactive visual component topology</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-purple-light font-medium bg-purple-primary/10 px-3 py-1 rounded-full border border-purple-primary/20">
          <Sparkles className="w-3.5 h-3.5 text-purple-bright" />
          <span>Interactive Diagram</span>
        </div>
      </div>

      {/* Visual Topology Diagram */}
      <div className="mt-8 flex flex-col items-center">
        {/* TOP: Central RepoLens Node */}
        <div
          onClick={() => setActiveNode('repolens')}
          className={`cursor-pointer transition-all duration-300 p-4 rounded-2xl border text-center select-none shadow-md ${
            activeNode === 'repolens'
              ? 'bg-purple-primary/20 border-purple-bright shadow-glow-md scale-105'
              : 'bg-background-secondary border-border-subtle hover:border-purple-primary/50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-primary/20 flex items-center justify-center text-purple-bright">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-base text-text-main">
              RepoLens Core
            </span>
          </div>
          <span className="text-[10px] text-purple-light font-semibold uppercase tracking-wider block mt-1">
            Orchestration Layer
          </span>
        </div>

        {/* Vertical Glowing Connector */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-purple-bright to-purple-primary shadow-[0_0_10px_#A855F7]" />

        {/* Horizontal Distributor Line (Desktop) */}
        <div className="hidden md:block w-3/4 max-w-xl h-0.5 bg-gradient-to-r from-purple-primary via-purple-bright to-purple-primary shadow-[0_0_8px_#A855F7]" />

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
          {/* Pillar 1: Frontend */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-purple-primary md:block hidden" />
            <div
              onClick={() => setActiveNode('frontend')}
              className={`w-full cursor-pointer transition-all duration-300 p-4 rounded-xl border text-center ${
                activeNode === 'frontend'
                  ? 'bg-purple-primary/20 border-purple-bright shadow-glow-sm'
                  : 'bg-background-secondary border-border-subtle hover:border-purple-primary/40'
              }`}
            >
              <div className="w-8 h-8 mx-auto rounded-lg bg-purple-primary/10 flex items-center justify-center text-purple-light mb-2">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-text-main">Frontend UI</h4>
              <p className="text-[11px] font-mono text-purple-bright mt-0.5">React 18 + Vite</p>
              <span className="inline-block mt-2 text-[10px] text-text-muted bg-background-main px-2 py-0.5 rounded border border-border-subtle">
                Tailwind CSS
              </span>
            </div>
          </div>

          {/* Pillar 2: Backend & Scanner */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-purple-bright md:block hidden" />
            <div
              onClick={() => setActiveNode('backend')}
              className={`w-full cursor-pointer transition-all duration-300 p-4 rounded-xl border text-center ${
                activeNode === 'backend'
                  ? 'bg-purple-primary/20 border-purple-bright shadow-glow-sm'
                  : 'bg-background-secondary border-border-subtle hover:border-purple-primary/40'
              }`}
            >
              <div className="w-8 h-8 mx-auto rounded-lg bg-purple-primary/10 flex items-center justify-center text-purple-bright mb-2">
                <Server className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-text-main">Backend API</h4>
              <p className="text-[11px] font-mono text-purple-bright mt-0.5">FastAPI + Uvicorn</p>
              <span className="inline-block mt-2 text-[10px] text-text-muted bg-background-main px-2 py-0.5 rounded border border-border-subtle">
                REST Routes &amp; CORS
              </span>
            </div>

            {/* Sub-node connector to Scanner and GitHub API */}
            <div className="w-0.5 h-6 bg-purple-bright my-2 flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-purple-light" />
            </div>

            <div
              onClick={() => setActiveNode('scanner')}
              className={`w-full cursor-pointer transition-all duration-300 p-3 rounded-xl border text-center ${
                activeNode === 'scanner'
                  ? 'bg-purple-primary/20 border-purple-bright shadow-glow-sm'
                  : 'bg-card-main border-border-subtle hover:border-purple-primary/40'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-text-main">
                <Layers className="w-3.5 h-3.5 text-purple-bright" />
                <span>Tree Scanner</span>
              </div>
              <p className="text-[10px] font-mono text-text-muted mt-0.5">PyGithub Analysis</p>
            </div>

            <div className="w-0.5 h-4 bg-purple-primary/60 my-1" />

            <div
              onClick={() => setActiveNode('github')}
              className={`w-full cursor-pointer transition-all duration-300 p-2.5 rounded-lg border text-center ${
                activeNode === 'github'
                  ? 'bg-purple-primary/20 border-purple-bright'
                  : 'bg-background-main border-border-subtle hover:border-purple-primary/30'
              }`}
            >
              <span className="text-[11px] font-mono font-medium text-purple-light">
                github.com / API
              </span>
            </div>
          </div>

          {/* Pillar 3: Database & Future Storage */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-purple-primary md:block hidden" />
            <div
              onClick={() => setActiveNode('database')}
              className={`w-full cursor-pointer transition-all duration-300 p-4 rounded-xl border text-center ${
                activeNode === 'database'
                  ? 'bg-purple-primary/20 border-purple-bright shadow-glow-sm'
                  : 'bg-background-secondary border-border-subtle hover:border-purple-primary/40'
              }`}
            >
              <div className="w-8 h-8 mx-auto rounded-lg bg-purple-primary/10 flex items-center justify-center text-purple-light mb-2">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-text-main">Storage &amp; AI</h4>
              <p className="text-[11px] font-mono text-purple-bright mt-0.5">PostgreSQL / Gemini</p>
              <span className="inline-block mt-2 text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Phase 2 Integration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details Box */}
      <div className="mt-8 p-4 rounded-xl bg-background-main border border-border-subtle flex items-start gap-3">
        <Info className="w-4 h-4 text-purple-bright mt-0.5 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-text-main">
              {nodesInfo[activeNode]?.title}
            </h4>
            <span className="text-[10px] font-mono text-purple-light bg-purple-primary/15 px-2 py-0.2 rounded border border-purple-primary/25">
              {nodesInfo[activeNode]?.tech}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-secondary leading-relaxed">
            {nodesInfo[activeNode]?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
