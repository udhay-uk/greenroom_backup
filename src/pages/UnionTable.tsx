import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { Users, Edit } from "lucide-react";
import { styled } from "@mui/material/styles";

interface UnionConfig {
  hasUnionProduction: boolean | null;
  union: string;
  agreementType: string;
  productionType: string;
  tier: string;
  aeaEmployerId: string;
  aeaProductionTitle: string;
  aeaBusinessRep: string;
}

interface UnionConfigurationProps {
  config: UnionConfig;
  onEdit: () => void;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UnionConfiguration: React.FC<UnionConfigurationProps> = ({
  config,
  onEdit,
}) => {
  // Helper function to get display labels for values
  const getDisplayValue = (key: keyof UnionConfig, value: string) => {
    if (!value) return "Not specified";

    switch (key) {
      case "union":
        return value === "aea" ? "Actor's Equity Association" : value;
      case "agreementType":
        const agreementLabels: Record<string, string> = {
          lort: "LORT Agreement",
          off_broadway: "Off-Broadway Agreement",
          production_contract: "Production Contract",
          special_agreement: "Special Agreement",
          showcase_code: "Showcase Code",
          developmental: "Developmental Agreement",
          "29_hour": "29-Hour Reading",
        };
        return agreementLabels[value] || value;
      case "productionType":
        return value === "musical" ? "Musical" : "Dramatic (Non-Musical)";
      case "tier":
        return value.replace("tier", "Tier ");
      default:
        return value;
    }
  };

  return (
    <Box sx={{ backgroundColor: "grey.50", minHeight: "100vh" }}>
      <Box
        sx={{ maxWidth: "md", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 4 }}
      >
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
              <Users size={24} />
            </Avatar>
            <Typography variant="h6">Current Union Configuration</Typography>
            <Button
              startIcon={<Edit size={18} />}
              onClick={onEdit}
              sx={{ ml: "auto", textTransform: "none" }}
            >
              Edit Configuration
            </Button>
          </Box>

          <Box p={3}>
            {config.hasUnionProduction === null ? (
              <Typography color="textSecondary">
                No union configuration has been set up yet.
              </Typography>
            ) : !config.hasUnionProduction ? (
              <Typography>
                This production is marked as <strong>non-union</strong>.
              </Typography>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Setting</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <TableCell>Union</TableCell>
                      <TableCell>
                        {getDisplayValue("union", config.union)}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell>Agreement Type</TableCell>
                      <TableCell>
                        {getDisplayValue("agreementType", config.agreementType)}
                      </TableCell>
                    </StyledTableRow>
                    {config.agreementType === "off_broadway" && (
                      <StyledTableRow>
                        <TableCell>Production Type</TableCell>
                        <TableCell>
                          {getDisplayValue(
                            "productionType",
                            config.productionType
                          )}
                        </TableCell>
                      </StyledTableRow>
                    )}
                    {config.agreementType === "developmental" && (
                      <StyledTableRow>
                        <TableCell>Tier</TableCell>
                        <TableCell>
                          {getDisplayValue("tier", config.tier)}
                        </TableCell>
                      </StyledTableRow>
                    )}
                    {config.agreementType !== "29_hour" && (
                      <>
                        <StyledTableRow>
                          <TableCell>AEA Employer ID</TableCell>
                          <TableCell>{config.aeaEmployerId}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>AEA Production Title</TableCell>
                          <TableCell>{config.aeaProductionTitle}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <TableCell>AEA Business Representative</TableCell>
                          <TableCell>{config.aeaBusinessRep}</TableCell>
                        </StyledTableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          <Divider />

          <Box p={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={onEdit}
              startIcon={<Edit size={18} />}
              sx={{ textTransform: "none" }}
            >
              {config.hasUnionProduction === null
                ? "Configure Unions"
                : "Edit Configuration"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UnionConfiguration;
