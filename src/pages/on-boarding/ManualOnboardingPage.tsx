import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OnboardingFormData } from './types';

const ManualOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    payeeType: 'Employee'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding', { state: { formData } });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manual Onboarding
      </Typography>
      <Typography variant="body1" paragraph>
        You'll have to enter this employee's personal, tax and bank account details yourself.
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              select
              label="Payee Type"
              name="payeeType"
              value={formData.payeeType}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Loanout">Loanout</MenuItem>
              <MenuItem value="Vendor/Contractor">Vendor/Contractor</MenuItem>
            </TextField>

            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={<Checkbox required />}
                label="I confirm I have received this information from the party"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                variant="contained" 
                type="submit"
                disabled={!formData.payeeType}
              >
                Continue
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManualOnboardingPage;