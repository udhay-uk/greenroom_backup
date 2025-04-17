import React, { useState } from 'react';
import { 
  Warning as AlertTriangle, 
  Check as CheckIcon, 
  ExpandMore, 
  KeyboardArrowUp, 
  Info as InfoIcon 
} from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Chip,
  Collapse,
  IconButton,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Types
interface Payee {
  id: number;
  name: string;
  status: 'approved' | 'pending';
  amount: number;
  deductions: number;
  unionDues: number;
  employerTaxes: number;
}

interface PayrollData {
  payPeriod: string;
  payDate: string;
  totalAmount: number;
  payees: Payee[];
}

interface Totals {
  totalPay: number;
  totalDeductions: number;
  totalUnionDues: number;
  totalEmployerTaxes: number;
}

interface ExpandedSections {
  payees: boolean;
  deductions: boolean;
  unionContributions: boolean;
  employerTaxes: boolean;
}

// Mock data for the wireframe
const mockPayrollData: PayrollData = {
  payPeriod: "April 1 - April 15, 2025",
  payDate: "April 20, 2025",
  totalAmount: 28750.00,
  payees: [
    { id: 1, name: "John Smith", status: "approved", amount: 4500.00, deductions: 950.00, unionDues: 125.00, employerTaxes: 344.25 },
    { id: 2, name: "Sarah Johnson", status: "approved", amount: 5200.00, deductions: 1085.00, unionDues: 125.00, employerTaxes: 397.80 },
    { id: 3, name: "Michael Lee", status: "approved", amount: 3800.00, deductions: 760.00, unionDues: 125.00, employerTaxes: 290.70 },
    { id: 4, name: "Emma Garcia", status: "pending", amount: 4100.00, deductions: 830.00, unionDues: 125.00, employerTaxes: 313.65 },
    { id: 5, name: "David Wilson", status: "approved", amount: 5900.00, deductions: 1250.00, unionDues: 125.00, employerTaxes: 451.35 },
    { id: 6, name: "Lisa Brown", status: "approved", amount: 5250.00, deductions: 1100.00, unionDues: 125.00, employerTaxes: 401.63 }
  ]
};

// Calculate totals
const calculateTotals = (data: PayrollData): Totals => {
  return {
    totalPay: data.payees.reduce((sum, p) => sum + p.amount, 0),
    totalDeductions: data.payees.reduce((sum, p) => sum + p.deductions, 0),
    totalUnionDues: data.payees.reduce((sum, p) => sum + p.unionDues, 0),
    totalEmployerTaxes: data.payees.reduce((sum, p) => sum + p.employerTaxes, 0)
  };
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const PayrollFlowSummary: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    payees: true,
    deductions: true,
    unionContributions: true,
    employerTaxes: true
  });
  
  const [payrollData] = useState<PayrollData>(mockPayrollData);
  const totals = calculateTotals(payrollData);
  const navigate = useNavigate();
  
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const allApproved = payrollData.payees.every(payee => payee.status === "approved");
  
  return (
    <Box sx={{ maxWidth: 'xl', mx: 'auto', p: 3, bgcolor: 'grey.50', borderRadius: 2, boxShadow: 1 }}>
      <Box component="header" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Run Payroll
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="body1" color="text.secondary">
              Pay Period: <Typography component="span" fontWeight="medium">{payrollData.payPeriod}</Typography>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Pay Date: <Typography component="span" fontWeight="medium">{payrollData.payDate}</Typography>
            </Typography>
          </Stack>
          <Stack alignItems="flex-end">
            <Typography variant="body1" color="text.secondary">Total Amount</Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(payrollData.totalAmount)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      
      {/* Payroll Summary */}
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Payroll Summary
        </Typography>
        
        {/* Payees Section */}
        <Paper variant="outlined" sx={{ mb: 2 }}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2} 
            sx={{ 
              bgcolor: 'grey.100', 
              borderTopLeftRadius: 4, 
              borderTopRightRadius: 4,
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('payees')}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontWeight="medium">Payees</Typography>
              {!allApproved && <AlertTriangle color="warning" fontSize="small" />}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight="medium">
                {formatCurrency(totals.totalPay)}
              </Typography>
              <IconButton size="small">
                {expandedSections.payees ? <KeyboardArrowUp /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Stack>
          
          <Collapse in={expandedSections.payees}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollData.payees.map(payee => (
                    <TableRow key={payee.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TableCell>{payee.name}</TableCell>
                      <TableCell>
                        {payee.status === "approved" ? (
                          <Chip 
                            size="small"
                            icon={<CheckIcon fontSize="small" />}
                            label="Approved"
                            color="success"
                            sx={{ '& .MuiChip-icon': { fontSize: 14 } }}
                          />
                        ) : (
                          <Chip 
                            size="small"
                            icon={<AlertTriangle fontSize="small" />}
                            label="Pending"
                            color="warning"
                            sx={{ '& .MuiChip-icon': { fontSize: 14 } }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(payee.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Paper>
        
        {/* Deductions Section */}
        <Paper variant="outlined" sx={{ mb: 2 }}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2} 
            sx={{ 
              bgcolor: 'grey.100', 
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('deductions')}
          >
            <Typography fontWeight="medium">Deductions</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight="medium">
                {formatCurrency(totals.totalDeductions)}
              </Typography>
              <IconButton size="small">
                {expandedSections.deductions ? <KeyboardArrowUp /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Stack>
          
          <Collapse in={expandedSections.deductions}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Employee</TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollData.payees.map(payee => (
                    <TableRow key={payee.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TableCell>{payee.name}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(payee.deductions)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Paper>
        
        {/* Union Contributions Section */}
        <Paper variant="outlined" sx={{ mb: 2 }}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2} 
            sx={{ 
              bgcolor: 'grey.100', 
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('unionContributions')}
          >
            <Typography fontWeight="medium">Union Contributions</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight="medium">
                {formatCurrency(totals.totalUnionDues)}
              </Typography>
              <IconButton size="small">
                {expandedSections.unionContributions ? <KeyboardArrowUp /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Stack>
          
          <Collapse in={expandedSections.unionContributions}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Employee</TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollData.payees.map(payee => (
                    <TableRow key={payee.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TableCell>{payee.name}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(payee.unionDues)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Paper>
        
        {/* Employer Taxes Section */}
        <Paper variant="outlined">
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            p={2} 
            sx={{ 
              bgcolor: 'grey.100', 
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('employerTaxes')}
          >
            <Typography fontWeight="medium">Employer Taxes</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight="medium">
                {formatCurrency(totals.totalEmployerTaxes)}
              </Typography>
              <IconButton size="small">
                {expandedSections.employerTaxes ? <KeyboardArrowUp /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Stack>
          
          <Collapse in={expandedSections.employerTaxes}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TableCell sx={{ color: 'text.secondary' }}>Employee</TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollData.payees.map(payee => (
                    <TableRow key={payee.id} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TableCell>{payee.name}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(payee.employerTaxes)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Paper>
      </Paper>
      
      {/* Status message */}
      {!allApproved && (
        <Alert 
          severity="warning" 
          icon={<InfoIcon />}
          sx={{ mb: 3 }}
        >
          <Typography fontWeight="medium">Some employees are not fully onboarded</Typography>
          <Typography variant="body2">
            All employees must be fully onboarded and approved before submitting payroll.
          </Typography>
        </Alert>
      )}
      
      {/* Action buttons */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined">
          Save Draft
        </Button>
        <Button 
          variant="contained"
          disabled={allApproved}
          onClick={()=>navigate('/history')}
        >
          Submit Payroll
        </Button>
      </Stack>
    </Box>
  );
};

export default PayrollFlowSummary;