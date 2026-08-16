import { TeamRole } from '../types';

export const TEAM_ROLES: TeamRole[] = [
  {
    id: 'chair',
    name: 'Chair & Facilitator',
    shortName: 'Chair',
    icon: 'Gavel',
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    bgLight: 'bg-indigo-50/70',
    borderLight: 'border-indigo-200',
    description: 'Directs the discussion pace, ensures psychological safety, and enforces time limits for each stage.',
    duties: [
      'Monitors the stage timer and announces transition warnings.',
      'Ensures every team member speaks without interruption.',
      'Prevents premature conclusions and drives team consensus before unlocking reference findings.'
    ],
    keyQuestion: 'Are all voices heard, and are we adhering to our clinical reasoning timeline?'
  },
  {
    id: 'presenter',
    name: 'Clinical Presenter',
    shortName: 'Presenter',
    icon: 'UserCheck',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    bgLight: 'bg-blue-50/70',
    borderLight: 'border-blue-200',
    description: 'Presents the patient narrative with clarity, highlighting pertinent positives and pertinent negatives.',
    duties: [
      'Delivers an organized, chronological summary of the clinical stem.',
      'Translates raw patient colloquial complaints into standardized medical descriptors.',
      'Acts as the patient advocate during diagnostic discussions.'
    ],
    keyQuestion: 'What are the pivotal trigger symptoms, timeline, and cardinal risk factors in this presentation?'
  },
  {
    id: 'problem_lead',
    name: 'Problem Representation Lead',
    shortName: 'Problem Lead',
    icon: 'Target',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    bgLight: 'bg-emerald-50/70',
    borderLight: 'border-emerald-200',
    description: 'Distills the clinical picture into a tight 1-2 sentence problem representation using semantic qualifiers.',
    duties: [
      'Applies the formula: Who (demographics + risk) + When (tempo/course) + What (clinical syndrome).',
      'Transforms vague terms into precise opposing semantic qualifiers (acute vs chronic, unilateral vs bilateral).',
      'Ensures the problem statement forms the exact anchor for generating the differential.'
    ],
    keyQuestion: 'Can we summarize this case in exactly two sentences using high-yield semantic qualifiers?'
  },
  {
    id: 'ddx_lead',
    name: 'Differential Diagnosis (DDx) Lead',
    shortName: 'DDx Lead',
    icon: 'Layers',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    bgLight: 'bg-amber-50/70',
    borderLight: 'border-amber-200',
    description: 'Leads the diagnostic pivot table and organizes hypotheses by pathophysiological probability and urgency.',
    duties: [
      'Demands the team identify "Must-Not-Miss" lethal diagnoses first.',
      'Organizes leading working diagnoses based on pre-test epidemiological likelihood.',
      'Identifies discriminating clinical features that differentiate competing hypotheses.'
    ],
    keyQuestion: 'What is the most lethal condition we cannot afford to miss, and what is our leading hypothesis?'
  },
  {
    id: 'investigation_strategist',
    name: 'Exam & Investigation Strategist',
    shortName: 'Investigator',
    icon: 'Microscope',
    color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    bgLight: 'bg-cyan-50/70',
    borderLight: 'border-cyan-200',
    description: 'Enforces hypothesis-driven diagnostic testing and deep-dives into weekly diagnostic assignments.',
    duties: [
      'Demands rationale before ordering tests (pre-test probability vs post-test action).',
      'Eliminates unguided "fishing expeditions" in lab investigations.',
      'Leads the team interpretation of the weekly core assignment (ECG, ABG, Renal/UFEME, LFT, FBC, etc.).'
    ],
    keyQuestion: 'How will the result of this specific test alter our immediate clinical decision-making?'
  },
  {
    id: 'management_lead',
    name: 'Management & Patient-Care Lead',
    shortName: 'Management Lead',
    icon: 'HeartHandshake',
    color: 'text-rose-700 bg-rose-50 border-rose-200',
    bgLight: 'bg-rose-50/70',
    borderLight: 'border-rose-200',
    description: 'Structures immediate resuscitation, definitive therapy, discharge planning, and Islamic/cultural care.',
    duties: [
      'Formulates emergency resuscitation (ABCDE) and definitive guideline-based treatment.',
      'Integrates Islamic medical considerations (prayer modifications/solat, fasting, halal medications).',
      'Plans patient education, safety-netting, and empathetic communication.'
    ],
    keyQuestion: 'What is our immediate stabilization plan, and how do we tailor care to the patient’s spiritual & holistic needs?'
  },
  {
    id: 'scribe',
    name: 'Scribe & Documentation Lead',
    shortName: 'Scribe',
    icon: 'FileText',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    bgLight: 'bg-purple-50/70',
    borderLight: 'border-purple-200',
    description: 'Accurately documents the team’s pre-commitments, consensus arguments, and compiles the final report.',
    duties: [
      'Enters the team’s typed commitments before unlocking the clinical reference stamps.',
      'Captures the Section 8 reflection answers from the team discussion.',
      'Generates and prints/exports the finalized SDL portfolio group report.'
    ],
    keyQuestion: 'Have I captured our exact team consensus and pre-commitment wording accurately?'
  },
  {
    id: 'devils_advocate',
    name: 'Devil’s Advocate & Metacognition Lead',
    shortName: 'Metacognition',
    icon: 'ShieldAlert',
    color: 'text-orange-700 bg-orange-50 border-orange-200',
    bgLight: 'bg-orange-50/70',
    borderLight: 'border-orange-200',
    description: 'Guards against cognitive traps, diagnostic momentum, premature closure, and anchoring bias.',
    duties: [
      'Asks: "What clinical finding does NOT fit our current diagnosis?"',
      'Challenges assumptions and forces the team to reconsider neglected alternative diagnoses.',
      'Prompts metacognitive reflection on where our reasoning could fail.'
    ],
    keyQuestion: 'Are we anchoring on an early impression, and what subtle red flag might we be overlooking?'
  }
];

export const DEFAULT_TEAMMATES = [
  'Ahmad Ridhwan',
  'Nurul Syahirah',
  'Muhammad Zulfaqar',
  'Fatima Az-Zahra',
  'Hafizuddin',
  'Aisyah Humaira',
  'Danial Iskandar',
  'Maryam Jameelah'
];
