import React from 'react';
import { Box, Typography, TextField, MenuItem, Button, FormControlLabel, Checkbox } from '@mui/material';
import { OnboardingFormData } from './types';

interface FederalTaxWithholdingsProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const FederalTaxWithholdings: React.FC<FederalTaxWithholdingsProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Federal Tax Withholdings (W-4)
      </Typography>

      <Typography variant="body1" paragraph>
        Complete this step to determine federal income tax withholding for the employee.
      </Typography>

      <TextField
        fullWidth
        select
        label="Federal Filing Status"
        name="federalFilingStatus"
        value={formData.federalFilingStatus || ''}
        onChange={handleChange}
        margin="normal"
        required
      >
        <MenuItem value="Single or Married filing separately">Single or Married filing separately</MenuItem>
        <MenuItem value="Married filing jointly or Qualifying surviving spouse">
          Married filing jointly or Qualifying surviving spouse
        </MenuItem>
        <MenuItem value="Head of household">Head of household</MenuItem>
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            name="multipleJobs"
            checked={formData.multipleJobs || false}
            onChange={handleChange}
          />
        }
        label="Multiple jobs or spouse works"
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Adjustments
      </Typography>

      <TextField
        fullWidth
        label="Claim Dependents and Other Credits"
        name="dependentsCredit"
        type="number"
        value={formData.dependentsCredit || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      <TextField
        fullWidth
        label="Other Income (not from jobs)"
        name="otherIncome"
        type="number"
        value={formData.otherIncome || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      <TextField
        fullWidth
        label="Deductions"
        name="deductions"
        type="number"
        value={formData.deductions || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      <TextField
        fullWidth
        label="Extra Withholding"
        name="extraWithholding"
        type="number"
        value={formData.extraWithholding || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!formData.federalFilingStatus}
        >
          Continue
        </Button>
      </Box> */}
    </Box>
  );
};

export default FederalTaxWithholdings;