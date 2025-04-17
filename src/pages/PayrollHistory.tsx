// PayrollHistory.tsx
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

interface PayrollHistoryItem {
  id: string;
  dateRange: string;
  totalPayees: number;
  totalGross: number;
  status: "Submitted" | "Reopened" | "Draft";
}

const PayrollHistory: React.FC = () => {
  // Mock data
  const payrollHistory: PayrollHistoryItem[] = [
    {
      id: "PR-20250401",
      dateRange: "Apr 1–Apr 15, 2025",
      totalPayees: 12,
      totalGross: 62400,
      status: "Submitted",
    },
    {
      id: "PR-20250416",
      dateRange: "Apr 16–Apr 30, 2025",
      totalPayees: 14,
      totalGross: 70100,
      status: "Draft",
    },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "success.main";
      case "Draft":
        return "warning.main";
      case "Reopened":
        return "info.main";
      default:
        return "text.secondary";
    }
  };

  return (
    <Box sx={{ backgroundColor: grey[50], minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payroll History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View past payroll runs and their details
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ backgroundColor: grey[50] }}>
                  <TableRow>
                    <TableCell>Payroll ID</TableCell>
                    <TableCell>Date Range</TableCell>
                    <TableCell align="right">Payees</TableCell>
                    <TableCell align="right">Total Gross</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollHistory.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell>
                        <Typography fontWeight="medium">
                          {payroll.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{payroll.dateRange}</TableCell>
                      <TableCell align="right">{payroll.totalPayees}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(payroll.totalGross)}
                      </TableCell>
                      <TableCell>
                        <Typography color={getStatusColor(payroll.status)}>
                          {payroll.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          component={Link}
                          to={`/payrolldetails`}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PayrollHistory;