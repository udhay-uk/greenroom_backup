import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const CompanySettings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [companyDetails, setCompanyDetails] = useState({
    name: "Acme Corp",
    type: "LLC",
    startDate: "2023-01-01",
    endDate: "",
    fein: "12-3456789",
    address: "123 Main St, Springfield, IL",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Submit/save logic
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      {/* Header Section */}
      <Box sx={{ backgroundColor: "#1976d2", color: "#fff", p: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Company Settings</Typography>
          <IconButton onClick={handleEditToggle} sx={{ color: "#fff" }}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Typography variant="subtitle1">
          Manage your company profile and information
        </Typography>
      </Box>

      {/* Info Section */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Company Name
            </Typography>
            <Typography variant="body1">{companyDetails.name}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              FEIN
            </Typography>
            <Typography variant="body1">{companyDetails.fein}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Company Type
            </Typography>
            {isEditing ? (
              <TextField
                name="type"
                value={companyDetails.type}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{companyDetails.type}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Start Date
            </Typography>
            {isEditing ? (
              <TextField
                name="startDate"
                type="date"
                value={companyDetails.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            ) : (
              <Typography variant="body1">
                {new Date(companyDetails.startDate).toLocaleDateString()}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              End Date (Optional)
            </Typography>
            {isEditing ? (
              <TextField
                name="endDate"
                type="date"
                value={companyDetails.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            ) : (
              <Typography variant="body1">
                {companyDetails.endDate
                  ? new Date(companyDetails.endDate).toLocaleDateString()
                  : "—"}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Address
            </Typography>
            {isEditing ? (
              <TextField
                name="address"
                value={companyDetails.address}
                onChange={handleChange}
                multiline
                fullWidth
              />
            ) : (
              <Typography variant="body1">{companyDetails.address}</Typography>
            )}
          </Grid>

          {isEditing && (
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default CompanySettings;
