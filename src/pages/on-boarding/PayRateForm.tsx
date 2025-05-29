import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  IconButton,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface PayRate {
  amount: number;
  period: 'Hour' | 'Week' | 'Month';
  costCode: string;
  earningCode: 'Salary Rehearsal' | 'Salary Performance';
}

interface PayRateFormProps {
  payRates: PayRate[];
  onChange: (payRates: PayRate[]) => void;
  isUnionMember: boolean;
  jobTitle?: string;
}

const PayRateForm: React.FC<PayRateFormProps> = ({ 
  payRates, 
  onChange, 
  isUnionMember,
  jobTitle
}) => {
  // Set default union rates based on job title
  useEffect(() => {
    if (isUnionMember && jobTitle && payRates.length === 0) {
      let defaultAmount = 0;
      
      // Set default union rates based on job title (AEA rates)
      switch(jobTitle) {
        case 'Actor':
          defaultAmount = 2638;
          break;
        case 'Production Stage Manager (Musical)':
          defaultAmount = 4334;
          break;
        case 'Production Stage Manager (Dramatic)':
          defaultAmount = 3725;
          break;
        case '1st Assistant Stage Manager (Musical)':
          defaultAmount = 3423;
          break;
        case '1st Assistant Stage Manager (Dramatic)':
          defaultAmount = 3046;
          break;
        case '2nd Assistant Stage Manager (Musical)':
          defaultAmount = 2861;
          break;
        default:
          defaultAmount = 0;
      }
      
      if (defaultAmount > 0) {
        const newPayRate: PayRate = {
          amount: defaultAmount,
          period: 'Week', // Union members always use weekly rates
          costCode: '',
          earningCode: 'Salary Rehearsal'
        };
        onChange([newPayRate]);
      }
    }
  }, [isUnionMember, jobTitle]);

  const handleAddPayRate = () => {
    const newPayRate: PayRate = {
      amount: 0,
      period: isUnionMember ? 'Week' : 'Hour',
      costCode: '',
      earningCode: 'Salary Rehearsal'
    };
    onChange([...payRates, newPayRate]);
  };

  const handleRemovePayRate = (index: number) => {
    const updatedPayRates = [...payRates];
    updatedPayRates.splice(index, 1);
    onChange(updatedPayRates);
  };

  const handlePayRateChange = (index: number, field: keyof PayRate, value: any) => {
    const updatedPayRates = [...payRates];
    
    // For union members, enforce minimum rates if trying to change amount
    if (isUnionMember && field === 'amount' && jobTitle) {
      let minAmount = 0;
      
      switch(jobTitle) {
        case 'Actor':
          minAmount = 2638;
          break;
        case 'Production Stage Manager (Musical)':
          minAmount = 4334;
          break;
        case 'Production Stage Manager (Dramatic)':
          minAmount = 3725;
          break;
        case '1st Assistant Stage Manager (Musical)':
          minAmount = 3423;
          break;
        case '1st Assistant Stage Manager (Dramatic)':
          minAmount = 3046;
          break;
        case '2nd Assistant Stage Manager (Musical)':
          minAmount = 2861;
          break;
        default:
          minAmount = 0;
      }
      
      // Ensure amount is not below minimum
      if (Number(value) < minAmount) {
        value = minAmount;
      }
    }
    
    updatedPayRates[index] = {
      ...updatedPayRates[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    onChange(updatedPayRates);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Pay Rates</Typography>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddPayRate}
          variant="outlined"
          size="small"
          disabled={payRates.length >= 10} // Max 10 pay rates
        >
          Add Pay Rate
        </Button>
      </Box>

      {payRates.length === 0 ? (
        <Typography color="text.secondary">No pay rates added yet.</Typography>
      ) : (
        payRates.map((payRate, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Pay Rate {index + 1}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemovePayRate(index)}
                  aria-label="delete pay rate"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={payRate.amount || ''}
                    onChange={(e) => handlePayRateChange(index, 'amount', e.target.value)}
                    inputProps={{ min: 0, step: 0.01 }}
                    required
                    helperText={isUnionMember && "Union minimum rate applies"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Period"
                    value={payRate.period}
                    onChange={(e) => handlePayRateChange(index, 'period', e.target.value)}
                    required
                    disabled={isUnionMember} // Disabled for union members
                  >
                    <MenuItem value="Hour">Per Hour</MenuItem>
                    <MenuItem value="Week">Per Week</MenuItem>
                    <MenuItem value="Month">Per Month</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cost Code"
                    value={payRate.costCode}
                    onChange={(e) => handlePayRateChange(index, 'costCode', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Earning Code"
                    value={payRate.earningCode}
                    onChange={(e) => handlePayRateChange(index, 'earningCode', e.target.value)}
                    required
                  >
                    <MenuItem value="Salary Rehearsal">Salary Rehearsal</MenuItem>
                    <MenuItem value="Salary Performance">Salary Performance</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
      {payRates.length >= 10 && (
        <Typography color="error" variant="caption">
          Maximum of 10 pay rates allowed
        </Typography>
      )}
    </Box>
  );
};

export default PayRateForm;