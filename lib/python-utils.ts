import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Get the correct Python executable path for the current environment
 * Handles both local development (with .venv) and production (Railway/Docker)
 */
export function getPythonPath(): string {
  // Check if we're in production environment
  if (process.env.NODE_ENV === 'production') {
    // On Railway with nixpacks, Python should be available in PATH
    return 'python';
  }
  
  // For local development, try to use virtual environment
  const venvPythonPath = path.join(process.cwd(), '.venv', 'bin', 'python');
  
  if (fs.existsSync(venvPythonPath)) {
    return venvPythonPath;
  }
  
  // Fallback to system Python
  return 'python3';
}

/**
 * Verify Python environment is working
 */
export function verifyPythonEnvironment(): Promise<boolean> {
  return new Promise((resolve) => {
    const pythonPath = getPythonPath();
    
    exec(`${pythonPath} --version`, (error, stdout, stderr) => {
      if (error) {
        console.error('Python verification failed:', error);
        resolve(false);
      } else {
        console.log('Python version:', stdout.trim());
        resolve(true);
      }
    });
  });
}