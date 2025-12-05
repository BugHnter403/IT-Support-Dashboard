import React from 'react';
import { SystemStats } from '../types';

interface ResourceChartProps {
  data: SystemStats[];
}

const ResourceChart: React.FC<ResourceChartProps> = ({ data }) => {
  if (data.length === 0) return null;

  // Chart dimensions
  const width = 100;
  const height = 50;
  const padding = 2;

  // Helper to normalize values to chart coordinates
  // X axis: 0 to 20 points
  // Y axis: 0 to 100 percent
  const getPoints = (metric: 'cpu' | 'memory') => {
    return data.map((stat, i) => {
      const x = (i / (data.length - 1 || 1)) * (width - padding * 2) + padding;
      const y = height - (stat[metric] / 100) * (height - padding * 2) - padding;
      return `${x},${y}`;
    }).join(' ');
  };

  const cpuPoints = getPoints('cpu');
  const memPoints = getPoints('memory');
  const currentCpu = data[data.length - 1].cpu;
  const currentMem = data[data.length - 1].memory;

  return (
    <div className="h-48 w-full relative select-none">
      {/* Legend / Current Values */}
      <div className="absolute top-2 right-4 flex gap-6 text-xs font-mono z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
          <span className="text-slate-400">CPU</span>
          <span className="text-white font-bold w-8 text-right">{currentCpu}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
          <span className="text-slate-400">MEM</span>
          <span className="text-white font-bold w-8 text-right">{currentMem}%</span>
        </div>
      </div>

      <svg 
        className="w-full h-full" 
        viewBox={`0 0 ${width} ${height}`} 
        preserveAspectRatio="none"
      >
        {/* Grid Lines */}
        <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#1e293b" strokeWidth="0.5" />
        <line x1="0" y1={height * 0.50} x2={width} y2={height * 0.50} stroke="#1e293b" strokeWidth="0.5" />
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#1e293b" strokeWidth="0.5" />

        {/* Areas (Gradient Fills) */}
        <defs>
          <linearGradient id="cpuGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="memGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Memory Path & Area */}
        <path
          d={`M ${padding} ${height} L ${memPoints.split(' ')[0]} ${memPoints} L ${width - padding} ${height} Z`}
          fill="url(#memGradient)"
          stroke="none"
        />
        <polyline
          points={memPoints}
          fill="none"
          stroke="#a855f7"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* CPU Path & Area */}
        <path
          d={`M ${padding} ${height} L ${cpuPoints.split(' ')[0]} ${cpuPoints} L ${width - padding} ${height} Z`}
          fill="url(#cpuGradient)"
          stroke="none"
        />
        <polyline
          points={cpuPoints}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default ResourceChart;