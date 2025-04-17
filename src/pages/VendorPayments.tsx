import { useState } from "react";
import {
  PlusCircle,
  Search,
  ArrowRight,
  ArrowLeft,
  X,
  AlertCircle,
} from "lucide-react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import SelectPayees from "./SelectPayees";
import PayrollFlowSummary from "./ParrollFlowSummary";
import RunPayrollSimple from "./PayrollSummaryCard";

type PaymentMethod = "ACH" | "Check";

interface Vendor {
  id: string;
  name: string;
  ein: string;
  paymentMethod: PaymentMethod;
  accountInfo?: string;
  paymentAmount: number;
  description: string;
  codeClass: string;
}

export default function VendorPaymentsWireframe() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "ABC Office Supplies",
      ein: "12-3456789",
      paymentMethod: "ACH",
      accountInfo: "****4567",
      paymentAmount: 1250.0,
      description: "Monthly office supplies",
      codeClass: "EXPENSE-5001",
    },
    {
      id: "2",
      name: "XYZ Consulting",
      ein: "98-7654321",
      paymentMethod: "Check",
      paymentAmount: 3500.0,
      description: "IT consulting services",
      codeClass: "PROF-SERV-6010",
    },
  ]);

  const [showNewVendorForm, setShowNewVendorForm] = useState(false);
  const [newVendor, setNewVendor] = useState<Partial<Vendor>>({
    name: "",
    ein: "",
    paymentMethod: "ACH",
    paymentAmount: 0,
    description: "",
    codeClass: "",
  });
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleAddVendor = () => {
    if (
      !newVendor.name ||
      !newVendor.ein ||
      (newVendor.paymentAmount ?? 0) <= 0
    ) {
      return;
    }

    const vendorToAdd: Vendor = {
      id: `${vendors.length + 1}`,
      name: newVendor.name || "",
      ein: newVendor.ein || "",
      paymentMethod: newVendor.paymentMethod || "ACH",
      accountInfo:
        newVendor.paymentMethod === "ACH"
          ? "****" + accountNumber.slice(-4)
          : undefined,
      paymentAmount: newVendor.paymentAmount || 0,
      description: newVendor.description || "",
      codeClass: newVendor.codeClass || "EXPENSE-5000",
    };

    setVendors([...vendors, vendorToAdd]);
    setShowNewVendorForm(false);
    setNewVendor({
      name: "",
      ein: "",
      paymentMethod: "ACH",
      paymentAmount: 0,
      description: "",
      codeClass: "",
    });
    setRoutingNumber("");
    setAccountNumber("");
  };

  const handleRemoveVendor = (id: string) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  const NewVendorForm = () => (
    <Box
      component="div"
      sx={{
        bgcolor: "white",
        boxShadow: 1,
        borderRadius: 1,
        p: 3,
        mt: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h3">
          Add New Vendor
        </Typography>
        <IconButton
          onClick={() => setShowNewVendorForm(false)}
          aria-label="close"
        >
          <X size={18} />
        </IconButton>
      </Box>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Vendor Name *"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
          placeholder="Enter vendor name"
        />
        <TextField
          fullWidth
          label="EIN/Tax ID *"
          value={newVendor.ein}
          onChange={(e) => setNewVendor({ ...newVendor, ein: e.target.value })}
          placeholder="XX-XXXXXXX"
        />
      </Stack>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          select
          label="Payment Method *"
          value={newVendor.paymentMethod}
          onChange={(e) =>
            setNewVendor({
              ...newVendor,
              paymentMethod: e.target.value as PaymentMethod,
            })
          }
        >
          <MenuItem value="ACH">ACH (Direct Deposit)</MenuItem>
          <MenuItem value="Check">Check</MenuItem>
        </TextField>
        {newVendor.paymentMethod === "ACH" && (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Bank Account Info *
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                label="Routing #"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
              />
              <TextField
                fullWidth
                label="Account #"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Stack>
            <Typography variant="caption" color="text.secondary" mt={0.5}>
              This information will be stored securely
            </Typography>
          </Box>
        )}
      </Stack>

      <TextField
        fullWidth
        label="Payment Amount *"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={newVendor.paymentAmount || ""}
        onChange={(e) =>
          setNewVendor({
            ...newVendor,
            paymentAmount: parseFloat(e.target.value),
          })
        }
        placeholder="0.00"
        inputProps={{ step: "0.01", min: "0" }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        value={newVendor.description}
        onChange={(e) =>
          setNewVendor({ ...newVendor, description: e.target.value })
        }
        placeholder="Enter payment description"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        select
        label="Expense Code/Class"
        value={newVendor.codeClass}
        onChange={(e) =>
          setNewVendor({ ...newVendor, codeClass: e.target.value })
        }
      >
        <MenuItem value="">Select an expense code</MenuItem>
        <MenuItem value="EXPENSE-5000">EXPENSE-5000: General Expenses</MenuItem>
        <MenuItem value="EXPENSE-5001">EXPENSE-5001: Office Supplies</MenuItem>
        <MenuItem value="PROF-SERV-6010">
          PROF-SERV-6010: Professional Services
        </MenuItem>
        <MenuItem value="UTIL-5500">UTIL-5500: Utilities</MenuItem>
        <MenuItem value="RENT-5600">RENT-5600: Rent/Lease Payments</MenuItem>
      </TextField>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setShowNewVendorForm(false)} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddVendor}>
          Add Vendor
        </Button>
      </Box>
    </Box>
  );

  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepLabels = [
    "Pay Period",
    "Select Payees",
    "Vendors & One-off Payments",
    "Review & Process",
  ];

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh", py: 3 }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
          px: 3,
          py: 2,
        }}
      >
        <Box maxWidth="xl" sx={{ mx: "auto" }}>
          <Typography variant="h5" component="h1" color="primary">
            Run Payroll
          </Typography>
          <Tabs value={activeStep - 1} aria-label="payroll steps">
            {stepLabels.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Main Content */}
      <Box maxWidth="xl" sx={{ mx: "auto", py: 3, px: 3 }}>
        {/* Tab Content */}
        {activeStep === 1 && <RunPayrollSimple />}
        {activeStep === 2 && <SelectPayees />}
        {activeStep === 3 && (
          <>
            {/* Toolbar */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                boxShadow: 1,
                mb: 2,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Add Vendor Payments
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} color="#757575" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search vendors..."
                />
                <Button
                  variant="contained"
                  startIcon={<PlusCircle size={16} />}
                  onClick={() => setShowNewVendorForm(true)}
                >
                  Add Vendor
                </Button>
              </Stack>
            </Box>

            {/* New Vendor Form (conditionally rendered) */}
            {showNewVendorForm && <NewVendorForm />}

            {/* Vendor Payments Table */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              {vendors.length > 0 ? (
                <TableContainer>
                  <Table aria-label="vendor payments table">
                    <TableHead sx={{ bgcolor: "#f7f7f7" }}>
                      <TableRow>
                        <TableCell>Vendor Name</TableCell>
                        <TableCell>EIN</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Code/Class</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell component="th" scope="row">
                            <Typography fontWeight="medium">
                              {vendor.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{vendor.ein}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center">
                              <Typography>{vendor.paymentMethod}</Typography>
                              {vendor.accountInfo && (
                                <Typography color="text.secondary" ml={0.5}>
                                  ({vendor.accountInfo})
                                </Typography>
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="medium">
                              ${vendor.paymentAmount.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>{vendor.description}</TableCell>
                          <TableCell color="text.secondary">
                            {vendor.codeClass}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              color="primary"
                              sx={{ mr: 1 }}
                              onClick={() => {
                                alert(`Edit vendor ${vendor.name}`);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleRemoveVendor(vendor.id)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ py: 8, textAlign: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <AlertCircle size={48} color="#9e9e9e" />
                  </Box>
                  <Typography variant="h6" mt={2} color="text.secondary">
                    No vendor payments added
                  </Typography>
                  <Typography mt={1} color="text.secondary">
                    Get started by adding a vendor payment
                  </Typography>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      startIcon={<PlusCircle size={16} />}
                      onClick={() => setShowNewVendorForm(true)}
                    >
                      Add Vendor
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
        {activeStep === 4 && <PayrollFlowSummary />}

        {/* Action Buttons */}
        <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<ArrowLeft size={16} />}
            disabled={activeStep === 1}
            onClick={handleBack}
          >
            Previous Step
          </Button>
          <Stack direction="row" spacing={2}>
            <Button>Cancel</Button>
            <Button
              variant="contained"
              endIcon={<ArrowRight size={16} />}
              onClick={handleNext}
              disabled={activeStep === 4}
            >
              Next Step
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}