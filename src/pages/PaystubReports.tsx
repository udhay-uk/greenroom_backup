import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const PaystubReports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: "2025-03-01",
    end: "2025-04-30",
  });
  const [selectedPayee, setSelectedPayee] = useState("john");

  return (
    <>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Filters
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              Payee
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedPayee}
                onChange={(e) => setSelectedPayee(e.target.value as string)}
              >
                <MenuItem value="john">John Smith</MenuItem>
                <MenuItem value="sarah">Sarah Johnson</MenuItem>
                <MenuItem value="michael">Michael Lee</MenuItem>
                <MenuItem value="emma">Emma Garcia</MenuItem>
                <MenuItem value="david">David Wilson</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              Date Range
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                type="date"
                size="small"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2">to</Typography>
              <TextField
                type="date"
                size="small"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Column Preview */}
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Columns Preview</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <SettingsIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <FilterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <SearchIcon fontSize="small" />
              </IconButton>
              <Button
                variant="contained"
                size="small"
                startIcon={<DownloadIcon fontSize="small" />}
              >
                Download
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ p: 2 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight="medium">Pay Stub: John Smith</Typography>
              <Typography variant="body2" color="text.secondary">
                Pay Date: Apr 15, 2025
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} mb={2}>
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  display="block"
                  gutterBottom
                >
                  Pay Summary
                </Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Gross Pay:</Typography>
                    <Typography variant="body2">$4,500.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Total Deductions:</Typography>
                    <Typography variant="body2">$950.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" fontWeight="medium">
                      Net Pay:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      $3,550.00
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  display="block"
                  gutterBottom
                >
                  Pay Rate
                </Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Rate:</Typography>
                    <Typography variant="body2">$56.25/hour</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Hours:</Typography>
                    <Typography variant="body2">80.0</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  display="block"
                  gutterBottom
                >
                  Deductions
                </Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Federal Tax:</Typography>
                    <Typography variant="body2">$450.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Social Security:</Typography>
                    <Typography variant="body2">$279.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Medicare:</Typography>
                    <Typography variant="body2">$65.25</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Health Insurance:</Typography>
                    <Typography variant="body2">$155.75</Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 1.5, flex: 1 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  display="block"
                  gutterBottom
                >
                  Taxes
                </Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD Gross:</Typography>
                    <Typography variant="body2">$31,500.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD Federal Tax:</Typography>
                    <Typography variant="body2">$3,150.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">YTD FICA:</Typography>
                    <Typography variant="body2">$2,409.75</Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Paper>
        </Box>
      </Paper>
    </>
  );
};

export default PaystubReports;
