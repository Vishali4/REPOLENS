import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  GitBranch,
  Layers,
  Cpu,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  Activity,
  Network,
  Terminal,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import RepositoryInput from '../components/RepositoryInput';
import LoadingAnalysis from '../components/LoadingAnalysis';
import Logo from '../components/Logo';

export default function Landing() {
  const navigate = useNavigate();
  const [analyzingUrl, setAnalyzingUrl] = useState(null);

  const handleStartAnalysis = (url) => {
    setAnalyzingUrl(url);
  };

  const handleFinishAnalysis = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-main text-text-main flex flex-col relative overflow-hidden">
      {analyzingUrl && (
        <LoadingAnalysis
          repoUrl={analyzingUrl}
          onFinish={handleFinishAnalysis}
          onErrorDismiss={() => setAnalyzingUrl(null)}
        />
      )}

      {/* Top Navbar */}
      <Navbar onGetStarted={() => navigate('/dashboard')} />

      {/* Ambient background purple radial gradients */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[700px] h-[450px] bg-purple-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[800px] -left-40 w-96 h-96 bg-purple-bright/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Small purple badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-primary/10 border border-purple-primary/30 text-purple-bright text-xs font-semibold tracking-wide uppercase shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-POWERED REPOSITORY INTELLIGENCE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-main leading-[1.15]">
              Understand Any{' '}
              <span className="purple-gradient-text">GitHub Repository.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Analyze your codebase, understand its architecture, explore dependencies, and discover insights — all in one intelligent workspace.
            </p>

            {/* Repository Input Form */}
            <div className="pt-2">
              <RepositoryInput onAnalyze={handleStartAnalysis} size="large" />
            </div>
          </div>

          {/* Right Hero Visual: Futuristic Repository Visualization */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-card-main border border-border-subtle rounded-3xl p-6 shadow-glow-md">
              {/* Outer top badge */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  <span className="font-mono text-text-secondary">RepoLens Engine v1.0</span>
                </div>
                <span className="text-purple-bright font-mono text-[11px] bg-purple-primary/15 px-2 py-0.5 rounded border border-purple-primary/30">
                  Live Preview
                </span>
              </div>

              {/* Graphic Flow Chart */}
              <div className="py-6 flex flex-col items-center select-none font-mono">
                {/* Root Node: RepoLens */}
                <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-primary to-purple-bright text-white font-bold text-xs shadow-glow-sm flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>RepoLens</span>
                </div>

                {/* Connector Line */}
                <div className="w-0.5 h-6 bg-purple-bright shadow-[0_0_8px_#A855F7]" />

                {/* Branch line */}
                <div className="w-48 h-0.5 bg-gradient-to-r from-purple-primary via-purple-bright to-purple-primary" />

                {/* 3 Pillars */}
                <div className="flex justify-between w-64 mt-2">
                  {/* Frontend */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-purple-primary" />
                    <div className="p-2 rounded-lg bg-background-main border border-border-subtle text-[11px] text-text-main text-center">
                      <span className="font-bold block">Frontend</span>
                      <span className="text-[9px] text-purple-light">React</span>
                    </div>
                  </div>

                  {/* Backend */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-purple-bright" />
                    <div className="p-2 rounded-lg bg-background-main border border-purple-bright/40 text-[11px] text-text-main text-center shadow-glow-sm">
                      <span className="font-bold block">Backend</span>
                      <span className="text-[9px] text-purple-bright">FastAPI</span>
                    </div>
                  </div>

                  {/* Database */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-purple-primary" />
                    <div className="p-2 rounded-lg bg-background-main border border-border-subtle text-[11px] text-text-main text-center">
                      <span className="font-bold block">Database</span>
                      <span className="text-[9px] text-purple-light">Postgres</span>
                    </div>
                  </div>
                </div>

                {/* Micro Metrics underneath */}
                <div className="mt-6 w-full grid grid-cols-3 gap-2 text-center pt-4 border-t border-border-subtle">
                  <div className="p-2 rounded-lg bg-background-secondary border border-border-subtle">
                    <span className="text-[10px] text-text-muted block">Files</span>
                    <span className="text-xs font-bold text-text-main">42</span>
                  </div>
                  <div className="p-2 rounded-lg bg-background-secondary border border-border-subtle">
                    <span className="text-[10px] text-text-muted block">Languages</span>
                    <span className="text-xs font-bold text-purple-bright">5</span>
                  </div>
                  <div className="p-2 rounded-lg bg-background-secondary border border-border-subtle">
                    <span className="text-[10px] text-text-muted block">Health</span>
                    <span className="text-xs font-bold text-status-success">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20 bg-background-secondary/50 border-t border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider text-purple-bright uppercase">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-text-main tracking-tight">
              Everything You Need to Understand Your Codebase
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/50 hover:bg-card-hover transition-all duration-300 shadow-sm hover:shadow-glow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright mb-4 group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-main group-hover:text-purple-light transition-colors">
                1. Repository Intelligence
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Understand the structure and organization of any repository.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/50 hover:bg-card-hover transition-all duration-300 shadow-sm hover:shadow-glow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright mb-4 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-main group-hover:text-purple-light transition-colors">
                2. Code Analysis
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Explore languages, files, complexity and potential issues.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/50 hover:bg-card-hover transition-all duration-300 shadow-sm hover:shadow-glow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright mb-4 group-hover:scale-105 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-main group-hover:text-purple-light transition-colors">
                3. Architecture Insights
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Visualize how your repository components connect.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/50 hover:bg-card-hover transition-all duration-300 shadow-sm hover:shadow-glow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright mb-4 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-main group-hover:text-purple-light transition-colors">
                4. AI-Powered Understanding
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Ask questions and get contextual explanations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-purple-bright uppercase">
            Simple 3-Step Process
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-text-main tracking-tight">
            How RepoLens Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 01 */}
          <div className="bg-card-main border border-border-subtle rounded-2xl p-8 relative hover:border-purple-primary/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-primary/20 border-2 border-purple-bright text-purple-light flex items-center justify-center font-mono font-black text-lg mb-6 shadow-glow-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Connect Repository</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Paste your GitHub repository URL.
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-card-main border border-border-subtle rounded-2xl p-8 relative hover:border-purple-primary/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-primary/20 border-2 border-purple-bright text-purple-light flex items-center justify-center font-mono font-black text-lg mb-6 shadow-glow-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Analyze Codebase</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              RepoLens analyzes your files, structure and dependencies.
            </p>
          </div>

          {/* Step 03 */}
          <div className="bg-card-main border border-border-subtle rounded-2xl p-8 relative hover:border-purple-primary/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-primary/20 border-2 border-purple-bright text-purple-light flex items-center justify-center font-mono font-black text-lg mb-6 shadow-glow-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Understand Your Code</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Explore insights, architecture and AI explanations.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold text-white purple-glow-btn"
          >
            <span>Launch RepoLens Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-subtle py-8 bg-background-secondary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <Logo size="small" />
          <p>© 2026 RepoLens Platform. Built for developers, teams, and students.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-light transition-colors">
              GitHub
            </a>
            <span className="text-border-subtle">•</span>
            <button type="button" onClick={() => navigate('/settings')} className="hover:text-purple-light transition-colors">
              Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
