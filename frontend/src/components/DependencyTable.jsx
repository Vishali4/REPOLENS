import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Filter, Layers } from 'lucide-react';
import { mockDependencies } from '../data/mockData';

export default function DependencyTable({ dependencies = mockDependencies }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredDeps = dependencies.filter((dep) => {
    const matchesSearch =
      dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dep.ecosystem?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'All' || dep.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Package Manifest</h3>
            <p className="text-xs text-text-muted">Direct repository dependencies</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-background-main border border-border-subtle">
          {['All', 'Backend', 'Frontend'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-purple-primary/20 text-purple-bright border border-purple-primary/30 shadow-sm'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4 mb-4 relative">
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search package name or ecosystem..."
          className="w-full bg-background-main border border-border-subtle rounded-xl pl-10 pr-4 py-2 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-purple-bright/60 font-mono"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border-subtle text-text-muted uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Package</th>
              <th className="py-3 px-3">Installed</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">License</th>
              <th className="py-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/40">
            {filteredDeps.length > 0 ? (
              filteredDeps.map((dep) => (
                <tr
                  key={dep.name}
                  className="hover:bg-card-hover/80 transition-colors group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-background-main flex items-center justify-center text-text-muted group-hover:text-purple-bright border border-border-subtle">
                        <Layers className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-text-main font-mono">
                        {dep.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-text-secondary">
                    {dep.version}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      dep.type === 'Backend'
                        ? 'bg-purple-primary/10 text-purple-light border-purple-primary/20'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}>
                      {dep.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-text-muted">
                    {dep.license || 'Open Source'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-status-success bg-status-success/10 px-2 py-0.5 rounded-full border border-status-success/20">
                      <CheckCircle2 className="w-3 h-3" />
                      {dep.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-muted">
                  No dependencies matched your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
