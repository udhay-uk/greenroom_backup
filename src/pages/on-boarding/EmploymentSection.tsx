import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Divider,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { OnboardingFormData } from './types';
import AllowanceForm from './AllowanceForm';
import IncrementForm from './IncrementForm';
import PayRateForm from './PayRateForm';

interface EmploymentSectionProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  isUnionMember: boolean;
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({ 
  formData, 
  onFormChange, 
  isUnionMember 
}) => {
  const [activeSubsection, setActiveSubsection] = useState<'pay' | 'increments' | 'allowances'>('pay');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handlePayRatesChange = (payRates: any[]) => {
    onFormChange({ payRates });
  };

  const handleIncrementsChange = (increments: any[]) => {
    onFormChange({ increments });
  };

  const handleAllowancesChange = (allowances: any[]) => {
    onFormChange({ allowances });
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Employment Details
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Start Date"
            name="jobStartDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.jobStartDate || ''}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job End Date (Optional)"
            name="jobEndDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.jobEndDate || ''}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Button 
          variant={activeSubsection === 'pay' ? 'contained' : 'outlined'} 
          onClick={() => setActiveSubsection('pay')}
          sx={{ mr: 1 }}
        >
          Pay Rates
        </Button>
        {isUnionMember && (
          <Button 
            variant={activeSubsection === 'increments' ? 'contained' : 'outlined'} 
            onClick={() => setActiveSubsection('increments')}
            sx={{ mr: 1 }}
          >
            Increments
          </Button>
        )}
        <Button 
          variant={activeSubsection === 'allowances' ? 'contained' : 'outlined'} 
          onClick={() => setActiveSubsection('allowances')}
        >
          Allowances
        </Button>
      </Box>

      {activeSubsection === 'pay' && (
        <PayRateForm 
          payRates={formData.payRates || []}
          onChange={handlePayRatesChange}
          isUnionMember={isUnionMember}
          jobTitle={formData.jobTitle}
        />
      )}

      {activeSubsection === 'increments' && isUnionMember && (
        <IncrementForm 
          increments={formData.increments || []}
          onChange={handleIncrementsChange}
        />
      )}

      {activeSubsection === 'allowances' && (
        <AllowanceForm 
          allowances={formData.allowances || []}
          onChange={handleAllowancesChange}
        />
      )}

      {isUnionMember && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" gutterBottom>
            401k Participation
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="optIn401k"
                checked={formData.optIn401k || false}
                onChange={(e) => onFormChange({ 
                  optIn401k: e.target.checked,
                  percentage401k: e.target.checked ? (formData.percentage401k || 0) : 0
                })}
              />
            }
            label="Opt-in to 401k"
          />
          {formData.optIn401k && (
            <TextField
              fullWidth
              label="Contribution Percentage"
              name="percentage401k"
              type="number"
              value={formData.percentage401k || 0}
              onChange={(e) => onFormChange({ 
                percentage401k: Math.min(Number(e.target.value), 100)
              })}
              margin="normal"
              inputProps={{ min: 0, max: 100 }}
              helperText="Maximum yearly contribution: $23,000"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EmploymentSection;