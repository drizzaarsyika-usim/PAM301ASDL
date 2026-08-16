import { SdlCase } from '../../types';

export const NEPHROLOGY_CASE: SdlCase = {
  id: 'w4-nephrology',
  week: 4,
  topicCategory: 'Nephrology',
  caseCode: 'SDL-W4-NEPHRO-AKI-UFEME',
  title: 'Oliguria & Periorbital Puffiness in a Hypertensive Diabetic',
  subTitle: 'Acute-on-Chronic Kidney Injury (Pre-renal vs ATN vs Glomerulonephritis) & Drug-Induced Nephrotoxicity',
  assignmentName: 'Renal Profile, FeNa Calculation & UFEME Urinary Cast Interpretation',
  stem: {
    patientName: 'Haji Osman bin Abdullah',
    age: 68,
    gender: 'Male',
    occupation: 'Retired civil servant',
    setting: 'Medical Ward / Day Care Unit',
    triageCategory: 'Yellow (Urgent)',
    presentingComplaint: 'Marked reduction in urine output (< 300 ml in 24 hours), bilateral leg swelling, and generalized nausea for 4 days.',
    historyOfPresentingIllness: [
      'Onset: 5 days ago developed acute watery diarrhea (5-6 watery stools per day) and vomiting after eating leftover seafood at a village gathering (kenduri).',
      'Medication intake: To relieve severe knee osteoarthritis pain exacerbated by vomiting, took over-the-counter Mefenamic Acid (Ponstan 500mg TDS) and traditional herbal joint pills (jamu) for 5 consecutive days.',
      'Urine changes: Noticed dark, tea-colored, foamy urine with severe drop in volume to less than a small teacup per day (oliguria).',
      'Associated symptoms: Metallic taste in the mouth, intractable hiccups, loss of appetite, and progressive shortness of breath when lying flat.'
    ],
    systemicReview: [
      'Renal: Oliguria, tea-colored frothy urine, no dysuria or fever.',
      'GI: Anorexia, nausea, resolving diarrhea, hiccups.',
      'CVS: Bilateral pitting ankle edema and periorbital puffiness.',
      'Neuro: Drowsiness and asterixis (flapping tremor).'
    ],
    pastMedicalSurgicalHistory: [
      'Type 2 Diabetes Mellitus x 20 years with known Diabetic Retinopathy and microalbuminuria.',
      'Hypertension x 15 years.',
      'Baseline baseline serum creatinine (3 months ago): 130 µmol/L (eGFR 48 ml/min/1.73m², CKD Stage 3a).'
    ],
    medications: [
      'Tab Perindopril 4mg OD (ACE-Inhibitor)',
      'Tab Metformin 500mg BD',
      'Tab Gliclazide 40mg OD',
      'Tab Mefenamic Acid (Ponstan) 500mg TDS (self-prescribed x 5 days)',
      'Traditional unregistered herbal concoction for joints'
    ],
    allergies: ['No known drug allergies.'],
    familyHistory: ['Elder brother on regular haemodialysis.'],
    socialHistory: ['Non-smoker, non-drinker. Active in local surau committee.'],
    vitals: {
      bp: '168/98 mmHg (Volume overload / acute hypertensive surge)',
      hr: 88,
      rr: 22,
      spo2: '94% on room air',
      temp: '37.0°C',
      gcs: '14/15 (mildly encephalopathic / uremic frost on skin)',
      painScore: '2/10 (bilateral knee ache)',
      rbs: '11.4 mmol/L'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Triple Whammy Nephrotoxic Insult',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Identify the synergistic nephrotoxic mechanisms in Haji Osman’s history. Explain the classic "Triple Whammy" drug interaction.',
      guidingQuestions: [
        'What constitutes the "Triple Whammy" on renal hemodynamics (Dehydration/Hypovolemia + NSAID + ACE-Inhibitor)?',
        'How does Metformin accumulation become hazardous in acute kidney injury?',
        'What are the red flags of uremic syndrome here?'
      ],
      expertBenchmark: {
        title: 'Triple Whammy & Uremic Syndromic Analysis',
        summary: 'A 68-year-old diabetic male with baseline CKD Stage 3a who developed Acute Kidney Injury (KDIGO Stage 3) due to volume depletion + NSAID-induced afferent arteriolar vasoconstriction + ACEi-induced efferent arteriolar vasodilation, complicated by Metformin-associated lactic acidosis risk.',
        keyPoints: [
          'Pre-renal + Hemodynamic insult: Diarrhea causes hypovolemia. NSAIDs block prostaglandin synthesis -> Constricts afferent arteriole. ACE-Inhibitors block Angiotensin II -> Dilates efferent arteriole. Together, this obliterates glomerular capillary perfusion pressure.',
          'Metformin Toxicity: In acute renal failure (GFR < 30), Metformin accumulates, predisposing to fatal Metformin-Associated Lactic Acidosis (MALA).',
          'Uremic features: Nausea, metallic taste, intractable hiccups, asterixis, and uremic frost.'
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
      prompt: 'Synthesize into a 2-sentence problem statement with semantic qualifiers.',
      expertBenchmark: {
        title: 'Expert Problem Representation',
        summary: 'A 68-year-old gentleman with baseline diabetic nephropathy and CKD Stage 3a presenting with subacute oliguria, fluid overload, and uremic symptoms following gastrointestinal fluid loss and heavy NSAID ingestion while on an ACE-inhibitor, consistent with severe acute-on-chronic kidney injury.',
        keyPoints: ['Baseline diabetic CKD + Volume loss + Nephrotoxic exposure (Triple Whammy) + Acute oliguric AKI with uremic features.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Differentiate Pre-renal azotemia vs Acute Tubular Necrosis (ATN) vs Acute Interstitial Nephritis (AIN) vs Rapidly Progressive Glomerulonephritis (RPGN) vs Obstructive Uropathy (BPH).',
      expertBenchmark: {
        title: 'Nephrology Differential Hierarchy',
        summary: '1. Acute Tubular Necrosis (ATN) secondary to prolonged ischemic/toxic insult (Leading); 2. Hemodynamic Pre-Renal AKI (Initiating); 3. Drug-Induced Acute Interstitial Nephritis / Herbal Nephropathy; 4. Rapidly Progressive Glomerulonephritis / Crescentic GN; 5. Post-renal obstruction (BPH / renal calculi).',
        keyPoints: [
          'ATN is most likely given transition from dehydration + NSAIDs to persistent oliguria not responsive to simple fluids.',
          'AIN must be considered due to NSAIDs and unverified herbal pills (look for eosinophiluria, fever, arthralgia).',
          'Post-renal bladder outlet obstruction must be ruled out with bedside ultrasound/catheterization.'
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
      prompt: 'Detail fluid volume status assessment (Hypervolemia vs Hypovolemia) and uremic physical signs.',
      expertBenchmark: {
        title: 'Examination Findings',
        summary: 'General: Lethargic, sallow uremic complexion, flapping tremor (asterixis) on dorsiflexion of wrists. Vitals: BP 168/98 mmHg, HR 88, SpO2 94% on room air. Fluid Overload Signs: Elevated JVP (+4 cm), bilateral periorbital edema, bilateral 2+ pitting pedal edema up to mid-shins, bibasilar fine lung crackles at bases. Abdomen: Soft, non-tender, no palpable bladder or renal angle tenderness. Skin: Scratch excoriations (uremic pruritus), no rash.',
        keyPoints: [
          'Transition from initial hypovolemia (diarrhea) to gross hypervolemia/fluid overload due to oliguria and continuous salt/water retention.',
          'Asterixis confirms significant uremic encephalopathy.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 4 Core Assignment: Renal Profile & UFEME',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Interpret the Renal Profile, calculate the Fractional Excretion of Sodium (FeNa), and analyze the UFEME urinary microscopy (casts, proteinuria, hematuria).',
      assignmentDetails: {
        assignmentTitle: 'Week 4 Assignment: Renal Profile & UFEME Cast Deep-Dive',
        type: 'renal_ufeme',
        data: {
          serumRenalProfile: {
            urea: '28.4 mmol/L (Elevated, baseline 6.5)',
            creatinine: '612 µmol/L (Markedly elevated, baseline 130 µmol/L; >4.5x rise = KDIGO Stage 3 AKI)',
            estimatedGFR: '8 ml/min/1.73m²',
            sodium: '132 mmol/L',
            potassium: '6.4 mmol/L (Severe Hyperkalaemia with peaked T waves on ECG!)',
            chloride: '98 mmol/L',
            bicarbonate: '14 mmol/L (Severe High Anion Gap Metabolic Acidosis)'
          },
          urinaryBiomarkers: {
            urinarySodium: '54 mmol/L (Urine Na > 40 indicates tubular dysfunction)',
            fractionalExcretionOfSodium: 'FeNa = 3.2% (> 2% indicates intrinsic Acute Tubular Necrosis / renal parenchymal injury rather than pre-renal state)'
          },
          ufemeAndMicroscopy: {
            color: 'Dark brown / smoky',
            specificGravity: '1.010 (Isosthenuria - loss of concentrating ability in ATN)',
            protein: '3+ (3.0 g/L)',
            rbc: '5-10 / HPF (eumorphic)',
            wbc: '2-4 / HPF',
            casts: 'Abundant Muddy Brown Granular Casts and renal tubular epithelial cell casts. NO red blood cell casts (rules out acute glomerulonephritis) and NO eosinophils.'
          },
          renalUltrasound: 'Normal size kidneys (Right 10.5cm, Left 10.8cm) with increased cortical echogenicity. No hydronephrosis or calculi.'
        }
      },
      expertBenchmark: {
        title: 'Expert Interpretation: Renal Profile & UFEME',
        summary: 'Severe KDIGO Stage 3 Acute-on-Chronic Kidney Injury due to Acute Tubular Necrosis (ATN), complicated by Life-Threatening Hyperkalaemia (K+ 6.4) and Severe Metabolic Acidosis.',
        keyPoints: [
          'KDIGO Stage 3 AKI: Serum Creatinine increased by >3x baseline (612 vs 130 µmol/L) + severe oliguria.',
          'FeNa > 2% + Urine Na > 40 + Muddy Brown Granular Casts is the classic diagnostic triad for Intrinsic Acute Tubular Necrosis.',
          'Medical Emergencies: K+ 6.4 mmol/L (Cardiotoxic hyperkalaemia requiring immediate calcium gluconate) + Bicarbonate 14 mmol/L + Fluid overload.'
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
      prompt: 'Formulate the complete multi-axial nephrology diagnosis.',
      expertBenchmark: {
        title: 'Definitive Diagnosis',
        summary: 'KDIGO Stage 3 Acute-on-Chronic Kidney Injury secondary to Ischaemic & Nephrotoxic Acute Tubular Necrosis (precipitated by gastroenteritis, NSAIDs, and ACE-Inhibitor "Triple Whammy"), complicated by Severe Hyperkalaemia (K+ 6.4), High Anion Gap Metabolic Acidosis, Fluid Overload, and Uremic Encephalopathy.',
        keyPoints: ['KDIGO Stage 3 AKI + Underlying Diabetic Nephropathy CKD 3a + Hyperkalaemia emergency.']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Emergency Resuscitation & Indications for Dialysis',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Detail the emergency hyperkalaemia cocktail, drug discontinuation, and evaluation for Urgent Renal Replacement Therapy (AEIOU criteria).',
      guidingQuestions: [
        'What is the emergency management of Hyperkalaemia (K+ 6.4)?',
        'What are the AEIOU absolute indications for emergency hemodialysis?',
        'Which drugs must be withheld immediately?'
      ],
      expertBenchmark: {
        title: 'Emergency Renal Management & Dialysis Indications',
        summary: 'Immediate Cardiac Membrane Stabilization + Potassium Shifting + Volume Decongestion + Urgent Hemodialysis Consultation.',
        keyPoints: [
          'Hyperkalaemia Emergency Protocol: 1. IV 10% Calcium Gluconate 10ml over 5-10 mins (stabilizes cardiac myocyte membrane); 2. IV 50ml Dextrose 50% + 10 units Actrapid Regular Insulin over 20 mins (drives K+ into cells); 3. Nebulized Salbutamol 10mg; 4. Oral Potassium Binder (Calcium Resonium / Sodium Zirconium Cyclosilicate).',
          'Withhold Nephrotoxic & Accumulating Drugs: STOP Mefenamic Acid (NSAIDs), Perindopril (ACEi), Metformin (risk of fatal lactic acidosis), and Gliclazide (risk of prolonged hypoglycemia).',
          'Urgent Dialysis Indications (AEIOU): A - Acidosis (pH < 7.15 refractory); E - Electrolyte (K+ > 6.5 refractory); I - Ingestions / Toxins; O - Overload (Pulmonary edema refractory to diuretics); U - Uremia (Encephalopathy, pericarditis, asterixis). Haji Osman meets criteria for urgent dialysis!'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Diabetic Counseling, Islamic Nuances & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Counseling on traditional herbal medicine risks, fasting with CKD, Wudhu with dialysis catheters, and Section 8 reflection.',
      expertBenchmark: {
        title: 'Holistic Nephrology Care & Bioethics',
        summary: 'Education on OTC NSAID & Jamu toxicity, dialysis preparation with empathetic Islamic bioethical counseling, and metacognitive reflection.',
        keyPoints: [
          'Herbal / Jamu Nephrotoxicity: Explain to patient and family that unregistered traditional pills often contain adulterated steroids, heavy metals, or aristolochic acid, causing direct tubular damage.',
          'Wudhu with Temporary Dialysis Catheter (Internal Jugular / Femoral line): The catheter exit site must be kept strictly dry to prevent catheter-related bloodstream infections (CRBSI). Teach Tayammum or wiping over dry dressings (Masah ‘ala al-Jaba’ir).',
          'Fasting in CKD / AKI: Fasting with advanced CKD/AKI is medically dangerous due to risk of rapid dehydration, hyperkalaemia, and metabolic decompensation.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'Uremic lethargy and fluid overload with peripheral edema make standing difficult. Solat may be performed in sitting position. For urination with an indwelling Foley catheter or urostomy, the urine bag does not invalidate the prayer once clean clothes and skin are verified.',
    fastingRamadanGuidance: 'Patients with KDIGO Stage 3 AKI and baseline CKD are medically exempt from fasting (Fasting is strictly contraindicated during acute illness) due to high risk of irreversible renal parenchymal demise and fatal hyperkalemia.',
    halalMedicationAndDiet: 'Calcium gluconate, insulin, and dextrose infusions are halal. Explain that life-saving dialysis (Hemodialysis or Peritoneal Dialysis) is an act of preserving bodily sanctity and life (Hifz an-Nafs), fully encouraged in Islamic bioethics.',
    familyCommunicationAndBioethics: 'Conduct a compassionate family meeting with Haji Osman’s children regarding temporary vs permanent renal replacement therapy, dispelling myths that "dialysis kills patients" and emphasizing that early dialysis saves lives.',
    patientEducationAndHolisticWellness: 'Strict avoidance of OTC NSAIDs (Voltaren, Ponstan, Synflex) and unregistered traditional herbal preparations (jamu/maajun).'
  },
  keyLearningPoints: [
    'The "Triple Whammy" (Volume loss + NSAID + ACE-Inhibitor) creates severe renal hypoperfusion that readily precipitates Acute Tubular Necrosis.',
    'FeNa > 2%, Urine Na > 40 mmol/L, and Muddy Brown Granular Casts in UFEME confirm intrinsic Acute Tubular Necrosis.',
    'Emergency hyperkalemia (K+ > 6.0 with ECG changes) requires immediate IV Calcium Gluconate followed by Insulin-Dextrose shifting.',
    'Remember the AEIOU criteria for emergency renal replacement therapy (Acidosis, Electrolytes, Ingestions, Overload, Uremia).'
  ],
  referenceGuidelines: [
    'KDIGO Clinical Practice Guideline for Acute Kidney Injury (2022 Update)',
    'Malaysian Clinical Practice Guidelines on Management of Chronic Kidney Disease in Adults (2018)',
    'National Kidney Foundation (NKF) Approach to Drug-Induced Kidney Injury'
  ]
};
