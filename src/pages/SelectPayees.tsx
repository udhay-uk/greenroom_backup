import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { Search, User } from "lucide-react";

interface Payee {
  id: number;
  name: string;
  role: string;
  isSelected: boolean;
}

const initialPayees: Payee[] = [
  { id: 1, name: "Sofia Dutta", role: "Engineer", isSelected: true },
  { id: 2, name: "Karthik Prasad", role: "Designer", isSelected: false },
  { id: 3, name: "Rajiv Menon", role: "Product Manager", isSelected: true },
];

export default function SelectPayees() {
  const [payees, setPayees] = useState<Payee[]>(initialPayees);
  const [search, setSearch] = useState("");

  const togglePayee = (id: number) => {
    setPayees((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSelected: !p.isSelected } : p))
    );
  };

  const filteredPayees = payees.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Select Payees
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose who you’d like to include in this payroll.
        </Typography>
      </Box>

      {/* Search Field */}
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search payees"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <Search size={18} style={{ marginRight: 8, color: "#9e9e9e" }} />
            ),
          }}
        />
      </Box>

      {/* Payees List */}
      <Stack spacing={2} maxHeight={300} sx={{ overflowY: "auto" }}>
        {filteredPayees.map((payee) => (
          <Paper
            key={payee.id}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <Checkbox
              checked={payee.isSelected}
              onChange={() => togglePayee(payee.id)}
            />
            <Avatar sx={{ bgcolor: "primary.light" }}>
              <User size={18} />
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{payee.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {payee.role}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
