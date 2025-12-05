import { Tool } from '../types';

export const executeScript = async (tool: Tool): Promise<any> => {
  // The Python backend expects the script name without the .ps1 extension
  const scriptName = tool.scriptName.replace(/\.ps1$/i, '');
  
  // Dynamically determine the base URL.
  // If we are on port 5000 (Flask serving React), use relative path.
  // Otherwise (React Dev Server), target the Flask API on port 5000 on the CURRENT hostname.
  // This fixes issues where 'localhost' != '127.0.0.1'.
  const hostname = window.location.hostname;
  const isFlaskServing = window.location.port === '5000';
  const baseUrl = isFlaskServing ? '' : `http://${hostname}:5000`;
  
  try {
    const response = await fetch(`${baseUrl}/run/${scriptName}?t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Explicitly request CORS mode (though it is default)
      mode: 'cors',
      cache: 'no-store'
    });

    // We throw even on 404/500 so the caller knows it failed, 
    // but the App.tsx will swallow this error and show success anyway.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'Script execution failed');
    }

    return data;
  } catch (error) {
    // Silent fail for production as requested
    throw error;
  }
};