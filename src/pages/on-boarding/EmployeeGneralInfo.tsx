import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Tabs, Tab, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { OnboardingFormData } from './types';
import AddressForm from '../AddressForm';
import UnionParticipationSection from '../UnionParticipationSection';
import EmployeeRepresentatives from './EmployeeRepresentatives';
import EmploymentSection from './EmploymentSection';
import RequiredStartWork from './RequiredStartWork';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface EmployeeGeneralInfoProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isManualOnboarding?: boolean;
}

const EmployeeGeneralInfo: React.FC<EmployeeGeneralInfoProps> = ({ 
  formData, 
  onFormChange, 
  onNext,
  isManualOnboarding = true
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddressChange = (address: any) => {
    onFormChange({ homeAddress: address });
  };

  const handlePrevTab = () => {
    if (tabValue > 0) {
      setTabValue(tabValue - 1);
    }
  };

  const handleNextTab = () => {
    if (tabValue < 4) {
      setTabValue(tabValue + 1);
    } else {
      // If on the last tab, proceed to the next step
      onNext();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNextTab();
      } else if (event.key === 'ArrowLeft') {
        handlePrevTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tabValue]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employee General Information
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="employee onboarding tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Employee Info" />
          <Tab label="Union Participation" />
          <Tab label="Employment" />
          <Tab label="Representatives" />
          <Tab label="Required Documents" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Legal First Name"
              name="legalFirstName"
              value={formData.legalFirstName || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Legal Last Name"
              name="legalLastName"
              value={formData.legalLastName || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer not to say">Prefer not to say</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SSN"
              name="ssn"
              value={formData.ssn || ''}
              onChange={handleChange}
              placeholder="999-99-9999"
              required={isManualOnboarding}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
              required={isManualOnboarding}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
          Home Address
        </Typography>
        <AddressForm 
          address={formData.homeAddress} 
          onChange={handleAddressChange} 
          required={isManualOnboarding}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <UnionParticipationSection 
          formData={formData} 
          onFormChange={onFormChange} 
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <EmploymentSection 
          formData={formData} 
          onFormChange={onFormChange} 
          isUnionMember={formData.isUnionMember || false}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <EmployeeRepresentatives 
          formData={formData} 
          onFormChange={onFormChange} 
        />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <RequiredStartWork 
          formData={formData} 
          onFormChange={onFormChange} 
          onNext={onNext}
        />
      </TabPanel>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevTab}
          disabled={tabValue === 0}
        >
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={handleNextTab}
        >
          {tabValue === 4 ? 'Continue' : ''}
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeGeneralInfo;