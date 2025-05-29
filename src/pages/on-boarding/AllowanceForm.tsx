import React from 'react';
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

interface Allowance {
  category: string;
  amount: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  costCode: string;
}

interface AllowanceFormProps {
  allowances: Allowance[];
  onChange: (allowances: Allowance[]) => void;
}

const AllowanceForm: React.FC<AllowanceFormProps> = ({ 
  allowances, 
  onChange 
}) => {
  const handleAddAllowance = () => {
    const newAllowance: Allowance = {
      category: '',
      amount: 0,
      frequency: 'Daily',
      costCode: ''
    };
    onChange([...allowances, newAllowance]);
  };

  const handleRemoveAllowance = (index: number) => {
    const updatedAllowances = [...allowances];
    updatedAllowances.splice(index, 1);
    onChange(updatedAllowances);
  };

  const handleAllowanceChange = (index: number, field: keyof Allowance, value: any) => {
    const updatedAllowances = [...allowances];
    updatedAllowances[index] = {
      ...updatedAllowances[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    onChange(updatedAllowances);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Allowances</Typography>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddAllowance}
          variant="outlined"
          size="small"
        >
          Add Allowance
        </Button>
      </Box>

      {allowances.length === 0 ? (
        <Typography color="text.secondary">No allowances added yet.</Typography>
      ) : (
        allowances.map((allowance, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Allowance {index + 1}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveAllowance(index)}
                  aria-label="delete allowance"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={allowance.category}
                    onChange={(e) => handleAllowanceChange(index, 'category', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={allowance.amount || ''}
                    onChange={(e) => handleAllowanceChange(index, 'amount', e.target.value)}
                    inputProps={{ min: 0, step: 0.01 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Frequency"
                    value={allowance.frequency}
                    onChange={(e) => handleAllowanceChange(index, 'frequency', e.target.value)}
                    required
                  >
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cost Code"
                    value={allowance.costCode}
                    onChange={(e) => handleAllowanceChange(index, 'costCode', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default AllowanceForm;