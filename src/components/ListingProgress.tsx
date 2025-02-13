
import { Progress } from "@/components/ui/progress";

interface ListingProgressProps {
  step: number;
  totalSteps: number;
  label: string;
}

export const ListingProgress = ({ step, totalSteps, label }: ListingProgressProps) => {
  const progress = (step / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Step {step} of {totalSteps}</span>
        <span>{label}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
