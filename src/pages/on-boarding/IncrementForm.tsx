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

interface Increment {
  type: string;
  amount: number;
  frequency: 'Week' | 'Month';
}

interface IncrementFormProps {
  increments: Increment[];
  onChange: (increments: Increment[]) => void;
}

const IncrementForm: React.FC<IncrementFormProps> = ({ 
  increments, 
  onChange 
}) => {
  // AEA increments with predefined amounts
  const aeaIncrements = [
    { type: 'Chorus Part', amount: 25.00 },
    { type: 'Principal/General Understudy', amount: 62.00 },
    { type: 'Chorus Understudy', amount: 17.50 },
    { type: 'Initial 6 Month Rider', amount: 80.00 },
    { type: 'Second 6 Month Rider', amount: 40.00 },
    { type: 'One-Year Rider', amount: 175.00 },
    { type: 'Term Contract', amount: 212.00 },
    { type: 'Swing', amount: 131.90 },
    { type: 'Partial Swing', amount: 20.00 },
    { type: 'Dance Captain', amount: 527.60 },
    { type: 'Assistant Dance Captain', amount: 263.80 },
    { type: 'Fight Captain', amount: 100.00 },
    { type: 'Rehearsal Overtime', amount: 46.00 },
    { type: 'Health Fund', amount: 150.00 },
    { type: 'Set Moves', amount: 8.00 },
    { type: 'Media Fee', amount: 65.95 }
  ];

  const handleAddIncrement = () => {
    const newIncrement: Increment = {
      type: '',
      amount: 0,
      frequency: 'Week'
    };
    onChange([...increments, newIncrement]);
  };

  const handleRemoveIncrement = (index: number) => {
    const updatedIncrements = [...increments];
    updatedIncrements.splice(index, 1);
    onChange(updatedIncrements);
  };

  const handleIncrementChange = (index: number, field: keyof Increment, value: any) => {
    const updatedIncrements = [...increments];
    
    // If type is changed, auto-populate the amount based on AEA increments
    if (field === 'type') {
      const selectedIncrement = aeaIncrements.find(inc => inc.type === value);
      if (selectedIncrement) {
        updatedIncrements[index] = {
          ...updatedIncrements[index],
          type: value,
          amount: selectedIncrement.amount
        };
        onChange(updatedIncrements);
        return;
      }
    }
    
    updatedIncrements[index] = {
      ...updatedIncrements[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    onChange(updatedIncrements);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Increments</Typography>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddIncrement}
          variant="outlined"
          size="small"
        >
          Add Increment
        </Button>
      </Box>

      {increments.length === 0 ? (
        <Typography color="text.secondary">No increments added yet.</Typography>
      ) : (
        increments.map((increment, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Increment {index + 1}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveIncrement(index)}
                  aria-label="delete increment"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Increment Type"
                    value={increment.type}
                    onChange={(e) => handleIncrementChange(index, 'type', e.target.value)}
                    required
                  >
                    {aeaIncrements.map((option) => (
                      <MenuItem key={option.type} value={option.type}>
                        {option.type} (${option.amount.toFixed(2)})
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={increment.amount || ''}
                    onChange={(e) => handleIncrementChange(index, 'amount', e.target.value)}
                    inputProps={{ min: 0, step: 0.01 }}
                    required
                    disabled={increment.type !== ''} // Disabled if an AEA increment is selected
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Frequency"
                    value={increment.frequency}
                    onChange={(e) => handleIncrementChange(index, 'frequency', e.target.value)}
                    required
                  >
                    <MenuItem value="Week">Weekly</MenuItem>
                    <MenuItem value="Month">Monthly</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default IncrementForm;