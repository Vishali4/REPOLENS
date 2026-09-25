import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Zap,
  Activity,
  Award,
} from 'lucide-react';
import { mockAnalysis } from '../data/mockData';

export default function AnalysisCard({ analysis = mockAnalysis }) {
  const getIconForMetric = (label) => {
    switch (label) {
      case 'Code Quality':
        return <Award className="w-4 h-4 text-purple-bright" />;
      case 'Complexity':
        return <Zap className="w-4 h-4 text-status-success" />;
      case 'Potential Issues':
        return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      case 'Maintainability':
        return <ShieldCheck className="w-4 h-4 text-purple-light" />;
      default:
        return <Activity className="w-4 h-4 text-purple-bright" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analysis.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-card-main border border-border-subtle rounded-2xl p-5 hover:border-purple-primary/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>{metric.label}</span>
              <div className="p-1.5 rounded-lg bg-background-main border border-border-subtle">
                {getIconForMetric(metric.label)}
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-text-main">
                {metric.value}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-text-muted truncate">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* RepoLens Insights Card */}
      <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div>
            <h3 className="text-base font-bold text-text-main">RepoLens Insights</h3>
            <p className="text-xs text-text-muted">Automated structural observations and quality signals</p>
          </div>
          <span className="text-xs font-mono text-text-secondary bg-background-main px-2.5 py-1 rounded-full border border-border-subtle">
            {analysis.insights.length} Signals
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {analysis.insights.map((insight, idx) => {
            let Icon = CheckCircle2;
            let iconColor = 'text-status-success';
            let badgeBg = 'bg-status-success/10 border-status-success/20 text-status-success';
            let label = 'Healthy';

            if (insight.type === 'warning') {
              Icon = AlertTriangle;
              iconColor = 'text-status-warning';
              badgeBg = 'bg-status-warning/10 border-status-warning/20 text-status-warning';
              label = 'Attention';
            } else if (insight.type === 'error') {
              Icon = XCircle;
              iconColor = 'text-status-error';
              badgeBg = 'bg-status-error/10 border-status-error/20 text-status-error';
              label = 'Issue';
            }

            return (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-background-main/70 border border-border-subtle hover:border-purple-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                  <span className="text-xs sm:text-sm text-text-main leading-relaxed">
                    {insight.text}
                  </span>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${badgeBg}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
