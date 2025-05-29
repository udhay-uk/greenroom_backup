import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { PayeeType } from './types';

interface OnboardingStepperProps {
  activeStep: number;
  payeeType: PayeeType;
  isManualOnboarding?: boolean;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ 
  activeStep, 
  payeeType,
  isManualOnboarding = true
}) => {
  // Define steps based on payee type and onboarding method
  const getSteps = () => {
    if (!isManualOnboarding) {
      return ['Self-Onboarding Invitation'];
    }

    if (payeeType === 'Employee') {
      return [
        'General Information',
        'Work Authorization (I-9)',
        'Federal Tax Withholdings (W-4)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else if (payeeType === 'Loanout') {
      return [
        'General Information',
        'Work Authorization (I-9)',
        'Taxpayer Information (W-9)',
        'NY State Tax Withholdings',
        'Residential State Tax',
        'Payment Details'
      ];
    } else { // Vendor/Contractor
      return [
        'General Information',
        'Taxpayer Information (W-9)',
        'Payment Details'
      ];
    }
  };

  const steps = getSteps();

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OnboardingStepper;