import { getTranslations } from "next-intl/server";
import React, { ReactNode } from "react";

interface StepperProps {
  stepsCount: number;
  currentStep: number;
  children: ReactNode;
  params: Record<string, string>;
}
const Stepper = async ({ children, currentStep }: StepperProps) => {
  const t = await getTranslations("stepper");
  return (
    <section id="stepper">
      <h2>
        {t("step")}
        <span> {currentStep}</span>
      </h2>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const props = child.props as { stepNumber: number };
          if (currentStep == props.stepNumber) return child;
        }
      })}
      <section></section>
    </section>
  );
};

interface StepProps {
  stepNumber: string;
  children: ReactNode;
}
const Step = ({ stepNumber, children }: StepProps) => {
  return <section id={stepNumber}>{children}</section>;
};

export { Step, Stepper };
