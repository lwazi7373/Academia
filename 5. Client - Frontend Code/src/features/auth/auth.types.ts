// ============= REQUEST TYPES =============
export interface LoginRequest {
  identifierNumber: string;
  userPassword: string;
}

export interface RegisterStep1Request {
  firstName: string;
  lastName: string;
  idNumber: string;
  emailAddress: string;
  userPassword: string;
  contactNo: string;
  gender: string;
  userRole: 'STUDENT' | 'LECTURER' | 'COORDINATOR';
  title?: string;
  isActive: boolean;
}

export interface RegisterStudentStep2Request {
  userId: number;
  studentNumber: string;
  qualificationName: string;
  yearOfStudy: number;
  semesterNo: number;
  levelOfEducation: string;
}

export interface RegisterStaffStep2Request {
  userId: number;
  staffNumber: string;
  departmentId: number;
  userRole: 'LECTURER' | 'COORDINATOR';
}

export interface RegisterStaffStep3Request {
  userId: number;
  userRole: 'LECTURER' | 'COORDINATOR';
  moduleIds: number[];
}

export interface UpdatePasswordRequest {
  identifierNumber: string;
  newPassword: string;
}

// ============= RESPONSE TYPES =============
export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userRole: 'STUDENT' | 'LECTURER' | 'COORDINATOR';
  studentNumber?: string;
  staffNumber?: string;
}

export interface RegisterStep1Response {
  userId: number;
  studentNumber?: string;
  staffNumber?: string;
  roles: string[];
}

export interface Module {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
}

// ============= RESPONSE TYPES FOR DROPDOWNS =============

export interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
}

export interface DepartmentsResponse {
  departments: Department[];
}

export interface Qualification {
  qualificationId: number;
  qualificationName: string;
  qualificationCode: string;
  duration: number;
  totalCredits: number;
  departmentId: number;
}

export interface QualificationsResponse {
  qualifications: Qualification[];
}

// ============= END OF TYPES FOR DROPDOWNS ==================

export interface RegisterStudentStep2Response {
  student: {
    studentId: number;
    studentNumber: string;
    qualificationName: string;
  };
  modulesAssigned: number;
  modules: Module[];
}

export interface RegisterStaffStep2Response {
  staff: {
    staffId: number;
    staffNumber: string;
    departmentId: number;
  };
}

export interface RegisterStaffStep3Response {
  modulesAssigned: number;
  modules: Module[];
}

export interface DepartmentModulesResponse {
  modules: Module[];
}

// ============= CONTEXT TYPES =============
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void; // Removed User parameter
  logout: () => void;
}