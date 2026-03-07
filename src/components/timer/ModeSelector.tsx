import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PomodoroMode } from "@/types/timer";

interface ModeSelectorProps {
  mode: PomodoroMode;
  onModeChange: (newMode: PomodoroMode) => void;
}

const modeButtonClass = (active: boolean) =>
  cn(
    "h-10 w-60",
    active
      ? "text-black bg-white"
      : "bg-transparent text-white hover:bg-transparent hover:cursor-pointer",
  );

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-1">
        <Button
          className={modeButtonClass(mode === "focus")}
          onClick={() => onModeChange("focus")}
        >
          Focus
        </Button>
        <Button
          className={modeButtonClass(mode === "break")}
          onClick={() => onModeChange("break")}
        >
          Break
        </Button>
      </div>
    </div>
  );
};
