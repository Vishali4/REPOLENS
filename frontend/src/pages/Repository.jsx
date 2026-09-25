import React from 'react';
import {
  FileText,
  FolderGit2,
  Star,
  ExternalLink,
  Code2,
  FileCode2,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useRepository } from '../context/RepositoryContext';
import { mockReadmeContent } from '../data/mockData';
import RepositoryCard from '../components/RepositoryCard';
import FileTree from '../components/FileTree';

export default function Repository() {
  const { repoData } = useRepository();
  const repository = repoData?.repository;
  const importantFiles = repoData?.important_files || [];
  const importantDirectories = repoData?.important_directories || [];
  const fileTree = repoData?.fileTree || [];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-text-main tracking-tight">
          Repository Details
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Deep structural metadata, key architectural files, and documentation preview.
        </p>
      </div>

      {/* Main Repository Summary */}
      {repository && <RepositoryCard repository={repository} />}

      {/* Important Files & Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Important Files Card */}
        <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                <FileCode2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-text-main">Key Manifest Files</h3>
            </div>
            <span className="text-xs font-mono text-text-muted bg-background-main px-2 py-0.5 rounded border border-border-subtle">
              {importantFiles.length} Detected
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {importantFiles.length > 0 ? (
              importantFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-background-main/60 border border-border-subtle hover:border-purple-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <div>
                      <p className="text-xs font-mono font-semibold text-text-main">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-text-muted">{file.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-text-secondary">
                    {file.size}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-text-muted py-3">No special manifest files detected.</p>
            )}
          </div>
        </div>

        {/* Important Folders Card */}
        <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-text-main">Core Architecture Folders</h3>
            </div>
            <span className="text-xs font-mono text-text-muted bg-background-main px-2 py-0.5 rounded border border-border-subtle">
              {importantDirectories.length} Modules
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {importantDirectories.length > 0 ? (
              importantDirectories.map((dir) => (
                <div
                  key={dir.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-background-main/60 border border-border-subtle hover:border-purple-primary/30 transition-colors"
                >
                  <div>
                    <p className="text-xs font-mono font-bold text-purple-light flex items-center gap-1.5">
                      <span>📁</span> {dir.name}/
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">{dir.description}</p>
                  </div>
                  <span className="text-[10px] text-text-secondary bg-background-main px-2 py-0.5 rounded border border-border-subtle font-mono">
                    {dir.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-text-muted py-3">Single-layer repository structure.</p>
            )}
          </div>
        </div>
      </div>

      {/* File Tree Explorer */}
      <FileTree tree={fileTree} />

      {/* README.md Preview */}
      <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">README.md</h3>
              <p className="text-xs text-text-muted">Repository documentation preview</p>
            </div>
          </div>

          <span className="text-xs font-mono text-text-muted bg-background-main px-2 py-0.5 rounded border border-border-subtle">
            Markdown
          </span>
        </div>

        <div className="mt-5 p-5 rounded-xl bg-background-main/90 border border-border-subtle text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-text-secondary overflow-x-auto">
          {mockReadmeContent}
        </div>
      </div>
    </div>
  );
}
