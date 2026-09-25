import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Menu,
  Github,
  PlusCircle,
  GitBranch,
  ExternalLink,
  X,
} from 'lucide-react';
import Sidebar from './Sidebar';
import RepositoryInput from './RepositoryInput';
import LoadingAnalysis from './LoadingAnalysis';
import { useRepository } from '../context/RepositoryContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newAnalysisModalOpen, setNewAnalysisModalOpen] = useState(false);
  const [analyzingUrl, setAnalyzingUrl] = useState(null);
  const navigate = useNavigate();
  const { repoData } = useRepository();
  const currentRepo = repoData?.repository;

  const handleStartAnalysis = (url) => {
    setNewAnalysisModalOpen(false);
    setAnalyzingUrl(url);
  };

  const handleFinishAnalysis = () => {
    setAnalyzingUrl(null);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-main text-text-main flex">
      {/* Full-screen Loading Animation when analysis is triggered */}
      {analyzingUrl && (
        <LoadingAnalysis
          repoUrl={analyzingUrl}
          onFinish={handleFinishAnalysis}
          onErrorDismiss={() => setAnalyzingUrl(null)}
        />
      )}

      {/* Desktop & Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background-main/80 backdrop-blur-md border-b border-border-subtle px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-main hover:bg-card-main focus:outline-none"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current Repository Name & Branch Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-main flex items-center gap-1.5 font-mono">
                <span className="text-text-muted">{currentRepo?.owner} /</span>
                <span className="text-white hover:text-purple-light transition-colors">
                  {currentRepo?.name}
                </span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-purple-bright bg-purple-primary/10 px-2 py-0.5 rounded-full border border-purple-primary/20">
                <GitBranch className="w-3 h-3" />
                <span>{currentRepo?.default_branch || 'main'}</span>
              </span>
            </div>
          </div>

          {/* Right Top Bar Actions */}
          <div className="flex items-center gap-3">
            {/* View on GitHub */}
            <a
              href={currentRepo?.html_url || `https://github.com/${currentRepo?.full_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-main bg-card-main border border-border-subtle hover:border-purple-primary/40 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
              <ExternalLink className="w-3 h-3 text-text-muted" />
            </a>

            {/* New Analysis Trigger Button */}
            <button
              type="button"
              onClick={() => setNewAnalysisModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white purple-glow-btn"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* New Analysis Modal */}
      {newAnalysisModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-card-main border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-glow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <h3 className="text-lg font-bold text-text-main">
                Analyze New Repository
              </h3>
              <button
                type="button"
                onClick={() => setNewAnalysisModalOpen(false)}
                className="text-text-muted hover:text-text-main p-1 rounded-lg hover:bg-background-main"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-text-secondary">
              Enter any public or private GitHub repository URL to inspect files, languages, and architecture.
            </p>

            <div className="mt-5">
              <RepositoryInput onAnalyze={handleStartAnalysis} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
