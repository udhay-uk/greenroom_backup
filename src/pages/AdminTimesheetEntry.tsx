import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Switch,
  Stack,
  FormControl,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface Timesheet {
  id: number;
  employeeName: string;
  totalHours: number;
  overtime: number;
  reimbursements: number;
  reimbursementAttachment: string | null;
  allowances: string;
  approved: boolean;
}

const AdminTimesheetEntry: React.FC = () => {
  // Sample data for demonstration
  const [timesheets, setTimesheets] = useState<Timesheet[]>([
    {
      id: 1,
      employeeName: "John Doe",
      totalHours: 40.0,
      overtime: 2.5,
      reimbursements: 75.0,
      reimbursementAttachment: null,
      allowances: "Per Diem",
      approved: false
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      totalHours: 37.5,
      overtime: 0,
      reimbursements: 0,
      reimbursementAttachment: null,
      allowances: "Kit/Box",
      approved: true
    },
    {
      id: 3,
      employeeName: "Robert Johnson",
      totalHours: 42.25,
      overtime: 4.0,
      reimbursements: 125.75,
      reimbursementAttachment: "receipt.pdf",
      allowances: "Per Diem",
      approved: true
    }
  ]);

  // Allowance options
  const allowanceOptions = ["Kit/Box", "Per Diem", "Travel", "Meal", "Equipment", "Other"];

  // Handle hours input change with 15-minute rounding
  const handleHoursChange = (id: number, field: keyof Timesheet, value: string) => {
    const numValue = parseFloat(value) || 0;
    // Round to nearest 0.25 (15 minutes)
    const roundedValue = Math.round(numValue * 4) / 4;
    
    setTimesheets(timesheets.map(timesheet => 
      timesheet.id === id ? { ...timesheet, [field]: roundedValue } : timesheet
    ));
  };

  // Handle general input change
  const handleChange = (id: number, field: keyof Timesheet, value: string | number) => {
    setTimesheets(timesheets.map(timesheet => 
      timesheet.id === id ? { ...timesheet, [field]: value } : timesheet
    ));
  };

  // Handle file upload
  const handleFileUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setTimesheets(timesheets.map(timesheet => 
        timesheet.id === id ? { ...timesheet, reimbursementAttachment: fileName } : timesheet
      ));
    }
  };

  // Toggle approval status
  const toggleApproval = (id: number) => {
    setTimesheets(timesheets.map(timesheet => 
      timesheet.id === id ? { ...timesheet, approved: !timesheet.approved } : timesheet
    ));
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Admin Timesheet Entry
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell>Employee Name</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Overtime</TableCell>
              <TableCell>Reimbursements</TableCell>
              <TableCell>Allowances</TableCell>
              <TableCell>Approval Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheets.map((timesheet) => (
              <TableRow key={timesheet.id} hover>
                <TableCell>
                  <Typography fontWeight="medium">{timesheet.employeeName}</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    inputProps={{ 
                      step: "0.25",
                      min: "0",
                      style: { width: '80px' }
                    }}
                    value={timesheet.totalHours}
                    onChange={(e) => handleHoursChange(timesheet.id, 'totalHours', e.target.value)}
                  />
                  <Typography variant="caption" color="text.secondary" display="block">
                    Rounded to nearest 15 mins
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    inputProps={{ 
                      step: "0.25",
                      min: "0",
                      style: { width: '80px' }
                    }}
                    value={timesheet.overtime}
                    onChange={(e) => handleHoursChange(timesheet.id, 'overtime', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <TextField
                      type="number"
                      size="small"
                      inputProps={{ 
                        step: "0.01",
                        min: "0",
                        style: { width: '100px' }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      value={timesheet.reimbursements}
                      onChange={(e) => handleChange(timesheet.id, 'reimbursements', parseFloat(e.target.value) || 0)}
                    />
                    <Box>
                      <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        startIcon={<AttachFileIcon />}
                        sx={{ mr: 1 }}
                      >
                        {timesheet.reimbursementAttachment ? 'Change' : 'Attach'}
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleFileUpload(timesheet.id, e)}
                        />
                      </Button>
                      {timesheet.reimbursementAttachment && (
                        <Typography variant="body2" component="span" color="text.secondary">
                          {timesheet.reimbursementAttachment}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary" display="block">
                        Requires attachment
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={timesheet.allowances}
                      onChange={(e) => handleChange(timesheet.id, 'allowances', e.target.value as string)}
                    >
                      <MenuItem value="">None</MenuItem>
                      {allowanceOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Switch
                      checked={timesheet.approved}
                      onChange={() => toggleApproval(timesheet.id)}
                      color="success"
                    />
                    <Typography>
                      {timesheet.approved ? 'Approved' : 'Not approved'}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Stack direction="row" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="inherit">Add Timesheet</Button>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary">Save Changes</Button>
          <Button variant="contained" color="success">Approve All</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AdminTimesheetEntry;