import { ResearchProgress } from './deep-research';

export class OutputManager {
  private progressLines: number = 4;
  private progressArea: string[] = [];
  private initialized: boolean = false;
  
  constructor() {
    // No-op in browser
    this.initialized = true;
  }
  
  log(...args: any[]) {
    // Use console.log in browser
    console.log(...args);
  }
  
  updateProgress(progress: ResearchProgress) {
    // Use console.log for progress in browser
    console.log('Research Progress:', progress);
  }
  
  private getProgressBar(value: number, total: number): string {
    const width = 30;
    const filled = Math.round((value / total) * width);
    return `[${'='.repeat(filled)}${' '.repeat(width - filled)}] ${value}/${total}`;
  }
  
  private drawProgress() {
    // No-op in browser
  }
}
