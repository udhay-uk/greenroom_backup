import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  Checkbox,
  ListItemText,
  TextField,
  Button,
  Divider,
  FormControlLabel
} from '@mui/material';
import { OnboardingFormData } from './types';

interface RequiredStartWorkProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
}

const RequiredStartWork: React.FC<RequiredStartWorkProps> = ({ 
  formData, 
  onFormChange, 
  onNext 
}) => {
  const [customMessage, setCustomMessage] = React.useState(
    'Please complete the following documents to finalize your onboarding process.'
  );

  const mandatoryDocuments = [
    { id: 'w4', name: 'W-4 (Employee\'s Withholding Certificate)', required: true, completed: formData.w4Completed || false },
    { id: 'i9', name: 'I-9 (Employment Eligibility Verification)', required: true, completed: formData.i9Completed || false }
  ];

  const handleDocumentToggle = (docId: string) => {
    if (docId === 'w4') {
      onFormChange({ w4Completed: !formData.w4Completed });
    } else if (docId === 'i9') {
      onFormChange({ i9Completed: !formData.i9Completed });
    }
  };

  const handleSendInvitation = () => {
    // In a real app, this would trigger the invitation email
    console.log('Sending invitation with message:', customMessage);
    onNext();
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Required Start Work Documents
      </Typography>

      <Typography variant="body1" paragraph>
        The following documents must be completed before the worker can be added to payroll:
      </Typography>

      <List>
        {mandatoryDocuments.map((doc) => (
          <ListItem key={doc.id} disablePadding>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={doc.completed}
                onChange={() => handleDocumentToggle(doc.id)}
                disabled={doc.required}
              />
            </ListItemIcon>
            <ListItemText 
              primary={doc.name} 
              secondary={doc.required ? 'Required' : 'Optional'} 
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Invitation to Self-Onboard
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Custom Message"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        margin="normal"
      />

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox required />}
          label="I confirm that I have verified the worker's identity"
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button 
          variant="contained" 
          onClick={handleSendInvitation}
          disabled={!formData.w4Completed || !formData.i9Completed}
        >
          Send Invitation to Self-Onboard
        </Button>
      </Box>
    </Box>
  );
};

export default RequiredStartWork;