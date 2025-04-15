import React, { useState } from "react";
import {
  Users,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Save,
  Check,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Alert,
  Avatar,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface FormData {
  union: string;
  agreementType: string;
  productionType: string;
  tier: string;
  aeaEmployerId: string;
  aeaProductionTitle: string;
  aeaBusinessRep: string;
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const UnionSetup: React.FC = () => {
  const [hasUnionProduction, setHasUnionProduction] = useState<boolean | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    union: "",
    agreementType: "",
    productionType: "",
    tier: "",
    aeaEmployerId: "",
    aeaProductionTitle: "",
    aeaBusinessRep: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showUnionSection, setShowUnionSection] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Options for form selects
  const unionOptions: Option[] = [
    { value: "aea", label: "Actor's Equity Association" },
    { value: "disabled_usa", label: "USA (Coming Soon)", disabled: true },
    { value: "disabled_sag", label: "SAG-AFTRA (Coming Soon)", disabled: true },
  ];

  const agreementOptions: Option[] = [
    { value: "lort", label: "LORT Agreement" },
    { value: "off_broadway", label: "Off-Broadway Agreement" },
    { value: "production_contract", label: "Production Contract" },
    { value: "special_agreement", label: "Special Agreement" },
    { value: "showcase_code", label: "Showcase Code" },
    { value: "developmental", label: "Developmental Agreement" },
    { value: "29_hour", label: "29-Hour Reading" },
  ];

  const productionTypeOptions: Option[] = [
    { value: "musical", label: "Musical" },
    { value: "dramatic", label: "Dramatic (Non-Musical)" },
  ];

  const tierOptions: Option[] = [
    { value: "tier1", label: "Tier 1" },
    { value: "tier2", label: "Tier 2" },
    { value: "tier3", label: "Tier 3" },
  ];

  const handleInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData({ ...formData, [name]: value });

    // Clear specific error when field is edited
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleUnionToggle = (hasUnion: boolean) => {
    setHasUnionProduction(hasUnion);

    if (!hasUnion) {
      // Clear union-specific fields if "No" is selected
      setFormData({
        ...formData,
        union: "",
        agreementType: "",
        productionType: "",
        tier: "",
        aeaEmployerId: "",
        aeaProductionTitle: "",
        aeaBusinessRep: "",
      });

      // Clear any union-related errors
      const {
        union,
        agreementType,
        productionType,
        tier,
        aeaEmployerId,
        aeaProductionTitle,
        aeaBusinessRep,
        ...otherErrors
      } = errors;
      setErrors(otherErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Only validate union fields if it's a union production
    if (hasUnionProduction) {
      if (!formData.union) {
        newErrors.union = "Please select a union";
      }

      if (!formData.agreementType) {
        newErrors.agreementType = "Please select an agreement type";
      }

      // Only require production type for Off-Broadway
      if (
        formData.agreementType === "off_broadway" &&
        !formData.productionType
      ) {
        newErrors.productionType = "Please select a production type";
      }

      // Only require tier for Developmental Agreement
      if (formData.agreementType === "developmental" && !formData.tier) {
        newErrors.tier = "Please select a tier";
      }

      // Only require AEA fields for agreements other than 29-Hour Reading
      if (formData.agreementType !== "29_hour") {
        if (!formData.aeaEmployerId) {
          newErrors.aeaEmployerId = "AEA Employer ID is required";
        }

        if (!formData.aeaProductionTitle) {
          newErrors.aeaProductionTitle = "AEA Production Title is required";
        }

        if (!formData.aeaBusinessRep) {
          newErrors.aeaBusinessRep = "AEA Business Representative is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      // Simulate API call
      setTimeout(() => {
        setSaveSuccess(true);
        setIsSaving(false);

        // Reset success message after a delay
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);

        console.log("Form submitted with data:", {
          hasUnionProduction,
          ...formData,
        });
      }, 1500);
    }
  };

  const is29HourReading = formData.agreementType === "29_hour";
  const isDevelopmental = formData.agreementType === "developmental";
  const isOffBroadway = formData.agreementType === "off_broadway";

  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ mb: 2 }}>
        <Box
          sx={{
            maxWidth: "lg",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Greenroom Payroll
          </Typography>
          <Avatar sx={{ bgcolor: "primary.main" }}>JS</Avatar>
        </Box>
      </Paper>

      <Box
        sx={{ maxWidth: "md", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 4 }}
      >
        <Box mb={3}>
          <Button
            startIcon={<ChevronLeft size={20} />}
            href="/dashboard"
            sx={{ textTransform: "none" }}
          >
            Back to Dashboard
          </Button>
        </Box>

        <StyledCard>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.light" }}>
                <Users size={24} />
              </Avatar>
            }
            title="Unions Setup"
            subheader="Configure your production's union settings"
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
          />

          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* Union Production Toggle */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Is this a union production?
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant={
                        hasUnionProduction === true ? "contained" : "outlined"
                      }
                      onClick={() => handleUnionToggle(true)}
                      sx={{ textTransform: "none" }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={
                        hasUnionProduction === false ? "contained" : "outlined"
                      }
                      onClick={() => handleUnionToggle(false)}
                      sx={{ textTransform: "none" }}
                    >
                      No
                    </Button>
                  </Stack>
                </Box>

                {/* Union Fields - Only shown if union production is selected */}
                {hasUnionProduction && (
                  <Paper
                    elevation={0}
                    sx={{ backgroundColor: "grey.50", p: 3, borderRadius: 1 }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={() => setShowUnionSection(!showUnionSection)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography variant="subtitle1">Union Details</Typography>
                      <IconButton size="small">
                        {showUnionSection ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </IconButton>
                    </Box>

                    {showUnionSection && (
                      <Stack spacing={3} mt={2}>
                        <FormControl fullWidth error={!!errors.union}>
                          <InputLabel id="union-label">
                            Union <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <Select
                            labelId="union-label"
                            id="union"
                            name="union"
                            value={formData.union}
                            onChange={(e) =>
                              handleInputChange(e as SelectChangeEvent<string>)
                            }
                            label="Union *"
                            error={!!errors.union}
                          >
                            <MenuItem value="">-- Select Union --</MenuItem>
                            {unionOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.union && (
                            <FormHelperText error>
                              {errors.union}
                            </FormHelperText>
                          )}
                        </FormControl>

                        <FormControl fullWidth error={!!errors.agreementType}>
                          <InputLabel id="agreementType-label">
                            Agreement Type{" "}
                            <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <Select
                            labelId="agreementType-label"
                            id="agreementType"
                            name="agreementType"
                            value={formData.agreementType}
                            onChange={handleInputChange}
                            label="Agreement Type *"
                            error={!!errors.agreementType}
                          >
                            <MenuItem value="">
                              -- Select Agreement Type --
                            </MenuItem>
                            {agreementOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.agreementType && (
                            <FormHelperText error>
                              {errors.agreementType}
                            </FormHelperText>
                          )}
                        </FormControl>

                        {/* Only show production type for Off-Broadway */}
                        {isOffBroadway && (
                          <FormControl
                            fullWidth
                            error={!!errors.productionType}
                          >
                            <InputLabel id="productionType-label">
                              Musical/Dramatic{" "}
                              <span style={{ color: "red" }}>*</span>
                            </InputLabel>
                            <Select
                              labelId="productionType-label"
                              id="productionType"
                              name="productionType"
                              value={formData.productionType}
                              onChange={handleInputChange}
                              label="Musical/Dramatic *"
                              error={!!errors.productionType}
                            >
                              <MenuItem value="">
                                -- Select Production Type --
                              </MenuItem>
                              {productionTypeOptions.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.productionType && (
                              <FormHelperText error>
                                {errors.productionType}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}

                        {/* Only show tier for Developmental Agreement */}
                        {isDevelopmental && (
                          <FormControl fullWidth error={!!errors.tier}>
                            <InputLabel id="tier-label">
                              Tier <span style={{ color: "red" }}>*</span>
                            </InputLabel>
                            <Select
                              labelId="tier-label"
                              id="tier"
                              name="tier"
                              value={formData.tier}
                              onChange={handleInputChange}
                              label="Tier *"
                              error={!!errors.tier}
                            >
                              <MenuItem value="">-- Select Tier --</MenuItem>
                              {tierOptions.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.tier && (
                              <FormHelperText error>
                                {errors.tier}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}

                        {/* AEA Fields - Not required for 29-Hour Reading */}
                        {!is29HourReading && (
                          <>
                            <TextField
                              label={
                                <>
                                  AEA Employer ID{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </>
                              }
                              id="aeaEmployerId"
                              name="aeaEmployerId"
                              value={formData.aeaEmployerId}
                              onChange={(e) =>
                                handleInputChange(
                                  e as SelectChangeEvent<string>
                                )
                              }
                              error={!!errors.aeaEmployerId}
                              helperText={errors.aeaEmployerId}
                              fullWidth
                            />

                            <TextField
                              label={
                                <>
                                  AEA Production Title{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </>
                              }
                              id="aeaProductionTitle"
                              name="aeaProductionTitle"
                              value={formData.aeaProductionTitle}
                              onChange={(e) =>
                                handleInputChange(
                                  e as SelectChangeEvent<string>
                                )
                              }
                              error={!!errors.aeaProductionTitle}
                              helperText={errors.aeaProductionTitle}
                              fullWidth
                            />

                            <TextField
                              label={
                                <>
                                  AEA Business Representative{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </>
                              }
                              id="aeaBusinessRep"
                              name="aeaBusinessRep"
                              value={formData.aeaBusinessRep}
                              onChange={(e) =>
                                handleInputChange(
                                  e as SelectChangeEvent<string>
                                )
                              }
                              error={!!errors.aeaBusinessRep}
                              helperText={
                                errors.aeaBusinessRep ? (
                                  errors.aeaBusinessRep
                                ) : (
                                  <Typography variant="caption">
                                    Your assigned AEA business representative's
                                    name
                                  </Typography>
                                )
                              }
                              fullWidth
                            />
                          </>
                        )}
                      </Stack>
                    )}
                  </Paper>
                )}

                {/* Success Message */}
                {saveSuccess && (
                  <Alert severity="success" icon={<Check size={20} />}>
                    Union settings saved successfully
                  </Alert>
                )}

                {/* Form Actions */}
                <Divider />
                <Box display="flex" justifyContent="flex-end" pt={2}>
                  <Button type="button" variant="outlined" sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSaving}
                    startIcon={
                      isSaving ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Save size={20} />
                      )
                    }
                  >
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default UnionSetup;
