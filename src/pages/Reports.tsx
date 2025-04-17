import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  ChevronRight,
  Description as FileTextIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface Report {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface DateRange {
  start: string;
  end: string;
}

const ReportsWireframe: React.FC = () => {
  const [activeReport, setActiveReport] = useState<string>('payroll');
  const [dateRange, setDateRange] = useState<DateRange>({ start: '2025-03-01', end: '2025-04-30' });
  const [selectedPayee, setSelectedPayee] = useState<string>('all');
  const [selectedUnion, setSelectedUnion] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedFormType, setSelectedFormType] = useState<string>('all');
  
  const reports: Report[] = [
    { id: 'payroll', name: 'Payroll Register', icon: <FileTextIcon fontSize="small" /> },
    { id: 'union', name: 'Union Reports', icon: <FileTextIcon fontSize="small" /> },
    { id: 'tax', name: 'Tax Filings', icon: <FileTextIcon fontSize="small" /> },
    { id: 'paystub', name: 'Pay Stubs', icon: <FileTextIcon fontSize="small" /> }
  ];
  
  const getFilterSection = () => {
    switch(activeReport) {
      case 'payroll':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Filters</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Date Range</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="body2">to</Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Payee</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedPayee}
                    onChange={(e) => setSelectedPayee(e.target.value as string)}
                  >
                    <MenuItem value="all">All Payees</MenuItem>
                    <MenuItem value="john">John Smith</MenuItem>
                    <MenuItem value="sarah">Sarah Johnson</MenuItem>
                    <MenuItem value="michael">Michael Lee</MenuItem>
                    <MenuItem value="emma">Emma Garcia</MenuItem>
                    <MenuItem value="david">David Wilson</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        );
      case 'union':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Filters</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Union Name</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedUnion}
                    onChange={(e) => setSelectedUnion(e.target.value as string)}
                  >
                    <MenuItem value="all">All Unions</MenuItem>
                    <MenuItem value="local123">Local 123</MenuItem>
                    <MenuItem value="uaw">UAW</MenuItem>
                    <MenuItem value="seiu">SEIU</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Date Range</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="body2">to</Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        );
      case 'tax':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Filters</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>State</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value as string)}
                  >
                    <MenuItem value="all">All States</MenuItem>
                    <MenuItem value="ca">California</MenuItem>
                    <MenuItem value="ny">New York</MenuItem>
                    <MenuItem value="tx">Texas</MenuItem>
                    <MenuItem value="fl">Florida</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Year</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value as string)}
                  >
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Form Type</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedFormType}
                    onChange={(e) => setSelectedFormType(e.target.value as string)}
                  >
                    <MenuItem value="all">All Forms</MenuItem>
                    <MenuItem value="940">Form 940</MenuItem>
                    <MenuItem value="941">Form 941</MenuItem>
                    <MenuItem value="w2">W-2</MenuItem>
                    <MenuItem value="1099">1099-MISC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        );
      case 'paystub':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Filters</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Payee</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedPayee}
                    onChange={(e) => setSelectedPayee(e.target.value as string)}
                  >
                    <MenuItem value="john">John Smith</MenuItem>
                    <MenuItem value="sarah">Sarah Johnson</MenuItem>
                    <MenuItem value="michael">Michael Lee</MenuItem>
                    <MenuItem value="emma">Emma Garcia</MenuItem>
                    <MenuItem value="david">David Wilson</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>Date Range</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="body2">to</Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </Box>
        );
      default:
        return null;
    }
  };
  
  const getColumnsPreview = () => {
    switch(activeReport) {
      case 'payroll':
        return (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payee</TableCell>
                  <TableCell align="right">Gross</TableCell>
                  <TableCell align="right">Reimbursements</TableCell>
                  <TableCell align="right">Deductions</TableCell>
                  <TableCell align="right">Net</TableCell>
                  <TableCell>Pay Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell align="right">$4,500.00</TableCell>
                  <TableCell align="right">$150.00</TableCell>
                  <TableCell align="right">$950.00</TableCell>
                  <TableCell align="right">$3,700.00</TableCell>
                  <TableCell>Apr 15, 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell align="right">$5,200.00</TableCell>
                  <TableCell align="right">$0.00</TableCell>
                  <TableCell align="right">$1,085.00</TableCell>
                  <TableCell align="right">$4,115.00</TableCell>
                  <TableCell>Apr 15, 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Michael Lee</TableCell>
                  <TableCell align="right">$3,800.00</TableCell>
                  <TableCell align="right">$75.00</TableCell>
                  <TableCell align="right">$760.00</TableCell>
                  <TableCell align="right">$3,115.00</TableCell>
                  <TableCell>Apr 15, 2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'union':
        return (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>SSN</TableCell>
                  <TableCell align="right">Salary</TableCell>
                  <TableCell align="right">Union Dues</TableCell>
                  <TableCell align="right">Health</TableCell>
                  <TableCell align="right">Pension</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell>***-**-1234</TableCell>
                  <TableCell align="right">$4,500.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$250.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>***-**-5678</TableCell>
                  <TableCell align="right">$5,200.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$300.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Michael Lee</TableCell>
                  <TableCell>***-**-9012</TableCell>
                  <TableCell align="right">$3,800.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                  <TableCell align="right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'tax':
        return (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Form Name</TableCell>
                  <TableCell>Filing Date</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Form 941</TableCell>
                  <TableCell>Apr 30, 2025</TableCell>
                  <TableCell>Q1 2025</TableCell>
                  <TableCell>
                    <Chip label="Filed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Form 940</TableCell>
                  <TableCell>Jan 31, 2025</TableCell>
                  <TableCell>2024 Annual</TableCell>
                  <TableCell>
                    <Chip label="Filed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CA DE-9</TableCell>
                  <TableCell>Apr 30, 2025</TableCell>
                  <TableCell>Q1 2025</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'paystub':
        return (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography fontWeight="medium">Pay Stub: John Smith</Typography>
              <Typography variant="body2" color="text.secondary">Pay Date: Apr 15, 2025</Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} mb={2}>
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography variant="caption" fontWeight="medium" display="block" gutterBottom>Pay Summary</Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Gross Pay:</Typography>
                    <Typography variant="body2">$4,500.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Total Deductions:</Typography>
                    <Typography variant="body2">$950.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight="medium">Net Pay:</Typography>
                    <Typography variant="body2" fontWeight="medium">$3,550.00</Typography>
                  </Stack>
                </Stack>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography variant="caption" fontWeight="medium" display="block" gutterBottom>Pay Rate</Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Rate:</Typography>
                    <Typography variant="body2">$56.25/hour</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Hours:</Typography>
                    <Typography variant="body2">80.0</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography variant="caption" fontWeight="medium" display="block" gutterBottom>Deductions</Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Federal Tax:</Typography>
                    <Typography variant="body2">$450.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Social Security:</Typography>
                    <Typography variant="body2">$279.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Medicare:</Typography>
                    <Typography variant="body2">$65.25</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Health Insurance:</Typography>
                    <Typography variant="body2">$155.75</Typography>
                  </Stack>
                </Stack>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography variant="caption" fontWeight="medium" display="block" gutterBottom>Taxes</Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD Gross:</Typography>
                    <Typography variant="body2">$31,500.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD Federal Tax:</Typography>
                    <Typography variant="body2">$3,150.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD FICA:</Typography>
                    <Typography variant="body2">$2,409.75</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
        );
      default:
        return null;
    }
  };
  
  return (
    <Box sx={{ maxWidth: 'xl', mx: 'auto', p: 3, bgcolor: 'grey.50' }}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>Reports</Typography>
        <Typography variant="body1" color="text.secondary">Generate and view company reports</Typography>
      </Box>
      
      <Stack direction="row" spacing={3}>
        {/* Report Types Navigation */}
        <Paper sx={{ width: 220, p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Report Type</Typography>
          <List dense>
            {reports.map(report => (
              <ListItem key={report.id} disablePadding>
                <ListItemButton
                  selected={activeReport === report.id}
                  onClick={() => setActiveReport(report.id)}
                  sx={{
                    borderRadius: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: 'primary.light',
                      color:'white'
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {report.icon}
                  </ListItemIcon>
                  <ListItemText primary={report.name} />
                  {activeReport === report.id && <ChevronRight fontSize="small" />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
        
        <Box flex={1}>
          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            {getFilterSection()}
          </Paper>
          
          {/* Column Preview */}
          <Paper>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2">Columns Preview</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small">
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <FilterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DownloadIcon fontSize="small" />}
                  >
                    Download
                  </Button>
                </Stack>
              </Stack>
            </Box>
            
            <Box sx={{ overflowX: 'auto' }}>
              {getColumnsPreview()}
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReportsWireframe;