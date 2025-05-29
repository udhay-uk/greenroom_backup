import React from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { OnboardingFormData } from './types';

interface NYStateTaxWithholdingsProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const NYStateTaxWithholdings: React.FC<NYStateTaxWithholdingsProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        NY State Tax Withholdings (IT-2104)
      </Typography>

      <Typography variant="body1" paragraph>
        Complete this step to determine NY state income tax withholding.
      </Typography>

      <TextField
        fullWidth
        select
        label="NY Filing Status"
        name="nyFilingStatus"
        value={formData.nyFilingStatus || ''}
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
        label="Withholding Allowance"
        name="nyWithholdingAllowance"
        type="number"
        value={formData.nyWithholdingAllowance || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      <TextField
        fullWidth
        label="Additional Withholding"
        name="nyAdditionalWithholding"
        type="number"
        value={formData.nyAdditionalWithholding || ''}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0 }}
      />

      {formData.homeAddress?.state === 'NY' && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            NYC Tax Withholdings
          </Typography>
          <TextField
            fullWidth
            label="NYC Withholding Allowance"
            name="nycWithholdingAllowance"
            type="number"
            value={formData.nycWithholdingAllowance || ''}
            onChange={handleChange}
            margin="normal"
            inputProps={{ min: 0 }}
          />
          <TextField
            fullWidth
            label="NYC Additional Withholding"
            name="nycAdditionalWithholding"
            type="number"
            value={formData.nycAdditionalWithholding || ''}
            onChange={handleChange}
            margin="normal"
            inputProps={{ min: 0 }}
          />
        </>
      )}

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!formData.nyFilingStatus}
        >
          Continue
        </Button>
      </Box> */}
    </Box>
  );
};

export default NYStateTaxWithholdings;