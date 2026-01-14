// ============= RESPONSE TYPES =============

export interface Module {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
  credits: number;
  departmentId: number;
  departmentName: string;
}

export interface GetLecturerModulesResponse {
  msg: string;
  modules: Module[];
}