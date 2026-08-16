import { SdlCase } from '../../types';

export const ENDOCRINOLOGY_CASE: SdlCase = {
  id: 'w6-endocrinology',
  week: 6,
  topicCategory: 'Endocrinology (+ Emergencies)',
  caseCode: 'SDL-W6-ENDO-DKA-HHS',
  title: 'Kussmaul Breathing & Altered Mental State in a Young Lady',
  subTitle: 'Diabetic Ketoacidosis (DKA) vs Hyperosmolar Hyperglycaemic State (HHS) & Acute Diabetic Emergencies',
  assignmentName: 'DKA Emergency Protocol, Anion Gap Calculation & Potassium Replacement Rules',
  stem: {
    patientName: 'Cik Nur Aina binti Zulkifli',
    age: 19,
    gender: 'Female',
    occupation: 'College student',
    setting: 'Emergency Department Resuscitation Zone',
    triageCategory: 'Red (Resuscitation)',
    presentingComplaint: 'Severe diffuse abdominal pain, persistent vomiting for 2 days, and deep rapid sighing breathing with altered consciousness for 6 hours.',
    historyOfPresentingIllness: [
      'Onset: Felt unwell 3 days ago with burning dysuria, urinary frequency, fever, and severe polyuria/polydipsia.',
      'Vomiting: Developed intractable non-bilious vomiting (unable to tolerate even water), throwing up >8 times yesterday.',
      'Abdominal Pain: Severe, cramping, diffuse abdominal pain rated 8/10; initially suspected acute appendicitis or food poisoning.',
      'Insulin default: Due to severe nausea and inability to eat, she purposely stopped taking her daily basal and bolus insulin injections ("I thought if I don’t eat, I shouldn’t take insulin").',
      'Breathing: Roommate noticed her breathing became extremely deep, loud, rapid, and her breath smelled sweet/fruity ("like overripe apples").'
    ],
    systemicReview: [
      'Endo: Severe polydipsia, polyuria, 4kg weight loss in 2 weeks.',
      'Resp: Kussmaul respiration (deep sighing tachypnoea).',
      'GI: Diffuse abdominal pain, vomiting, anorexia.',
      'Renal: Dysuria and foul-smelling urine 3 days ago.'
    ],
    pastMedicalSurgicalHistory: [
      'Type 1 Diabetes Mellitus diagnosed at age 14.',
      'Recurrent DKA episodes (2 previous hospitalizations during high school due to insulin omissions).'
    ],
    medications: [
      'Subcutaneous Insulin Glargine (Lantus) 22 units ON (stopped x 2 days)',
      'Subcutaneous Insulin Aspart (NovoRapid) 6 units TDS before meals (stopped x 2 days)'
    ],
    allergies: ['No known allergies.'],
    familyHistory: ['Maternal aunt has Hashimoto Thyroiditis.'],
    socialHistory: ['Non-smoker, non-drinker. First-year accounting student living in campus hostel.'],
    vitals: {
      bp: '92/58 mmHg (Orthostatic hypotension / severe dehydration)',
      hr: 128,
      rr: 34,
      spo2: '99% on room air',
      temp: '38.2°C',
      gcs: '13/15 (E3 V4 M6 - Lethargic, confused, opens eyes to voice)',
      painScore: '8/10 (diffuse pseudo-peritonitis)',
      rbs: '32.4 mmol/L (Severe Hyperglycaemia)'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Insulin Omission Pathophysiology',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Analyze the triggers, insulin omission myth ("No food = No insulin"), and pathophysiology of Kussmaul breathing and abdominal pain in DKA.',
      guidingQuestions: [
        'Why did insulin cessation precipitate massive lipolysis and ketogenesis?',
        'Why does DKA cause severe abdominal pain mimicking an acute surgical abdomen ("pseudo-peritonitis")?',
        'What is the underlying trigger of this DKA episode?'
      ],
      expertBenchmark: {
        title: 'Endocrine Emergency Synthesis',
        summary: 'A 19-year-old female with Type 1 DM presenting with Severe Diabetic Ketoacidosis (DKA) triggered by Urinary Tract Infection (UTI) and absolute insulin cessation.',
        keyPoints: [
          'Pathophysiology: Absolute insulin deficiency + surge in counter-regulatory hormones (glucagon, cortisol, epinephrine) stimulates hormone-sensitive lipase in adipose tissue -> Massive release of Free Fatty Acids (FFA) to liver -> Uncontrolled beta-oxidation into ketone bodies (Acetoacetate and Beta-hydroxybutyrate).',
          'Kussmaul Respiration: Respiratory compensation blowing off CO2 to mitigate severe metabolic acidosis.',
          'DKA Abdominal Pain (Pseudo-peritonitis): Caused by delayed gastric emptying, ileus, stretching of liver capsule, and severe acidosis affecting mesenteric plexus. Resolves with DKA resolution.',
          'Common Myth: Patients falsely believe they must withhold insulin when anorexic or vomiting, leading to fatal ketoacidosis.'
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
        summary: 'A 19-year-old lady with Type 1 Diabetes Mellitus presenting with acute severe dehydration, Kussmaul breathing, diffuse abdominal pain, and lethargy following insulin omission and febrile dysuria, consistent with severe Diabetic Ketoacidosis triggered by a urinary tract infection.',
        keyPoints: ['Young T1DM + Insulin omission + Infection trigger + Severe ketoacidosis + Dehydration.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Differentiate DKA vs Hyperosmolar Hyperglycaemic State (HHS) vs Alcoholic/Starvation Ketoacidosis vs Sepsis vs Acute Surgical Abdomen.',
      expertBenchmark: {
        title: 'Endocrine Differential Hierarchy',
        summary: '1. Severe Diabetic Ketoacidosis (Leading, 95%); 2. Hyperosmolar Hyperglycaemic State (HHS) / Mixed DKA-HHS; 3. Urosepsis with septic shock; 4. Acute Appendicitis / Peritonitis; 5. Euglycaemic DKA (e.g. SGLT2i associated).',
        keyPoints: [
          'DKA criteria: Hyperglycaemia (>11.0 mmol/L) + Ketonemia (>3.0 mmol/L) + Metabolic Acidosis (pH < 7.30, HCO3 < 15, Anion Gap > 12).',
          'HHS typically features glucose > 33.3 mmol/L, osmolality > 320 mOsm/kg, without significant acidosis (pH > 7.30, HCO3 > 18).'
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
      prompt: 'Identify clinical signs of severe volume depletion (10% body weight fluid deficit), sweet acetone breath odor, and pseudo-peritonitis.',
      expertBenchmark: {
        title: 'Targeted Examination Findings',
        summary: 'General: Lethargic, flushed dry warm skin, sweet fruity/acetone breath odor, deep rapid sighing Kussmaul breathing (RR 34). Vitals: BP 92/58, HR 128 (regular tachycardia), Temp 38.2°C, SpO2 99%. Hydration Status: Sunken eyeballs, dry cracked tongue and buccal mucosa, skin turgor sluggish (>3 seconds), prolonged capillary refill time (3.5s) indicating 8-10 Liters total body water deficit. Abdomen: Diffuse tenderness across all quadrants without involuntary guarding or localized right iliac fossa tenderness; bowel sounds hypoactive (paralytic ileus).',
        keyPoints: [
          'Fluid deficit: Average adult DKA patient is 6 to 10 Liters depleted.',
          'Kussmaul breathing: Classic hyperpnoea and tachypnoea.',
          'Fruity breath: Exhaled volatile acetone.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 6 Core Assignment: DKA Protocol & Anion Gap',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Calculate the Serum Anion Gap, Effective Osmolality, Corrected Sodium, and formulate the emergency Potassium Replacement Protocol.',
      assignmentDetails: {
        assignmentTitle: 'Week 6 Assignment: DKA Anion Gap & Fluid/Potassium Calculations',
        type: 'dka',
        data: {
          venousBloodGas: {
            pH: '7.12 (Severe Acidosis, normal 7.35 - 7.45; pH < 7.10 = Severe DKA)',
            pCO2: '18 mmHg (Respiratory compensation)',
            hco3: '6.4 mmol/L (Severely depleted, normal 22 - 26 mmol/L)',
            baseExcess: '-19.2 mmol/L',
            lactate: '2.1 mmol/L'
          },
          biochemistryAndElectrolytes: {
            randomBloodGlucose: '32.4 mmol/L',
            serumKetones: '6.8 mmol/L (Beta-hydroxybutyrate, normal < 0.6; > 3.0 confirms DKA)',
            sodium: '128 mmol/L',
            potassium: '5.2 mmol/L (Total body K+ is profoundly depleted despite "normal/high" serum value!)',
            chloride: '94 mmol/L',
            urea: '14.8 mmol/L',
            creatinine: '142 µmol/L (Acute pre-renal azotemia)',
            anionGapCalculation: 'Anion Gap = Na - (Cl + HCO3) = 128 - (94 + 6.4) = 27.6 mmol/L (Markedly elevated High Anion Gap Metabolic Acidosis, normal 8 - 12 mmol/L)',
            correctedSodium: 'Corrected Na = Na + 1.6 x [(Glucose - 5.5) / 5.5] = 128 + 1.6 x (26.9/5.5) = 128 + 7.8 = 135.8 mmol/L'
          },
          urineFullAndMicroscopicExam: 'Urine Ketones 4+, Glucose 4+, Protein 1+, WBC 20-30/HPF with clumps, Bacteria 3+ (Confirms acute urinary tract infection/pyuria trigger).'
        }
      },
      expertBenchmark: {
        title: 'Expert DKA Lab Interpretation & Potassium Rule',
        summary: 'Severe Diabetic Ketoacidosis (pH 7.12, HCO3 6.4, Ketones 6.8, Anion Gap 27.6) with severe dehydration, pre-renal AKI, and acute pyelonephritis/UTI trigger.',
        keyPoints: [
          'High Anion Gap Metabolic Acidosis (HAGMA = 27.6 mmol/L) driven by unmeasured ketoacids (beta-hydroxybutyrate and acetoacetate).',
          'THE POTASSIUM PARADOX: Serum K+ appears normal (5.2) because acidemia and insulin deficiency force K+ out of cells. HOWEVER, osmotic diuresis has caused MASSIVE total body potassium depletion. Once insulin and fluids are started, K+ rushes back into cells causing fatal hypokalaemic cardiac arrhythmias if potassium is not supplemented proactively!',
          'POTASSIUM REPLACEMENT RULE: If K+ is 3.5 - 5.5 mmol/L, add 20-30 mmol KCl per liter of IV infusion once urine output is established. If K+ < 3.5, DO NOT START INSULIN until K+ is corrected above 3.5!'
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
      prompt: 'State the complete diagnostic label including severity grade and precipitating cause.',
      expertBenchmark: {
        title: 'Definitive Diagnostic Formulation',
        summary: 'Severe Diabetic Ketoacidosis (pH 7.12, HCO3 6.4 mmol/L, Ketones 6.8 mmol/L, Anion Gap 27.6) with Severe Dehydration and Pre-renal Acute Kidney Injury, precipitated by Acute Urinary Tract Infection and Insulin Omission in Type 1 Diabetes Mellitus.',
        keyPoints: ['Classification: Severe DKA.', 'Precipitant: UTI + Insulin omission.', 'Complications: Acute dehydration & pre-renal azotemia.']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Resuscitation & DKA Treatment Protocol',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Formulate the 4 Pillars of DKA Management: 1. Fluid Resuscitation Curve; 2. Fixed-Rate IV Insulin Infusion (FRIII); 3. Potassium Replacement; 4. Infection Treatment & Glucose Monitoring.',
      expertBenchmark: {
        title: 'Emergency DKA Management Protocol',
        summary: 'IV 0.9% Normal Saline + Fixed Rate IV Insulin (0.1 units/kg/hr) + Potassium replacement + IV Ceftriaxone for UTI.',
        keyPoints: [
          'Pillar 1: Aggressive Fluid Resuscitation: Hour 1: 1000ml Normal Saline 0.9% over 1 hour. Hour 2-3: 1000ml over 2 hours with KCl. Hour 4-5: 1000ml over 2 hours with KCl. Hour 6-9: 1000ml over 4 hours. Total ~ 6 Liters in 24 hours.',
          'Pillar 2: Fixed-Rate Intravenous Insulin Infusion (FRIII): Start Actrapid at 0.1 units/kg/hour (e.g., 5-6 units/hour). Target ketone drop >= 0.5 mmol/L/hour or glucose drop 3-4 mmol/L/hour. DO NOT STOP INSULIN when glucose drops below 14 mmol/L; instead, ADD 5% or 10% Dextrose infusion while continuing insulin to clear ketoacidosis!',
          'Pillar 3: Potassium Management: Add 20-30 mmol KCl per liter of infusion once urine output > 0.5 ml/kg/hr. Maintain serum K+ between 4.0 - 5.0 mmol/L.',
          'Pillar 4: Treat Precipitant: IV Ceftriaxone 1g OD for acute UTI.',
          'Resolution Criteria: Blood ketones < 0.6 mmol/L, Venous pH > 7.30, Bicarbonate >= 18 mmol/L, Anion gap normalized. Transition to subcutaneous insulin with overlap of 1-2 hours before stopping IV insulin.'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Sick Day Rules, Islamic Care & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Formulate "Sick Day Rules" education, Ramadan fasting assessment in T1DM, and Section 8 group reflection.',
      expertBenchmark: {
        title: 'Diabetic Education & Islamic Bioethics',
        summary: 'Structured Sick Day Management, Ramadan High-Risk Category assessment, and metacognitive debriefing.',
        keyPoints: [
          'Sick Day Rules (NEVER OMIT INSULIN!): Check blood glucose and blood ketones every 2-4 hours. Continue basal insulin even if vomiting. Drink plenty of fluids (sips of water, broth, or sweet drinks if blood glucose is low). Contact medical team immediately if vomiting persists > 4 hours or ketones > 1.5 mmol/L.',
          'Ramadan Fasting Risk Stratification (IDF-DAR Guidelines): Type 1 DM with poor control and history of recent DKA is categorized as VERY HIGH RISK (Red Category). Fasting is religiously exempt and medically contraindicated to preserve life.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'Severe metabolic acidosis and delirium exempt the patient from prayer while unconscious. During recovery with IV cannula and catheter, perform prayer in sitting or lying posture with Tayammum if needed.',
    fastingRamadanGuidance: 'Type 1 Diabetes Mellitus with history of recurrent DKA falls under the International Diabetes Federation & DAR "Very High Risk" category. Islamic law (Shariah) mandates preserving health (Hifz an-Nafs); fasting is medically unsafe and exempted; fidyah applies.',
    halalMedicationAndDiet: 'Recombinant human insulin and electrolyte infusions are halal. Explain the medical necessity of life-saving intravenous therapy.',
    familyCommunicationAndBioethics: 'Counsel Cik Aina and her parents on avoiding guilt/stigma around diabetes, emphasizing empowered self-monitoring and hostel safety-netting.',
    patientEducationAndHolisticWellness: 'Reinforce "Sick Day Rules" and provide a blood ketone meter for early home detection of ketosis.'
  },
  keyLearningPoints: [
    'NEVER STOP INSULIN during illness: Infection increases stress hormones and insulin resistance; withholding insulin leads directly to DKA.',
    'Potassium Paradox: Serum K+ may be normal or high initially due to acidemia, but total body K+ is severely depleted. Supplement K+ early once insulin starts.',
    'When blood glucose drops below 14 mmol/L, DO NOT stop the insulin infusion; add 5-10% Dextrose to continue insulin suppression of lipolysis and ketogenesis.',
    'DKA resolution is defined by clearance of ketoacidosis (Ketones < 0.6 mmol/L, pH > 7.30, HCO3 >= 18), NOT merely normalization of blood glucose.'
  ],
  referenceGuidelines: [
    'Malaysian Clinical Practice Guidelines on Management of Type 2 & Type 1 Diabetes Mellitus (2020)',
    'Joint British Diabetes Societies (JBDS) for Inpatient Care: The Management of Diabetic Ketoacidosis in Adults (2021)',
    'IDF-DAR Practical Guidelines on Diabetes and Ramadan'
  ]
};
