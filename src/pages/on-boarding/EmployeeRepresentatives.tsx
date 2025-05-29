import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  FormControlLabel, 
  Checkbox,
  Grid
} from '@mui/material';
import { OnboardingFormData } from './types';

interface EmployeeRepresentativesProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
}

const EmployeeRepresentatives: React.FC<EmployeeRepresentativesProps> = ({ 
  formData, 
  onFormChange 
}) => {
  const [activeSubsection, setActiveSubsection] = useState<'agent' | 'manager'>('agent');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Employee Representatives
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button 
          variant={activeSubsection === 'agent' ? 'contained' : 'outlined'} 
          onClick={() => setActiveSubsection('agent')}
          sx={{ mr: 1 }}
        >
          Agent
        </Button>
        <Button 
          variant={activeSubsection === 'manager' ? 'contained' : 'outlined'} 
          onClick={() => setActiveSubsection('manager')}
        >
          Manager
        </Button>
      </Box>

      {activeSubsection === 'agent' && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="hasAgent"
                checked={formData.hasAgent || false}
                onChange={(e) => onFormChange({ 
                  hasAgent: e.target.checked,
                  agentAuthorization: e.target.checked ? formData.agentAuthorization : false
                })}
              />
            }
            label="This worker has an Agent"
          />

          {formData.hasAgent && (
            <>
              <TextField
                fullWidth
                label="Agent Email"
                name="agentEmail"
                type="email"
                value={formData.agentEmail || ''}
                onChange={handleChange}
                margin="normal"
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="agentAuthorization"
                    checked={formData.agentAuthorization || false}
                    onChange={(e) => onFormChange({ 
                      agentAuthorization: e.target.checked,
                      agentFeeRehearsal: e.target.checked ? 0 : formData.agentFeeRehearsal,
                      agentFeePerformance: e.target.checked ? 0 : formData.agentFeePerformance
                    })}
                  />
                }
                label="I confirm that this agent is authorized to use Greenroom upon worker's behalf"
              />

              {!formData.agentAuthorization && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Agent Fee (Rehearsal) %"
                      name="agentFeeRehearsal"
                      type="number"
                      value={formData.agentFeeRehearsal || 0}
                      onChange={(e) => onFormChange({ 
                        agentFeeRehearsal: Math.min(Number(e.target.value), 100)
                      })}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Agent Fee (Performance) %"
                      name="agentFeePerformance"
                      type="number"
                      value={formData.agentFeePerformance || 0}
                      onChange={(e) => onFormChange({ 
                        agentFeePerformance: Math.min(Number(e.target.value), 100)
                      })}
                      inputProps={{ min: 0, max: 100 }}
                    />
                  </Grid>
                </Grid>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  You can choose to onboard the agent now or invite them to complete their information.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Onboard Agent Manually
                  </Button>
                  <Button variant="outlined">
                    Invite Agent to Self-Onboard
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}

      {activeSubsection === 'manager' && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="hasManager"
                checked={formData.hasManager || false}
                onChange={(e) => onFormChange({ 
                  hasManager: e.target.checked,
                  managerAuthorization: e.target.checked ? formData.managerAuthorization : false
                })}
              />
            }
            label="This worker has a Manager"
          />

          {formData.hasManager && (
            <>
              <TextField
                fullWidth
                label="Manager Email"
                name="managerEmail"
                type="email"
                value={formData.managerEmail || ''}
                onChange={handleChange}
                margin="normal"
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="managerAuthorization"
                    checked={formData.managerAuthorization || false}
                    onChange={handleChange}
                  />
                }
                label="I confirm that this manager is authorized to use Greenroom upon worker's behalf"
              />

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manager Fee (Rehearsal) %"
                    name="managerFeeRehearsal"
                    type="number"
                    value={formData.managerFeeRehearsal || 0}
                    onChange={(e) => onFormChange({ 
                      managerFeeRehearsal: Math.min(Number(e.target.value), 100)
                    })}
                    inputProps={{ min: 0, max: 100 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Manager Fee (Performance) %"
                    name="managerFeePerformance"
                    type="number"
                    value={formData.managerFeePerformance || 0}
                    onChange={(e) => onFormChange({ 
                      managerFeePerformance: Math.min(Number(e.target.value), 100)
                    })}
                    inputProps={{ min: 0, max: 100 }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  You can choose to onboard the manager now or invite them to complete their information.
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Onboard Manager Manually
                  </Button>
                  <Button variant="outlined">
                    Invite Manager to Self-Onboard
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeRepresentatives;