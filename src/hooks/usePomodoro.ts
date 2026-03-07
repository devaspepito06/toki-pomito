import { useState, useMemo, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import type { PomodoroMode, PomodoroState, PomodoroActions } from "../types/timer";

const getExpiryTime = (mins: number): Date => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + Number(mins) * 60);
  return time;
};

export const usePomodoro = (): PomodoroState & PomodoroActions => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [hasStarted, setHasStarted] = useState(false);

  const duration = useMemo(
    () => (mode === "focus" ? focusTime : breakTime),
    [mode, focusTime, breakTime],
  );

  const { seconds, minutes, hours, start, pause, restart, isRunning } =
    useTimer({
      expiryTimestamp: getExpiryTime(duration),
      autoStart: false,
      onExpire: () => {
        setHasStarted(false);
        restart(getExpiryTime(duration), false);
      },
    });

  // Cuando el timer no ha iniciado y el usuario cambia la duración,
  // actualizar el display automáticamente
  useEffect(() => {
    if (!hasStarted) {
      restart(getExpiryTime(duration), false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handleModeChange = (newMode: PomodoroMode) => {
    setMode(newMode);
    setHasStarted(false);
    restart(getExpiryTime(newMode === "focus" ? focusTime : breakTime), false);
  };

  const handleStartPause = () => {
    if (isRunning) {
      pause();
    } else {
      setHasStarted(true);
      start();
    }
  };

  const handleReset = () => {
    setHasStarted(false);
    restart(getExpiryTime(duration), false);
  };

  const totalMinutes = hours * 60 + minutes;

  return {
    mode,
    focusTime,
    breakTime,
    isRunning,
    hasStarted,
    minutes: totalMinutes,
    seconds,
    handleStartPause,
    handleReset,
    handleModeChange,
    setFocusTime,
    setBreakTime,
  };
};
