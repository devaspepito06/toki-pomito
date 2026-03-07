import { format } from "@/lib/utils";

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

export const TimerDisplay = ({ minutes, seconds }: TimerDisplayProps) => {
  return (
    <p className="text-9xl font-bold m-10 text-white">
      {format(minutes)}:{format(seconds)}
    </p>
  );
};
