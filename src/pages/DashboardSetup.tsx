import React from 'react';
import { 
  Check, Clock, AlertCircle, ChevronRight, 
  Building, Users, CreditCard, FileCheck, 
  FileText, Settings, PlusCircle, Bell
} from 'lucide-react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Chip,
  Container,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SetupStep {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'in-progress' | 'rejected';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface QuickAction {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const DashboardSetup: React.FC = () => {
  const navigate = useNavigate();
  
  const setupSteps: SetupStep[] = [
    { 
      id: 'company', 
      name: 'Company Information', 
      status: 'completed', 
      description: 'Basic company details are set up',
      icon: Building,
      path: '/src/pages/CompanyInformation'
    },
    { 
      id: 'unions', 
      name: 'Union Configuration', 
      status: 'pending', 
      description: 'Configure union agreements and rates',
      icon: Users,
      path: '/src/pages/UnionSetup'
    },
    { 
      id: 'bank', 
      name: 'Bank Setup', 
      status: 'pending', 
      description: 'Connect your bank account for payments',
      icon: CreditCard,
      path: '/src/pages/BankSetup'
    },
    { 
      id: 'signatures', 
      name: 'Signature Setup', 
      status: 'pending', 
      description: 'Upload signatures for checks and documents',
      icon: FileCheck,
      path: '/src/pages/SignatureSetup'
    },
    { 
      id: 'documents', 
      name: 'Documents', 
      status: 'pending', 
      description: 'Upload company documents and templates',
      icon: FileText,
      path: '/src/pages/Documents'
    },
    { 
      id: 'settings', 
      name: 'Payment Settings', 
      status: 'pending', 
      description: 'Configure default payment options',
      icon: Settings,
      path: '/setup/payment-settings'
    }
  ];
  
  // Quick action buttons
  const quickActions: QuickAction[] = [
    { name: 'Add Payee', icon: PlusCircle, href: '/src/pages/SelectPayee' },
    { name: 'Setup Bank', icon: CreditCard, href: '/src/pages/SetupUnion' },
    { name: 'Upload Signature', icon: FileCheck, href: '/src/pages/SignatureSetup' },
    { name: 'Notification Settings', icon: Bell, href: '/settings/notifications' }
  ];
  
  const renderStatusBadge = (status: SetupStep['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Chip
            icon={<Check fontSize="small" />}
            label="Completed"
            size="small"
            color="success"
            variant="outlined"
          />
        );
      case 'in-progress':
        return (
          <Chip
            icon={<Clock fontSize="small" />}
            label="In Progress"
            size="small"
            color="info"
            variant="outlined"
          />
        );
      case 'rejected':
        return (
          <Chip
            icon={<AlertCircle fontSize="small" />}
            label="Rejected"
            size="small"
            color="error"
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            icon={<Clock fontSize="small" />}
            label="Pending"
            size="small"
            color="default"
            variant="outlined"
          />
        );
    }
  };

  const handleStepClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Card sx={{ mb: 4, borderColor: 'primary.light', backgroundColor: 'primary.50' }}>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <AlertCircle color="primary" />
              <Box>
                <Typography variant="subtitle1" color="primary.dark">
                  Setup Required
                </Typography>
                <Typography variant="body2" color="primary.dark" mt={1}>
                  Please complete the setup process to fully activate your account. This will ensure your payroll system is properly configured.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          {/* Main content - Setup Timeline */}
          <Box sx={{ flex: 2 }}>
            <Card>
              <CardHeader
                title="Setup Timeline"
                subheader="Complete these steps to configure your payroll system"
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              />
              <Divider />
              <List>
                {setupSteps.map((step) => (
                  <React.Fragment key={step.id}>
                    <ListItem 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'action.hover',
                          cursor: 'pointer'
                        } 
                      }}
                      onClick={() => handleStepClick(step.path)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: step.status === 'completed' ? 'success.light' : 'grey.100',
                          color: step.status === 'completed' ? 'success.main' : 'grey.500'
                        }}>
                          <step.icon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={step.name}
                        secondary={step.description}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {renderStatusBadge(step.status)}
                          <IconButton 
                            edge="end"
                            color={step.status === 'completed' ? 'default' : 'primary'}
                          >
                            <ChevronRight />
                          </IconButton>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </Box>

          {/* Sidebar - Quick Actions */}
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardHeader
                title="Quick Actions"
                subheader="Shortcuts to common tasks"
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              />
              <Divider />
              <List>
                {quickActions.map((action) => (
                  <React.Fragment key={action.name}>
                    <ListItem 
                      component="a" 
                      href={action.href}
                      sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                          <action.icon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={action.name} />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Card>

            {/* Progress Summary */}
            <Card sx={{ mt: 3 }}>
              <CardHeader
                title="Setup Progress"
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
              />
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="primary" fontWeight="medium">
                      17% Complete
                    </Typography>
                    <Typography variant="caption" color="primary" fontWeight="medium">
                      1/6 Steps
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={17} 
                    sx={{ height: 8, borderRadius: 4 }} 
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default DashboardSetup;