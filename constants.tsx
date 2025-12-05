import React from 'react';
import { Tool, ToolCategory } from './types';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Icons as SVG components for zero-dependency usage
const IconInfo = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const IconGlobe = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconRefresh = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>;
const IconTrash = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const IconShield = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconWifi = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;
const IconUsers = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconPower = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>;
const IconPrinter = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IconHardDrive = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>;
const IconActivity = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconClock = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconFileText = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const IconAlertTriangle = ({ size = 24, ...props }: IconProps) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

export const TOOLS: Tool[] = [
  {
    id: 'sys-info',
    name: 'Advanced System Info',
    category: ToolCategory.SYSTEM,
    icon: <IconInfo />,
    description: 'Retrieves detailed hardware and software specifications.',
    command: 'systeminfo',
    scriptName: 'Advanced_System_Info.ps1'
  },
  {
    id: 'check-internet',
    name: 'Check Internet',
    category: ToolCategory.NETWORK,
    icon: <IconGlobe />,
    description: 'Verifies external connectivity by pinging reliable DNS servers.',
    command: 'ping 8.8.8.8 -n 4',
    scriptName: 'Check_Internet_Connection.ps1'
  },
  {
    id: 'my-ip',
    name: 'Show My IP Address',
    category: ToolCategory.NETWORK,
    icon: <IconWifi />,
    description: 'Displays the current IPv4 address of the primary network adapter.',
    command: '(Get-NetIPAddress -AddressFamily IPv4).IPAddress',
    scriptName: 'Show_My_IP_Address.ps1'
  },
  {
    id: 'flush-dns',
    name: 'Flush DNS',
    category: ToolCategory.NETWORK,
    icon: <IconRefresh />,
    description: 'Clears the DNS resolver cache to resolve connectivity issues.',
    command: 'ipconfig /flushdns',
    scriptName: 'Flush_DNS.ps1'
  },
  {
    id: 'clear-temp',
    name: 'Clear Temp Files',
    category: ToolCategory.MAINTENANCE,
    icon: <IconTrash />,
    description: 'Removes temporary files to free up disk space.',
    command: 'del /q/f/s %TEMP%\\*',
    scriptName: 'Clear_Temp_Files.ps1'
  },
  {
    id: 'firewall-toggle',
    name: 'Firewall Status',
    category: ToolCategory.MAINTENANCE,
    icon: <IconShield />,
    description: 'Checks current firewall state profiles.',
    command: 'netsh advfirewall show allprofiles',
    scriptName: 'Firewall_Quick_Toggle.ps1'
  },
  {
    id: 'printer-status',
    name: 'Show Printer Status',
    category: ToolCategory.MAINTENANCE,
    icon: <IconPrinter />,
    description: 'Lists all installed printers and their current operational status.',
    command: 'Get-Printer | Format-List Name,PrinterStatus,JobCount',
    scriptName: 'Show_Printer_Status.ps1'
  },
  {
    id: 'restart-net',
    name: 'Restart Network',
    category: ToolCategory.NETWORK,
    icon: <IconWifi />,
    description: 'Resets the network adapter to resolve IP conflicts.',
    command: 'ipconfig /release && ipconfig /renew',
    scriptName: 'Restart_Network_Adapter.ps1'
  },
  {
    id: 'list-admins',
    name: 'List Local Admins',
    category: ToolCategory.USER,
    icon: <IconUsers />,
    description: 'Enumerates users with administrative privileges.',
    command: 'net localgroup administrators',
    scriptName: 'List_Local_Admins.ps1'
  },
  {
    id: 'list-local-users',
    name: 'List Local Users',
    category: ToolCategory.USER,
    icon: <IconUsers />,
    description: 'Displays a list of all local user accounts on the system.',
    command: 'Get-LocalUser | Format-Table Name,Enabled,Description',
    scriptName: 'List_Local_Users.ps1'
  },
  {
    id: 'uptime',
    name: 'System Uptime',
    category: ToolCategory.SYSTEM,
    icon: <IconClock />,
    description: 'Displays how long the system has been running.',
    command: 'powershell (Get-CimInstance Win32_OperatingSystem).LastBootUpTime',
    scriptName: 'Show_System_Uptime.ps1'
  },
  {
    id: 'recent-files',
    name: 'Recently Modified',
    category: ToolCategory.SYSTEM,
    icon: <IconFileText />,
    description: 'Finds the top 5 most recently modified files in the work directory.',
    command: 'Get-ChildItem -Path C:\\Work -Recurse | Sort LastWriteTime -Desc | Select -First 5',
    scriptName: 'Recently_Modified_Files.ps1'
  },
  {
    id: 'print-spooler',
    name: 'Restart Spooler',
    category: ToolCategory.MAINTENANCE,
    icon: <IconPrinter />,
    description: 'Restarts the print spooler service to fix stuck print jobs.',
    command: 'net stop spooler && net start spooler',
    scriptName: 'Restart_Print_Spooler.ps1'
  },
  {
    id: 'disk-space',
    name: 'Disk Space',
    category: ToolCategory.SYSTEM,
    icon: <IconHardDrive />,
    description: 'Analyzes drive usage and capacity.',
    command: 'wmic logicaldisk get size,freespace,caption',
    scriptName: 'Show_Disk_Space.ps1'
  },
  {
    id: 'event-log',
    name: 'Show Event Log Errors',
    category: ToolCategory.SYSTEM,
    icon: <IconAlertTriangle />,
    description: 'Fetches the 5 most recent critical errors from the System event log.',
    command: 'Get-EventLog -LogName System -EntryType Error -Newest 5',
    scriptName: 'Show_Event_Log_Errors.ps1'
  },
  {
    id: 'resource-monitor',
    name: 'Resource Monitor',
    category: ToolCategory.SYSTEM,
    icon: <IconActivity />,
    description: 'Visualizes real-time system resource consumption.',
    command: 'perfmon /res',
    scriptName: 'System_Resource_Monitor.ps1'
  }
];