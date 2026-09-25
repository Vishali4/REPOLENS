import React from 'react';
import { PieChart } from 'lucide-react';
import { mockLanguages } from '../data/mockData';

export default function LanguageChart({ languages = mockLanguages }) {
  // SVG donut chart calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let strokeOffsetAccumulator = 0;

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Language Distribution</h3>
            <p className="text-xs text-text-muted">Detected codebase composition</p>
          </div>
        </div>
        <span className="text-xs font-mono text-purple-light bg-purple-primary/10 px-2 py-0.5 rounded-full border border-purple-primary/20">
          {languages.length} Languages
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Donut Chart */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-background-secondary stroke-current"
                strokeWidth="18"
                fill="transparent"
              />
              {/* Segment rings */}
              {languages.map((lang, index) => {
                const strokeDasharray = `${(lang.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -strokeOffsetAccumulator;
                strokeOffsetAccumulator += (lang.percentage / 100) * circumference;

                return (
                  <circle
                    key={lang.name}
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={lang.color}
                    strokeWidth="18"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out hover:opacity-85"
                  />
                );
              })}
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black font-mono text-text-main">
                {languages[0]?.percentage || 60}%
              </span>
              <span className="text-[11px] text-text-secondary font-medium">
                {languages[0]?.name || 'Python'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bars & Legend Beside Chart */}
        <div className="md:col-span-7 space-y-3.5">
          {languages.map((lang) => (
            <div key={lang.name} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="font-medium text-text-main group-hover:text-purple-light transition-colors">
                    {lang.name}
                  </span>
                  {lang.files && (
                    <span className="text-[10px] text-text-muted">
                      ({lang.files} files)
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-text-secondary">
                  {lang.percentage}%
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2 rounded-full bg-background-main border border-border-subtle overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
