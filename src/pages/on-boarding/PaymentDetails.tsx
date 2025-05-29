import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
} from '@mui/material';
import { OnboardingFormData } from './types';
import AddressForm from '../AddressForm';

interface PaymentDetailsProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onSubmit 
}) => {
  const [activePaymentSection, setActivePaymentSection] = useState<'employee' | 'agent' | 'manager' | 'trust'>('employee');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleAddressChange = (address: any) => {
    onFormChange({ mailingAddress: address });
  };

  const renderPaymentMethod = () => {
    return (
      <>
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup
            row
            name="paymentMethod"
            value={formData.paymentMethod || ''}
            onChange={handleChange}
          >
            <FormControlLabel value="Direct deposit" control={<Radio />} label="Direct deposit" />
            <FormControlLabel value="Check" control={<Radio />} label="Check" />
          </RadioGroup>
        </FormControl>

        {formData.paymentMethod === 'Direct deposit' && (
          <>
            <TextField
              fullWidth
              label="Routing Number"
              name="routingNumber"
              value={formData.routingNumber || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Account Number"
              name="confirmAccountNumber"
              value={formData.accountNumber || ''}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Account Type"
              name="accountType"
              value={formData.accountType || ''}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="checking">Checking</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
            </TextField>
          </>
        )}

        {formData.paymentMethod === 'Check' && (
          <>
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              You will need to write a physical check to this employee each pay day. 
              The platform will calculate and withhold appropriate taxes and tell you 
              how much should be paid via check.
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Mailing Address
            </Typography>
            <AddressForm 
              address={formData.mailingAddress || formData.homeAddress} 
              onChange={handleAddressChange} 
              required
            />
          </>
        )}
      </>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>

      {/* <Box sx={{ mb: 3 }}>
        <Button 
          variant={activePaymentSection === 'employee' ? 'contained' : 'outlined'} 
          onClick={() => setActivePaymentSection('employee')}
          sx={{ mr: 1 }}
        >
          Employee
        </Button>
        {formData.hasAgent && (
          <Button 
            variant={activePaymentSection === 'agent' ? 'contained' : 'outlined'} 
            onClick={() => setActivePaymentSection('agent')}
            sx={{ mr: 1 }}
          >
            Agent
          </Button>
        )}
        {formData.hasManager && (
          <Button 
            variant={activePaymentSection === 'manager' ? 'contained' : 'outlined'} 
            onClick={() => setActivePaymentSection('manager')}
            sx={{ mr: 1 }}
          >
            Manager
          </Button>
        )}
      </Box> */}
      <Box>
          <Typography variant="subtitle1" gutterBottom>
            Employee Payment Information
          </Typography>
          {renderPaymentMethod()}
        </Box>

      {/* {activePaymentSection === 'employee' && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Employee Payment Information
          </Typography>
          {renderPaymentMethod()}
        </Box>
      )}

      {activePaymentSection === 'agent' && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Agent Payment Information
          </Typography>
          {renderPaymentMethod()}
        </Box>
      )}

      {activePaymentSection === 'manager' && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Manager Payment Information
          </Typography>
          {renderPaymentMethod()}
        </Box>
      )} */}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onSubmit}
          disabled={!formData.paymentMethod || 
                   (formData.paymentMethod === 'Direct deposit' && 
                    (!formData.routingNumber || !formData.accountNumber || !formData.accountType))}
        >
          Complete Onboarding
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentDetails;