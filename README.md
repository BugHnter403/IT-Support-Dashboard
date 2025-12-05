# IT Support Dashboard 🛠️

A professional-grade, web-based dashboard designed to streamline IT support tasks. This application provides a modern React UI to trigger powerful PowerShell scripts on a host machine, making system diagnostics, network troubleshooting, and maintenance tasks accessible via a one-click interface.

<img width="1905" height="916" alt="IT Support" src="https://github.com/user-attachments/assets/f045484f-4264-466f-bb67-c2ee88cc1d17" />

https://github.com/user-attachments/assets/61bb2eba-8e46-4da5-ae6b-c6ea31b00c49

## ✨ Features

*   **Modern UI**: Built with **React 19** and **Tailwind CSS** for a clean, dark-mode aesthetic.
*   **One-Click Execution**: Instantly run complex PowerShell scripts (Flush DNS, Restart Spooler, Check Firewall, etc.).
*   **Categorized Tools**: Organized into System, Network, Maintenance, and User management.
*   **Python Backend**: Powered by **Flask** to securely handle script execution on the host OS.
*   **Production Ready**: Error handling and status management built-in.

## 🚀 Tech Stack

*   **Frontend**: React (TypeScript), Tailwind CSS, Lucide React (Icons)
*   **Backend**: Python (Flask)
*   **Scripting**: PowerShell (.ps1)

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js & npm
*   Python 3.x
*   Windows OS (for PowerShell script execution)

### 1. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/BugHnter403/IT-Support-Dashboard
cd IT-Support-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Backend Setup
```bash
# Run the server
python app.py
```

### 📂 Project Structure
```bash
IT-Support-Dashboard/
├── App.tsx                         # Main React UI
├── index.tsx                       # Frontend entry point
├── index.html                      # Root HTML
├── vite.config.ts                  # Build configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Frontend dependencies
├── metadata.json                   # Dashboard action definitions
├── constants.tsx                   # Shared constants
├── types.ts                        # Type definitions
│
├── components/                     # UI building blocks
│   ├── ResourceChart.tsx           # System resource graph
│   ├── TerminalWindow.tsx          # Terminal-style output window
│   └── ToolOutput.tsx              # Displays PowerShell script output
│
├── services/
│   └── api.ts                      # API calls to backend (Flask)
│
├── scripts/                        # ⚙️ Real IT support tools (PowerShell)
│   ├── Advanced_System_Info.ps1
│   ├── Check_Internet_Connection.ps1
│   ├── Clear_Temp_Files.ps1
│   ├── Find_Large_Files.ps1
│   ├── Firewall_Quick_Toggle.ps1
│   ├── Flush_DNS.ps1
│   ├── List_Local_Admins.ps1
│   ├── List_Local_Users.ps1
│   ├── Recently_Modified_Files.ps1
│   ├── Restart_Network_Adapter.ps1
│   ├── Restart_Print_Spooler.ps1
│   ├── Show_Disk_Space.ps1
│   ├── Show_Event_Log_Errors.ps1
│   ├── Show_My_IP_Address.ps1
│   ├── Show_Printer_Status.ps1
│   ├── Show_System_Uptime.ps1
│   └── System_Resource_Monitor.ps1
│
├── app.py                          # 🧠 Backend API server (Flask) that runs scripts
├── README.md                       # Repo documentation
```

### 👨‍💻 Author
Firdaus Shaari

[Linkedin](https://www.linkedin.com/in/firdaus-s-97b92b207/)

[Github](https://github.com/BugHnter403)

