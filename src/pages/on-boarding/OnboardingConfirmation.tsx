import React from 'react';
import { Box, Typography, Button, Card, CardContent, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OnboardingFormData } from './types';

interface OnboardingConfirmationProps {
  formData: OnboardingFormData;
}

const OnboardingConfirmation: React.FC<OnboardingConfirmationProps> = ({ formData }) => {
  const navigate = useNavigate();

  const getSummaryItems = () => {
    const items = [
      { label: 'Payee Type', value: formData.payeeType },
      { label: 'Name', value: formData.payeeType === 'Employee' ? 
        `${formData.legalFirstName} ${formData.legalLastName}` : formData.entityName }
    ];

    if (formData.payeeType === 'Employee') {
      items.push(
        { label: 'Email', value: formData.email },
        { label: 'Union Member', value: formData.isUnionMember ? 'Yes' : 'No' },
        { label: 'Job Title', value: formData.jobTitle }
      );
    } else {
      items.push(
        { label: 'EIN', value: formData.ein },
        { label: 'Business Address', value: 
          `${formData.businessAddress?.address1}, ${formData.businessAddress?.city}, ${formData.businessAddress?.state}` }
      );
    }

    return items;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Onboarding Complete!
      </Typography>
      <Typography variant="body1" paragraph>
        {formData.payeeType === 'Employee' ? 
          'The employee has been successfully onboarded.' :
          'The vendor/contractor has been successfully onboarded.'}
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <List>
            {getSummaryItems().map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={item.label} secondary={item.value || 'Not provided'} />
                </ListItem>
                {index < getSummaryItems().length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/payees')}
            >
              View All Payees
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OnboardingConfirmation;