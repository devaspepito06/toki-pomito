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
      <Navbar />
      <div className="h-screen w-2/3 flex flex-col justify-center items-center">

        {/* Config Inputs — solo visible en desarrollo */}
        {import.meta.env.MODE === "development" && (
          <div className="bg-blue-300">
            <div>
              <label>Enfoque (min): </label>
              <input
                type="number"
                value={focusTime}
                onChange={(e) => setFocusTime(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Descanso (min): </label>
              <input
                type="number"
                value={breakTime}
                onChange={(e) => setBreakTime(Number(e.target.value))}
              />
            </div>
          </div>
        )}

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
