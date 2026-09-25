import React from 'react';
import {
  GitBranch,
  Star,
  GitFork,
  AlertCircle,
  Code2,
  ExternalLink,
  Shield,
  Clock,
  User,
} from 'lucide-react';

export default function RepositoryCard({ repository }) {
  if (!repository) return null;

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-primary/15 text-purple-bright border border-purple-primary/30">
              {repository.private ? 'Private Repository' : 'Public Repository'}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Updated {repository.last_commit || 'recently'}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-text-main flex items-center gap-2">
            <span className="text-text-muted font-normal">{repository.owner} /</span>
            <span className="text-white hover:text-purple-light transition-colors">{repository.name}</span>
          </h2>
        </div>

        {/* View on GitHub Button */}
        <a
          href={repository.html_url || `https://github.com/${repository.full_name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-text-main bg-background-secondary border border-border-subtle hover:border-purple-bright/50 hover:bg-card-hover transition-all"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-4 h-4 text-purple-bright" />
        </a>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-text-secondary leading-relaxed">
        {repository.description || 'No description provided for this repository.'}
      </p>

      {/* Metadata Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Stars */}
        <div className="bg-background-main/60 border border-border-subtle rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Stars</span>
          </div>
          <p className="mt-1 text-lg font-bold font-mono text-text-main">
            {Number(repository.stars).toLocaleString()}
          </p>
        </div>

        {/* Forks */}
        <div className="bg-background-main/60 border border-border-subtle rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <GitFork className="w-3.5 h-3.5 text-purple-light" />
            <span>Forks</span>
          </div>
          <p className="mt-1 text-lg font-bold font-mono text-text-main">
            {Number(repository.forks).toLocaleString()}
          </p>
        </div>

        {/* Open Issues */}
        <div className="bg-background-main/60 border border-border-subtle rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <AlertCircle className="w-3.5 h-3.5 text-status-warning" />
            <span>Open Issues</span>
          </div>
          <p className="mt-1 text-lg font-bold font-mono text-text-main">
            {Number(repository.open_issues).toLocaleString()}
          </p>
        </div>

        {/* Primary Language */}
        <div className="bg-background-main/60 border border-border-subtle rounded-xl p-3.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Code2 className="w-3.5 h-3.5 text-purple-bright" />
            <span>Language</span>
          </div>
          <p className="mt-1 text-lg font-bold font-mono text-text-main">
            {repository.primary_language || repository.language || 'Multi-language'}
          </p>
        </div>
      </div>

      {/* Sub-footer details */}
      <div className="mt-5 pt-4 border-t border-border-subtle flex flex-wrap items-center gap-6 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-purple-bright" />
          <span>Default branch: <strong className="text-text-secondary font-mono">{repository.default_branch}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-status-success" />
          <span>License: <strong className="text-text-secondary">{repository.license || 'None'}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-text-secondary" />
          <span>Owner: <strong className="text-text-secondary">{repository.owner}</strong></span>
        </div>
      </div>
    </div>
  );
}
