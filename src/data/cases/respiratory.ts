import { SdlCase } from '../../types';

export const RESPIRATORY_CASE: SdlCase = {
  id: 'w3-respiratory',
  week: 3,
  topicCategory: 'Respiratory',
  caseCode: 'SDL-W3-RESP-ASTHMA',
  title: 'Severe Acute Asthma Exacerbation & Impending Respiratory Failure',
  subTitle: 'Obstructive Airway Disease / Severe Asthma vs Tension Pneumothorax with Life-Threatening ABG Warning Signs',
  assignmentName: 'Arterial Blood Gas (ABG) Deep-Dive & Acid-Base Compensation',
  stem: {
    patientName: 'Mr. Rajesh Kumar a/l Subramaniam',
    age: 24,
    gender: 'Male',
    occupation: 'University undergraduate student',
    setting: 'Emergency Department Red Zone (Resuscitation)',
    triageCategory: 'Red (Resuscitation)',
    presentingComplaint: 'Acute severe shortness of breath with audible wheezing and inability to complete full sentences for 4 hours.',
    historyOfPresentingIllness: [
      'Onset: Gradual chest tightness and nocturnal cough for 3 days following exposure to cat dander at a friend’s hostel, with severe acute deterioration 4 hours ago.',
      'Inhaler use: Emptied his Salbutamol (Ventolin) MDI canister at home (took over 20 puffs in 2 hours) with no noticeable relief.',
      'Severity: Unable to speak in full sentences; can only utter single words ("panicking... cannot... breathe").',
      'Posture: Leaning forward in tripod position, using sternocleidomastoid and scalene accessory muscles.'
    ],
    systemicReview: [
      'Resp: Severe tachypnoea, no hemoptysis, scant tenacious white mucus.',
      'CVS: Palpitations and sinus tachycardia from excessive beta-agonist use.',
      'ENT: History of allergic rhinitis, frequent morning sneezing and nasal congestion.',
      'Derm: Childhood atopic eczema on flexural creases.'
    ],
    pastMedicalSurgicalHistory: [
      'Bronchial Asthma diagnosed at age 7.',
      'One previous ICU admission with endotracheal intubation 2 years ago during exam season (High-risk asthma profile).',
      'Poor inhaler compliance (only uses blue reliever inhaler PRN; stopped prescribed inhaled corticosteroid preventer 6 months ago).'
    ],
    medications: [
      'Inhaler Salbutamol 100mcg 2 puffs PRN (Reliever)',
      'Prescribed Inhaler Budesonide/Formoterol (Symbicort) - stopped taking'
    ],
    allergies: ['Cat dander, house dust mites, NSAIDs/Aspirin (provokes bronchospasm).'],
    familyHistory: ['Mother has bronchial asthma and allergic eczema.'],
    socialHistory: ['Non-smoker, non-vaper. Active university rugby player.'],
    vitals: {
      bp: '138/86 mmHg',
      hr: 132,
      rr: 36,
      spo2: '88% on room air (rises to 92% on 15L/min NRB mask)',
      temp: '37.1°C',
      gcs: '14/15 (Anxious, agitated, easily fatigued)',
      painScore: '3/10 (diffuse chest tightness)',
      rbs: '6.8 mmol/L'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Risk Factor Triaging',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Identify the "Near-Fatal Asthma" risk markers in Encik Faris’s history and evaluate the physiological significance of high reliever overuse.',
      guidingQuestions: [
        'What specific history markers identify a patient at high risk for fatal asthma?',
        'What is the consequence of frequent high-dose SABA overuse without ICS preventer?',
        'Why is he unable to speak full sentences?'
      ],
      expertBenchmark: {
        title: 'High-Risk Asthma Assessment',
        summary: 'A 24-year-old male with known asthma and near-fatal asthma history (prior ICU intubation) presenting with acute severe exacerbation refractory to inhaled SABA.',
        keyPoints: [
          'Near-fatal risk markers: Prior ICU admission with mechanical intubation, heavy SABA canister overuse (>1 canister/month), poor adherence to ICS preventers, atopic background.',
          'Aspirin/NSAID sensitivity: Samter’s triad spectrum (asthma + allergic rhinitis + NSAID sensitivity).',
          'Impending exhaustion: Agitation, tachypnoea (RR 36), and inability to utter sentences signify diaphragmatic fatigue.'
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
        summary: 'A 24-year-old male with high-risk bronchial asthma and previous ICU intubation presenting with acute severe, refractory bronchospasm, profound accessory muscle use, and hypoxaemia following allergen exposure, concerning for life-threatening asthma and impending respiratory muscle exhaustion.',
        keyPoints: ['High-risk asthma profile + Acute severe/life-threatening attack + Impending respiratory failure.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Construct the differential diagnosis including mechanical and parenchymal complications.',
      expertBenchmark: {
        title: 'Expert Differential Matrix',
        summary: '1. Life-Threatening Acute Asthma Exacerbation (Leading); 2. Secondary Tension Pneumothorax (Must-not-miss life threat); 3. Acute Anaphylaxis with severe bronchospasm; 4. Foreign Body Aspiration; 5. Acute Viral/Bacterial Bronchopneumonia.',
        keyPoints: [
          'Leading: Acute severe/life-threatening asthma.',
          'Must-not-miss complication: Secondary Pneumothorax (severe air trapping and alveolar overdistension can rupture subpleural blebs).',
          'Anaphylaxis must be excluded (no urticaria, facial swelling, or gut cramps).'
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
      prompt: 'Differentiate between "Acute Severe" vs "Life-Threatening / Near-Fatal" asthma physical signs.',
      expertBenchmark: {
        title: 'Examination Findings & Severity Stratification',
        summary: 'General: Tripod posture, diaphoresis, unable to speak, central cyanosis prior to O2. Chest: Pulsus paradoxus > 15 mmHg. Hyperinflated chest with intercostal and suprasternal retractions. Percussion: Hyperresonant throughout. Auscultation: Markedly diminished breath sounds bilaterally with faint high-pitched polyphonic wheezing during expiration ("Silent Chest" warning). Peak Expiratory Flow Rate (PEFR): 140 L/min (28% of predicted normal 520 L/min). Trachea central, no surgical emphysema.',
        keyPoints: [
          'Silent Chest (faint/absent breath sounds): Ominous sign indicating airflow is so restricted that turbulent wheezing cannot even be generated.',
          'Pulsus Paradoxus: >15 mmHg drop in systolic BP during inspiration due to intense negative intrathoracic pressure swings.',
          'PEFR < 33% of best/predicted confirms Life-Threatening Asthma.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 3 Core Assignment: ABG Deep-Dive',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Analyze the Arterial Blood Gas (ABG) report systematically (pH, PaCO2, PaO2, HCO3, Base Excess, A-a gradient) and explain why a "normal" PaCO2 is a RED FLAG in severe asthma.',
      assignmentDetails: {
        assignmentTitle: 'Week 3 Assignment: Arterial Blood Gas (ABG) Analysis',
        type: 'abg',
        data: {
          abgOnRoomAir: {
            pH: '7.34 (Normal: 7.35 - 7.45)',
            paCO2: '44 mmHg (Normal: 35 - 45 mmHg)',
            paO2: '56 mmHg (Normal: 80 - 100 mmHg on room air)',
            hco3: '23 mmol/L (Normal: 22 - 26 mmol/L)',
            baseExcess: '-1.5 mmol/L',
            lactate: '2.8 mmol/L',
            fiO2: '0.21 (Room Air)'
          },
          chestXray: 'Bilateral lung hyperinflation with flattening of diaphragms, 9 posterior ribs visible, no pneumothorax or consolidation.',
          serumPotassium: '3.3 mmol/L (Hypokalaemia from excessive beta-2 agonist driving K+ intracellularly).'
        }
      },
      expertBenchmark: {
        title: 'Expert ABG Interpretation & Pathophysiology',
        summary: 'Severe Hypoxaemic Respiratory Failure (Type 1 transitioning to Type 2) with a Pseudonormal PaCO2 indicating impending respiratory arrest.',
        keyPoints: [
          'Normal/Elevated PaCO2 in a tachypnoeic patient (RR 36) is an ALARM SIGN: A hyperventilating asthmatic should normally blow off CO2 (PaCO2 < 30 mmHg, producing respiratory alkalosis). A PaCO2 of 44 mmHg in this setting means respiratory muscles are fatiguing and hypoventilation is setting in.',
          'PaO2 56 mmHg on room air = Severe Type 1 Respiratory Failure (V/Q mismatch).',
          'Lactate 2.8 mmol/L: Due to intense work of breathing (diaphragm anaerobic glycolysis) plus excessive exogenous beta-agonists stimulating glycolysis.',
          'Hypokalemia (K+ 3.3): Salbutamol shifts potassium into cells; monitor cardiac telemetry.'
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
      prompt: 'State the exact diagnostic category, severity stage, and respiratory failure type.',
      expertBenchmark: {
        title: 'Diagnostic Formulation',
        summary: 'Life-Threatening Bronchial Asthma Exacerbation with Impending Type 2 Respiratory Muscle Exhaustion and Hypokalaemia, triggered by allergen exposure in a high-risk patient with poor compliance.',
        keyPoints: ['Classification: Life-Threatening Asthma (PEFR < 33%, Silent Chest, Normal PaCO2, SpO2 < 92%).']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Emergency Resuscitation & Pharmacotherapy',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Construct the step-by-step emergency medical resuscitation protocol (Oxygen, Nebulizers, Systemic Steroids, Magnesium Sulphate, and Advanced Airway escalation).',
      expertBenchmark: {
        title: 'Life-Threatening Asthma Protocol',
        summary: 'Continuous High-Flow O2 + Back-to-back Combivent Nebulizers + IV Hydrocortisone + IV Magnesium Sulphate + ICU consult.',
        keyPoints: [
          'High-Flow Oxygen: Titrate via non-rebreather mask to target SpO2 93-95%.',
          'Nebulized Bronchodilators: Continuous or back-to-back Nebulized Salbutamol 5.0mg driven by 6-8 L/min Oxygen COMBINED with Nebulized Ipratropium Bromide 0.5mg every 20 mins x 3 doses.',
          'Early Systemic Corticosteroids: IV Hydrocortisone 200mg stat (or IV Methylprednisolone 40-80mg), followed by Oral Prednisolone 40mg daily x 5-7 days.',
          'Intravenous Magnesium Sulphate: IV MgSO4 2.0g (8 mmol) in 100ml Normal Saline infused over 20 minutes (potent smooth muscle relaxant and bronchodilator).',
          'Second-Line Escalation: IV Salbutamol infusion or IV Aminophylline infusion in ICU; prepare for non-invasive ventilation (NIV/BiPAP trial) or Rapid Sequence Intubation (RSI) with Ketamine if GCS drops or PaCO2 rises.',
          'Electrolyte Correction: Replace potassium (IV KCl) as repeated beta-agonists drive K+ into cells.'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Inhaler Technique, Holistic Care & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Formulate patient education on SMART (Single Inhaler Maintenance & Reliever Therapy), trigger avoidance in university hostels, and complete the group reflection.',
      expertBenchmark: {
        title: 'Comprehensive Discharge Plan & Patient-Centred Care',
        summary: 'SMART strategy with Inhaled Corticosteroid-Formoterol, Written Asthma Action Plan, Inhaler Spacer training, and trigger mitigation.',
        keyPoints: [
          'SMART Approach (GINA Guidelines): Transition patient to Budesonide/Formoterol MDI/DPI as both daily controller AND as-needed reliever to prevent future fatal attacks.',
          'Written Asthma Action Plan (WAAP): Clear traffic-light zones (Green/Yellow/Red) with PEFR triggers.',
          'Trigger & Allergy Mitigation: Complete avoidance of direct cat exposure, dust mite mattress encasings for hostel room, and carry reliever inhaler during rugby training.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'During the acute breathless state with high-flow oxygen mask, patient requires high Fowler posture in bed with continuous monitoring. Avoid forced exertion until peak flow stabilizes.',
    fastingRamadanGuidance: 'Medical Inhaler Guidance & Acute Exemption: When patients observe religious fasts, modern consensus affirms that standard inhaler puffs for chronic control do not invalidate fasting. However, during acute severe respiratory failure requiring nebulizations and IV steroids, fasting is medically contraindicated to preserve life.',
    halalMedicationAndDiet: 'All standard asthma medications (Salbutamol, Budesonide, Ipratropium, Hydrocortisone, MgSO4) are completely approved for clinical use with no restricted ingredients.',
    familyCommunicationAndBioethics: 'Educate the young university student and his parents on asthma triggers, the vital necessity of daily preventer adherence, and warning signs of near-fatal asthma.',
    patientEducationAndHolisticWellness: 'Teach correct MDI with Volumatic Spacer technique (one puff at a time, slow deep breath, 10-second breath hold, rinse mouth after steroid).'
  },
  keyLearningPoints: [
    'A "normal" or rising PaCO2 (>= 40-45 mmHg) in a tachypnoeic, wheezing asthmatic is an ominous sign of impending respiratory muscle exhaustion and arrest.',
    'Life-threatening asthma features: Silent chest, PEFR < 33%, cyanosis, feeble respiratory effort, exhaustion, confusion, hypotension.',
    'Intravenous Magnesium Sulphate (2.0g over 20 mins) provides rapid bronchodilation in refractory acute severe asthma.',
    'GINA guidelines strongly advocate for Inhaled Corticosteroids (ICS) as the backbone of therapy to suppress eosinophilic airway inflammation and prevent fatal attacks.'
  ],
  referenceGuidelines: [
    'Global Initiative for Asthma (GINA) Global Strategy for Asthma Management and Prevention (2023)',
    'Malaysian Clinical Practice Guidelines on Management of Asthma in Adults (2018)',
    'British Thoracic Society / SIGN Guideline on the Management of Asthma'
  ]
};
