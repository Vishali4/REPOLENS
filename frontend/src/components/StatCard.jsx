import React from 'react';
import * as Icons from 'lucide-react';

export default function StatCard({ label, value, description, icon, change }) {
  // Dynamically resolve icon from lucide-react if passed as string
  const IconComponent = typeof icon === 'string' ? Icons[icon] || Icons.HelpCircle : icon;

  return (
    <div className="relative group bg-card-main border border-border-subtle rounded-2xl p-5 hover:border-purple-primary/40 hover:bg-card-hover transition-all duration-300 shadow-sm hover:shadow-glow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">
          {label}
        </span>
        <div className="w-9 h-9 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright group-hover:scale-105 group-hover:bg-purple-primary/20 transition-transform">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-text-main tracking-tight font-mono">
          {value}
        </span>
        {change && (
          <span className="text-[11px] font-medium text-purple-light/90 bg-purple-primary/15 px-2 py-0.5 rounded-full border border-purple-primary/25">
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
