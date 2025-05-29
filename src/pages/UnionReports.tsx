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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const UnionReports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: "2025-03-01",
    end: "2025-04-30",
  });
  const [selectedUnion, setSelectedUnion] = useState("all");

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
              Union Name
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value as string)}
              >
                <MenuItem value="all">All Unions</MenuItem>
                <MenuItem value="local123">Local 123</MenuItem>
                <MenuItem value="uaw">UAW</MenuItem>
                <MenuItem value="seiu">SEIU</MenuItem>
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

        <Box sx={{ overflowX: "auto" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>SSN</TableCell>
                  <TableCell align="right">Salary</TableCell>
                  <TableCell align="right">Union Dues</TableCell>
                  <TableCell align="right">Health</TableCell>
                  <TableCell align="right">Pension</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell>***-**-1234</TableCell>
                  <TableCell align="right">$4,500.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$250.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>***-**-5678</TableCell>
                  <TableCell align="right">$5,200.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$300.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Michael Lee</TableCell>
                  <TableCell>***-**-9012</TableCell>
                  <TableCell align="right">$3,800.00</TableCell>
                  <TableCell align="right">$125.00</TableCell>
                  <TableCell align="right">$200.00</TableCell>
                  <TableCell align="right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  );
};

export default UnionReports;
