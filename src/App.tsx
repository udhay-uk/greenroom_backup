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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Bell, SettingsIcon, UserPlus } from "lucide-react";

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

const drawerWidth = 240;

const navigationItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Payees", icon: <PeopleIcon />, path: "/payees" },
  { label: "Timesheets", icon: <ScheduleIcon />, path: "/timesheets" },
  { label: "Payroll", icon: <AttachMoneyIcon />, path: "/vendor-payments" },
  { label: "Taxes", icon: <AccountBalanceIcon />, path: "/taxes" },
  { label: "Reports", icon: <BarChartIcon />, path: "/reports" },
  { label: "Settings", icon: <SettingsIcon />, path: "/union-setup" },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const showDrawer =
    currentPathname !== "/login" && currentPathname !== "/register";

  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    const currentTab = navigationItems.find(
      (item) => item.path === location.pathname
    )?.label;
    if (showDrawer) {
      setSelectedTab(currentTab || "Dashboard");
    }
  }, [location.pathname, showDrawer]);

  const handleNavigation = (item: any) => {
    navigate(item.path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
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
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap fontWeight="bold">
              Green Room Payroll
            </Typography>

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

      {/* Left Drawer */}
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
            },
          }}
        >
          <Toolbar />
          <List>
            {navigationItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => handleNavigation(item)}
                sx={{
                  backgroundColor:
                    selectedTab === item.label ? "#e3f2fd" : "inherit",
                  color: selectedTab === item.label ? "#1976d2" : "inherit",
                  "& .MuiListItemIcon-root": {
                    color: selectedTab === item.label ? "#1976d2" : "inherit",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
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
          <Route path="/taxes" element={<TaxCalculator />} />
          <Route path="/reports" element={<ReportsWireframe />} />
          <Route
            path="/vendor-payments"
            element={<VendorPaymentsWireframe />}
          />
          <Route path="/register" element={<CompanyInformation />} />
          <Route path="/union-setup" element={<UnionSetup />} />
          <Route path="/signature-setup" element={<SignatureSetup />} />
          <Route path="/bank-setup" element={<BankSetup />} />
          <Route path="/account-activation" element={<AccountActivation />} />
          <Route path="/mfa" element={<MFAScreen />} />
          <Route path="/terms" element={<TermsReview />} />
          <Route path="/history" element={<PayrollHistory />} />
          <Route path="/payrolldetails" element={<PayrollDetail />} />
          <Route path="/unionconfiguration" element={<UnionSetupTable />} />
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
