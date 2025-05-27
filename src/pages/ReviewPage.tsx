import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export type CompanyInformation = {
  entity_name: string;
  entity_type: string;
  fein: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  nys_unemployment_registration_number: string;
};

export type CompanyAdministrator = {
  first_name: string;
  last_name: string;
  email_address: string;
  role_title: string;
};

export type PayrollDetails = {
  pay_frequency: "weekly" | "bi-weekly";
  pay_period: "same week" | "in arrears";
  payroll_start_date: string;
  check_number: number;
};

export type CompanyData = {
  company_information: CompanyInformation;
  company_administrator: CompanyAdministrator;
  payroll_details: PayrollDetails;
};

const mockData: CompanyData[] = [
  {
    company_information: {
      entity_name: "TechNova Inc.",
      entity_type: "Corp",
      fein: "12-3456789",
      address_line_1: "500 Market St",
      address_line_2: "Suite 400",
      city: "San Francisco",
      state: "CA",
      zip_code: "94103",
      phone_number: "(415)-555-1234",
      nys_unemployment_registration_number: "1234567",
    },
    company_administrator: {
      first_name: "Alice",
      last_name: "Johnson",
      email_address: "alice.johnson@technova.com",
      role_title: "HR Manager",
    },
    payroll_details: {
      pay_frequency: "bi-weekly",
      pay_period: "in arrears",
      payroll_start_date: "2025-06-02",
      check_number: 1001,
    },
  },
  {
    company_information: {
      entity_name: "BrightPath LLC",
      entity_type: "Single-member LLC",
      fein: "98-7654321",
      address_line_1: "800 Sunset Blvd",
      address_line_2: "",
      city: "Los Angeles",
      state: "CA",
      zip_code: "90028",
      phone_number: "(213)-555-5678",
      nys_unemployment_registration_number: "2345678",
    },
    company_administrator: {
      first_name: "Brian",
      last_name: "Lee",
      email_address: "brian.lee@brightpath.com",
      role_title: "Payroll Director",
    },
    payroll_details: {
      pay_frequency: "weekly",
      pay_period: "same week",
      payroll_start_date: "2025-06-03",
      check_number: 1002,
    },
  },
  {
    company_information: {
      entity_name: "GreenHarvest Co.",
      entity_type: "Partnership",
      fein: "23-9876543",
      address_line_1: "123 Farm Rd",
      address_line_2: "Building B",
      city: "Albany",
      state: "NY",
      zip_code: "12207",
      phone_number: "(518)-555-7890",
      nys_unemployment_registration_number: "3456789",
    },
    company_administrator: {
      first_name: "Samantha",
      last_name: "Wright",
      email_address: "sam.wright@greenharvest.com",
      role_title: "Finance Lead",
    },
    payroll_details: {
      pay_frequency: "weekly",
      pay_period: "in arrears",
      payroll_start_date: "2025-06-04",
      check_number: 1003,
    },
  },
  {
    company_information: {
      entity_name: "UrbanEdge Designs",
      entity_type: "Sole Proprietor",
      fein: "44-5566778",
      address_line_1: "99 Design Ln",
      address_line_2: "Floor 5",
      city: "Brooklyn",
      state: "NY",
      zip_code: "11201",
      phone_number: "(718)-555-2345",
      nys_unemployment_registration_number: "4567890",
    },
    company_administrator: {
      first_name: "Lena",
      last_name: "Martinez",
      email_address: "lena.m@urbanedge.com",
      role_title: "Owner",
    },
    payroll_details: {
      pay_frequency: "bi-weekly",
      pay_period: "same week",
      payroll_start_date: "2025-06-05",
      check_number: 1004,
    },
  },
  {
    company_information: {
      entity_name: "QuantumLeap Tech",
      entity_type: "Corp",
      fein: "11-2233445",
      address_line_1: "101 Innovation Way",
      address_line_2: "",
      city: "Austin",
      state: "TX",
      zip_code: "73301",
      phone_number: "(512)-555-8765",
      nys_unemployment_registration_number: "5678901",
    },
    company_administrator: {
      first_name: "Daniel",
      last_name: "Nguyen",
      email_address: "dan.nguyen@quantumleap.com",
      role_title: "Tech Lead",
    },
    payroll_details: {
      pay_frequency: "weekly",
      pay_period: "in arrears",
      payroll_start_date: "2025-06-06",
      check_number: 1005,
    },
  },
];
const ReviewPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyData[]>(mockData);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAccordionChange =
    (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedIndex(isExpanded ? index : false);
    };

  const handleApprove = (index: number) => {
    setExpandedIndex(false);
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        Company Review
      </Typography>
      {companies.map((company, index) => (
        <Accordion
          key={index}
          expanded={expandedIndex === index}
          onChange={handleAccordionChange(index)}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" fontWeight="bold">
              {company.company_information.entity_name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={3}>
              {[
                {
                  title: "Company Information",
                  rows: [
                    ["Type", company.company_information.entity_type],
                    ["FEIN", company.company_information.fein],
                    [
                      "Address Line 1",
                      company.company_information.address_line_1,
                    ],
                    [
                      "Address Line 2",
                      company.company_information.address_line_2 || "-",
                    ],
                    ["City", company.company_information.city],
                    ["State", company.company_information.state],
                    ["ZIP", company.company_information.zip_code],
                    ["Phone", company.company_information.phone_number],
                    [
                      "NYS Unemployment",
                      company.company_information
                        .nys_unemployment_registration_number,
                    ],
                  ],
                },
                {
                  title: "Administrator",
                  rows: [
                    ["First Name", company.company_administrator.first_name],
                    ["Last name", company.company_administrator.last_name],
                    ["Email", company.company_administrator.email_address],
                    ["Role", company.company_administrator.role_title],
                  ],
                },
                {
                  title: "Payroll Details",
                  rows: [
                    ["Frequency", company.payroll_details.pay_frequency],
                    ["Pay Period", company.payroll_details.pay_period],
                    ["Start Date", company.payroll_details.payroll_start_date],
                    ["Check Number", company.payroll_details.check_number],
                  ],
                },
              ].map((section, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box
                    sx={{
                      p: 3,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                      boxShadow: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      textAlign="center"
                      sx={{ borderBottom: "1px solid #ccc", pb: 1, mb: 2 }}
                    >
                      {section.title}
                    </Typography>
                    <Grid container spacing={1}>
                      {section.rows.map(([label, value], idx) => (
                        <React.Fragment key={idx}>
                          <Grid item xs={5}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="text.secondary"
                            >
                              {label}:
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="body2">{value}</Typography>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Box textAlign="center" mt={4}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(index)}
                    sx={{
                      minWidth: 140,
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      boxShadow: 2,
                      "&:hover": {
                        backgroundColor: "success.dark",
                      },
                    }}
                  >
                    Approve
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Approved Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReviewPage;
