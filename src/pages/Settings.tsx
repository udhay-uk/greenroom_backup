import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Divider,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Settings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    productionName: "Green Room Productions",
    productionCode: "GRP-2023",
    streetAddress: "123 Studio Way",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    federalTaxId: "12-3456789",
    stateTaxId: "CA-987654",
    payrollSchedule: "Bi-weekly"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
    setIsEditing(false);
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <IconButton 
          color="primary" 
          onClick={() => setIsEditing(!isEditing)}
          aria-label="edit settings"
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manages production details, like name, addresses, tax & payroll setup.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* Production Info */}
          <Grid item xs={12}>
            <Typography variant="h6">Production Info</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Production Name" 
                variant="outlined"
                name="productionName"
                value={formData.productionName}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Production Name</Typography>
                <Typography variant="body1">{formData.productionName}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Production Code" 
                variant="outlined"
                name="productionCode"
                value={formData.productionCode}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Production Code</Typography>
                <Typography variant="body1">{formData.productionCode}</Typography>
              </Box>
            )}
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Typography variant="h6">Address</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Street Address" 
                variant="outlined"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Street Address</Typography>
                <Typography variant="body1">{formData.streetAddress}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="City" 
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">City</Typography>
                <Typography variant="body1">{formData.city}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="State" 
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">State</Typography>
                <Typography variant="body1">{formData.state}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Zip Code" 
                variant="outlined"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Zip Code</Typography>
                <Typography variant="body1">{formData.zipCode}</Typography>
              </Box>
            )}
          </Grid>

          {/* Tax & Payroll */}
          <Grid item xs={12}>
            <Typography variant="h6">Tax & Payroll Setup</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Federal Tax ID" 
                variant="outlined"
                name="federalTaxId"
                value={formData.federalTaxId}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Federal Tax ID</Typography>
                <Typography variant="body1">{formData.federalTaxId}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="State Tax ID" 
                variant="outlined"
                name="stateTaxId"
                value={formData.stateTaxId}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">State Tax ID</Typography>
                <Typography variant="body1">{formData.stateTaxId}</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField 
                fullWidth 
                label="Payroll Schedule" 
                variant="outlined"
                name="payrollSchedule"
                value={formData.payrollSchedule}
                onChange={handleChange}
              />
            ) : (
              <Box>
                <Typography variant="caption" color="text.secondary">Payroll Schedule</Typography>
                <Typography variant="body1">{formData.payrollSchedule}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      
      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Settings;
