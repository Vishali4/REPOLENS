import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRepository } from '../context/RepositoryContext';
import StatCard from '../components/StatCard';
import RepositoryCard from '../components/RepositoryCard';
import LanguageChart from '../components/LanguageChart';
import FileTree from '../components/FileTree';

export default function Dashboard() {
  const navigate = useNavigate();
  const { repoData } = useRepository();

  const repository = repoData?.repository;
  const statistics = repoData?.statistics || [];
  const languages = repoData?.languages || [];
  const fileTree = repoData?.fileTree || [];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Repository Overview
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Here&apos;s what RepoLens discovered about your repository.
        </p>
      </div>

      {/* Four Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      {/* Repository Information Card */}
      {repository && <RepositoryCard repository={repository} />}

      {/* Grid: Language Distribution & Repository Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <LanguageChart languages={languages} />
        </div>
        <div className="lg:col-span-6">
          <FileTree tree={fileTree} />
        </div>
      </div>
    </div>
  );
}
