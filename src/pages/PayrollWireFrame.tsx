import React, { useState } from 'react';
import { PlusCircle, Search, ChevronDown, ArrowRight } from 'lucide-react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

type PayeeStatus = 'Active' | 'Inactive' | 'On Leave';
type PayeeType = 'Full-time' | 'Part-time' | 'Contractor';

interface Reimbursement {
  id: string;
  description: string;
  amount: number;
}

interface Allowance {
  id: string;
  description: string;
  amount: number;
}

interface Increment {
  id: string;
  description: string;
  amount: number;
}

interface Payee {
  id: string;
  name: string;
  type: PayeeType;
  status: PayeeStatus;
  rate: string;
  reimbursements: Reimbursement[];
  allowances: Allowance[];
  increments: Increment[];
}

const StatusBadge = ({ status }: { status: PayeeStatus }) => {
  const theme = useTheme();
  
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return { bgcolor: theme.palette.success.light, color: theme.palette.success.dark };
      case 'On Leave':
        return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.dark };
      default:
        return { bgcolor: theme.palette.grey[300], color: theme.palette.grey[800] };
    }
  };

  const { bgcolor, color } = getStatusColor();

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: bgcolor,
        color: color,
        fontWeight: 'medium',
        px: 1,
        py: 0.5
      }}
    />
  );
};

const PayrollWireframe: React.FC = () => {
  const theme = useTheme();
  const [payees, setPayees] = useState<Payee[]>([
    {
      id: '1',
      name: 'John Smith',
      type: 'Full-time',
      status: 'Active',
      rate: 'Hourly - $25.00',
      reimbursements: [
        { id: '1', description: 'Travel Expenses', amount: 120.50 }
      ],
      allowances: [
        { id: '1', description: 'Meal Allowance', amount: 50.00 }
      ],
      increments: [
        { id: '1', description: 'Performance Bonus', amount: 200.00 }
      ]
    },
    {
      id: '2',
      name: 'Jane Doe',
      type: 'Part-time',
      status: 'Active',
      rate: 'Hourly - $22.50',
      reimbursements: [],
      allowances: [],
      increments: []
    },
    {
      id: '3',
      name: 'Alex Johnson',
      type: 'Contractor',
      status: 'Active',
      rate: 'Fixed - $2,500.00',
      reimbursements: [
        { id: '1', description: 'Office Supplies', amount: 75.25 }
      ],
      allowances: [],
      increments: []
    }
  ]);

  const [selectedPayees, setSelectedPayees] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const togglePayee = (id: string) => {
    if (selectedPayees.includes(id)) {
      setSelectedPayees(selectedPayees.filter(payeeId => payeeId !== id));
    } else {
      setSelectedPayees([...selectedPayees, id]);
    }
  };

  const toggleAllPayees = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPayees(payees.map(p => p.id));
    } else {
      setSelectedPayees([]);
    }
  };

  const calculateTotalPay = (payee: Payee) => {
    const baseRate = payee.type === 'Contractor' ? 2500 : 
                    (payee.type === 'Full-time' ? 25 * 40 * 2 : 22.5 * 20 * 2);
    
    const reimbursementsTotal = payee.reimbursements.reduce((sum, item) => sum + item.amount, 0);
    const allowancesTotal = payee.allowances.reduce((sum, item) => sum + item.amount, 0);
    const incrementsTotal = payee.increments.reduce((sum, item) => sum + item.amount, 0);
    
    return baseRate + reimbursementsTotal + allowancesTotal + incrementsTotal;
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };

  const handleTypeFilterChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value as string);
  };

  const filteredPayees = payees.filter(payee => {
    const statusMatch = statusFilter === 'all' || payee.status.toLowerCase().includes(statusFilter);
    const typeMatch = typeFilter === 'all' || payee.type.toLowerCase().includes(typeFilter);
    return statusMatch && typeMatch;
  });

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[50], minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.grey[200]}`, px: 6, py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Run Payroll
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>1</Typography>
                  <Typography variant="body2">Select Payees</Typography>
                </Box>
              }
              sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.dark }}
            />
            <Divider orientation="horizontal" flexItem sx={{ width: 32, mx: 2 }} />
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>2</Typography>
                  <Typography variant="body2">Review & Confirm</Typography>
                </Box>
              }
              sx={{ backgroundColor: theme.palette.grey[200], color: theme.palette.grey[600] }}
            />
            <Divider orientation="horizontal" flexItem sx={{ width: 32, mx: 2 }} />
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>3</Typography>
                  <Typography variant="body2">Process Payment</Typography>
                </Box>
              }
              sx={{ backgroundColor: theme.palette.grey[200], color: theme.palette.grey[600] }}
            />
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6, px: 6 }}>
        {/* Toolbar */}
        <Paper sx={{ mb: 6, p: 4, border: `1px solid ${theme.palette.grey[200]}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="medium">
              Select Payees
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search payees..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color={theme.palette.grey[500]} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 250 }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status"
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="on-leave">On Leave</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  label="Type"
                >
                  <MenuItem value="all">All types</MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contractor">Contractor</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        {/* Payee Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onChange={toggleAllPayees}
                    checked={selectedPayees.length === payees.length && payees.length > 0}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Reimbursements</TableCell>
                <TableCell>Allowances</TableCell>
                <TableCell>Increments</TableCell>
                <TableCell>Total Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayees.map((payee) => (
                <TableRow
                  key={payee.id}
                  hover
                  selected={selectedPayees.includes(payee.id)}
                  sx={{
                    backgroundColor: selectedPayees.includes(payee.id) ? theme.palette.primary.light : 'inherit'
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedPayees.includes(payee.id)}
                      onChange={() => togglePayee(payee.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.grey[300],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <Typography variant="body1" color={theme.palette.grey[600]}>
                          {payee.name.charAt(0)}
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {payee.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{payee.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={payee.status} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">{payee.rate}</Typography>
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <ChevronDown size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">
                        {payee.reimbursements.length > 0 
                          ? `${payee.reimbursements.length} item${payee.reimbursements.length > 1 ? 's' : ''}`
                          : "None"}
                      </Typography>
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <PlusCircle size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">
                        {payee.allowances.length > 0 
                          ? `${payee.allowances.length} item${payee.allowances.length > 1 ? 's' : ''}`
                          : "None"}
                      </Typography>
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <PlusCircle size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">
                        {payee.increments.length > 0 
                          ? `${payee.increments.length} item${payee.increments.length > 1 ? 's' : ''}`
                          : "None"}
                      </Typography>
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <PlusCircle size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      ${calculateTotalPay(payee).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            sx={{ mr: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={selectedPayees.length === 0}
            endIcon={<ArrowRight size={16} />}
          >
            Next Step
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PayrollWireframe;