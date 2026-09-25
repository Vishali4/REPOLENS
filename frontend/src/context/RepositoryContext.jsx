import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeRepositoryAPI, formatBackendAnalysis } from '../services/api';
import {
  mockRepository,
  mockStatistics,
  mockLanguages,
  mockFileTree,
  mockImportantFiles,
  mockImportantDirectories,
  mockAnalysis,
  mockAIResponses,
} from '../data/mockData';

const defaultContextState = {
  repository: mockRepository,
  statistics: mockStatistics,
  languages: mockLanguages,
  fileTree: mockFileTree,
  important_files: mockImportantFiles,
  important_directories: mockImportantDirectories,
  analysis: mockAnalysis,
  aiResponses: mockAIResponses,
};

const RepositoryContext = createContext(null);

export function RepositoryProvider({ children }) {
  const [repoData, setRepoData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('repolens_active_analysis');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback on JSON parse error
    }
    return defaultContextState;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync to session storage on change
  useEffect(() => {
    try {
      sessionStorage.setItem('repolens_active_analysis', JSON.stringify(repoData));
    } catch {
      // Ignore storage errors
    }
  }, [repoData]);

  /**
   * Triggers a live analysis against the backend.
   */
  const analyzeRepository = async (githubUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      const realAnalysis = await analyzeRepositoryAPI(githubUrl);
      setRepoData(realAnalysis);
      setIsLoading(false);
      return { success: true, data: realAnalysis };
    } catch (err) {
      const msg = err.message || 'Failed to analyze repository.';
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }
  };

  return (
    <RepositoryContext.Provider
      value={{
        repoData,
        isLoading,
        error,
        analyzeRepository,
        clearError: () => setError(null),
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }
  return context;
}
