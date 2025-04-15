import React, { useState } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Box,
  LinearProgress,
} from "@mui/material";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import TermsReview from './TermsReview'; // Import TermsReview component

interface FormData {
  payFrequency: string;
  payPeriod: string;
  payrollStartDate: string;
  startingCheckNumber: string;
}

interface FormErrors {
  payrollStartDate?: string | null;
  startingCheckNumber?: string | null;
}

const PayrollDetails: React.FC = () => {
  const [showTermsReview, setShowTermsReview] = useState(false); // State for TermsReview

  const today = new Date();

  const getNextValidDate = (): string => {
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 3);

    while ([0, 5, 6].includes(minDate.getDay())) {
      minDate.setDate(minDate.getDate() + 1);
    }

    return minDate.toISOString().split("T")[0];
  };

  const nextValidDate = getNextValidDate();

  const [formData, setFormData] = useState<FormData>({
    payFrequency: "weekly",
    payPeriod: "arrears",
    payrollStartDate: nextValidDate,
    startingCheckNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validatePayrollStartDate = (dateStr: string): boolean => {
    const selectedDate = new Date(dateStr);
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 3);

    if (selectedDate < minDate) {
      setErrors((prev) => ({
        ...prev,
        payrollStartDate: "Date must be at least 3 days from today",
      }));
      return false;
    }

    const day = selectedDate.getDay();
    if ([0, 5, 6].includes(day)) {
      setErrors((prev) => ({
        ...prev,
        payrollStartDate: "Date must be Monday through Thursday",
      }));
      return false;
    }

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    if (name === "payrollStartDate") {
      validatePayrollStartDate(value);
    }

    if (name === "startingCheckNumber" && value) {
      const numberValue = parseInt(value, 10);
      if (
        isNaN(numberValue) ||
        numberValue <= 0 ||
        !Number.isInteger(numberValue)
      ) {
        setErrors((prev) => ({
          ...prev,
          startingCheckNumber: "Must be a positive whole number",
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!validatePayrollStartDate(formData.payrollStartDate)) {
      newErrors.payrollStartDate =
        errors.payrollStartDate || "Invalid payroll start date";
    }

    if (formData.startingCheckNumber) {
      const numberValue = parseInt(formData.startingCheckNumber, 10);
      if (
        isNaN(numberValue) ||
        numberValue <= 0 ||
        !Number.isInteger(numberValue)
      ) {
        newErrors.startingCheckNumber = "Must be a positive whole number";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setShowTermsReview(true); // Show TermsReview component
    }
  };

  const handleBack = () => {
    console.log("Go back");
    // Go back step
  };

  const isFormValid = () => Object.keys(errors).length === 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {showTermsReview ? (
        <TermsReview  /> // Render TermsReview component
      ) : (
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Registration
              </Typography>
              <Typography color="text.secondary">
                Step 2 of 3: Payroll Details
              </Typography>
              <Box mt={2}>
                <LinearProgress variant="determinate" value={75} />
              </Box>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  select
                  label={
                    <Box display="flex" alignItems="center">
                      Pay Frequency
                      <Tooltip
                        title="How often payments are made to employees"
                        arrow
                      >
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <Info size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  name="payFrequency"
                  value={formData.payFrequency}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="biweekly">Bi-weekly</MenuItem>
                </TextField>

                <TextField
                  select
                  label={
                    <Box display="flex" alignItems="center">
                      Pay Period
                      <Tooltip
                        title="In Arrears: Pay for work already completed. Same Week: Pay for current week's work."
                        arrow
                      >
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <Info size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  name="payPeriod"
                  value={formData.payPeriod}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value="arrears">In Arrears</MenuItem>
                  <MenuItem value="sameWeek">Same Week</MenuItem>
                </TextField>

                <TextField
                  type="date"
                  label={
                    <Box display="flex" alignItems="center">
                      Payroll Start Date
                      <Tooltip
                        title="Must be at least 3 days from today and Monday-Thursday only"
                        arrow
                      >
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <Info size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  name="payrollStartDate"
                  value={formData.payrollStartDate}
                  onChange={handleInputChange}
                  error={!!errors.payrollStartDate}
                  helperText={
                    errors.payrollStartDate ||
                    `Selected date: ${formatDate(formData.payrollStartDate)}`
                  }
                  inputProps={{ min: nextValidDate }}
                  fullWidth
                />

                <TextField
                  label={
                    <Box display="flex" alignItems="center">
                      Starting Check Number
                      <Tooltip
                        title="Optional. If left blank, system will auto-assign check numbers."
                        arrow
                      >
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <Info size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  type="number"
                  name="startingCheckNumber"
                  value={formData.startingCheckNumber}
                  onChange={handleInputChange}
                  error={!!errors.startingCheckNumber}
                  helperText={
                    errors.startingCheckNumber || "Must be a positive number"
                  }
                  inputProps={{ min: 1, step: 1 }}
                  fullWidth
                />

                <Stack direction="row" justifyContent="space-between" mt={3}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ChevronLeft size={16} />}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    endIcon={<ChevronRight size={16} />}
                    disabled={!isFormValid()}
                    onClick={handleSubmit} // Call handleSubmit to control component visibility
                  >
                    Next: Terms Review
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default PayrollDetails;