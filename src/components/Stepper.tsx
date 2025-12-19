interface StepperProps {
    currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
    const steps = [1, 2, 3];

    return (
        <div className="flex items-center justify-center mb-8 relative">
            {/* Connector Line in Background */}
            <div className="absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-0" />

            {steps.map((step) => {
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                    <div key={step} className="relative z-10 mx-8 sm:mx-10 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${isActive || isCompleted
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-slate-200 text-slate-500'
                            }`}>
                            {step}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;
