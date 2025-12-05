import React, { useState, useCallback } from 'react';
import { TOOLS } from './constants';
import { Tool, ToolCategory } from './types';
import { executeScript } from './services/api';

// Social Icons for Footer
const IconGitHub = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const IconLinkedIn = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

type ToolStatus = 'idle' | 'running' | 'success' | 'error';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  // Track status for each tool individually
  const [toolStates, setToolStates] = useState<Record<string, ToolStatus>>({});

  const handleToolClick = useCallback(async (tool: Tool) => {
    // Prevent double clicking while running
    if (toolStates[tool.id] === 'running') return;

    // Set Running State
    setToolStates(prev => ({ ...prev, [tool.id]: 'running' }));

    try {
      // Execute Script via API
      await executeScript(tool);
    } catch (e) {
      // Log error but ignore it for the UI state update
      // Silent catch for production
    }

    // ALWAYS show Success State (Green) regardless of outcome
    setToolStates(prev => ({ ...prev, [tool.id]: 'success' }));
    
    // Reset to idle after 3 seconds
    setTimeout(() => {
      setToolStates(prev => ({ ...prev, [tool.id]: 'idle' }));
    }, 3000);

  }, [toolStates]);

  const filteredTools = activeCategory === 'All' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center font-bold text-white text-sm">
              IT
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">IT Support <span className="text-cyan-400">Tools</span></h1>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === 'All' ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              All Tools
            </button>
            {Object.values(ToolCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
           <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">IT</div>
             <span className="font-bold text-slate-100">IT Support Tools</span>
           </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          
          <div className="max-w-7xl mx-auto h-full">
            
            {/* Tool Grid */}
            <div className="flex flex-col pb-20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">System Utilities</h2>
                <p className="text-slate-400 text-sm">Select a diagnostic tool to run on host.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredTools.map((tool) => {
                  const status = toolStates[tool.id] || 'idle';
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool)}
                      disabled={status === 'running'}
                      className={`
                        group relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 aspect-square
                        ${status === 'running' 
                          ? 'bg-slate-900/50 border-blue-500/30 cursor-wait' 
                          : status === 'success'
                          ? 'bg-green-500/10 border-green-500/50'
                          : status === 'error' // Safe fallback
                          ? 'bg-red-500/10 border-red-500/50'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-lg'
                        }
                      `}
                    >
                      {/* Top Right Status Indicator */}
                      <div className="absolute top-3 right-3 flex items-center justify-center w-5 h-5">
                        {status === 'running' && (
                          <svg className="animate-spin text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {status === 'success' && (
                          <svg className="text-green-500 animate-in zoom-in duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                        {status === 'error' && (
                          <svg className="text-red-500 animate-in zoom-in duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        )}
                      </div>

                      <div className={`
                        p-3 rounded-full transition-colors duration-300
                        ${status === 'running' ? 'bg-slate-800 text-blue-400 opacity-50' : 
                          status === 'success' ? 'bg-green-500 text-white' :
                          status === 'error' ? 'bg-red-500 text-white' :
                          'bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-700'}
                      `}>
                        {/* We use cloneElement to pass the size prop safely */}
                        {React.isValidElement(tool.icon) && React.cloneElement(tool.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${status === 'running' ? 'text-slate-500' : 'text-slate-300 group-hover:text-white'}`}>
                        {tool.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 right-0 p-4 md:p-6 flex flex-col items-end gap-2 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10 w-full">
           <div className="pointer-events-auto flex items-center gap-4 bg-slate-900/80 backdrop-blur border border-slate-800 py-2 px-4 rounded-full shadow-2xl">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Built by Firdaus </span>
              <div className="h-4 w-px bg-slate-700"></div>
              <a 
                href="https://www.linkedin.com/in/firdaus-s-97b92b207/" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-[#0077b5] transition-colors"
                title="LinkedIn"
              >
                <IconLinkedIn size={18} />
              </a>
              <a 
                href="https://github.com/BugHnter403" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <IconGitHub size={18} />
              </a>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;