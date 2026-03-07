import { Navbar } from "./components/Navbar";
import { TimerDisplay } from "./components/timer/TimerDisplay";
import { TimerControls } from "./components/timer/TimerControls";
import { ModeSelector } from "./components/timer/ModeSelector";
import { usePomodoro } from "./hooks/usePomodoro";

export const App = () => {
  const {
    mode,
    focusTime,
    breakTime,
    isRunning,
    hasStarted,
    minutes,
    seconds,
    handleStartPause,
    handleReset,
    handleModeChange,
    setFocusTime,
    setBreakTime,
  } = usePomodoro();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Navbar
        focusTime={focusTime}
        breakTime={breakTime}
        setFocusTime={setFocusTime}
        setBreakTime={setBreakTime}
      />
      <div className="h-screen w-2/3 flex flex-col justify-center items-center">


        <ModeSelector mode={mode} onModeChange={handleModeChange} />
        <TimerDisplay minutes={minutes} seconds={seconds} />
        <TimerControls
          isRunning={isRunning}
          hasStarted={hasStarted}
          onStartPause={handleStartPause}
          onReset={handleReset}
        />

      </div>
    </div>
  );
};
