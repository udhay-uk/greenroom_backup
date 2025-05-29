export type PayeeType = 'Employee' | 'Loanout' | 'Vendor/Contractor';

export interface OnboardingFormData {
  payeeType: PayeeType;
  // General Info
  legalFirstName?: string;
  legalLastName?: string;
  entityName?: string;
  gender?: string;
  ssn?: string;
  ein?: string;
  dateOfBirth?: string;
  email?: string;
  homeAddress?: Address;
  businessAddress?: Address;
  // Union
  isUnionMember?: boolean;
  union?: string;
  jobTitle?: string;
  roleName?: string;
  department?: string;
  // Employment
  jobStartDate?: string;
  jobEndDate?: string;
  payRates?: PayRate[];
  increments?: Increment[];
  allowances?: Allowance[];
  // 401k
  optIn401k?: boolean;
  percentage401k?: number;
  // Representatives
  hasAgent?: boolean;
  agentEmail?: string;
  agentFeeRehearsal?: number;
  agentFeePerformance?: number;
  agentAuthorization?: boolean;
  hasManager?: boolean;
  managerEmail?: string;
  managerFeeRehearsal?: number;
  managerFeePerformance?: number;
  managerAuthorization?: boolean;
  // Work Authorization
  phoneNumber?: string;
  legalStatus?: string;
  validationDocument?: string;
  documentNumber?: string;
  issuingAuthority?: string;
  documentExpiration?: string;
  documentFile?: File | null;
  // Tax Withholdings
  federalFilingStatus?: string;
  multipleJobs?: boolean;
  dependentsCredit?: number;
  otherIncome?: number;
  deductions?: number;
  extraWithholding?: number;
  // NY State
  nyFilingStatus?: string;
  nyWithholdingAllowance?: number;
  nyAdditionalWithholding?: number;
  nycWithholdingAllowance?: number;
  nycAdditionalWithholding?: number;
  // Residential State
  stateFilingStatus?: string;
  stateWithholdingCode?: string;
  stateAdditionalWithholding?: number;
  stateReducedWithholding?: number;
  // Payment
  paymentMethod?: string;
  routingNumber?: string;
  accountNumber?: string;
  accountType?: string;
  mailingAddress?: Address;
  // Vendor specific
  federalTaxClassification?: string;
  exemptPayeeCode?: string;
  fatcaExemptionCode?: string;
  // Required documents
  w4Completed?: boolean;
  i9Completed?: boolean;
  w9Completed?: boolean;
  otherDocuments?: string[];
}

interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PayRate {
  amount: number;
  period: 'Hour' | 'Week' | 'Month';
  costCode: string;
  earningCode: 'Salary Rehearsal' | 'Salary Performance';
}

interface Increment {
  type: string;
  amount: number;
  frequency: 'Week' | 'Month';
}

interface Allowance {
  category: string;
  amount: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  costCode: string;
}