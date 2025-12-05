import React from 'react';

export enum ToolCategory {
  SYSTEM = 'System',
  NETWORK = 'Network',
  MAINTENANCE = 'Maintenance',
  USER = 'User'
}

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: React.ReactNode;
  description: string;
  command: string;
  scriptName: string;
}

export interface SystemStats {
  time: string;
  cpu: number;
  memory: number;
}