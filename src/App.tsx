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
    <div className="flex min-h-svh justify-center">
      <div className="flex w-[30%] flex-col text-sm leading-loose">
        <Navbar
          focusTime={focusTime}
          breakTime={breakTime}
          setFocusTime={setFocusTime}
          setBreakTime={setBreakTime}
        />
        <div className="h-full flex flex-col items-center justify-center">
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
    </div>
  );
};
