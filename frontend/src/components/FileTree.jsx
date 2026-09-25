import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode2,
  FileText,
  File,
  ChevronRight,
  ChevronDown,
  Search,
  Star,
  FolderTree,
} from 'lucide-react';
import { mockFileTree } from '../data/mockData';

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (['js', 'jsx', 'ts', 'tsx', 'py', 'go', 'rs', 'c', 'cpp'].includes(ext)) {
    return <FileCode2 className="w-4 h-4 text-purple-bright" />;
  }
  if (['md', 'txt', 'rst'].includes(ext)) {
    return <FileText className="w-4 h-4 text-amber-300" />;
  }
  return <File className="w-4 h-4 text-text-muted" />;
}

function TreeNode({ node, level = 0, expandedFolders, toggleFolder }) {
  const isDirectory = node.type === 'directory';
  const isExpanded = expandedFolders[node.id];

  return (
    <div>
      <div
        onClick={() => isDirectory && toggleFolder(node.id)}
        className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-mono transition-colors cursor-pointer select-none group ${
          isDirectory
            ? 'hover:bg-background-secondary/80 text-text-main font-medium'
            : 'hover:bg-card-hover text-text-secondary hover:text-text-main'
        }`}
        style={{ paddingLeft: `${level * 16 + 10}px` }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {isDirectory ? (
            <>
              <span className="text-text-muted group-hover:text-purple-bright transition-colors">
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </span>
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-purple-light" />
              ) : (
                <Folder className="w-4 h-4 text-purple-bright" />
              )}
            </>
          ) : (
            <>
              <span className="w-3.5" />
              {getFileIcon(node.name)}
            </>
          )}

          <span className="truncate">{node.name}</span>

          {node.isImportant && (
            <span className="flex items-center gap-0.5 text-[10px] text-amber-300 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
              <Star className="w-2.5 h-2.5 fill-amber-300" /> Key File
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-text-muted text-[11px]">
          {node.size && <span>{node.size}</span>}
        </div>
      </div>

      {isDirectory && isExpanded && node.children && (
        <div className="relative border-l border-border-subtle/50 ml-4">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({ tree = mockFileTree }) {
  const [expandedFolders, setExpandedFolders] = useState({
    src: true,
    backend: true,
    analyzer: true,
    'src-components': false,
    'backend-app': false,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleFolder = (id) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    setExpandedFolders({
      src: true,
      backend: true,
      analyzer: true,
      'src-components': true,
      'src-services': true,
      'backend-app': true,
      routes: true,
      services: true,
    });
  };

  const collapseAll = () => {
    setExpandedFolders({});
  };

  // Helper filter function for search
  const filterTree = (nodes, query) => {
    if (!query) return nodes;
    return nodes.reduce((acc, node) => {
      if (node.name.toLowerCase().includes(query.toLowerCase())) {
        acc.push(node);
      } else if (node.children) {
        const matchingChildren = filterTree(node.children, query);
        if (matchingChildren.length > 0) {
          acc.push({ ...node, children: matchingChildren });
        }
      }
      return acc;
    }, []);
  };

  const displayedTree = filterTree(tree, searchTerm);

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl p-6 hover:border-purple-primary/40 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-bright">
            <FolderTree className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Repository Structure</h3>
            <p className="text-xs text-text-muted">Interactive file tree explorer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="text-xs text-text-secondary hover:text-purple-light px-2.5 py-1 rounded bg-background-main border border-border-subtle hover:border-purple-primary/40 transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-xs text-text-secondary hover:text-purple-light px-2.5 py-1 rounded bg-background-main border border-border-subtle hover:border-purple-primary/40 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search Bar inside File Tree */}
      <div className="mt-4 mb-3 relative">
        <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter files or folders..."
          className="w-full bg-background-main border border-border-subtle rounded-xl pl-9 pr-3 py-1.5 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-purple-bright/60 font-mono"
        />
      </div>

      {/* File Tree List */}
      <div className="mt-2 max-h-96 overflow-y-auto pr-1 space-y-0.5">
        {displayedTree.length > 0 ? (
          displayedTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))
        ) : (
          <p className="py-6 text-center text-xs text-text-muted">
            No matching files found for &quot;{searchTerm}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
