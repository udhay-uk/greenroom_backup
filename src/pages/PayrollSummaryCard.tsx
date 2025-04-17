import React, { useState } from "react";
import {
  ChevronLeft,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  DollarSign,
  Check,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  stepConnectorClasses,
} from "@mui/material";
import { green, blue, yellow, grey, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

interface PayPeriod {
  id: string;
  label: string;
}

interface Payee {
  id: number;
  name: string;
  type: string;
  status: "ready" | "incomplete";
  payrollAmount: number;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : grey[300],
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: blue[500],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: green[500],
    },
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : grey[200],
  zIndex: 1,
  color: grey[500],
  width: 32,
  height: 32,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: blue[500],
    color: "#fff",
  }),
  ...(ownerState.completed && {
    backgroundColor: blue[500],
    color: "#fff",
  }),
}));

function ColorlibStepIcon(props: {
  active?: boolean;
  completed?: boolean;
  icon: React.ReactNode;
}) {
  const { active, completed, icon } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? (
        <CheckCircle fontSize="small" />
      ) : (
        <Typography variant="caption">{String(icon)}</Typography>
      )}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Select Payees", "Review & Submit"];

const RunPayrollSimple: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [payPeriod, setPayPeriod] = useState<string>("");
  const [selectedPayees, setSelectedPayees] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Sample payroll periods
  const payPeriods: PayPeriod[] = [
    { id: "pp-2025-04-07", label: "Apr 7 - Apr 13, 2025" },
    { id: "pp-2025-04-14", label: "Apr 14 - Apr 20, 2025" },
    { id: "pp-2025-04-21", label: "Apr 21 - Apr 27, 2025" },
  ];

  // Sample payees with their statuses
  const payees: Payee[] = [
    {
      id: 1,
      name: "Jane Smith",
      type: "Employee",
      status: "ready",
      payrollAmount: 1250.0,
    },
    {
      id: 2,
      name: "John Doe",
      type: "Employee",
      status: "ready",
      payrollAmount: 1800.0,
    },
    {
      id: 3,
      name: "Acme Production Services",
      type: "Vendor",
      status: "ready",
      payrollAmount: 2500.0,
    },
    {
      id: 4,
      name: "Alice Johnson",
      type: "Employee",
      status: "incomplete",
      payrollAmount: 0,
    },
    {
      id: 5,
      name: "Bob Williams Productions, LLC",
      type: "Loanout",
      status: "ready",
      payrollAmount: 3200.0,
    },
  ];

  // Format currency helper
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handlePayPeriodChange = (e: SelectChangeEvent<string>) => {
    setPayPeriod(e.target.value);
    setSelectedPayees([]);
  };

  const togglePayeeSelection = (payeeId: number) => {
    if (selectedPayees.includes(payeeId)) {
      setSelectedPayees(selectedPayees.filter((id) => id !== payeeId));
    } else {
      setSelectedPayees([...selectedPayees, payeeId]);
    }
  };

  const selectAllPayees = () => {
    const readyPayees = payees
      .filter((payee) => payee.status === "ready")
      .map((payee) => payee.id);

    setSelectedPayees(readyPayees);
  };

  const deselectAllPayees = () => {
    setSelectedPayees([]);
  };

  const getSelectedPayeesAmount = (): number => {
    return payees
      .filter((payee) => selectedPayees.includes(payee.id))
      .reduce((total, payee) => total + payee.payrollAmount, 0);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmitPayroll = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      // Navigate to history after delay
      setTimeout(() => navigate("/history"), 20);
    }, 200);
  };

  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* <Box sx={{ mb: 3 }}>
          <Link
            href="/dashboard"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ChevronLeft size={16} style={{ marginRight: 4 }} />
            Back to Dashboard
          </Link>
        </Box> */}

        
        

          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="Select Pay Period"
              titleTypographyProps={{ variant: "h6" }}
              sx={{ borderBottom: `1px solid ${grey[200]}` }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="pay-period-label">
                    Pay Period <span style={{ color: red[500] }}>*</span>
                  </InputLabel>
                  <Select
                    labelId="pay-period-label"
                    id="payPeriod"
                    value={payPeriod}
                    onChange={handlePayPeriodChange}
                    label="Pay Period *"
                    required
                  >
                    <MenuItem value="">
                      <em>-- Select Pay Period --</em>
                    </MenuItem>
                    {payPeriods.map((period) => (
                      <MenuItem key={period.id} value={period.id}>
                        {period.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {payPeriod && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="subtitle2">
                      Select Payees for this Run
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={selectAllPayees}
                        sx={{ color: blue[600] }}
                      >
                        Select All Ready
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={deselectAllPayees}
                        sx={{ color: grey[600] }}
                      >
                        Deselect All
                      </Button>
                    </Box>
                  </Box>

                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead sx={{ backgroundColor: grey[50] }}>
                        <TableRow>
                          <TableCell width={50}></TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payees.map((payee) => (
                          <TableRow
                            key={payee.id}
                            sx={{
                              backgroundColor:
                                payee.status === "incomplete"
                                  ? grey[50]
                                  : "inherit",
                            }}
                            hover={payee.status !== "incomplete"}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedPayees.includes(payee.id)}
                                onChange={() => togglePayeeSelection(payee.id)}
                                disabled={payee.status === "incomplete"}
                                color="primary"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="medium">
                                {payee.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="text.secondary">
                                {payee.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {payee.status === "ready" ? (
                                <Box
                                  sx={{
                                    display: "inline-flex",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: green[100],
                                    color: green[800],
                                    fontSize: 12,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Ready
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    display: "inline-flex",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: yellow[100],
                                    color: yellow[800],
                                    fontSize: 12,
                                    fontWeight: "bold",
                                  }}
                                >
                                  Incomplete
                                </Box>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontWeight="medium">
                                {formatCurrency(payee.payrollAmount)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}

                        {selectedPayees.length > 0 && (
                          <TableRow sx={{ backgroundColor: grey[50] }}>
                            <TableCell colSpan={4} align="right">
                              <Typography fontWeight="medium">
                                Total Selected:
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography fontWeight="medium">
                                {formatCurrency(getSelectedPayeesAmount())}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </CardContent>
            
          </Card>

      </Container>
  );
};

export default RunPayrollSimple;
