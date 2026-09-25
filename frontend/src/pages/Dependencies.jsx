import React from 'react';
import { Package, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { mockDependencies } from '../data/mockData';
import DependencyTable from '../components/DependencyTable';

export default function Dependencies() {
  const backendCount = mockDependencies.filter((d) => d.type === 'Backend').length;
  const frontendCount = mockDependencies.filter((d) => d.type === 'Frontend').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Dependency Analysis
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Audit packages, versions, ecosystems, and health status across the codebase.
        </p>
      </div>

      {/* Mini Ecosystem Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card-main border border-border-subtle rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Total Dependencies</span>
            <Package className="w-4 h-4 text-purple-bright" />
          </div>
          <p className="mt-2 text-2xl font-mono font-bold text-text-main">
            {mockDependencies.length}
          </p>
          <span className="text-[11px] text-text-muted mt-1 block">Active manifest packages</span>
        </div>

        <div className="bg-card-main border border-border-subtle rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Backend (Python / PyPI)</span>
            <ShieldCheck className="w-4 h-4 text-purple-light" />
          </div>
          <p className="mt-2 text-2xl font-mono font-bold text-text-main">
            {backendCount}
          </p>
          <span className="text-[11px] text-text-muted mt-1 block">FastAPI, PyGithub, Uvicorn</span>
        </div>

        <div className="bg-card-main border border-border-subtle rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Frontend (Node / npm)</span>
            <CheckCircle2 className="w-4 h-4 text-status-success" />
          </div>
          <p className="mt-2 text-2xl font-mono font-bold text-text-main">
            {frontendCount}
          </p>
          <span className="text-[11px] text-text-muted mt-1 block">React, Tailwind, Lucide</span>
        </div>
      </div>

      {/* Main Dependency Table */}
      <DependencyTable dependencies={mockDependencies} />
    </div>
  );
}
