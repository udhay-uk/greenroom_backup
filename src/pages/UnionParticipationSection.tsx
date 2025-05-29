import React from 'react';
import { Box, Typography, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { OnboardingFormData } from './on-boarding/types';

interface UnionParticipationSectionProps {
  formData: OnboardingFormData;
  onFormChange: (data: Partial<OnboardingFormData>) => void;
}

const UnionParticipationSection: React.FC<UnionParticipationSectionProps> = ({ formData, onFormChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // For MVP, only Actor's Equity Association is available
  const unions = ['Actor\'s Equity Association'];
  const aeaJobTitles = [
    'Actor',
    'Production Stage Manager (Musical)',
    'Production Stage Manager (Dramatic)',
    '1st Assistant Stage Manager (Musical)',
    '1st Assistant Stage Manager (Dramatic)',
    '2nd Assistant Stage Manager (Musical)'
  ];
  const genericJobTitles = [
    'Director',
    'Designer',
    'Technician',
    'Crew',
    'Administrative'
  ];

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Union Participation
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            name="isUnionMember"
            checked={formData.isUnionMember || false}
            onChange={handleChange}
          />
        }
        label="Union member"
      />

      {formData.isUnionMember && (
        <>
          <TextField
            fullWidth
            select
            label="Union"
            name="union"
            value={formData.union || ''}
            onChange={handleChange}
            margin="normal"
            required
          >
            {unions.map(union => (
              <MenuItem key={union} value={union}>{union}</MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle || ''}
            onChange={handleChange}
            margin="normal"
            required
          >
            {aeaJobTitles.map(title => (
              <MenuItem key={title} value={title}>{title}</MenuItem>
            ))}
          </TextField>

          {!['Production Stage Manager (Musical)', 'Production Stage Manager (Dramatic)'].includes(formData.jobTitle || '') && (
            <TextField
              fullWidth
              label="Role Name"
              name="roleName"
              value={formData.roleName || ''}
              onChange={handleChange}
              margin="normal"
            />
          )}

          <TextField
            fullWidth
            select
            label="Department"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Performance">Performance</MenuItem>
            <MenuItem value="Stage Management">Stage Management</MenuItem>
            <MenuItem value="Production">Production</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Administration">Administration</MenuItem>
          </TextField>
        </>
      )}

      {!formData.isUnionMember && (
        <TextField
          fullWidth
          select
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle || ''}
          onChange={handleChange}
          margin="normal"
          required
        >
          {genericJobTitles.map(title => (
            <MenuItem key={title} value={title}>{title}</MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
};

export default UnionParticipationSection;