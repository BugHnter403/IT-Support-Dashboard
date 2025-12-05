# IT Support Dashboard 🛠️

A professional-grade, web-based dashboard designed to streamline IT support tasks. This application provides a modern React UI to trigger powerful PowerShell scripts on a host machine, making system diagnostics, network troubleshooting, and maintenance tasks accessible via a one-click interface.

<img width="1905" height="916" alt="IT Support" src="https://github.com/user-attachments/assets/f045484f-4264-466f-bb67-c2ee88cc1d17" />

https://github.com/user-attachments/assets/61bb2eba-8e46-4da5-ae6b-c6ea31b00c49

## ✨ Features

*   **Modern UI**: Built with **React 19** and **Tailwind CSS** for a clean, dark-mode aesthetic.
*   **One-Click Execution**: Instantly run complex PowerShell scripts (Flush DNS, Restart Spooler, Check Firewall, etc.).
*   **Real-Time Feedback**: Visual status indicators (Loading, Success, Error) for every action.
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
* src/: React frontend code.
* src/constants.tsx: Configuration for available tools and icons.
* backend/scripts/: Folder containing the .ps1 PowerShell scripts.
* backend/app.py: Flask server entry point.

### 👨‍💻 Author
Firdaus Shaari

[Linkedin](https://www.linkedin.com/notifications/?filter=all)

[Github](https://github.com/BugHnter403)

