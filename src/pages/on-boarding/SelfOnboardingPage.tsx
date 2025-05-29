import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  MenuItem, 
  Divider,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
  TextareaAutosize
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OnboardingFormData } from './types';

const availableDocuments = [
  'W-4 (Employee\'s Withholding Certificate)',
  'I-9 (Employment Eligibility Verification)',
  'W-9 (Request for Taxpayer ID Number)',
  'Anti Harassment Policy',
  'Confidentiality Policy',
  'Wage Theft Prevention Policy'
];

const SelfOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    payeeType: 'Employee' as OnboardingFormData['payeeType'],
    email: '',
    subject: 'Complete Your Onboarding',
    message: 'Please complete your onboarding by following the link below and submitting the required documents.',
    documents: ['W-4 (Employee\'s Withholding Certificate)', 'I-9 (Employment Eligibility Verification)'],
    isSending: false,
    sentSuccess: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentToggle = (doc: string) => {
    setFormData(prev => {
      // For Employees, W-4 and I-9 are mandatory and can't be removed
      if (prev.payeeType === 'Employee' && 
          (doc === 'W-4 (Employee\'s Withholding Certificate)' || 
           doc === 'I-9 (Employment Eligibility Verification)')) {
        return prev;
      }
      
      const newDocs = prev.documents.includes(doc)
        ? prev.documents.filter(d => d !== doc)
        : [...prev.documents, doc];
      return { ...prev, documents: newDocs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, isSending: true }));
    
    try {
      // Simulate API call to send invitation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your backend here
      // await api.sendOnboardingInvitation(formData);
      
      setFormData(prev => ({ ...prev, isSending: false, sentSuccess: true }));
      
      // Navigate to progress page after a short delay
      setTimeout(() => navigate('/onboarding/progress'), 2000);
    } catch (error) {
      console.error('Failed to send invitation:', error);
      setFormData(prev => ({ ...prev, isSending: false }));
    }
  };

  const getMandatoryDocuments = () => {
    switch (formData.payeeType) {
      case 'Employee':
        return ['W-4 (Employee\'s Withholding Certificate)', 'I-9 (Employment Eligibility Verification)'];
      case 'Loanout':
        return ['I-9 (Employment Eligibility Verification)', 'W-9 (Request for Taxpayer ID Number)'];
      case 'Vendor/Contractor':
        return ['W-9 (Request for Taxpayer ID Number)'];
      default:
        return [];
    }
  };

  const getOptionalDocuments = () => {
    return availableDocuments.filter(doc => !getMandatoryDocuments().includes(doc));
  };

  if (formData.sentSuccess) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Invitation Sent Successfully!
        </Typography>
        <Typography variant="body1">
          The onboarding invitation has been sent to {formData.email}.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Invite Worker to Self-Onboard
      </Typography>
      <Typography variant="body1" paragraph>
        The worker will enter their own personal, tax and bank account details.
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              select
              label="Payee Type"
              name="payeeType"
              value={formData.payeeType}
              onChange={(e) => {
                handleChange(e);
                // Reset documents when payee type changes
                setFormData(prev => ({
                  ...prev,
                  payeeType: e.target.value as OnboardingFormData['payeeType'],
                  documents: getMandatoryDocuments()
                }));
              }}
              margin="normal"
              required
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Loanout">Loanout</MenuItem>
              <MenuItem value="Vendor/Contractor">Vendor/Contractor</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Required Documents
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The following documents are mandatory for this payee type:
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <List dense>
                {getMandatoryDocuments().map((doc) => (
                  <ListItem key={doc}>
                    <ListItemText primary={doc} />
                    <Chip label="Required" size="small" color="primary" />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {getOptionalDocuments().length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Additional Documents
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Select any additional documents you want the worker to complete:
                </Typography>
                
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <List dense>
                    {getOptionalDocuments().map((doc) => (
                      <ListItem key={doc} disablePadding>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.documents.includes(doc)}
                              onChange={() => handleDocumentToggle(doc)}
                              name={doc}
                            />
                          }
                          label={doc}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Invitation Message
            </Typography>
            
            <TextField
              fullWidth
              label="Email Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              margin="normal"
              required
            />
            
            <TextareaAutosize
              minRows={4}
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontFamily: 'inherit',
                fontSize: 'inherit',
                marginTop: '16px',
                marginBottom: '8px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: '4px'
              }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Customize your invitation message..."
            />
            
            <Typography variant="body2" color="text.secondary">
              Note: A secure onboarding link will be automatically included in the email.
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                type="submit"
                disabled={formData.isSending || !formData.email}
              >
                {formData.isSending ? 'Sending...' : 'Send Invitation'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SelfOnboardingPage;