import React, { useState } from "react";
import { AlertCircle, ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Tooltip,
  LinearProgress,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PayrollDetails from "./PayrollDetails";

interface FormData {
  entityName: string;
  entityType: string;
  fein: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  nysUnemploymentNumber: string;
}

interface EntityType {
  value: string;
  label: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "900px",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const CompanyInformation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    entityName: "",
    entityType: "",
    fein: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "NY",
    zipCode: "",
    phoneNumber: "",
    nysUnemploymentNumber: "",
  });
  const [showAddUserDetails, setShowAddUserDetails] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const entityTypes: EntityType[] = [
    { value: "corp", label: "Corporation" },
    { value: "partnership", label: "Partnership" },
    { value: "soleProprietor", label: "Sole Proprietor" },
    { value: "nonProfit", label: "Non Profit" },
    { value: "llc", label: "LLC" },
  ];

  const validateFEIN = (fein: string): boolean => {
    if (!fein) return true;
    const pattern = /^\d{2}-\d{7}$/;
    return pattern.test(fein);
  };

  const validateZipCode = (zipCode: string): boolean => {
    if (!zipCode) return true;
    const pattern = /^\d{5}$/;
    return pattern.test(zipCode);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber) return true;
    const pattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
    return pattern.test(phoneNumber);
  };

  const validateNYSNumber = (number: string): boolean => {
    if (!number) return true;
    const pattern = /^\d{7}$/;
    return pattern.test(number);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === "phoneNumber") {
      formatPhoneNumber(value);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 3) {
      setFormData({ ...formData, phoneNumber: digits });
    } else if (digits.length <= 6) {
      setFormData({
        ...formData,
        phoneNumber: `(${digits.slice(0, 3)})-${digits.slice(3)}`,
      });
    } else {
      setFormData({
        ...formData,
        phoneNumber: `(${digits.slice(0, 3)})-${digits.slice(
          3,
          6
        )}-${digits.slice(6, 10)}`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    const newErrors: Partial<FormData> = {};

    if (!formData.entityName.trim()) {
      newErrors.entityName = "Entity name is required";
    }

    if (!formData.entityType) {
      newErrors.entityType = "Please select an entity type";
    }

    if (formData.fein && !validateFEIN(formData.fein)) {
      newErrors.fein = "FEIN must be in 99-9999999 format";
    }

    if (formData.zipCode && !validateZipCode(formData.zipCode)) {
      newErrors.zipCode = "ZIP code must be 5 digits";
    }

    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be in (999)-999-9999 format";
    }

    if (
      formData.nysUnemploymentNumber &&
      !validateNYSNumber(formData.nysUnemploymentNumber)
    ) {
      newErrors.nysUnemploymentNumber =
        "NYS Unemployment Number must be 7 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowAddUserDetails(true);
    }
  };

  const isFormValid = (): boolean => {
    return (
      !!formData.entityName &&
      !!formData.entityType &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <>
      {showAddUserDetails ? (
        <PayrollDetails />
      ) : (
        <StyledPaper>
          <Box sx={{ mb: 3 }}>
            <Button
              href="/dashboard"
              startIcon={<ChevronLeft size={20} />}
              sx={{ textTransform: "none" }}
            >
              Back to Dashboard
            </Button>
          </Box>
          <Box mb={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Registration
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Step 1 of 3: Company Information
            </Typography>
            <LinearProgress
              variant="determinate"
              value={25}
              sx={{ height: 8, borderRadius: 4, mt: 2 }}
            />
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Entity Name Field */}
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.entityName}
              >
                <TextField
                  label={
                    <>
                      Entity Name <span style={{ color: "red" }}>*</span>
                    </>
                  }
                  id="entityName"
                  name="entityName"
                  value={formData.entityName}
                  onChange={handleInputChange}
                  error={!!errors.entityName}
                  helperText={errors.entityName}
                  placeholder="Legal business name"
                  fullWidth
                />
              </FormControl>

              {/* Entity Type Field */}
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.entityType}
              >
                <InputLabel id="entityType-label">
                  Entity Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="entityType-label"
                  id="entityType"
                  name="entityType"
                  value={formData.entityType}
                  onChange={handleInputChange as any}
                  label="Entity Type"
                  error={!!errors.entityType}
                >
                  <MenuItem value="">-- Select Entity Type --</MenuItem>
                  {entityTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.entityType && (
                  <FormHelperText error>
                    <Box component="span" display="flex" alignItems="center">
                      <AlertCircle size={16} style={{ marginRight: 4 }} />
                      {errors.entityType}
                    </Box>
                  </FormHelperText>
                )}
              </FormControl>

              {/* FEIN Field */}
              <FormControl fullWidth margin="normal" error={!!errors.fein}>
                <TextField
                  label={
                    <>
                      FEIN
                      <Tooltip
                        title="Federal Employer Identification Number. Format: 99-9999999"
                        placement="top"
                        arrow
                      >
                        <Info
                          size={14}
                          style={{ marginLeft: 8, verticalAlign: "middle" }}
                        />
                      </Tooltip>
                    </>
                  }
                  id="fein"
                  name="fein"
                  value={formData.fein}
                  onChange={handleInputChange}
                  error={!!errors.fein}
                  helperText={
                    errors.fein ? (
                      <Box component="span" display="flex" alignItems="center">
                        <AlertCircle size={16} style={{ marginRight: 4 }} />
                        {errors.fein}
                      </Box>
                    ) : (
                      "Optional for now. Must be unique."
                    )
                  }
                  placeholder="XX-XXXXXXX"
                  fullWidth
                />
              </FormControl>

              {/* Address Fields */}
              <Stack spacing={2}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Address Line 1"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    fullWidth
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Address Line 2"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apt, suite, etc. (optional)"
                    fullWidth
                  />
                </FormControl>

                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="City"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      fullWidth
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      label="State"
                      id="state"
                      name="state"
                      value="NY"
                      disabled
                      fullWidth
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.zipCode}
                  >
                    <TextField
                      label="Zip Code"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={!!errors.zipCode}
                      helperText={errors.zipCode}
                      inputProps={{ maxLength: 5 }}
                      placeholder="5-digit zip"
                      fullWidth
                    />
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                  >
                    <TextField
                      label="Phone Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      placeholder="(XXX)-XXX-XXXX"
                      fullWidth
                    />
                  </FormControl>
                </Stack>
              </Stack>

              {/* NYS Unemployment Number Field */}
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.nysUnemploymentNumber}
              >
                <TextField
                  label={
                    <>
                      NYS Unemployment Number
                      <Tooltip
                        title="New York State Unemployment Insurance Employer Registration Number (7 digits)"
                        placement="top"
                        arrow
                      >
                        <Info
                          size={14}
                          style={{ marginLeft: 8, verticalAlign: "middle" }}
                        />
                      </Tooltip>
                    </>
                  }
                  id="nysUnemploymentNumber"
                  name="nysUnemploymentNumber"
                  value={formData.nysUnemploymentNumber}
                  onChange={handleInputChange}
                  error={!!errors.nysUnemploymentNumber}
                  helperText={
                    errors.nysUnemploymentNumber ? (
                      <Box component="span" display="flex" alignItems="center">
                        <AlertCircle size={16} style={{ marginRight: 4 }} />
                        {errors.nysUnemploymentNumber}
                      </Box>
                    ) : (
                      "Optional"
                    )
                  }
                  inputProps={{ maxLength: 7 }}
                  placeholder="7-digit number"
                  fullWidth
                />
              </FormControl>
            </Stack>

            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid()}
                endIcon={<ChevronRight size={20} />}
                sx={{ px: 3, py: 1.5 }}
              >
                Next: Payroll Details
              </Button>
            </Box>
          </form>
        </StyledPaper>
      )}
    </>
  );
};

export default CompanyInformation;
