export type PomodoroMode = "focus" | "break";

export interface PomodoroState {
  mode: PomodoroMode;
  focusTime: number;
  breakTime: number;
  isRunning: boolean;
  hasStarted: boolean;
  minutes: number;
  seconds: number;
}

export interface PomodoroActions {
  handleStartPause: () => void;
  handleReset: () => void;
  handleModeChange: (newMode: PomodoroMode) => void;
  setFocusTime: (value: number) => void;
  setBreakTime: (value: number) => void;
}
