import { SdlCase } from '../../types';

export const HAEM_INFECTIOUS_CASE: SdlCase = {
  id: 'w8-haem-infectious',
  week: 8,
  topicCategory: 'Haematology + Infectious Disease',
  caseCode: 'SDL-W8-INFECT-DENGUE-FBC',
  title: 'Acute Fever, Severe Abdominal Pain & Bleeding Manifestations',
  subTitle: 'Severe Dengue with Warning Signs & Critical Phase Plasma Leakage vs Leptospirosis & Malaria',
  assignmentName: 'Full Blood Count (FBC) & Serial Haematocrit Monitoring in Dengue',
  stem: {
    patientName: 'Encik Muhammad Irfan bin Salleh',
    age: 32,
    gender: 'Male',
    occupation: 'Construction site supervisor in Petaling Jaya',
    setting: 'Emergency Department Assessment / Observation Bay',
    triageCategory: 'Yellow (Urgent)',
    presentingComplaint: 'Day 5 of acute high-grade fever, which suddenly subsided this morning but was followed by severe persistent abdominal pain, frequent vomiting, bleeding gums, and profound lethargy.',
    historyOfPresentingIllness: [
      'Febrile phase (Day 1 - 4): Sudden onset high fever (up to 39.5°C), severe retro-orbital headache, diffuse myalgia ("break-bone fever"), backache, and arthralgia.',
      'Transition to Critical Phase (Day 5 - today): Temperature broke/defervesced this morning to 37.1°C, but instead of feeling better, he felt markedly weaker, dizzy when standing up, developed severe continuous epigastric and right upper quadrant abdominal pain, and vomited 4 times (clear fluid with flecks of coffee-ground material).',
      'Bleeding: Noticed spontaneous bleeding from gums while brushing teeth and multiple pinpoint reddish spots (petechiae) appearing over bilateral forearms and shins.',
      'Urine output: Reduced urine frequency; has not passed urine for the last 8 hours.'
    ],
    systemicReview: [
      'ID: Acute fever defervescing on Day 5, retro-orbital pain, severe myalgia.',
      'Warning Signs: Persistent vomiting, severe abdominal pain, clinical fluid accumulation, mucosal bleeding, lethargy/restlessness, tender hepatomegaly.',
      'Renal: Oliguria.',
      'Resp: Mild exertional breathlessness.'
    ],
    pastMedicalSurgicalHistory: ['No chronic medical illnesses. Had a mild febrile illness diagnosed as "viral fever" 4 years ago (probable primary dengue infection).'],
    medications: ['Paracetamol 1g QID for fever. Avoided NSAIDs.'],
    allergies: ['No known allergies.'],
    familyHistory: ['Two colleagues at the construction site were recently admitted for Dengue fever.'],
    socialHistory: ['Works outdoors at construction sites with multiple stagnant water puddles. Non-smoker.'],
    vitals: {
      bp: '98/78 mmHg (Narrow Pulse Pressure = 20 mmHg -> Impending Dengue Shock Syndrome!)',
      hr: 114,
      rr: 22,
      spo2: '96% on room air',
      temp: '37.1°C (Defervescence phase)',
      gcs: '15/15 (Restless, pale, cold clammy peripheries)',
      painScore: '7/10 (epigastric/RUQ pain)',
      rbs: '5.4 mmol/L'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & The 3 Phases of Dengue Infection',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Identify the exact phase of Dengue (Febrile vs Critical vs Recovery). Highlight the clinical "Warning Signs" and explain why defervescence is the DANGER PERIOD.',
      guidingQuestions: [
        'What are the 7 WHO/CPG Warning Signs of Dengue?',
        'Why is the transition phase (Day 4-6 / defervescence) the critical window for plasma leakage and shock?',
        'What does a narrow pulse pressure (BP 98/78, PP 20 mmHg) signify?'
      ],
      expertBenchmark: {
        title: 'Dengue Pathophysiology & Phase Identification',
        summary: 'A 32-year-old male with Day 5 Dengue infection transitioning into the CRITICAL PHASE (Plasma Leakage Phase) with multiple WARNING SIGNS and Impending Dengue Shock Syndrome (Compensated Shock).',
        keyPoints: [
          'The 3 Phases of Dengue: 1. Febrile Phase (Day 1-4); 2. Critical / Plasma Leakage Phase (Day 4-7, lasting 24-48 hours around defervescence); 3. Recovery / Convalescent Phase (Day 7-10).',
          'Danger of Defervescence: When fever drops on Day 5, parents/patients assume recovery, but this is the EXACT TIMING when immune-mediated endothelial hyperpermeability triggers massive plasma leakage into pleural/peritoneal cavities.',
          'Documented Warning Signs: 1. Persistent vomiting; 2. Severe abdominal pain; 3. Mucosal bleeding (gums, coffee-ground vomitus); 4. Lethargy/restlessness; 5. Oliguria (<8h); 6. Tender hepatomegaly; 7. Haemoconcentration with rapid platelet drop.',
          'Narrow Pulse Pressure (PP = Systolic - Diastolic = 98 - 78 = 20 mmHg): Classic sign of compensated dengue shock! Vasoconstriction elevates diastolic BP to maintain organ perfusion while stroke volume drops.'
        ]
      }
    },
    {
      stageKey: 'problem_representation',
      stageNumber: 2,
      title: 'Problem Representation',
      shortTitle: 'Problem Rep',
      suggestedDurationMinutes: 5,
      primaryRole: 'problem_lead',
      prompt: 'Synthesize a 2-sentence problem statement with semantic qualifiers.',
      expertBenchmark: {
        title: 'Expert Problem Representation',
        summary: 'A 32-year-old male construction supervisor on Day 5 of acute dengue infection presenting at defervescence with multiple clinical warning signs (severe abdominal pain, persistent vomiting, mucosal bleeding, oliguria) and compensated shock with narrowed pulse pressure, consistent with Dengue with Warning Signs transitioning to Severe Dengue Shock.',
        keyPoints: ['Day 5 Dengue + Defervescence + Multiple Warning Signs + Compensated Shock (PP 20 mmHg) + Plasma leakage.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Construct the differential diagnosis for acute tropical febrile illness with thrombocytopenia and shock.',
      expertBenchmark: {
        title: 'Tropical Infectious Disease Differential Hierarchy',
        summary: '1. Dengue with Warning Signs transitioning to Severe Dengue Shock Syndrome (Leading, 90%); 2. Severe Leptospirosis (Weil Disease - jaundice, renal failure, conjunctival suffusion); 3. Severe Plasmodium falciparum Malaria; 4. Acute Typhoid Fever with intestinal perforation; 5. Acute Meningococcemia / Sepsis.',
        keyPoints: [
          'Dengue is highest probability in Malaysia (urban Petaling Jaya, construction site cluster, day 5 defervescence).',
          'Leptospirosis must be considered (outdoor occupational exposure, myalgia, conjunctival suffusion).'
        ]
      }
    },
    {
      stageKey: 'physical_examination',
      stageNumber: 4,
      title: 'Targeted Physical Examination',
      shortTitle: 'Exam',
      suggestedDurationMinutes: 7,
      primaryRole: 'investigation_strategist',
      prompt: 'Detail the physical examination for plasma leakage (pleural effusion, ascites, hepatomegaly), microvascular bleeding, and hemodynamic shock grading.',
      expertBenchmark: {
        title: 'Targeted Examination Findings',
        summary: 'General: Restless, anxious, pale, cold clammy peripheries, capillary refill time (CRT) prolonged at 3.5 seconds. Vitals: BP 98/78 mmHg (Narrow pulse pressure 20 mmHg), Pulse 114 bpm (thready, low volume), Temp 37.1°C, RR 22. Skin: Positive tourniquet test (>20 petechiae per square inch), scattered petechial purpura on extremities, active oozing from gums, no jaundice. Chest: Stony dullness on percussion and diminished breath sounds over right lung base (Right Pleural Effusion). Abdomen: Distended, moderate tender hepatomegaly (liver palpable 3 cm below right costal margin), shifting dullness positive (Ascites). Extremities: Cold fingertips and toes.',
        keyPoints: [
          'Signs of Compensated Dengue Shock: Tachycardia (114), narrow pulse pressure (20 mmHg), cool clammy extremities, delayed CRT > 2s.',
          'Objective Signs of Plasma Leakage: Right-sided pleural effusion + Ascites + Tender hepatomegaly.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 8 Core Assignment: FBC & Haematocrit Trend',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Analyze the Full Blood Count (FBC) parameters: Calculate the percentage rise in Haematocrit (Hct) from baseline, assess Thrombocytopenia and Leukopenia, and evaluate Dengue Serologies (NS1 Ag, IgM, IgG).',
      assignmentDetails: {
        assignmentTitle: 'Week 8 Assignment: Full Blood Count & Haematocrit Trend Analysis',
        type: 'fbc',
        data: {
          fullBloodCountDay5: {
            hemoglobin: '17.2 g/dL (Elevated due to hemoconcentration, baseline ~14.0)',
            haematocrit: '51.5% (Baseline estimated or measured at day 1: 40.0%)',
            haematocritRiseCalculation: 'Percentage Hct Rise = [(Current Hct - Baseline Hct) / Baseline Hct] x 100 = [(51.5 - 40.0) / 40.0] x 100 = 28.75% rise (> 20% rise is the objective diagnostic hallmark of SIGNIFICANT PLASMA LEAKAGE / Severe Dengue)',
            whiteBloodCellCount: '2.8 x 10^9/L (Leukopenia with atypical reactive lymphocytes on peripheral blood film)',
            neutrophils: '48%',
            lymphocytes: '46%',
            monocytes: '6%',
            plateletCount: '28 x 10^9/L (Severe Thrombocytopenia, precipitously dropped from 120 x 10^9/L yesterday)'
          },
          dengueSerologyAndPcr: {
            dengueNs1Antigen: 'Positive / Reactive',
            dengueIgm: 'Positive',
            dengueIgg: 'Positive (High titer IgG suggests Secondary Dengue Infection - major risk factor for antibody-dependent enhancement / ADE and severe dengue shock!)'
          },
          biochemistryAndUltrasound: {
            ast: '280 U/L (Elevated, AST typically > ALT in dengue due to myocyte/hepatic release)',
            alt: '165 U/L',
            serumAlbumin: '28 g/L (Low due to trans-capillary leakage)',
            bedsideUltrasound: 'Gallbladder wall thickening (4.5mm, "double-rim" sign of plasma leakage), right basal pleural effusion, mild ascites in Morrison’s pouch.'
          }
        }
      },
      expertBenchmark: {
        title: 'Expert FBC & Serological Synthesis',
        summary: 'Severe Secondary Dengue Infection with Objective Plasma Leakage (Haematocrit rise 28.8% >= 20%), Severe Thrombocytopenia (28k), Leukopenia, and Impending Dengue Shock.',
        keyPoints: [
          'Haematocrit >= 20% rise is the single most critical hemodynamic monitoring parameter in Dengue, reflecting the exact magnitude of intravascular volume loss into third spaces.',
          'Secondary Dengue Infection (IgG positive in acute phase): Puts patient at high risk of Antibody-Dependent Enhancement (ADE), driving cytokine storm and severe endothelial breakdown.',
          'Gallbladder Wall Thickening on POCUS is a reliable bedside surrogate for plasma leakage.'
        ]
      }
    },
    {
      stageKey: 'definitive_diagnosis',
      stageNumber: 6,
      title: 'Definitive Working Diagnosis',
      shortTitle: 'Diagnosis',
      suggestedDurationMinutes: 5,
      primaryRole: 'problem_lead',
      prompt: 'Formulate the complete diagnostic classification according to WHO / Malaysian Dengue CPG.',
      expertBenchmark: {
        title: 'Definitive Diagnostic Formulation',
        summary: 'Severe Dengue (Critical Phase, Day 5) with Significant Plasma Leakage (Hct rise 28.8%, Pleural Effusion, Ascites), Compensated Dengue Shock Syndrome (Narrow Pulse Pressure 20 mmHg, Tachycardia), Severe Thrombocytopenia (Platelets 28 x 10^9/L), and Dengue Hepatitis (AST > 200 U/L), in a Secondary Dengue Infection.',
        keyPoints: ['Classification: Severe Dengue / Dengue Shock Syndrome (Compensated).']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Fluid Resuscitation & Strict Monitoring Protocol',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Construct the step-by-step Dengue Shock Resuscitation Fluid Regimen: 1. Crystalloid bolus; 2. Step-down fluid titration; 3. Platelet transfusion indications (myth vs reality); 4. Monitoring frequency.',
      expertBenchmark: {
        title: 'Malaysian CPG Dengue Shock Management Protocol',
        summary: 'Immediate Isotonic Crystalloid Bolus (5-10 ml/kg/hr) -> Serial Hct tracking -> Titrated step-down -> Avoid prophylactic platelet transfusion.',
        keyPoints: [
          'Compensated Shock Fluid Regimen: Start IV Crystalloid (Normal Saline 0.9% or Hartmann’s Solution) at 5 - 10 ml/kg/hour over 1 - 2 hours (e.g. 500-700ml/hr for 70kg patient).',
          'Titration & Step-Down: If vitals improve and Hct drops: Step down to 5-7 ml/kg/hr for 2-4 hours -> then 3-5 ml/kg/hr for 2-4 hours -> then 2-3 ml/kg/hr. TOTAL critical phase fluid quota should NOT exceed maintenance + 5% deficit (~2500 - 3000 ml over 24-48 hours) to prevent fatal pulmonary edema when plasma reabsorbs!',
          'Serial Monitoring: Monitor BP, Pulse Pressure, HR, Urine Output (target >= 0.5 ml/kg/hr), and repeat FBC/Hct every 4 - 6 hours during the critical 48 hours.',
          'PLATELET TRANSFUSION MYTH: Prophylactic platelet transfusion is STRICTLY NOT RECOMMENDED regardless of how low the platelet count is (even < 20k), because transfused platelets are rapidly destroyed and transfusion increases risk of fluid overload and pulmonary edema. Platelets are indicated ONLY in severe life-threatening active clinical bleeding!'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Recovery Signs, Islamic Care & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Explain the signs of the Recovery Phase (Isles of white in sea of red), fluid overload precautions, community prevention (Gotong-royong), and Section 8 reflection.',
      expertBenchmark: {
        title: 'Recovery Phase, Public Health & Bioethics',
        summary: 'Recognition of convalescent rash, stopping IV fluids in recovery to prevent pulmonary edema, public health vector control, and metacognitive reflection.',
        keyPoints: [
          'Signs of Recovery Phase (Day 7): Spontaneous diuresis, return of appetite, stabilization of Hct, rising platelet count, and appearance of classic convalescent rash ("Isles of white in a sea of red" / Herman’s rash with intense pruritus).',
          'STOPPING FLUIDS: The moment the patient enters recovery (after 48 hours of critical phase), IV FLUIDS MUST BE STOPPED promptly; failing to stop fluids causes hypervolemic pulmonary edema as leaked plasma re-enters the circulation.',
          'Public Health & Community Responsibility (Fardhu Kifayah): Mandatory notification to District Health Office (PKD) within 24 hours. Organizing neighborhood search-and-destroy gotong-royong to eliminate Aedes breeding sites.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'During the critical phase with postural hypotension, narrowed pulse pressure, and continuous IV infusions, solat can be performed lying down or sitting (solat secara duduk/baring). Combining prayers (Jamak) is permissible during active acute resuscitation.',
    fastingRamadanGuidance: 'Fasting is strictly prohibited during the acute and critical phases of Dengue due to the paramount need for continuous oral fluid hydration and intravenous plasma volume maintenance.',
    halalMedicationAndDiet: 'Isotonic crystalloids (Hartmann’s / Normal Saline) and paracetamol are halal. Traditional drinks like papaya leaf extract or crab soup can be taken for comfort/hydration if well-tolerated, but must NEVER replace medical isotonic fluid therapy.',
    familyCommunicationAndBioethics: 'Explain to the family that the dropping fever on Day 5 is not the end of illness, but requires close hospital surveillance during the 48-hour critical window.',
    patientEducationAndHolisticWellness: 'Community cleanliness and vector eradication as an Islamic civic obligation (Kebersihan sebahagian daripada iman).'
  },
  keyLearningPoints: [
    'The critical phase of Dengue occurs at DEFERVESCENCE (Day 4-7) and lasts 24 to 48 hours; this is the primary window for plasma leakage and shock.',
    'A narrowing pulse pressure (<= 20 mmHg) is the cardinal hallmark of compensated dengue shock and demands immediate IV fluid resuscitation.',
    'Haematocrit rise >= 20% objectively defines significant plasma leakage.',
    'Do NOT give prophylactic platelet transfusions in Dengue; focus entirely on judicious isotonic crystalloid volume titration and stop fluids promptly upon entering recovery.'
  ],
  referenceGuidelines: [
    'Ministry of Health Malaysia - Clinical Practice Guidelines on Management of Dengue Infection in Adults (3rd Edition, 2015)',
    'WHO Comprehensive Guidelines for Prevention and Control of Dengue and Dengue Haemorrhagic Fever',
    'Malaysian Society of Infectious Diseases and Chemotherapy (MSIDC) Guidelines'
  ]
};
