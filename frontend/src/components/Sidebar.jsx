import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  FileCode2,
  Package,
  Network,
  Bot,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/repository', label: 'Repository', icon: FolderGit2 },
  { to: '/analysis', label: 'Code Analysis', icon: FileCode2 },
  { to: '/dependencies', label: 'Dependencies', icon: Package },
  { to: '/architecture', label: 'Architecture', icon: Network },
  { to: '/assistant', label: 'AI Assistant', icon: Bot, badge: 'AI' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer / Permanent Desktop Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-background-secondary border-r border-border-subtle flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-border-subtle/80">
            <Logo size="default" />
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden text-text-secondary hover:text-text-main p-1.5 rounded-lg hover:bg-card-main focus:outline-none"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5" aria-label="Dashboard Navigation">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Workspace
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-purple-light bg-purple-primary/10 border-l-[3px] border-purple-bright shadow-glow-sm'
                        : 'text-text-secondary hover:text-text-main hover:bg-card-main'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 transition-colors group-hover:text-purple-bright" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-primary/20 text-purple-bright border border-purple-primary/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section (Settings & Repo Status) */}
        <div className="p-4 border-t border-border-subtle space-y-2">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-purple-light bg-purple-primary/10 border-l-[3px] border-purple-bright shadow-glow-sm'
                  : 'text-text-secondary hover:text-text-main hover:bg-card-main'
              }`
            }
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>

          {/* Subtle Repository Status Indicator */}
          <div className="px-3 py-2.5 rounded-xl bg-card-main border border-border-subtle flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_#22C55E]" />
              <span className="truncate text-text-secondary font-mono">repolens</span>
            </div>
            <span className="text-[10px] text-text-muted font-medium bg-background-main px-1.5 py-0.5 rounded border border-border-subtle">
              v1.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
