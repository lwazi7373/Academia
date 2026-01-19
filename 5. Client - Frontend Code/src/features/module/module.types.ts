// ============= RESPONSE TYPES =============

export interface Module {
  moduleId: number;
  moduleName: string;
  moduleCode: string;
  credits: number;
  departmentId: number;
  departmentName: string;
}

export interface GetModuleResponse {
  msg: string;
  module: Module;
}