// PayrollDetail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { grey, blue, green, orange } from "@mui/material/colors";
import { Edit, Save, Cancel } from "@mui/icons-material";

interface Payee {
  name: string;
  hours: number;
  rate: number;
  gross: number;
  deductions: number;
  net: number;
}

interface PayrollDetailData {
  id: string;
  status: "Submitted" | "Reopened" | "Draft";
  dateRange: string;
  payees: Payee[];
}

const PayrollDetail: React.FC = () => {
  const { payrollId } = useParams<{ payrollId: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editablePayees, setEditablePayees] = useState<Payee[]>([]);

  // Mock data - in a real app, this would come from an API
  const payrollData: PayrollDetailData = {
    id: payrollId || "PR-20250401",
    status: "Reopened",
    dateRange: "Apr 1–Apr 15, 2025",
    payees: [
      {
        name: "Jane Smith",
        hours: 80,
        rate: 50,
        gross: 4000,
        deductions: 200,
        net: 3800,
      },
      {
        name: "John Doe",
        hours: 75,
        rate: 60,
        gross: 4500,
        deductions: 300,
        net: 4200,
      },
    ],
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleEditClick = () => {
    setEditablePayees([...payrollData.payees]);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // In a real app, you would save the changes to the API here
    setIsEditing(false);
    // Update the payroll status if needed
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (
    index: number,
    field: keyof Payee,
    value: string | number
  ) => {
    const updatedPayees = [...editablePayees];
    updatedPayees[index] = {
      ...updatedPayees[index],
      [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
    };

    // Recalculate gross if hours or rate changed
    if (field === "hours" || field === "rate") {
      updatedPayees[index].gross =
        updatedPayees[index].hours * updatedPayees[index].rate;
      updatedPayees[index].net =
        updatedPayees[index].gross - updatedPayees[index].deductions;
    }

    // Recalculate net if deductions changed
    if (field === "deductions") {
      updatedPayees[index].net =
        updatedPayees[index].gross - updatedPayees[index].deductions;
    }

    setEditablePayees(updatedPayees);
  };

  const getStatusColor = () => {
    switch (payrollData.status) {
      case "Submitted":
        return green[500];
      case "Draft":
        return orange[500];
      case "Reopened":
        return blue[500];
      default:
        return grey[500];
    }
  };

  return (
    <Box sx={{ backgroundColor: grey[50], minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* <Box sx={{ mb: 3 }}>
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            sx={{ color: blue[600] }}
          >
            Back to Payroll History
          </Button>
        </Box> */}

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Payroll Detail
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage payroll details
          </Typography>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title="Payroll Information"
            titleTypographyProps={{ variant: "h6" }}
            sx={{ borderBottom: `1px solid ${grey[200]}` }}
            action={
              payrollData.status !== "Submitted" && (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                  color={isEditing ? "success" : "primary"}
                >
                  {isEditing ? "Save Changes" : "Edit Payroll"}
                </Button>
              )
            }
          />
          <CardContent>
            <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Payroll ID
                </Typography>
                <Typography variant="body1">{payrollData.id}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Date Range
                </Typography>
                <Typography variant="body1">{payrollData.dateRange}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: getStatusColor(), fontWeight: "bold" }}
                >
                  {payrollData.status}
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Payee Breakdown
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead sx={{ backgroundColor: grey[50] }}>
                  <TableRow>
                    <TableCell>Payee Name</TableCell>
                    <TableCell align="right">Hours</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="right">Gross</TableCell>
                    <TableCell align="right">Deductions</TableCell>
                    <TableCell align="right">Net</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(isEditing ? editablePayees : payrollData.payees).map(
                    (payee, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography fontWeight="medium">
                            {payee.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {isEditing ? (
                            <TextField
                              type="number"
                              value={payee.hours}
                              onChange={(e) =>
                                handleFieldChange(index, "hours", e.target.value)
                              }
                              size="small"
                              sx={{ width: 80 }}
                            />
                          ) : (
                            payee.hours
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {isEditing ? (
                            <TextField
                              type="number"
                              value={payee.rate}
                              onChange={(e) =>
                                handleFieldChange(index, "rate", e.target.value)
                              }
                              size="small"
                              sx={{ width: 80 }}
                            />
                          ) : (
                            formatCurrency(payee.rate)
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(payee.gross)}
                        </TableCell>
                        <TableCell align="right">
                          {isEditing ? (
                            <TextField
                              type="number"
                              value={payee.deductions}
                              onChange={(e) =>
                                handleFieldChange(
                                  index,
                                  "deductions",
                                  e.target.value
                                )
                              }
                              size="small"
                              sx={{ width: 80 }}
                            />
                          ) : (
                            formatCurrency(payee.deductions)
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(payee.net)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  <TableRow sx={{ backgroundColor: grey[50] }}>
                    <TableCell colSpan={3} align="right">
                      <Typography fontWeight="medium">Total:</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="medium">
                        {formatCurrency(
                          (isEditing ? editablePayees : payrollData.payees).reduce(
                            (sum, payee) => sum + payee.gross,
                            0
                          )
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="medium">
                        {formatCurrency(
                          (isEditing ? editablePayees : payrollData.payees).reduce(
                            (sum, payee) => sum + payee.deductions,
                            0
                          )
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="medium">
                        {formatCurrency(
                          (isEditing ? editablePayees : payrollData.payees).reduce(
                            (sum, payee) => sum + payee.net,
                            0
                          )
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {isEditing && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Save />}
                  onClick={handleSaveClick}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PayrollDetail;