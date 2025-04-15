import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Divider,
  Paper,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const PayeeOnboardingSystem: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        Payee Onboarding System
      </Typography>

      {/* Manual Entry Flow (Admin) */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
          Manual Entry Flow (Admin)
        </Typography>

        {/* Payee Type Dropdown */}
        <Stack spacing={1} mb={4}>
          <FormLabel>Payee Type</FormLabel>
          <FormControl fullWidth sx={{ maxWidth: 400 }}>
            <Select defaultValue="Employee" size="small">
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Loanout">Loanout</MenuItem>
              <MenuItem value="Vendor">Vendor/Contractor</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" color="text.secondary">
            Employee, Loanout, Vendor/Contractor
          </Typography>
        </Stack>

        {/* General Info Section */}
        <Stack spacing={2} mb={4}>
          <FormLabel>General Info</FormLabel>

          {/* Tabs */}
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button variant="contained" color="inherit" size="small">
              Basic
            </Button>
            <Button size="small">Contact</Button>
            <Button size="small">Tax</Button>
            <Button size="small">Employment</Button>
          </Stack>

          {/* Basic Tab Content */}
          <Stack spacing={2} direction={{ xs: "column", md: "row" }} mt={2}>
            <TextField label="First Name" fullWidth size="small" />
            <TextField label="Last Name" fullWidth size="small" />
          </Stack>
          <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
            <TextField label="Email" fullWidth size="small" />
            <TextField label="Phone" fullWidth size="small" />
          </Stack>
        </Stack>

        {/* Documents Required */}
        <Stack spacing={1} mb={4}>
          <FormLabel>Documents Required</FormLabel>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="W-4 (Employee Tax Withholding)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="I-9 (Employment Eligibility)"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="W-9 (for Contractors/Vendors)"
            />
            <Typography variant="caption" color="text.secondary" mt={1}>
              Based on payee type
            </Typography>
          </Paper>
        </Stack>

        {/* Payment Details */}
        <Stack spacing={2} mb={4}>
          <FormLabel>Payment Details</FormLabel>

          <FormControl>
            <RadioGroup defaultValue="direct">
              <FormControlLabel
                value="direct"
                control={<Radio />}
                label="Direct Deposit"
              />
              <Stack spacing={2} pl={4} pt={1}>
                <TextField
                  label="Routing Number"
                  size="small"
                  sx={{ maxWidth: 400 }}
                />
                <TextField
                  label="Account Number"
                  size="small"
                  sx={{ maxWidth: 400 }}
                />
              </Stack>

              <FormControlLabel
                value="check"
                control={<Radio />}
                label="Check by Mail"
              />
              <Box pl={4}>
                <TextField
                  label="Mailing Address"
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Stack>

        {/* Agent/Manager Section */}
        <Stack mb={4}>
          <Button startIcon={<ExpandMore />} variant="text">
            Agent/Manager Information (Optional)
          </Button>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined">Save & Continue Later</Button>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" color="primary">
              Save & Continue
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Self-Onboarding (Invitation) */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
          Self-Onboarding (Invitation)
        </Typography>

        <Stack spacing={3}>
          <TextField label="Email Address" fullWidth size="small" />
          <Typography variant="caption" color="text.secondary">
            Required
          </Typography>

          <TextField
            label="Custom Message"
            multiline
            rows={4}
            fullWidth
            placeholder="Enter a custom message to include in the invitation email..."
          />
          <Typography variant="caption" color="text.secondary">
            For subject/body of invitation email
          </Typography>

          {/* Document Checklist */}
          <Stack spacing={1}>
            <FormLabel>Required Documents Checklist</FormLabel>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1} direction="row" flexWrap="wrap" gap={2}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="W-4 (Tax Withholding)"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="I-9 (Employment Eligibility)"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="W-9 (Contractors/Vendors)"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Anti-Harassment Policy"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Direct Deposit Form"
                />
                <FormControlLabel control={<Checkbox />} label="NDA" />
              </Stack>
            </Paper>
          </Stack>

          {/* Invite Button */}
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" color="success">
              Send Invitation
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" align="center">
            Sends secure email with onboarding link
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PayeeOnboardingSystem;
