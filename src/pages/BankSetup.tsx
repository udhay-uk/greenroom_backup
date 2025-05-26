import React, { useState } from "react";
import {
  Save,
  Info,
  ErrorOutline, // Replacing AlertCircle with ErrorOutline
  CreditCard,
  Visibility,
  VisibilityOff,
  Check,
  ChevronLeft,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  SelectChangeEvent,
  Link,
} from "@mui/material";

interface FormData {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  confirmAccountNumber: string;
  accountType: string;
  authorization: boolean;
}

interface FormErrors {
  bankName?: string;
  routingNumber?: string;
  accountNumber?: string;
  confirmAccountNumber?: string;
  accountType?: string;
  authorization?: string;
}

const BankSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountType: "",
    authorization: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showConfirmAccountNumber, setShowConfirmAccountNumber] =
    useState(false);

  // Bank name suggestions (would come from API in a real app)
  const suggestedBanks = [
    "Chase Bank",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
    "TD Bank",
    "Capital One",
    "PNC Bank",
    "U.S. Bank",
  ];

  const [bankSuggestions, setBankSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const accountTypes = [
    { value: "checking", label: "Checking Account" },
    { value: "savings", label: "Savings Account" },
  ];

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });

    // Clear specific error when field is edited
    if (errors[name as keyof FormErrors]) {
      const newErrors = { ...errors };
      delete newErrors[name as keyof FormErrors];
      setErrors(newErrors);
    }

    // Filter bank suggestions when typing bank name
    if (name === "bankName" && value) {
      const filtered = suggestedBanks.filter((bank) =>
        bank.toLowerCase().includes(value.toLowerCase())
      );
      setBankSuggestions(filtered);
      setShowSuggestions(true);
    } else if (name === "bankName" && !value) {
      setShowSuggestions(false);
    }
  };

  const handleBankSelection = (bank: string) => {
    setFormData({ ...formData, bankName: bank });
    setShowSuggestions(false);
  };

  const validateRoutingNumber = (routingNumber: string) => {
    // Basic validation for 9-digit routing number
    return /^\d{9}$/.test(routingNumber);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.routingNumber) {
      newErrors.routingNumber = "Routing number is required";
    } else if (!validateRoutingNumber(formData.routingNumber)) {
      newErrors.routingNumber = "Routing number must be 9 digits";
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Account type is required";
    }

    if (!formData.authorization) {
      newErrors.authorization = "You must authorize credit/debit transactions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      // Simulate API call
      setTimeout(() => {
        setSaveSuccess(true);
        setIsSaving(false);

        // Reset success message after a delay
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);

        console.log("Form submitted with data:", formData);
      }, 1500);
    }
  };

  // Auto format routing number as user types
  const formatRoutingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setFormData({ ...formData, routingNumber: value });
  };

  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Paper elevation={1} sx={{ mb: 2 }}>
        <Box
          sx={{
            maxWidth: "7xl",
            mx: "auto",
            px: { xs: 2, sm: 3, lg: 4 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Greenroom Payroll
          </Typography>
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              JS
            </Avatar>
          </Stack>
        </Box>
      </Paper>

      <Box
        sx={{
          maxWidth: "3xl",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
          py: 4,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Button
            variant="text"
            startIcon={<ChevronLeft fontSize="small" />}
            sx={{ display: "inline-flex", alignItems: "center", pl: 0 }}
            onClick={() => window.history.back()}
          >
            Back to Dashboard
          </Button>
        </Box>

        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.100", color: "primary.main" }}>
                <CreditCard />
              </Avatar>
            }
            title="Bank Account Setup"
            subheader="Connect your bank account for payments"
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
          />

          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Alert severity="info" icon={<Info />}>
                  All payment information is encrypted and securely stored. We
                  use bank-level security measures to protect your financial
                  data.
                </Alert>

                {/* Bank Name with autocomplete */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="bankName" shrink>
                    Bank Name{" "}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </InputLabel>
                  <Box position="relative">
                    <TextField
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.value,
                            type: "select-one",
                          },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                      error={!!errors.bankName}
                      fullWidth
                      placeholder="Enter bank name"
                    />
                    {errors.bankName && (
                      <FormHelperText
                        error
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                        {errors.bankName}
                      </FormHelperText>
                    )}

                    {/* Bank suggestions dropdown */}
                    {showSuggestions && bankSuggestions.length > 0 && (
                      <Paper
                        elevation={3}
                        sx={{
                          position: "absolute",
                          zIndex: 10,
                          width: "100%",
                          mt: 0.5,
                          maxHeight: 240,
                          overflow: "auto",
                        }}
                      >
                        <List dense>
                          {bankSuggestions.map((bank, index) => (
                            <ListItem key={index} disablePadding>
                              <ListItemButton
                                onClick={() => handleBankSelection(bank)}
                              >
                                <Typography variant="body2">{bank}</Typography>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )}
                  </Box>
                </FormControl>

                {/* Routing Number */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="routingNumber" shrink>
                    Routing Number{" "}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="routingNumber"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={formatRoutingNumber}
                    error={!!errors.routingNumber}
                    fullWidth
                    placeholder="9-digit routing number"
                    inputProps={{ maxLength: 9 }}
                  />
                  {errors.routingNumber && (
                    <FormHelperText
                      error
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                      {errors.routingNumber}
                    </FormHelperText>
                  )}
                  <FormHelperText>
                    The 9-digit routing number is usually found at the bottom
                    left of your check
                  </FormHelperText>
                </FormControl>

                {/* Account Number */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="accountNumber" shrink>
                    Account Number{" "}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </InputLabel>
                  <TextField
                    type={showAccountNumber ? "text" : "password"}
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleInputChange(e as SelectChangeEvent<string>)
                    }
                    error={!!errors.accountNumber}
                    fullWidth
                    placeholder="Enter account number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowAccountNumber(!showAccountNumber)
                            }
                            edge="end"
                          >
                            {showAccountNumber ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.accountNumber && (
                    <FormHelperText
                      error
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                      {errors.accountNumber}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Confirm Account Number */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="confirmAccountNumber" shrink>
                    Confirm Account Number{" "}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </InputLabel>
                  <TextField
                    type={showConfirmAccountNumber ? "text" : "password"}
                    id="confirmAccountNumber"
                    name="confirmAccountNumber"
                    value={formData.confirmAccountNumber}
                    onChange={handleInputChange}
                    error={!!errors.confirmAccountNumber}
                    fullWidth
                    placeholder="Confirm account number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmAccountNumber(
                                !showConfirmAccountNumber
                              )
                            }
                            edge="end"
                          >
                            {showConfirmAccountNumber ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirmAccountNumber && (
                    <FormHelperText
                      error
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                      {errors.confirmAccountNumber}
                    </FormHelperText>
                  )}
                  <FormHelperText>
                    Copy and paste is disabled for security
                  </FormHelperText>
                </FormControl>

                {/* Account Type */}
                <FormControl fullWidth error={!!errors.accountType}>
                  <InputLabel id="accountType-label">
                    Account Type{" "}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </InputLabel>
                  <Select
                    labelId="accountType-label"
                    id="accountType"
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    label="Account Type"
                  >
                    <MenuItem value="">
                      <em>-- Select Account Type --</em>
                    </MenuItem>
                    {accountTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.accountType && (
                    <FormHelperText
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                      {errors.accountType}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Authorization Checkbox */}
                <FormControl error={!!errors.authorization}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="authorization"
                        name="authorization"
                        checked={formData.authorization}
                        onChange={handleInputChange}
                        color="primary"
                      />
                    }
                    label={
                      <>
                        <Typography component="span">
                          Credit/Debit Authorization{" "}
                          <Typography component="span" color="error">
                            *
                          </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          I authorize Greenroom Payroll to initiate credit and
                          debit entries to the bank account specified above for
                          the purpose of payroll transactions.
                        </Typography>
                      </>
                    }
                  />
                  {errors.authorization && (
                    <FormHelperText
                      sx={{ display: "flex", alignItems: "center", ml: 0 }}
                    >
                      <ErrorOutline fontSize="small" sx={{ mr: 0.5 }} />
                      {errors.authorization}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Success Message */}
                {saveSuccess && (
                  <Alert severity="success" icon={<Check />}>
                    Bank account information saved successfully
                  </Alert>
                )}

                {/* Form Actions */}
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}
                >
                  <Button variant="outlined" color="inherit">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    variant="contained"
                    color="primary"
                    startIcon={
                      isSaving ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Save />
                      )
                    }
                  >
                    {isSaving ? "Saving..." : "Save Bank Information"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BankSetup;
