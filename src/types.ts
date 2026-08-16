export type RoleId =
  | 'chair'
  | 'presenter'
  | 'problem_lead'
  | 'ddx_lead'
  | 'investigation_strategist'
  | 'management_lead'
  | 'scribe'
  | 'devils_advocate';

export interface TeamRole {
  id: RoleId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgLight: string;
  borderLight: string;
  description: string;
  duties: string[];
  keyQuestion: string;
}

export interface PatientVitals {
  bp: string;
  hr: number;
  rr: number;
  spo2: string;
  temp: string;
  gcs?: string;
  painScore?: string;
  rbs?: string;
}

export interface ClinicalStem {
  patientName: string;
  age: number;
  gender: 'Male' | 'Female';
  occupation: string;
  setting: string; // e.g. Emergency Department, Medical Assessment Unit, Primary Care Clinic
  triageCategory: 'Red (Resuscitation)' | 'Yellow (Urgent)' | 'Green (Non-urgent)';
  presentingComplaint: string;
  historyOfPresentingIllness: string[];
  systemicReview: string[];
  pastMedicalSurgicalHistory: string[];
  medications: string[];
  allergies: string[];
  familyHistory: string[];
  socialHistory: string[];
  vitals: PatientVitals;
}

export type StageKey =
  | 'history'
  | 'problem_representation'
  | 'differential_diagnosis'
  | 'physical_examination'
  | 'investigations'
  | 'definitive_diagnosis'
  | 'management'
  | 'wrapup_reflection';

export interface StageData {
  stageKey: StageKey;
  stageNumber: number;
  title: string;
  shortTitle: string;
  suggestedDurationMinutes: number;
  primaryRole: RoleId;
  prompt: string;
  guidingQuestions?: string[];
  scaffoldHints?: string[];
  expertBenchmark: {
    title: string;
    summary: string;
    keyPoints: string[];
    pathophysiologyRationale?: string;
    cognitiveBiasWarning?: string;
  };
  assignmentDetails?: {
    assignmentTitle: string;
    type: 'ecg' | 'abg' | 'renal_ufeme' | 'lft' | 'dka' | 'headache' | 'fbc' | 'status_resuscitation' | 'general' | string;
    data: any;
  };
}

export interface TeamReflection {
  diagnosticHurdle: string;
  teamCommunication: string;
  wardRoundTakeaway: string;
}

export interface RoomSession {
  roomId: string;
  caseId: string;
  currentStageIndex: number;
  unlockedStages: number[];
  stageAnswers: Record<string, string>;
  teammates: string[];
  roleAssignments: Record<string, string>;
  reflection: TeamReflection;
  timerSeconds: number;
  isTimerRunning: boolean;
  lastUpdated: number;
}

export interface IslamicAndPatientCenteredCare {
  rukhsahSolat: string;
  fastingRamadanGuidance: string;
  halalMedicationAndDiet: string;
  familyCommunicationAndBioethics: string;
  patientEducationAndHolisticWellness: string;
}

export interface SdlCase {
  id: string;
  week: number;
  topicCategory: string;
  caseCode: string;
  title: string;
  subTitle: string;
  assignmentName: string;
  stem: ClinicalStem;
  stages: StageData[];
  islamicConsiderations: IslamicAndPatientCenteredCare;
  keyLearningPoints: string[];
  referenceGuidelines: string[];
}

export interface RoomSessionState {
  roomId: string;
  caseId: string;
  currentStageIndex: number;
  unlockedStages: number[];
  stageAnswers: Record<string, string>;
  teammates: string[];
  roleAssignments: Record<string, string>; // roleId -> Teammate name
  reflections: {
    challengingFork: string;
    teamEfficiency: string;
    wardTakeaway: string;
  };
  timerRemaining: number;
  isTimerRunning: boolean;
  lastUpdated?: number;
}
