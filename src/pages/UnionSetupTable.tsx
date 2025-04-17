// UnionSetupTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Typography,
  Box,
  IconButton,
  Tab,
} from "@mui/material";
import { Edit, Delete, Users } from "lucide-react";

// Define the type for our union setup data
interface UnionSetupData {
  id: string;
  union: string;
  agreementType: string;
  productionType?: string;
  tier?: string;
  aeaEmployerId: string;
  aeaProductionTitle: string;
  aeaBusinessRep: string;
  status: "active" | "pending" | "expired";
  createdAt: string;
}

// Mock data based on the union setup form
const mockUnionSetups: UnionSetupData[] = [
  {
    id: "1",
    union: "Actor's Equity Association",
    agreementType: "LORT Agreement",
    aeaEmployerId: "AEA-12345",
    aeaProductionTitle: "Hamlet Revival",
    aeaBusinessRep: "Jane Smith",
    status: "active",
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    union: "Actor's Equity Association",
    agreementType: "Off-Broadway Agreement",
    productionType: "Musical",
    aeaEmployerId: "AEA-67890",
    aeaProductionTitle: "New Musical Workshop",
    aeaBusinessRep: "John Doe",
    status: "active",
    createdAt: "2023-06-20",
  },
  {
    id: "3",
    union: "Actor's Equity Association",
    agreementType: "Developmental Agreement",
    tier: "Tier 2",
    aeaEmployerId: "AEA-54321",
    aeaProductionTitle: "Experimental Play",
    aeaBusinessRep: "Sarah Johnson",
    status: "pending",
    createdAt: "2023-07-10",
  },
  {
    id: "4",
    union: "Actor's Equity Association",
    agreementType: "29-Hour Reading",
    aeaEmployerId: "AEA-98765",
    aeaProductionTitle: "Script Reading",
    aeaBusinessRep: "Michael Brown",
    status: "expired",
    createdAt: "2023-04-05",
  },
];


const UnionSetupTable: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Union Setups
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage your union production agreements
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="union setups table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              <TableCell>Union</TableCell>
              <TableCell>Agreement Type</TableCell>
              <TableCell>AEA EMp ID</TableCell>

              <TableCell>AEA Production</TableCell>
              <TableCell>AEA Rep</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUnionSetups.map((setup) => (
              <TableRow key={setup.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
                      <Users size={20} />
                    </Avatar>
                    {setup.union}
                  </Box>
                </TableCell>
                <TableCell>{setup.agreementType}</TableCell>
                <TableCell>{setup.aeaEmployerId}</TableCell>
                <TableCell>{setup.aeaProductionTitle}</TableCell>
                <TableCell>{setup.aeaBusinessRep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UnionSetupTable;
