import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Add as Plus,
  Delete as Trash2,
  Business as Building,
  Check as CheckIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Link,
  Step,
  StepLabel,
  Stepper,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Vendor {
  id: string;
  name: string;
  ein: string;
}

interface CodeClassOption {
  value: string;
  label: string;
}

interface OneOffPayment {
  id: number;
  vendorName: string;
  ein: string;
  paymentMethod: string;
  amount: number;
  description: string;
  codeClass: string;
  isNewVendor: boolean;
}

const VendorsOneOffPaymentsSimple: React.FC = () => {
  // Sample existing vendors
  const navigate = useNavigate();
  const existingVendors: Vendor[] = [
    { id: "v1", name: "Acme Production Services", ein: "12-3456789" },
    { id: "v2", name: "Broadway Lighting Co.", ein: "98-7654321" },
    { id: "v3", name: "Sound Solutions Inc.", ein: "45-6789123" },
  ];

  // Code/class options
  const codeClassOptions: CodeClassOption[] = [
    { value: "production", label: "Production" },
    { value: "tech", label: "Technical" },
    { value: "venue", label: "Venue" },
    { value: "admin", label: "Administrative" },
  ];

  // Sample one-off payments (normally would be empty, but pre-populated for demo)
  const [oneOffPayments, setOneOffPayments] = useState<OneOffPayment[]>([
    {
      id: 1,
      vendorName: "Theater Props Supply",
      ein: "78-9123456",
      paymentMethod: "check",
      amount: 750.0,
      description: "Set materials",
      codeClass: "production",
      isNewVendor: false,
    },
  ]);

  // State for forms
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("check");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [codeClass, setCodeClass] = useState<string>("");

  // Quick add vendor form
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [newVendorName, setNewVendorName] = useState<string>("");
  const [newVendorEIN, setNewVendorEIN] = useState<string>("");

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Add payment to existing vendor
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVendor || !amount || !description) return;

    const vendor = existingVendors.find((v) => v.id === selectedVendor);

    if (!vendor) return;

    const newPayment: OneOffPayment = {
      id: Date.now(),
      vendorName: vendor.name,
      ein: vendor.ein,
      paymentMethod,
      amount: parseFloat(amount),
      description,
      codeClass,
      isNewVendor: false,
    };

    setOneOffPayments([...oneOffPayments, newPayment]);

    // Reset form
    setSelectedVendor("");
    setAmount("");
    setDescription("");
    setCodeClass("");
  };

  // Quick add new vendor and payment
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newVendorName || !newVendorEIN || !amount || !description) return;

    const newPayment: OneOffPayment = {
      id: Date.now(),
      vendorName: newVendorName,
      ein: newVendorEIN,
      paymentMethod,
      amount: parseFloat(amount),
      description,
      codeClass,
      isNewVendor: true,
    };

    setOneOffPayments([...oneOffPayments, newPayment]);

    // Reset form
    setNewVendorName("");
    setNewVendorEIN("");
    setAmount("");
    setDescription("");
    setCodeClass("");
    setShowQuickAdd(false);
  };

  // Remove a payment
  const removePayment = (id: number) => {
    setOneOffPayments(oneOffPayments.filter((payment) => payment.id !== id));
  };

  // Calculate total amount
  const totalAmount = oneOffPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Greenroom Payroll
            </Typography>
            <Avatar sx={{ bgcolor: "primary.main" }}>JS</Avatar>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Link href="#" sx={{ display: "inline-flex", alignItems: "center" }}>
            <ChevronLeft sx={{ mr: 1 }} />
            Back to Select Payees
          </Link>
        </Box>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Run Payroll
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Step 2: Vendors & One-off Payments
          </Typography>
        </Box>

        {/* Step indicators */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Stepper activeStep={1} alternativeLabel sx={{ width: "100%" }}>
            <Step onClick={() => navigate("/src/pages/AdminUserDetails")}>
              <StepLabel
                icon={
                  <Badge
                    badgeContent={<CheckIcon sx={{ fontSize: "1rem" }} />}
                    color="primary"
                  >
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      1
                    </Avatar>
                  </Badge>
                }
              >
                Select Payees
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                icon={
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                  >
                    2
                  </Avatar>
                }
              >
                Vendors & One-offs
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                icon={
                  <Avatar
                    sx={{
                      bgcolor: "grey.300",
                      width: 32,
                      height: 32,
                      color: "grey.600",
                    }}
                  >
                    3
                  </Avatar>
                }
              >
                Review & Submit
              </StepLabel>
            </Step>
          </Stepper>
        </Box>

        <Paper elevation={2} sx={{ mb: 4 }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" fontWeight="medium">
              Vendors & One-off Payments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add vendor payments or one-time payments to include in this
              payroll run
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Add payment to existing vendor */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle2"
                fontWeight="medium"
                sx={{ mb: 2 }}
              >
                Add Payment to Existing Vendor
              </Typography>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
                <form onSubmit={handleAddPayment}>
                  <Stack spacing={3} sx={{ mb: 3 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <FormControl fullWidth>
                        <InputLabel id="vendorId-label">Vendor *</InputLabel>
                        <Select
                          labelId="vendorId-label"
                          id="vendorId"
                          value={selectedVendor}
                          onChange={(e: SelectChangeEvent) =>
                            setSelectedVendor(e.target.value)
                          }
                          label="Vendor *"
                          required
                        >
                          <MenuItem value="">-- Select Vendor --</MenuItem>
                          {existingVendors.map((vendor) => (
                            <MenuItem key={vendor.id} value={vendor.id}>
                              {vendor.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="paymentMethod-label">
                          Payment Method
                        </InputLabel>
                        <Select
                          labelId="paymentMethod-label"
                          id="paymentMethod"
                          value={paymentMethod}
                          onChange={(e: SelectChangeEvent) =>
                            setPaymentMethod(e.target.value)
                          }
                          label="Payment Method"
                        >
                          <MenuItem value="check">Check</MenuItem>
                          <MenuItem value="ach">ACH (Direct Deposit)</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Amount *"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        placeholder="0.00"
                        required
                      />
                    </Stack>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <TextField
                        fullWidth
                        label="Description *"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Lighting equipment rental"
                        required
                      />

                      <FormControl fullWidth>
                        <InputLabel id="codeClass-label">Code/Class</InputLabel>
                        <Select
                          labelId="codeClass-label"
                          id="codeClass"
                          value={codeClass}
                          onChange={(e: SelectChangeEvent) =>
                            setCodeClass(e.target.value)
                          }
                          label="Code/Class"
                        >
                          <MenuItem value="">-- Select Code/Class --</MenuItem>
                          {codeClassOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Stack>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Plus />}
                    >
                      Add Payment
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Box>

            {/* Quick add new vendor */}
            <Box sx={{ mb: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="subtitle2" fontWeight="medium">
                  Quick Add New Vendor
                </Typography>
                <Button
                  onClick={() => setShowQuickAdd(!showQuickAdd)}
                  size="small"
                >
                  {showQuickAdd ? "Hide Form" : "Show Form"}
                </Button>
              </Stack>

              {showQuickAdd && (
                <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
                  <form onSubmit={handleQuickAdd}>
                    <Stack spacing={3} sx={{ mb: 3 }}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <TextField
                          fullWidth
                          label="Vendor Name *"
                          value={newVendorName}
                          onChange={(e) => setNewVendorName(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Building />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Enter vendor name"
                          required
                        />

                        <TextField
                          fullWidth
                          label="EIN *"
                          value={newVendorEIN}
                          onChange={(e) => setNewVendorEIN(e.target.value)}
                          placeholder="XX-XXXXXXX"
                          required
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <TextField
                          fullWidth
                          label="Amount *"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          placeholder="0.00"
                          required
                        />

                        <FormControl fullWidth>
                          <InputLabel id="quickPaymentMethod-label">
                            Payment Method
                          </InputLabel>
                          <Select
                            labelId="quickPaymentMethod-label"
                            id="quickPaymentMethod"
                            value={paymentMethod}
                            onChange={(e: SelectChangeEvent) =>
                              setPaymentMethod(e.target.value)
                            }
                            label="Payment Method"
                          >
                            <MenuItem value="check">Check</MenuItem>
                            <MenuItem value="ach">
                              ACH (Direct Deposit)
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>

                      <TextField
                        fullWidth
                        label="Description *"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description of services"
                        required
                      />
                    </Stack>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        onClick={() => setShowQuickAdd(false)}
                        sx={{ mr: 2 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Plus />}
                      >
                        Add Vendor & Payment
                      </Button>
                    </Box>
                  </form>
                </Paper>
              )}
            </Box>

            {/* Payment list table */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="medium"
                sx={{ mb: 2 }}
              >
                One-Off Payments ({oneOffPayments.length})
              </Typography>

              {oneOffPayments.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead sx={{ bgcolor: "grey.50" }}>
                      <TableRow>
                        <TableCell>Vendor</TableCell>
                        <TableCell>EIN</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Method</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {oneOffPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Typography>{payment.vendorName}</Typography>
                              {payment.isNewVendor && (
                                <Chip
                                  label="New"
                                  size="small"
                                  color="success"
                                />
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>{payment.ein}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>
                            {payment.paymentMethod === "check"
                              ? "Check"
                              : "ACH"}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => removePayment(payment.id)}
                              color="error"
                            >
                              <Trash2 />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* Total row */}
                      <TableRow sx={{ bgcolor: "grey.50" }}>
                        <TableCell colSpan={4} align="right">
                          <Typography fontWeight="medium">Total:</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="medium">
                            {formatCurrency(totalAmount)}
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{ textAlign: "center", py: 4, bgcolor: "grey.50" }}
                >
                  <Typography color="text.secondary">
                    No one-off payments added yet. Use the forms above to add
                    payments.
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>

          {/* Navigation buttons */}
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button href="#" variant="outlined" startIcon={<ChevronLeft />}>
              Previous Step
            </Button>

            <Button href="#" variant="contained" endIcon={<ChevronRight />}>
              Next Step: Review & Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VendorsOneOffPaymentsSimple;
