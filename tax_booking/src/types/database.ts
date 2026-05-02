export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export interface TaxRecord {
  id: string;
  user_id: string;
  tax_year: number;
  income: number;
  deductions: number;
  tax_paid: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: string;
  tax_record_id: string;
  document_type: string;
  file_path: string;
  uploaded_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}