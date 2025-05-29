import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CssBaseline,
  Avatar,
  Stack,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Bell, SettingsIcon } from "lucide-react";
// import { ReviewsOutlined } from "@mui/icons-material";

// Pages
import CompanyInformation from "./pages/CompanyInformation";
import DashboardSetup from "./pages/DashboardSetup";
import PayeeOnboardingSystem from "./pages/PayeeOnboardingSystem";
import AdminTimesheetEntry from "./pages/AdminTimesheetEntry";
import RunPayrollSimple from "./pages/PayrollSummaryCard";
import ReportsWireframe from "./pages/Reports";
import AccountActivation from "./pages/AccountActivation";
import MFAScreen from "./pages/MFAScreen";
import TermsReview from "./pages/TermsReview";
import VendorPaymentsWireframe from "./pages/VendorPayments";
import UnionSetup from "./pages/UnionSetup";
import SignatureSetup from "./pages/SignatureSetup";
import BankSetup from "./pages/BankSetup";
import PayrollHistory from "./pages/PayrollHistory";
import PayrollDetail from "./pages/PayrollDetail";
import UnionSetupTable from "./pages/UnionSetupTable";
import LoginScreen from "./pages/LoginScreen";
import TaxCalculator from "./pages/Taxes";
import ReviewPage from "./pages/ReviewPage";
import Settings from "./pages/Settings";
import PayrollReports from "./pages/PayrollReports";
import UnionReports from "./pages/UnionReports";
import TaxReports from "./pages/TaxReports";
import PaystubReports from "./pages/PaystubReports";
import CompanySettings from "./pages/CompanySettings";
import UnionSettings from "./pages/UnionSettings";
import UserManagementSettings from "./pages/UserManagementSettings";

const drawerWidth = 240;

const navigationItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  { label: "Payees", icon: <PeopleIcon />, path: "/payees" },
  {
    label: "Payroll",
    icon: <AttachMoneyIcon />,
    children: [
      { label: "Run Payroll", path: "/payroll" },
      { label: "Payroll History", path: "/history" },
      { label: "Payroll Detail", path: "/payrolldetails" },
      { label: "Vendor Payments", path: "/vendor-payments" },
    ],
  },
  { label: "Taxes", icon: <AccountBalanceIcon />, path: "/taxes" },
  {
    label: "Reports",
    icon: <BarChartIcon />,
    children: [
      { label: "Payroll Reports", path: "/payroll_reports" },
      { label: "Union Reports", path: "/union_reports" },
      { label: "Tax Reports", path: "/tax_reports" },
      { label: "Pay Stubs Reports", path: "/pay_stubs" },
    ],
  },
  // { label: "Review", icon: <ReviewsOutlined />, path: "/review" },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    children: [
      { label: "Company Settings", path: "/settings/company" },
      { label: "Unions", path: "/settings/unions" },
      { label: "User Management", path: "/settings/users" },
      // { label: "Onboarding Documents", path: "/settings/onboarding-documents" },
      // { label: "Payroll Setup", path: "/settings/payroll-setup" },
      // { label: "Tax Setup", path: "/settings/tax-setup" },
      // { label: "Activity Log", path: "/settings/activity-log" },
    ],
  },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const showDrawer =
    currentPathname !== "/login" && currentPathname !== "/register";

  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const companies = [
    "TechNova Inc.",
    "BrightPath LLC",
    "GreenHarvest Co.",
    "UrbanEdge Designs",
    "GlobalTech Solutions",
    "NextGen Innovations",
    "EcoWave Enterprises",
  ];
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  useEffect(() => {
    const match = navigationItems.find((item) =>
      item.children
        ? item.children.some((child) => child.path === currentPathname)
        : item.path === currentPathname
    );

    if (match?.children) {
      const childMatch = match.children.find(
        (child) => child.path === currentPathname
      );
      setSelectedTab(childMatch?.label ?? match.label);
      setOpenSections({ [match.label]: true });
    } else {
      setSelectedTab(match?.label ?? null);
    }
  }, [currentPathname]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = !!prev[label];
      const newState: Record<string, boolean> = {};
      if (!isCurrentlyOpen) newState[label] = true;
      return newState;
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {showDrawer && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", gap: 3, p: 1 }}>
            <Typography variant="h6" noWrap fontWeight="bold">
              Green Room Payroll
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: 250 }}>
                <InputLabel id="company-select-label">Company</InputLabel>
                <Select
                  labelId="company-select-label"
                  id="company-select"
                  value={selectedCompany}
                  label="Company"
                  onChange={handleChange}
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Stack direction="row" alignItems="center">
              <IconButton>
                <Bell />
              </IconButton>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                  JS
                </Avatar>
                <Typography variant="body2" fontWeight="medium">
                  Jane Smith
                </Typography>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      {showDrawer && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9",
              borderRight: "1px solid #e0e0e0",
              mt: 1,
            },
          }}
        >
          <Toolbar />
          <List>
            {navigationItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openSections[item.label] || false;

              return (
                <React.Fragment key={item.label}>
                  <ListItem
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(item.label);
                      } else if (item.path) {
                        handleNavigation(item.path);
                      }
                    }}
                    sx={{
                      backgroundColor:
                        selectedTab === item.label && !hasChildren
                          ? "#e3f2fd"
                          : "inherit",
                      color:
                        selectedTab === item.label && !hasChildren
                          ? "#1976d2"
                          : "inherit",
                      "& .MuiListItemIcon-root": {
                        color:
                          selectedTab === item.label && !hasChildren
                            ? "#1976d2"
                            : "inherit",
                        minWidth: 0,
                        marginRight: 2, // space between icon and text
                      },
                      pl: 2, // parent padding left
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isOpen} timeout={300} unmountOnExit>
                      <List component="div" disablePadding>
                        {item?.children?.map((child) => {
                          const isSelected = selectedTab === child.label;
                          return (
                            <ListItem
                              key={child.label}
                              onClick={() => handleNavigation(child.path)}
                              sx={{
                                backgroundColor: isSelected
                                  ? "#e3f2fd"
                                  : "inherit",
                                color: isSelected ? "#1976d2" : "inherit",
                                "& .MuiListItemIcon-root": {
                                  color: isSelected ? "#1976d2" : "inherit",
                                },
                                pl: 8, // child label more indented than parent
                              }}
                            >
                              <ListItemText primary={child.label} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardSetup />} />
          <Route path="/payees" element={<PayeeOnboardingSystem />} />
          <Route path="/timesheets" element={<AdminTimesheetEntry />} />
          <Route path="/payroll" element={<RunPayrollSimple />} />
          <Route
            path="/vendor-payments"
            element={<VendorPaymentsWireframe />}
          />
          <Route path="/register" element={<CompanyInformation />} />
          <Route path="/taxes" element={<TaxCalculator />} />
          <Route path="/reports" element={<ReportsWireframe />} />
          <Route path="/account-activation" element={<AccountActivation />} />
          <Route path="/mfa" element={<MFAScreen />} />
          <Route path="/terms" element={<TermsReview />} />
          <Route path="/union-setup" element={<UnionSetup />} />
          <Route path="/signature-setup" element={<SignatureSetup />} />
          <Route path="/bank-setup" element={<BankSetup />} />
          <Route path="/history" element={<PayrollHistory />} />
          <Route path="/payrolldetails" element={<PayrollDetail />} />
          <Route path="/unionconfiguration" element={<UnionSetupTable />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payroll_reports" element={<PayrollReports />} />
          <Route path="/union_reports" element={<UnionReports />} />
          <Route path="/tax_reports" element={<TaxReports />} />
          <Route path="/pay_stubs" element={<PaystubReports />} />
          <Route path="/settings/company" element={<CompanySettings />} />
          <Route path="/settings/unions" element={<UnionSettings />} />
          <Route path="/settings/users" element={<UserManagementSettings />} />
        </Routes>
      </Box>
    </Box>
  );
};

const RootApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
