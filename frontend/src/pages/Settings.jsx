import React, { useState } from 'react';
import {
  Palette,
  GitBranch,
  Sliders,
  Check,
  Save,
  Moon,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('purple');
  const [defaultBranch, setDefaultBranch] = useState('main');
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Configure interface preferences, default branch resolution, and display parameters.
        </p>
      </div>

      {/* Section 1: Appearance */}
      <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-subtle">
          <Palette className="w-5 h-5 text-purple-bright" />
          <h2 className="text-base font-bold text-text-main">Appearance</h2>
        </div>

        <div className="mt-5 space-y-6">
          {/* Theme Option */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-main">Theme</p>
              <p className="text-xs text-text-muted">Primary application color palette</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-purple-primary text-white shadow-glow-sm'
                    : 'bg-background-main border border-border-subtle text-text-muted'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark (Active)</span>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border-subtle/50">
            <div>
              <p className="text-sm font-semibold text-text-main">Accent Glow</p>
              <p className="text-xs text-text-muted">Primary accent hue for buttons and active routes</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background-main border border-border-subtle">
                <span className="w-3.5 h-3.5 rounded-full bg-purple-bright shadow-[0_0_8px_#A855F7]" />
                <span className="text-xs font-mono font-medium text-text-main">Purple (#8B5CF6)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Repository Settings */}
      <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-subtle">
          <GitBranch className="w-5 h-5 text-purple-bright" />
          <h2 className="text-base font-bold text-text-main">Repository Configuration</h2>
        </div>

        <div className="mt-5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-text-main">Default Branch</p>
              <p className="text-xs text-text-muted">Branch targeted during tree inspection</p>
            </div>
            <div className="w-48">
              <input
                type="text"
                value={defaultBranch}
                onChange={(e) => setDefaultBranch(e.target.value)}
                className="w-full bg-background-main border border-border-subtle rounded-xl px-3 py-1.5 text-xs text-text-main font-mono focus:outline-none focus:border-purple-bright/70"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Interface Controls */}
      <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border-subtle">
          <Sliders className="w-5 h-5 text-purple-bright" />
          <h2 className="text-base font-bold text-text-main">Interface Preferences</h2>
        </div>

        <div className="mt-5 space-y-5">
          {/* Animations Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-main">Micro-Animations</p>
              <p className="text-xs text-text-muted">Smooth glow pulses and transition effects</p>
            </div>
            <button
              type="button"
              onClick={() => setAnimations(!animations)}
              className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                animations ? 'bg-purple-primary' : 'bg-border-subtle'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  animations ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Compact Mode Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle/50">
            <div>
              <p className="text-sm font-semibold text-text-main">Compact Dashboard Mode</p>
              <p className="text-xs text-text-muted">Dense card padding for power users</p>
            </div>
            <button
              type="button"
              onClick={() => setCompactMode(!compactMode)}
              className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
                compactMode ? 'bg-purple-primary' : 'bg-border-subtle'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  compactMode ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white purple-glow-btn"
        >
          {saved ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Preferences Saved!' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
