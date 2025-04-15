import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Tooltip,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PayrollDetails from "./PayrollDetails"; // Import PayrollDetails
import MFAScreen from "./MFAScreen";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  customRole?: string;
  role?: string;
}

const roleOptions = [
  { value: "executive_producer", label: "Executive Producer" },
  { value: "producer", label: "Producer" },
  { value: "general_manager", label: "General Manager" },
  { value: "company_manager", label: "Company Manager" },
  { value: "production_manager", label: "Production Manager" },
  { value: "payroll_admin", label: "Payroll Administrator" },
  { value: "accountant", label: "Accountant" },
  { value: "controller", label: "Controller" },
  { value: "custom", label: "Other (specify)" },
];

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

const AdminUserDetails: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [customRoleText, setCustomRoleText] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPayrollDetails, setShowPayrollDetails] = useState(false); // State for PayrollDetails

  const isCustomRole = formData.role === "custom";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, role: value }));

    if (value !== "custom") {
      setCustomRoleText("");
    }

    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }));
    }
  };

  const handleCustomRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomRoleText(e.target.value);

    if (errors.customRole) {
      setErrors((prev) => ({ ...prev, customRole: undefined }));
    }
  };

  const handleBack = () => {
    console.log("Going back to previous step");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.role === "custom" && !customRoleText.trim()) {
      newErrors.customRole = "Please specify a role";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = {
        ...formData,
        role: isCustomRole ? customRoleText : formData.role,
      };
      console.log("Proceeding to next step with data:", finalData);
      setShowPayrollDetails(true); // Show PayrollDetails
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      validateEmail(formData.email) &&
      (formData.role !== "custom" ||
        (formData.role === "custom" && customRoleText.trim())) &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <>
      {showPayrollDetails ? (
          <PayrollDetails /> 
      ) : (
        <Box
          maxWidth="600px"
          mx="auto"
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={3}
        >
          <Stack spacing={2} mb={4}>
            <Typography variant="h5" fontWeight="bold">
              Registration
            </Typography>
            <Typography color="text.secondary">
              Step 2 of 4: Admin User Details
            </Typography>
            <LinearProgress variant="determinate" value={50} />
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                required
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />

              <FormControl fullWidth error={Boolean(errors.email)}>
                <InputLabel htmlFor="email">
                  Email Address
                  <Tooltip
                    title="This email will be used for login and system notifications"
                    placement="top"
                    arrow
                  >
                    <Info size={16} style={{ marginLeft: 4, cursor: "help" }} />
                  </Tooltip>
                </InputLabel>
                <TextField
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  type="email"
                  placeholder="name@company.com"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  required
                />
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.role)}>
                <InputLabel id="role-label">Role / Title</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>-- Select Role --</em>
                  </MenuItem>
                  {roleOptions.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>

              {isCustomRole && (
                <TextField
                  label="Specify your role"
                  name="customRole"
                  value={customRoleText}
                  onChange={handleCustomRoleChange}
                  fullWidth
                  error={Boolean(errors.customRole)}
                  helperText={errors.customRole}
                />
              )}

              <Stack direction="row" justifyContent="space-between" mt={4}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ChevronLeft size={18} />}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid()}
                  endIcon={<ChevronRight size={18} />}
                  onClick={handleSubmit} // Call handleSubmit to control component visibility
                >
                  Next: MFA Screen
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      )}
    </>
  );
};

export default AdminUserDetails;
