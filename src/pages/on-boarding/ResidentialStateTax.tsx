import React from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { OnboardingFormData } from './types';

interface ResidentialStateTaxProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const ResidentialStateTax: React.FC<ResidentialStateTaxProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  // Skip this step if home address state is NY (already handled in NYStateTaxWithholdings)
  if (formData.homeAddress?.state === 'NY') {
    onNext();
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Residential State Tax Withholdings
      </Typography>

      <Typography variant="body1" paragraph>
        Complete this step to determine tax withholding for your residential state 
        {formData.homeAddress?.state ? ` (${formData.homeAddress.state})` : ''}.
      </Typography>

      <TextField
        fullWidth
        select
        label="State Filing Status"
        name="stateFilingStatus"
        value={formData.stateFilingStatus || ''}
        onChange={handleChange}
        margin="normal"
        required
      >
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married filing joint return">Married filing joint return</MenuItem>
        <MenuItem value="Married filing separate return">Married filing separate return</MenuItem>
        <MenuItem value="Head of household">Head of household</MenuItem>
        <MenuItem value="Qualifying surviving spouse">Qualifying surviving spouse</MenuItem>
      </TextField>

      <TextField
        fullWidth
        select
        label="State Withholding Code"
        name="stateWithholdingCode"
        value={formData.stateWithholdingCode || ''}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="A">A</MenuItem>
        <MenuItem value="B">B</MenuItem>
        <MenuItem value="C">C</MenuItem>
        <MenuItem value="D">D</MenuItem>
        <MenuItem value="E">E</MenuItem>
        <MenuItem value="F">F</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Additional Withholding"
        name="stateAdditionalWithholding"
        type="number"
        value={formData.stateAdditionalWithholding || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      <TextField
        fullWidth
        label="Reduced Withholding"
        name="stateReducedWithholding"
        type="number"
        value={formData.stateReducedWithholding || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!formData.stateFilingStatus}
        >
          Continue
        </Button>
      </Box> */}
    </Box>
  );
};

export default ResidentialStateTax;