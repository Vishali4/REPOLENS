import React, { useState } from 'react';
import { Link2, ArrowRight, Sparkles } from 'lucide-react';

export default function RepositoryInput({ onAnalyze, initialValue = '', size = 'default' }) {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a GitHub repository URL.');
      return;
    }
    setError('');
    onAnalyze(url.trim());
  };

  const handleSampleClick = (sampleUrl) => {
    setUrl(sampleUrl);
    setError('');
    onAnalyze(sampleUrl);
  };

  const isLarge = size === 'large';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glowing border background on hover/focus */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-primary via-purple-bright to-purple-light opacity-30 blur-sm group-hover:opacity-75 transition duration-500 group-focus-within:opacity-100" />

        <div className="relative flex items-center bg-card-main border border-border-subtle rounded-2xl p-2 transition-all duration-200 group-focus-within:border-purple-bright/80">
          <div className="pl-3 pr-2 text-text-muted">
            <Link2 className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} text-purple-bright`} />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder="https://github.com/username/repository"
            className={`w-full bg-transparent text-text-main placeholder-text-muted focus:outline-none font-mono text-sm px-2 ${
              isLarge ? 'py-2.5 text-base' : 'py-1.5'
            }`}
          />

          <button
            type="submit"
            className={`flex-shrink-0 flex items-center gap-2 rounded-xl font-semibold text-white purple-glow-btn transition-all ${
              isLarge ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-xs'
            }`}
          >
            <span>Analyze Repository</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-2 text-xs text-status-error font-medium px-2 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Quick Try Samples */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted">
        <span className="flex items-center gap-1 text-text-secondary">
          <Sparkles className="w-3.5 h-3.5 text-purple-bright" /> Try:
        </span>
        <button
          type="button"
          onClick={() => handleSampleClick('https://github.com/facebook/react')}
          className="hover:text-purple-light font-mono px-2 py-0.5 rounded-md bg-card-main/80 border border-border-subtle hover:border-purple-primary/40 transition-colors"
        >
          github.com/facebook/react
        </button>
        <button
          type="button"
          onClick={() => handleSampleClick('https://github.com/fastapi/fastapi')}
          className="hover:text-purple-light font-mono px-2 py-0.5 rounded-md bg-card-main/80 border border-border-subtle hover:border-purple-primary/40 transition-colors"
        >
          github.com/fastapi/fastapi
        </button>
        <button
          type="button"
          onClick={() => handleSampleClick('https://github.com/pallets/flask')}
          className="hover:text-purple-light font-mono px-2 py-0.5 rounded-md bg-card-main/80 border border-border-subtle hover:border-purple-primary/40 transition-colors"
        >
          github.com/pallets/flask
        </button>
      </div>
    </div>
  );
}
