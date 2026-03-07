import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isRunning: boolean;
  hasStarted: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

export const TimerControls = ({
  isRunning,
  hasStarted,
  onStartPause,
  onReset,
}: TimerControlsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Button
          className="bg-white h-10 w-120 text-black"
          onClick={onStartPause}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
      </div>

      {hasStarted && (
        <Button
          className="bg-white h-10 w-120 text-black"
          onClick={onReset}
        >
          Reset
        </Button>
      )}
    </div>
  );
};
