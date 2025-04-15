import React from "react";
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
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import CompanyInformation from "./pages/CompanyInformation";
import DashboardSetup from "./pages/DashboardSetup";
import PayeeOnboardingSystem from "./pages/PayeeOnboardingSystem";
import AdminTimesheetEntry from "./pages/AdminTimesheetEntry";
import RunPayrollSimple from "./pages/PayrollSummaryCard";
import { Bell } from "lucide-react";
import ReportsWireframe from "./pages/Reports";
import AccountActivation from "./pages/AccountActivation";
import MFAScreen from "./pages/MFAScreen";
import TermsReview from "./pages/TermsReview";
import VendorPaymentsWireframe from "./pages/VendorPayments";
import LoginScreen from "./pages/LoginScreen";

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
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/src/pages/DashboardSetup",
    },
    {
      label: "Payees",
      icon: <PeopleIcon />,
      path: "/src/pages/PayeeOnboardingSystem",
    },
    {
      label: "Timesheets",
      icon: <ScheduleIcon />,
      path: "/src/pages/AdminTimesheetEntry",
    },
    {
      label: "Payroll",
      icon: <AttachMoneyIcon />,
      path: "/src/pages/RunPayrollSimple",
    },
    {
      label: "Taxes",
      icon: <AccountBalanceIcon />,
      path: "/src/pages/AdminTimesheetEntry",
    },
    {
      label: "Reports",
      icon: <BarChartIcon />,
      path: "/src/pages/ReportsWireframe",
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
          <Route
            path="/src/pages/CompanyInformation"
            element={<CompanyInformation />}
          />
          <Route path="/src/pages/LoginScreen" element={<LoginScreen />} />
          <Route
            path="/src/pages/DashboardSetup"
            element={<DashboardSetup />}
          />
          <Route
            path="/src/pages/PayeeOnboardingSystem"
            element={<PayeeOnboardingSystem />}
          />
          <Route
            path="/src/pages/AdminTimesheetEntry"
            element={<AdminTimesheetEntry />}
          />
          <Route
            path="/src/pages/RunPayrollSimple"
            element={<RunPayrollSimple />}
          />
          <Route
            path="/src/pages/ReportsWireframe"
            element={<ReportsWireframe />}
          />
          <Route
            path="/src/pages/AccountActivation"
            element={<AccountActivation />}
          />
          <Route
            path="/src/pages/MFAScreen"
            element={
              <MFAScreen
               
              />
            }
          />
          <Route path="/src/pages/TermsReview" element={<TermsReview />} />
          <Route
            path="/src/pages/VendorPaymentsWireframe"
            element={<VendorPaymentsWireframe />}
          />
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
