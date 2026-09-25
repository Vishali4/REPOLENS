import React from 'react';
import { useRepository } from '../context/RepositoryContext';
import AnalysisCard from '../components/AnalysisCard';

export default function CodeAnalysis() {
  const { repoData } = useRepository();
  const analysis = repoData?.analysis;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Code Analysis
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Understand the quality and structure of your codebase.
        </p>
      </div>

      {/* Code Analysis Metrics and Insights */}
      {analysis && <AnalysisCard analysis={analysis} />}
    </div>
  );
}
