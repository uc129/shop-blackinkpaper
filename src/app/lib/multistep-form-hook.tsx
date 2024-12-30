import { createContext, use, useContext, useState } from "react";



const useMultistepForm = (steps: React.ReactNode[]) => {

    const [step, setStep] = useState(0);

    const nextStep = () => setStep((step + 1) % steps.length);
    const prevStep = () => setStep((step - 1 + steps.length) % steps.length);
    const goToStep = (step: number) => setStep(step);

    const isLastStep = step === steps.length - 1;
    const isFirstStep = step === 0;

    return {
        step,
        nextStep,
        prevStep,
        goToStep,
        isLastStep,
        isFirstStep,
        steps
    }

}

export default useMultistepForm;




