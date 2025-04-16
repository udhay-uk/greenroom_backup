import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import { ChevronLeft, Check, Download } from "lucide-react";

interface Agreement {
  id: keyof Agreements;
  title: string;
  fileName: string;
}

interface Agreements {
  terms: boolean;
  privacy: boolean;
  dataProcessing: boolean;
  security: boolean;
}

const TermsReview: React.FC = () => {
  const [showActivation, setShowActivation] = useState(false);
  const registrationData = {
    company: {
      entityName: "Greenroom Productions LLC",
      entityType: "LLC",
      fein: "12-3456789",
      address: "123 Broadway, New York, NY 10001",
      phoneNumber: "(212)-555-7890",
      nysUnemploymentNumber: "1234567",
    },
    admin: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@greenroom.com",
      role: "Payroll Administrator",
    },
    payroll: {
      payFrequency: "Weekly",
      payPeriod: "In Arrears",
      payrollStartDate: "2025-04-15",
      startingCheckNumber: "1001",
    },
  };

  const agreements: Agreement[] = [
    {
      id: "terms",
      title: "Terms of Service",
      fileName: "greenroom-terms-of-service.pdf",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      fileName: "greenroom-privacy-policy.pdf",
    },
    {
      id: "dataProcessing",
      title: "Data Processing Agreement",
      fileName: "greenroom-dpa.pdf",
    },
    {
      id: "security",
      title: "Security Policy",
      fileName: "greenroom-security-policy.pdf",
    },
  ];

  const [acceptedAgreements, setAcceptedAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    dataProcessing: false,
    security: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAgreementChange = (id: keyof Agreements) => {
    setAcceptedAgreements((prev) => ({ ...prev, [id]: !prev[id] }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allAccepted = Object.values(acceptedAgreements).every((v) => v);

    if (!allAccepted) {
      setError("You must accept all agreements to continue");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      console.log("Submitted", {
        ...registrationData,
        agreements: acceptedAgreements,
      });
      setSubmitting(false);
      setShowActivation(true);
    }, 150);
  };

  const handleBack = () => console.log("Going back to previous step");
  const handleDownload = (fileName: string) =>
    console.log(`Downloading ${fileName}`);
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const allAgreementsAccepted =
    Object.values(acceptedAgreements).every(Boolean);

  return (
    <Box maxWidth="md" mx="auto" p={3} component={Paper} elevation={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Registration
      </Typography>
      <Typography color="text.secondary">
        Step 3 of 3: Review & Terms
      </Typography>
      <Box mt={2} height={8} bgcolor="grey.300" borderRadius={1}>
        <Box height={8} width="100%" bgcolor="primary.main" borderRadius={1} />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Registration Summary
        </Typography>

        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Company Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1} direction="row" flexWrap="wrap" gap={4}>
            {Object.entries(registrationData.company).map(([key, value]) => (
              <Box key={key} width={"45%"}>
                <Typography variant="caption" color="text.secondary">
                  {key}
                </Typography>
                <Typography>{value}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Administrator
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1} direction="row" flexWrap="wrap" gap={4}>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Name
              </Typography>
              <Typography>{`${registrationData.admin.firstName} ${registrationData.admin.lastName}`}</Typography>
            </Box>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography>{registrationData.admin.email}</Typography>
            </Box>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Role
              </Typography>
              <Typography>{registrationData.admin.role}</Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Payroll Settings
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1} direction="row" flexWrap="wrap" gap={4}>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Pay Frequency
              </Typography>
              <Typography>{registrationData.payroll.payFrequency}</Typography>
            </Box>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Pay Period
              </Typography>
              <Typography>{registrationData.payroll.payPeriod}</Typography>
            </Box>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Start Date
              </Typography>
              <Typography>
                {formatDate(registrationData.payroll.payrollStartDate)}
              </Typography>
            </Box>
            <Box width={"45%"}>
              <Typography variant="caption" color="text.secondary">
                Starting Check Number
              </Typography>
              <Typography>
                {registrationData.payroll.startingCheckNumber}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Box component="form" onSubmit={handleSubmit} mt={4}>
        <Typography variant="h6" gutterBottom>
          Terms & Agreements
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" mb={2}>
          Please review and accept the following agreements to complete your
          registration:
        </Typography>

        <Stack spacing={2}>
          {agreements.map((agreement) => (
            <Box
              key={agreement.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              border="1px solid"
              borderColor="grey.300"
              borderRadius={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedAgreements[agreement.id]}
                    onChange={() => handleAgreementChange(agreement.id)}
                  />
                }
                label={`I have read and agree to the ${agreement.title}`}
              />
              <Button
                onClick={() => handleDownload(agreement.fileName)}
                startIcon={<Download />}
              >
                Download
              </Button>
            </Box>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button
            variant="outlined"
            startIcon={<ChevronLeft />}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!allAgreementsAccepted || submitting}
            startIcon={
              submitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Check />
              )
            }
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TermsReview;
