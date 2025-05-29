import React from 'react';
import { Box, TextField, Grid } from '@mui/material';

interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressFormProps {
  address?: Address;
  onChange: (address: Address) => void;
  required?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange, required = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...(address || {}),
      [name]: value
    } as Address);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="address1"
            value={address?.address1 || ''}
            onChange={handleChange}
            required={required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            name="address2"
            value={address?.address2 || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={address?.city || ''}
            onChange={handleChange}
            required={required}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={address?.state || ''}
            onChange={handleChange}
            required={required}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Zip Code"
            name="zipCode"
            value={address?.zipCode || ''}
            onChange={handleChange}
            required={required}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;