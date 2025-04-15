import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff, CheckCircle, Mail, Lock, Error as ErrorIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

interface PasswordStrength {
  level: number;
  label: string;
  color: 'error' | 'warning' | 'info' | 'success';
}

const AccountActivation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    level: 0,
    label: 'Too weak',
    color: 'error'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mock email from URL parameter or token
  const email = "jane.smith@greenroom.com";
  
  // Check password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength({
        level: 0,
        label: 'Too weak',
        color: 'error'
      });
      return;
    }
    
    let level = 0;
    
    // Length check
    if (password.length >= 8) level += 1;
    
    // Character type checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W|_/.test(password);
    
    const charTypeCount = [hasUppercase, hasLowercase, hasNumbers, hasNonalphas].filter(Boolean).length;
    
    // Add strength based on character types (need at least 3 of 4 types)
    if (charTypeCount >= 3) level += 1;
    
    // Add strength for length > 12
    if (password.length >= 12) level += 1;
    
    // Add strength for having all 4 character types
    if (charTypeCount === 4) level += 1;
    
    // Determine strength label and color
    let label = '';
    let color: PasswordStrength['color'] = 'error';
    
    switch (level) {
      case 0:
        label = 'Too weak';
        color = 'error';
        break;
      case 1:
        label = 'Weak';
        color = 'error';
        break;
      case 2:
        label = 'Fair';
        color = 'warning';
        break;
      case 3:
        label = 'Good';
        color = 'info';
        break;
      case 4:
        label = 'Strong';
        color = 'success';
        break;
      default:
        label = '';
        color = 'error';
    }
    
    setPasswordStrength({
      level,
      label,
      color
    });
  }, [password]);
  
  const validatePassword = (): boolean => {
    // Reset errors
    setPasswordError('');
    setConfirmPasswordError('');
    
    let isValid = true;
    
    // Length validation
    if (password.length < 8 || password.length > 24) {
      setPasswordError('Password must be between 8 and 24 characters');
      isValid = false;
    }
    
    // Character type validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W|_/.test(password);
    
    const charTypeCount = [hasUppercase, hasLowercase, hasNumbers, hasNonalphas].filter(Boolean).length;
    
    if (charTypeCount < 3) {
      setPasswordError('Password must include at least 3 of these: uppercase letters, lowercase letters, numbers, and special characters');
      isValid = false;
    }
    
    // Matching validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // In a real app, you would redirect to the dashboard after a successful activation
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
      }, 2000);
    }, 1500);
  };
  
  // Show success page after activation
  if (isSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
          px: { xs: 2, sm: 3, lg: 4 }
        }}
      >
        <Stack spacing={3} alignItems="center" sx={{ maxWidth: 400, mx: 'auto' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
          <Typography variant="h4" component="h1" align="center" fontWeight="bold">
            Account Activated
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Your account has been successfully activated. You'll be redirected to your dashboard shortly.
          </Typography>
        </Stack>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 4,
        px: { xs: 2, sm: 3, lg: 4 }
      }}
    >
      <Stack spacing={4} sx={{ maxWidth: 400, mx: 'auto' }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h4" component="h1" align="center" fontWeight="bold">
            Activate Your Account
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Set your password to complete account activation
          </Typography>
        </Stack>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Alert icon={<Mail />} severity="info" sx={{ mb: 3 }}>
            Account activation for <strong>{email}</strong>
          </Alert>
          
          <Stack component="form" spacing={3} onSubmit={handleSubmit}>
            <FormControl fullWidth error={!!passwordError}>
              <TextField
                label="Create Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {passwordError && (
                <FormHelperText sx={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorIcon fontSize="small" sx={{ mr: 1 }} />
                  {passwordError}
                </FormHelperText>
              )}
              
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Password strength
                  </Typography>
                  <Typography variant="caption" fontWeight="medium">
                    {passwordStrength.label}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(passwordStrength.level / 4) * 100}
                  color={passwordStrength.color}
                  sx={{ height: 4, borderRadius: 2 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  8-24 characters, with at least 3 of: uppercase, lowercase, numbers, and special characters
                </Typography>
              </Box>
            </FormControl>

            <FormControl fullWidth error={!!confirmPasswordError}>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {confirmPasswordError && (
                <FormHelperText sx={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorIcon fontSize="small" sx={{ mr: 1 }} />
                  {confirmPasswordError}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              fullWidth
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : undefined}
            >
              {isSubmitting ? 'Activating Account...' : 'Activate Account'}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AccountActivation;