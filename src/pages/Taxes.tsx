import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Popover,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = React.useState<number>(0);
  const [stateTax, setStateTax] = React.useState<number>(0);
  const [cityTax, setCityTax] = React.useState<number>(0);
  const [reportSnackbarOpen, setReportSnackbarOpen] = React.useState(false);
  const [reportGenerated, setReportGenerated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Calendar popover state
  const [calendarAnchorEl, setCalendarAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
      setReportSnackbarOpen(true);
    }, 2000); // 2 seconds animation
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setReportSnackbarOpen(false);
  };



  const handleScheduleClick = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget);
  };
  const handleCalendarClose = () => {
    setCalendarAnchorEl(null);
  };
  const openCalendar = Boolean(calendarAnchorEl);

  const calculateTaxes = () => {
    // Approximate NYS Corporate Tax Bracket
    const stateRate = income > 5000000 ? 0.075 : income > 290000 ? 0.065 : 0.0631;
    const cityRate = 0.0885;

    const state = income * stateRate;
    const city = income * cityRate;

    setStateTax(state);
    setCityTax(city);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, mx: "auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            New York Tax Dashboard
          </Typography>
          <Button
            variant={reportGenerated ? "outlined" : "contained"}
            color={reportGenerated ? "success" : "primary"}
            onClick={handleGenerateReport}
            disabled={reportGenerated || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading
              ? "Generating..."
              : reportGenerated
              ? "Generated Successfully"
              : "Generate Report"}
          </Button>
        </Stack>

        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Quarterly Tax Due
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  $93,380
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Includes federal, NYS, NYC
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Filings Due
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Within next 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Compliance Score
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  98%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Timely submissions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  YTD Taxes Paid
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  $81,500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  As of May 2025
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Outstanding Tax Liabilities
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your business's upcoming tax dues and statuses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tax Type</TableCell>
                    <TableCell align="right">Amount Due</TableCell>
                    <TableCell align="center">Due Date</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { type: "Federal Income Tax", amount: "$45,230", date: "Jan 31, 2025", status: "Pending" },
                    { type: "NYS Corporate Tax", amount: "$12,450", date: "Jan 31, 2025", status: "Pending" },
                    { type: "NYC UBT", amount: "$28,920", date: "Jan 15, 2025", status: "Pending" },
                    { type: "MCTMT (Payroll)", amount: "$6,780", date: "Jan 15, 2025", status: "Pending" },
                  ].map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell align="right">{item.amount}</TableCell>
                      <TableCell align="center">{item.date}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button size="small" variant="contained">Pay Now</Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={handleScheduleClick}
                          >
                            Schedule
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Calendar Popover */}
            <Popover
              open={openCalendar}
              anchorEl={calendarAnchorEl}
              onClose={handleCalendarClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box p={2}>
                <DatePicker
                  label="Select Payment Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  slotProps={{ textField: { size: "small" } }}
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCalendarClose}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Popover>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={3} mb={4}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Set Up Auto Payments
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Avoid penalties by automating recurring tax payments
              </Typography>
              <Stack spacing={2} mt={2}>
                <TextField label="Bank Account" size="medium"  />
                <TextField label="Routing Number" size="medium"  />
                <Box display="flex" justifyContent="right">
                <Button variant="contained" size="large" sx={{ width: 250 }}>
                   Save Configuration
                </Button>
               </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Tax Estimator */}
        <Card sx={{ flex: 'row' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Estimate Your NYS & NYC Tax
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your business income to get a tax estimate
            </Typography>
            <Stack spacing={3} mt={2}>
              <Stack spacing={2} maxWidth={350}>
                <TextField
                  label="Annual Business Income ($)"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  placeholder="Enter gross income"
                  fullWidth
                />
                <Button variant="contained" onClick={calculateTaxes} fullWidth>
                  Calculate Taxes
                </Button>
              </Stack>
              {/* Tax Results */}
              <Stack spacing={1}>
                <Typography>NYS Tax: <b>${stateTax.toFixed(2)}</b></Typography>
                <Typography>NYC Tax: <b>${cityTax.toFixed(2)}</b></Typography>
                <Typography fontWeight="bold" color="primary">
                  Total Estimated: ${(stateTax + cityTax).toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        </Stack>
       
      <Snackbar
        open={reportSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Report generated successfully!
        </Alert>
      </Snackbar>

      </Box>
    </LocalizationProvider>
  );
};

export default TaxCalculator;
