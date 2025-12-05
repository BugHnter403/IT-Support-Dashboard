import React, { useEffect, useRef } from 'react';

interface TerminalWindowProps {
  output: string[];
  isProcessing: boolean;
  command?: string;
  title?: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ output, isProcessing, command, title }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, isProcessing]);

  return (
    <div className="w-full h-full bg-slate-950 rounded-lg border border-slate-800 shadow-2xl flex flex-col font-mono text-sm overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <div className="text-slate-400 text-xs font-medium">
          {title || 'Administrator: Windows PowerShell'}
        </div>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin text-slate-300">
        <div className="space-y-1">
          <div className="text-slate-500 mb-4">
            PowerShell 7.4.0<br/>
            Copyright (c) Microsoft Corporation. All rights reserved.
          </div>

          {command && (
            <div className="flex gap-2 text-white">
              <span className="text-green-500 select-none">PS C:\Windows\system32&gt;</span>
              <span>{command}</span>
            </div>
          )}

          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap break-all text-slate-200 animate-in fade-in slide-in-from-left-1 duration-100">
              {line}
            </div>
          ))}

          {isProcessing && (
            <div className="mt-2 flex items-center gap-2 text-cyan-400">
              <span className="w-2 h-4 bg-cyan-400 animate-pulse block"></span>
              <span className="text-xs opacity-70">Processing script...</span>
            </div>
          )}
          
          {!isProcessing && command && output.length > 0 && (
             <div className="mt-4 flex gap-2 text-white">
               <span className="text-green-500 select-none">PS C:\Windows\system32&gt;</span>
               <span className="w-2 h-4 bg-slate-400 animate-pulse block"></span>
             </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;