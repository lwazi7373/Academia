// ============= REQUEST TYPES ============= (Checked and verified to match to backend)
// Note : You only need request types for the things you send in the body
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
  title?: string; // Can be null 
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
  userRole: 'LECTURER' | 'COORDINATOR' | 'HOD';
}

export interface RegisterStaffStep3Request {
  userId: number;
  userRole: 'LECTURER' | 'COORDINATOR' | 'HOD';
  moduleIds: number[];
}

export interface UpdatePasswordRequest {
  identifierNumber: string;
  newPassword: string;
}

// ======================================================================================================================================= //
// ============= RESPONSE TYPES =============(Checked and verified to match to backend)
// Note : In my response types, I did not add (msg: string) anywhere, even though most responses do have a msg 
// ============= BASE USER TYPE (common fields) ============= (getMe returns data dependent on type of user retrieved hence BaseUser)
interface BaseUser {
  userId: number;
  firstName: string;
  lastName: string;
  title: string;
  emailAddress: string;
  contactNo: string;
  gender: string;
  isActive: number; // or boolean, depending on your preference
  dateRegistered: string; // or Date if you transform it
}
// ============= PROFILE TYPES =============
// If student
interface StudentProfile {
  studentId: number;
  studentNumber: string;
  levelOfEducation: string;
  yearOfStudy: number;
  qualificationId: number;
  qualificationName: string;
  qualificationCode: string;
  duration: number;
  totalCredits: number;
  departmentId: number;
  departmentName: string;
  facultyId: number;
  facultyName: string;
}
// If Coordinator
interface CoordinatorProfile {
  coordinatorId: number;
  staffNumber: string;
  departmentId: number;
  departmentName: string;
  facultyId: number;
  facultyName: string;
}
// If Lecturer
interface LecturerProfile {
  lecturerId: number;
  staffNumber: string;
  departmentId: number;
  departmentName: string;
  facultyId: number;
  facultyName: string;
}

// ============= USER VARIANTS (discriminated union) =============

export type StudentUser = BaseUser & {
  roles: readonly ['STUDENT'];  
  studentProfile: StudentProfile;
};

export type CoordinatorUser = BaseUser & {
  roles: readonly ['COORDINATOR'];
  coordinatorProfile: CoordinatorProfile;
};

export type LecturerUser = BaseUser & {
  roles: readonly ['LECTURER'];
  lecturerProfile: LecturerProfile;
};

export type AdminUser = BaseUser & {
  roles: readonly ['ADMIN'];
};

// ============= UNION TYPE =============
export type User = StudentUser | CoordinatorUser | LecturerUser | AdminUser;

// ============= TYPE GUARDS (helper functions) =============
export function isStudent(user: User): user is StudentUser {
  return (user.roles as readonly string[]).includes('STUDENT');
}

export function isCoordinator(user: User): user is CoordinatorUser {
  return (user.roles as readonly string[]).includes('COORDINATOR');
}

export function isLecturer(user: User): user is LecturerUser {
  return (user.roles as readonly string[]).includes('LECTURER');
}

export function isAdmin(user: User): user is AdminUser {
  return (user.roles as readonly string[]).includes('ADMIN');
}

// ====================================================================================================================================== //
// ============================== The rest of the responses ================================== //
export interface GetMeResponse {
  msg: string;
  user: User;
}

// Extra helper type to avoid repetition (part of the Login response -> type)
export interface LoginUser {
  userId: number;
  firstName: string;
  lastName: string;
  title: string;
  emailAddress: string;
  contactNo: string;
  gender: string;
  roles: string[];
}

export interface LoginResponse {
  msg: string;
  authToken: string;
  user: LoginUser;
}

export type RegisterStep1Response = 
  | {
      msg: string;
      userId: number;
      studentNumber: string;
      role: 'STUDENT';
    }
  | {
      msg: string;
      userId: number;
      staffNumber: string;
      role: 'LECTURER' | 'COORDINATOR' | 'ADMIN';  // All staff roles
    };

export interface RegisterStudentStep2Response {
  msg: string;
  student: {
    studentId: number;          
    studentNumber: string;
    levelOfEducation: string;   
    yearOfStudy: number;        
    qualificationId: number;    
  };
  modulesAssigned: number;
  modules: Module[];
}

export interface RegisterStaffStep2Response {
  msg: string;
  staff: {
    userId: number;
    staffNumber: string;
    departmentId: number;
    userRole: string
  };
}

export interface RegisterStaffStep3Response {
  msg: string;
  modulesAssigned: number;
  modules: Module[];
}

export interface Module {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
  credits: number;
}

// The moddules you select from on step 3, when registering staff
export interface DepartmentModulesResponse {
  msg: string;
  modules: Module[];
}

// ============= RESPONSE TYPES FOR DROPDOWNS =============

export interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
}

export interface DepartmentsResponse {
  msg: string;
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
  msg: string;
  qualifications: Qualification[];
}

// ============= END OF TYPES FOR DROPDOWNS ==================

// ============= CONTEXT TYPES =============
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  // login removed - use useLogin mutation directly
}