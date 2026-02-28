import { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/ui/button";
// import { usePomodoro } from "./hooks/pomodoro";
import { useTimer } from "react-timer-hook";

if (import.meta.env.MODE === "development") {
  console.log("Me he montado correctamente");
}

const format = (value: number): string => String(value).padStart(2, "0");

export const App = () => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  const duration = useMemo(
    () => (mode === "focus" ? focusTime : breakTime),
    [mode, focusTime, breakTime],
  );

  const getExpiryTime = (mins: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + Number(mins) * 60);
    return time;
  };

  const { seconds, minutes, hours, start, pause, restart, isRunning } =
    useTimer({
      expiryTimestamp: getExpiryTime(duration),
      autoStart: false,
    });

  const handleModeChange = (newMode: "focus" | "break") => {
    setMode(newMode);
    restart(getExpiryTime(newMode === "focus" ? focusTime : breakTime), false);
  };

  const handleStartPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  const handleReset = () => {
    restart(getExpiryTime(duration), false);
  };

  const totalMinutes = hours * 60 + minutes;

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Navbar />
        <div className="h-screen w-2/3 flex flex-col justify-center items-center">
          {/* Config Inputs */}

          {import.meta.env.MODE === "development" ? (
            <div className="bg-blue-300">
              <div>
                <label>Enfoque (min): </label>
                <input
                  type="number"
                  value={focusTime}
                  onChange={(e) => setFocusTime(e.target.value)}
                />
              </div>
              <div>
                <label>Descanso (min): </label>
                <input
                  type="number"
                  value={breakTime}
                  onChange={(e) => setBreakTime(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <Button
                className={`
                h-10 w-60 text-black bg-white
                ${
                  mode === "focus"
                    ? "text-black bg-white"
                    : "bg-transparent text-white hover:bg-transparent hover:cursor-pointer"
                }
                  `}
                onClick={() => handleModeChange("focus")}
              >
                Focus
              </Button>
              <Button
                className={`
                h-10 w-60 text-black bg-white
                ${
                  mode === "break"
                    ? "text-black bg-white"
                    : "bg-transparent text-white hover:bg-transparent hover:cursor-pointer"
                }
                  `}
                onClick={() => handleModeChange("break")}
              >
                Break
              </Button>
            </div>
          </div>
          <p className="text-9xl font-bold m-10 text-white">
            {format(totalMinutes)}:{format(seconds)}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Button
                className="bg-white h-10 w-120 text-black"
                onClick={handleStartPause}
              >
                {isRunning ? "Stop" : "Start"}
              </Button>
            </div>

            {isRunning && (
              <Button
                className="bg-white h-10 w-120 text-black"
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
