import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';
import CodeAnalysis from './pages/CodeAnalysis';
import Dependencies from './pages/Dependencies';
import Architecture from './pages/Architecture';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import DashboardLayout from './components/DashboardLayout';
import { RepositoryProvider } from './context/RepositoryContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <RepositoryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Workspace Routes using DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/analysis" element={<CodeAnalysis />} />
          <Route path="/dependencies" element={<Dependencies />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </RepositoryProvider>
);
}
