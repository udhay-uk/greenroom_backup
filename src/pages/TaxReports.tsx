import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Chip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Settings as SettingsIcon,
  FilterAlt as FilterIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const TaxReports: React.FC = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedFormType, setSelectedFormType] = useState("all");

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
              State
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value as string)}
              >
                <MenuItem value="all">All States</MenuItem>
                <MenuItem value="ca">California</MenuItem>
                <MenuItem value="ny">New York</MenuItem>
                <MenuItem value="tx">Texas</MenuItem>
                <MenuItem value="fl">Florida</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              Year
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as string)}
              >
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>
              Form Type
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedFormType}
                onChange={(e) => setSelectedFormType(e.target.value as string)}
              >
                <MenuItem value="all">All Forms</MenuItem>
                <MenuItem value="940">Form 940</MenuItem>
                <MenuItem value="941">Form 941</MenuItem>
                <MenuItem value="w2">W-2</MenuItem>
                <MenuItem value="1099">1099-MISC</MenuItem>
              </Select>
            </FormControl>
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
                  <TableCell>Form Name</TableCell>
                  <TableCell>Filing Date</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Form 941</TableCell>
                  <TableCell>Apr 30, 2025</TableCell>
                  <TableCell>Q1 2025</TableCell>
                  <TableCell>
                    <Chip label="Filed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Form 940</TableCell>
                  <TableCell>Jan 31, 2025</TableCell>
                  <TableCell>2024 Annual</TableCell>
                  <TableCell>
                    <Chip label="Filed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CA DE-9</TableCell>
                  <TableCell>Apr 30, 2025</TableCell>
                  <TableCell>Q1 2025</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  );
};

export default TaxReports;
