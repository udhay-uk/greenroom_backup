import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  active: boolean;
}

const jobTitles = ["Producer", "Coordinator", "Accountant", "Supervisor"];
const departments = ["Production", "Finance", "Legal", "Operations"];

const UserManagementSettings = () => {
  const [editId, _setEditId] = useState<number | null>(null);

  const [admins, _setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      jobTitle: "Producer",
      department: "Production",
      active: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@exam.com",
      phone: "987-654-3210",
      jobTitle: "Accountant",
      department: "Finance",
      active: true,
    },
  ]);

  const [editData, setEditData] = useState<Omit<Admin, "id" | "active">>({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEdit = false
  ) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5">User Management</Typography>
          <Typography variant="subtitle1">
            Manage admin users, including adding, editing, and deactivating
            admins.
          </Typography>
          <Typography variant="body2">
            Note: At least one admin must always remain active.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
        <Button
          variant="contained"
          sx={{
            color: "#fff",
            bgcolor: "#1976d2",
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": { bgcolor: "#1976d8" },
          }}
        >
          + Add Admin
        </Button>
      </Box>
      <Box sx={{ p: 4 }}>
        {/* Admin List */}
        <List>
          {admins.map((admin) => (
            <Box key={admin.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  editId === admin.id ? (
                    <>
                      <IconButton>
                        <SaveIcon />
                      </IconButton>
                      <IconButton>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {admin.active && (
                        <Tooltip title="Deactivate">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )
                }
              >
                <ListItemText
                  primary={
                    editId === admin.id ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="name"
                            label="Name"
                            value={editData.name}
                            fullWidth
                            onChange={(e) => handleChange(e, true)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="email"
                            label="Email"
                            value={editData.email}
                            fullWidth
                            onChange={(e) => handleChange(e, true)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="phone"
                            label="Phone"
                            value={editData.phone}
                            fullWidth
                            onChange={(e) => handleChange(e, true)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            select
                            name="jobTitle"
                            label="Job Title"
                            value={editData.jobTitle}
                            fullWidth
                            onChange={(e) => handleChange(e, true)}
                          >
                            {jobTitles.map((jt) => (
                              <MenuItem key={jt} value={jt}>
                                {jt}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            select
                            name="department"
                            label="Department"
                            value={editData.department}
                            fullWidth
                            onChange={(e) => handleChange(e, true)}
                          >
                            {departments.map((d) => (
                              <MenuItem key={d} value={d}>
                                {d}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Typography variant="subtitle1">
                          {admin.name}
                        </Typography>
                        <Typography variant="body2">
                          {admin.email} | {admin.phone}
                        </Typography>
                        <Typography variant="body2">
                          {admin.jobTitle} — {admin.department}
                        </Typography>
                        {!admin.active && (
                          <Chip
                            label="Deactivated"
                            size="small"
                            color="default"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </>
                    )
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default UserManagementSettings;
