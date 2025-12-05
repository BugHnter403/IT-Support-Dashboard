import React from 'react';

interface ToolOutputProps {
  toolId: string;
  output: string[];
  isProcessing: boolean;
}

// Icons for status
const StatusIcon = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  if (s === 'normal' || s === 'idle' || s === 'ok' || s === 'true') {
    return <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />;
  }
  if (s === 'error' || s === 'stopped' || s === 'false') {
    return <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />;
  }
  return <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />;
};

const ToolOutput: React.FC<ToolOutputProps> = ({ toolId, output, isProcessing }) => {
  // Loading State
  if (isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="relative mb-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-500 animate-spin"></div>
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Running diagnostics...</p>
        <p className="text-slate-600 text-sm mt-2 font-mono">Executing: {toolId}.exe</p>
      </div>
    );
  }

  // Helper to parse JSON output if present
  let jsonData = null;
  if (output.length === 1) {
    try {
      jsonData = JSON.parse(output[0]);
    } catch (e) {
      // Not JSON, fall back to text
    }
  }

  // 1. PRINTER STATUS VIEW (Grid of Cards)
  if (toolId === 'printer-status' && jsonData) {
    return (
      <div className="p-6 h-full overflow-y-auto bg-slate-50">
        <h4 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-blue-100 rounded text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          </span>
          Printer Status Report
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jsonData.map((printer: any, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <StatusIcon status={printer.PrinterStatus} />
                    <span className="font-semibold text-slate-800">{printer.Name}</span>
                 </div>
                 <span className={`text-xs px-2 py-1 rounded-full font-medium ${printer.PrinterStatus === 'Error' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                   {printer.PrinterStatus}
                 </span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-2 rounded-lg">
                 <span>Active Jobs</span>
                 <span className="font-mono font-bold text-slate-700">{printer.JobCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. LOCAL USERS VIEW (Table)
  if (toolId === 'list-local-users' && jsonData) {
    return (
      <div className="h-full flex flex-col bg-slate-50">
         <div className="p-4 border-b border-slate-200 bg-white">
            <h4 className="text-slate-800 font-bold">Local User Accounts</h4>
         </div>
         <div className="flex-1 overflow-auto p-4">
           <table className="w-full text-sm text-left text-slate-600 bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
                  <tr>
                      <th className="px-6 py-3">User Name</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Description</th>
                  </tr>
              </thead>
              <tbody>
                  {jsonData.map((user: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{user.Name}</td>
                          <td className="px-6 py-4">
                             {user.Enabled ? (
                               <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Enabled</span>
                             ) : (
                               <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold">Disabled</span>
                             )}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{user.Description}</td>
                      </tr>
                  ))}
              </tbody>
           </table>
         </div>
      </div>
    );
  }

  // 3. RECENT FILES VIEW (List)
  if (toolId === 'recent-files' && jsonData) {
    return (
      <div className="h-full bg-slate-50 p-6 overflow-y-auto">
        <h4 className="text-slate-800 font-bold mb-4">Recently Modified Files</h4>
        <div className="space-y-3">
           {jsonData.map((file: any, idx: number) => (
              <div key={idx} className="flex items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <div className="p-2 bg-blue-50 text-blue-600 rounded mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                 </div>
                 <div className="flex-1">
                    <div className="font-medium text-slate-800">{file.Name}</div>
                    <div className="text-xs text-slate-500">{file.Date}</div>
                 </div>
                 <div className="text-sm font-mono text-slate-400">{file.Size}</div>
              </div>
           ))}
        </div>
      </div>
    );
  }

  // 4. EVENT LOG VIEW (List with alert styles)
  if (toolId === 'event-log' && jsonData) {
    return (
       <div className="h-full bg-slate-50 p-0 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-white">
             <h4 className="text-red-600 font-bold flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
               Critical System Events
             </h4>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
             {jsonData.map((event: any, idx: number) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 rounded shadow-sm p-4 relative">
                   <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-800 text-sm">{event.Source}</span>
                      <span className="text-xs text-slate-400 font-mono">{event.Time}</span>
                   </div>
                   <p className="text-slate-600 text-sm">{event.Message}</p>
                   <div className="mt-2 text-xs text-slate-400 font-mono">Event ID: {event.ID}</div>
                </div>
             ))}
          </div>
       </div>
    );
  }

  // 5. IP ADDRESS VIEW (Big Display)
  if (toolId === 'my-ip' && output.length > 0) {
    return (
       <div className="h-full flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center max-w-sm w-full">
             <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
             </div>
             <h2 className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-1">Public IP Address</h2>
             <div className="text-3xl font-bold text-slate-900 font-mono tracking-tight">{output[0]}</div>
             <div className="mt-6 flex justify-center">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Connected</span>
             </div>
          </div>
       </div>
    );
  }

  // DEFAULT VIEW (Clean System Log, NOT Terminal style)
  return (
    <div className="h-full flex flex-col bg-white">
       <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Log Output</span>
          <span className="text-xs text-slate-400">{new Date().toLocaleTimeString()}</span>
       </div>
       <div className="flex-1 overflow-auto p-4 font-mono text-sm">
          {output.map((line, i) => (
             <div key={i} className="py-0.5 border-b border-slate-50 text-slate-700">
               {line}
             </div>
          ))}
          {output.length === 0 && (
            <div className="text-slate-400 italic">No output returned.</div>
          )}
       </div>
    </div>
  );
};

export default ToolOutput;