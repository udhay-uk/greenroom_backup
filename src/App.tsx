import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
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
import CompanyInformation from "./pages/CompanyInformation";
import DashboardSetup from "./pages/DashboardSetup";
import PayeeOnboardingSystem from "./pages/PayeeOnboardingSystem";
import AdminTimesheetEntry from "./pages/AdminTimesheetEntry";
import RunPayrollSimple from "./pages/PayrollSummaryCard";
import { Bell, SettingsIcon, UserPlus } from "lucide-react";
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

const drawerWidth = 240;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleNavigation = (index: number, path: string) => {
    setSelectedTab(index);
    navigate(path);
  };

  const navigationItems = [
    {
      label: "Registration",
      icon: <UserPlus />,
      path: "/company-information", // Changed from "/src/pages/DashboardSetup"
    },
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard", // Changed from "/src/pages/DashboardSetup"
    },
    {
      label: "Payees",
      icon: <PeopleIcon />,
      path: "/payees", // Changed from "/src/pages/PayeeOnboardingSystem"
    },
    {
      label: "Timesheets",
      icon: <ScheduleIcon />,
      path: "/timesheets", // Changed from "/src/pages/AdminTimesheetEntry"
    },
    {
      label: "Payroll",
      icon: <AttachMoneyIcon />,
      path: "/vendor-payments", // Changed from "/src/pages/VendorPayments"
    },
    {
      label: "Taxes",
      icon: <AccountBalanceIcon />,
      path: "/taxes", // Changed from "/src/pages/AdminTimesheetEntry"
    },
    {
      label: "Reports",
      icon: <BarChartIcon />,
      path: "/reports", // Changed from "/src/pages/ReportsWireframe"
    },

    {
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/union-setup",
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
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

      {/* Left Drawer Navigation */}
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
          {navigationItems.map((item, index) => (
            <ListItem
              key={item.label}
              component="div"
              onClick={() => handleNavigation(index, item.path)}
              sx={{
                backgroundColor: selectedTab === index ? "#e3f2fd" : "inherit",
                color: selectedTab === index ? "#1976d2" : "inherit",
                "& .MuiListItemIcon-root": {
                  color: selectedTab === index ? "#1976d2" : "inherit",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

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
          <Route path="/dashboard" element={<DashboardSetup />} />
          <Route path="/payees" element={<PayeeOnboardingSystem />} />
          <Route path="/timesheets" element={<AdminTimesheetEntry />} />
          <Route path="/payroll" element={<RunPayrollSimple />} />
          <Route path="/taxes" element={<AdminTimesheetEntry />} />
          <Route path="/reports" element={<ReportsWireframe />} />
          <Route
            path="/vendor-payments"
            element={<VendorPaymentsWireframe />}
          />
          <Route path="/company-information" element={<CompanyInformation />} />
          <Route path="/union-setup" element={<UnionSetup />} />
          <Route path="/signature-setup" element={<SignatureSetup />} />
          <Route path="/bank-setup" element={<BankSetup />} />
          <Route path="/account-activation" element={<AccountActivation />} />
          <Route path="/mfa" element={<MFAScreen />} />
          <Route path="/terms" element={<TermsReview />} />
          <Route path="/history" element={<PayrollHistory />} />
          <Route path="/payrolldetails" element={<PayrollDetail />} />
          <Route path="/unionconfiguration" element={<UnionSetupTable />} />


          {/* Add a default route */}
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
