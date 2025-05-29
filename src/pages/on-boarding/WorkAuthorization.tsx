import React from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { OnboardingFormData } from './types';
import DocumentUpload from './DocumentUpload';

interface WorkAuthorizationProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

const WorkAuthorization: React.FC<WorkAuthorizationProps> = ({ formData, onFormChange, onBack, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleDocumentUpload = (file: File) => {
    onFormChange({ documentFile: file });
  };

  const handleDocumentRemove = () => {
    onFormChange({ documentFile: null });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Authorization (I-9)
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Personal Information
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={`${formData.legalFirstName} ${formData.legalLastName}`}
        margin="normal"
        disabled
      />
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        value={formData.email || ''}
        margin="normal"
        disabled
      />
      <TextField
        fullWidth
        label="Date of Birth"
        name="dateOfBirth"
        value={formData.dateOfBirth || ''}
        margin="normal"
        disabled
      />
      <TextField
        fullWidth
        label="SSN"
        name="ssn"
        value={formData.ssn || ''}
        margin="normal"
        disabled
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber || ''}
        onChange={handleChange}
        margin="normal"
        required
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Legal Status
      </Typography>
      <TextField
        fullWidth
        select
        label="Legal Status"
        name="legalStatus"
        value={formData.legalStatus || ''}
        onChange={handleChange}
        margin="normal"
        required
      >
        <MenuItem value="Citizen of the United States">Citizen of the United States</MenuItem>
        <MenuItem value="Noncitizen national of the United States">Noncitizen national of the United States</MenuItem>
        <MenuItem value="Lawful permanent resident">Lawful permanent resident</MenuItem>
        <MenuItem value="Noncitizen">Noncitizen</MenuItem>
      </TextField>

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Validation Document
      </Typography>
      <TextField
        fullWidth
        select
        label="Document Type"
        name="validationDocument"
        value={formData.validationDocument || ''}
        onChange={handleChange}
        margin="normal"
        required
      >
        <MenuItem value="Passport">Passport</MenuItem>
        <MenuItem value="Resident card">Resident card</MenuItem>
        <MenuItem value="Foreign Passport">Foreign Passport</MenuItem>
        <MenuItem value="Combination of driver's license and SSN">
          Combination of driver's license and SSN
        </MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Document Number"
        name="documentNumber"
        value={formData.documentNumber || ''}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Issuing Authority"
        name="issuingAuthority"
        value={formData.issuingAuthority || ''}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Expiration Date"
        name="documentExpiration"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.documentExpiration || ''}
        onChange={handleChange}
        margin="normal"
      />

      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
        Document Upload
      </Typography>
      <DocumentUpload 
        onFileUpload={handleDocumentUpload}
        onFileRemove={handleDocumentRemove}
        file={formData.documentFile ?? null}
        required
      />

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>Back</Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          disabled={!formData.phoneNumber || !formData.legalStatus || 
                   !formData.validationDocument || !formData.documentNumber || 
                   !formData.issuingAuthority || !formData.documentFile}
        >
          Continue
        </Button>
      </Box> */}
    </Box>
  );
};

export default WorkAuthorization;