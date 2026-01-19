export interface StudentModule {
  moduleId: number;
  moduleName: string;
  moduleCode: string;
  credits: number;
  studentModuleId: number;
}

export interface GetStudentsModulesResponse {
  msg: string;
  modules: StudentModule[];
}

export interface UpcomingAssessment {
  assessmentId: number;
  assessmentName: string;
  totalMark: number;
  weighting: number;
  dueDate: string; // ISO string from backend
  daysUntilDue: number;
  module: {
    moduleId: number;
    moduleName: string;
    moduleCode: string;
  };
  studentMark: number | null;
  submission: boolean;
  dateSubmitted: string | null;
}

export interface GetUpcomingAssessmentsResponse {
  msg: string;
  assessments: UpcomingAssessment[];
}

export interface ModulePerformance {
  moduleId: number;
  moduleCode: string;
  moduleName: string;
  averageMark: number | null;
  riskLevel: string | null; // Could be enum: 'LOW' | 'MEDIUM' | 'HIGH' | null
  attendanceRate: number | null;
  submissionRate: number | null;
  lastCalculated: string | null;
}

export interface GetStudentModulePerformanceResponse {
  msg: string;
  modulePerformances: ModulePerformance[];
}

/**
 {
    "msg": "Upcoming assessments retrieved",
    "assessments": [
        {
            "assessmentId": 57,
            "assessmentName": "Assignment 1",
            "totalMark": 100,
            "weighting": "15.00",
            "dueDate": "2026-02-19T22:00:00.000Z",
            "daysUntilDue": 32,
            "module": {
                "moduleId": 1,
                "moduleName": "Programming Fundamentals",
                "moduleCode": "CSC101"
            },
            "studentMark": null,
            "submission": false,
            "dateSubmitted": null
        },
        {
            "assessmentId": 58,
            "assessmentName": "Test 1",
            "totalMark": 100,
            "weighting": "20.00",
            "dueDate": "2026-03-14T22:00:00.000Z",
            "daysUntilDue": 55,
            "module": {
                "moduleId": 1,
                "moduleName": "Programming Fundamentals",
                "moduleCode": "CSC101"
            },
            "studentMark": null,
            "submission": false,
            "dateSubmitted": null
        },
        {
            "assessmentId": 59,
            "assessmentName": "Assignment 2",
            "totalMark": 100,
            "weighting": "15.00",
            "dueDate": "2026-04-09T22:00:00.000Z",
            "daysUntilDue": 81,
            "module": {
                "moduleId": 1,
                "moduleName": "Programming Fundamentals",
                "moduleCode": "CSC101"
            },
            "studentMark": "68.00",
            "submission": 1,
            "dateSubmitted": "2026-02-20T13:30:00.000Z"
        }
    ]
}
 */