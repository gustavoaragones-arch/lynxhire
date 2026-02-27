interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  steps,
}: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      {/* Step counter */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {steps[currentStep - 1]}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {/* Step dots */}
      <div className="flex justify-between mt-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i + 1 <= currentStep ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
