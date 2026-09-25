import React from 'react';
import AIChat from '../components/AIChat';
import { Bot, Sparkles, BookOpen, Shield } from 'lucide-react';

export default function AIAssistant() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          RepoLens AI
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Ask anything about this repository. Grounded in actual codebase files and metrics.
        </p>
      </div>

      {/* Main Interactive Assistant */}
      <AIChat />

      {/* Disclaimer / Model Info Banner */}
      <div className="p-4 rounded-xl bg-card-main border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-bright" />
          <span>Responses are generated with repository context grounding. Code citations are indexed deterministically.</span>
        </div>
        <span className="font-mono text-purple-light text-[11px] bg-purple-primary/10 px-2 py-0.5 rounded border border-purple-primary/20">
          Gemini Flash 2.0 (Simulated)
        </span>
      </div>
    </div>
  );
}
