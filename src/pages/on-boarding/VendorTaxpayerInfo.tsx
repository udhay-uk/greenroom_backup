import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Button,
  Grid
} from '@mui/material';
import AddressForm from '../AddressForm';
import { OnboardingFormData } from './types';

interface VendorTaxpayerInfoProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const VendorTaxpayerInfo: React.FC<VendorTaxpayerInfoProps> = ({ 
  formData, 
  onFormChange, 
  onBack, 
  onNext 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleAddressChange = (address: any) => {
    onFormChange({ businessAddress: address });
  };

  const federalTaxClassifications = [
    'Individual/sole proprietor',
    'C corporation',
    'S corporation',
    'Partnership',
    'Trust/estate',
    'LLC (C corporation)',
    'LLC (S corporation)',
    'LLC (Partnership)',
    'Other'
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Taxpayer Information (W-9)
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={formData.payeeType === 'Vendor/Contractor' ? 'Business Name' : 'Entity Name'}
            name="entityName"
            value={formData.entityName || ''}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Federal Tax Classification"
            name="federalTaxClassification"
            value={formData.federalTaxClassification || ''}
            onChange={handleChange}
            required
          >
            {federalTaxClassifications.map((classification) => (
              <MenuItem key={classification} value={classification}>
                {classification}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exempt Payee Code (if any)"
            name="exemptPayeeCode"
            value={formData.exemptPayeeCode || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="FATCA Exemption Code (if any)"
            name="fatcaExemptionCode"
            value={formData.fatcaExemptionCode || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Business Address
          </Typography>
          <AddressForm 
            address={formData.businessAddress} 
            onChange={handleAddressChange} 
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={formData.payeeType === 'Vendor/Contractor' ? 'EIN or SSN' : 'EIN'}
            name="ein"
            value={formData.ein || ''}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!formData.entityName || !formData.federalTaxClassification || !formData.ein}
        >
          Continue
        </Button>
      </Box> */}
    </Box>
  );
};

export default VendorTaxpayerInfo;