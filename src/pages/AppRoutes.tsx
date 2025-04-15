import { Route, Routes } from "react-router-dom";
import CompanyInformation from "./CompanyInformation";
import SignatureSetup from "./SignatureSetup";
import BankSetup from "./BankSetup";
import UnionSetup from "./UnionSetup";
import AdminUserDetails from "./AdminUserDetails";
import DashboardSetup from "./DashboardSetup";
import PayeeOnboardingSystem from "./PayeeOnboardingSystem";
import AdminTimesheetEntry from "./AdminTimesheetEntry";
import RunPayrollSimple from "./PayrollSummaryCard";
import ReportsWireframe from "./Reports";
import AccountActivation from "./AccountActivation";
import PayrollDetails from "./PayrollDetails";
import SelectPayees from "./SelectPayees";
import TermsReview from "./TermsReview";
import VendorsOneOffPaymentsSimple from "./VendorOneOffpay";
import VendorPaymentsWireframe from "./VendorPayments";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/src/pages/CompanyInformation"
        element={<CompanyInformation />}
      />
      <Route path="/src/pages/SignatureSetup" element={<SignatureSetup />} />
      <Route path="/src/pages/BankSetup" element={<BankSetup />} />
      <Route path="/src/pages/UnionSetup" element={<UnionSetup />} />

      <Route
        path="/src/pages/AdminUserDetails"
        element={<AdminUserDetails />}
      />

      <Route path="/src/pages/DashboardSetup" element={<DashboardSetup />} />
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
      <Route path="/src/pages/TermsReview" element={<TermsReview />} />
      <Route path="/src/pages/SelectPayees" element={<SelectPayees />} />
      <Route
        path="/src/pages/VendorsOneOffPaymentsSimple"
        element={<VendorsOneOffPaymentsSimple />}
      />
      <Route
        path="/src/pages/VendorPayments"
        element={<VendorPaymentsWireframe />}
      />
      <Route
        path="/src/pages/PayrollSummaryCard"
        element={<RunPayrollSimple />}
      />
      <Route
        path="/src/pages/VendorPaymentsWireframe"
        element={<VendorPaymentsWireframe />}
      />
      <Route
        path="/src/pages/VendorPaymentsWireframe"
        element={<VendorPaymentsWireframe />}
      />
      <Route path="/src/pages/PayrollDetails" element={<PayrollDetails />} />
      <Route path="/src/pages/TermsReview" element={<TermsReview />} />

      {/* Add any other routes here */}
    </Routes>
  );
};

export default AppRoutes;
