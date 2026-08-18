import { SdlCase } from '../../types';

export const EMERGENCY_CASE: SdlCase = {
  id: 'w9-emergency',
  week: 9,
  topicCategory: 'Emergency Medicine',
  caseCode: 'SDL-W9-EMERG-SHOCK-ANAPHYLAXIS',
  title: 'Severe Stridor, Bronchospasm & Hypotension After Multiple Wasp Stings',
  subTitle: 'Undifferentiated Shock / Anaphylactic Shock with Angioedema vs Status Asthmaticus & Resuscitation Algorithm',
  assignmentName: 'Emergency Shock & Status Resuscitation Algorithm (IM Adrenaline Dosing)',
  stem: {
    patientName: 'Mr. Ganesan a/l Ramasamy',
    age: 45,
    gender: 'Male',
    occupation: 'Oil palm plantation smallholder in Banting',
    setting: 'Emergency Department Red Zone (Resuscitation Bay)',
    triageCategory: 'Red (Resuscitation)',
    presentingComplaint: 'Sudden onset difficulty breathing, audible inspiratory stridor, severe dizziness, and extensive intensely itchy swelling of face and lips 20 minutes after being stung by hornets.',
    historyOfPresentingIllness: [
      'Onset: 20 minutes ago while clearing undergrowth in his palm oil estate, disturbed a hornet/wasp nest and sustained >6 stings on his neck, arms, and upper torso.',
      'Airway & Breathing: Within 5 minutes, felt his throat closing up ("felt like throat was choking"), difficulty swallowing his saliva, high-pitched whistling noise on inspiration (stridor), and generalized chest tightness with severe expiratory wheeze.',
      'Skin: Rapidly broke out in raised, intensely pruritic hives (urticaria) spreading over his entire body, with massive swelling of upper/lower lips and eyelids (angioedema).',
      'Circulation: Felt suddenly faint, cold, clammy, and collapsed to his knees in the estate. Rushed immediately by his coworkers in a pickup truck.'
    ],
    systemicReview: [
      'Airway/Resp: Laryngeal edema (stridor), severe bronchospasm, tachypnoea.',
      'CVS: Severe hypotension, profound reflex tachycardia, dizziness.',
      'Derm: Generalized urticaria, facial/lip angioedema.',
      'GI: Severe crampy abdominal pain and 1 episode of diarrhea en route.'
    ],
    pastMedicalSurgicalHistory: [
      'Mild bronchial asthma (uses Ventolin inhaler rarely).',
      'Had a mild local reaction (swollen arm) to a bee sting 2 years ago.'
    ],
    medications: ['Salbutamol MDI PRN.'],
    allergies: ['Previous localized bee sting hypersensitivity.'],
    familyHistory: ['No known atopic family history.'],
    socialHistory: ['Non-smoker, lives with family near plantation.'],
    vitals: {
      bp: '68/38 mmHg (Profound Distributive Anaphylactic Shock)',
      hr: 142,
      rr: 34,
      spo2: '86% on room air',
      temp: '36.6°C',
      gcs: '13/15 (E3 V4 M6 - Restless, confused, gasping for breath)',
      painScore: '6/10 (sting sites & abdominal colic)',
      rbs: '6.5 mmol/L'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Multi-Organ Anaphylaxis Criteria',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Review the presenting complaint. Identify the WAO / World Allergy Organization diagnostic criteria for Anaphylaxis and explain why this is an ultra-emergency.',
      guidingQuestions: [
        'What are the cardinal multi-organ criteria for Anaphylaxis (Skin/Mucosa + Airway/Breathing OR Circulation OR GI)?',
        'Why does hymenoptera (wasp/hornet) venom trigger massive IgE-mediated mast cell degranulation?',
        'What is the risk of delaying Intramuscular Adrenaline even by 5 minutes?'
      ],
      expertBenchmark: {
        title: 'Anaphylaxis Pathophysiology & Criteria',
        summary: 'A 45-year-old male with acute hyperacute onset (<20 mins) of multi-organ Anaphylaxis (Airway stridor, Bronchospasm, Profound Shock BP 68/38, Generalized Urticaria, and GI colic) following multiple wasp stings.',
        keyPoints: [
          'WAO Diagnostic Criteria: Acute onset of illness involving skin/mucosal tissue (generalized hives, lip/tongue swelling) PLUS AT LEAST ONE of: 1. Respiratory compromise (stridor, wheeze, hypoxaemia); 2. Reduced BP or end-organ dysfunction (collapse, BP 68/38); 3. Severe GI symptoms (crampy abdominal pain). Encik Razak has all 3!',
          'Pathophysiology: Venom allergen cross-links allergen-specific IgE on sensitized mast cells and basophils, releasing massive preformed histamine, tryptase, leukotrienes, and prostaglandins -> causing sudden systemic vasodilation, capillary leakage, and bronchoconstriction.',
          'MORTALITY FACTOR: The #1 cause of fatal anaphylaxis in medical literature is DELAY OR FAILURE in administering INTRAMUSCULAR ADRENALINE early.'
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
        summary: 'A 45-year-old male with a history of mild asthma and previous hymenoptera allergy presenting with hyperacute onset (<20 mins) of life-threatening multi-organ anaphylactic shock characterized by upper airway angioedema, severe bronchospasm, distributive shock, and generalized urticaria following multiple wasp stings.',
        keyPoints: ['Hymenoptera sting + Hyperacute onset + Multi-organ anaphylaxis + Upper airway stridor + Severe distributive shock.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Construct the differential diagnosis for undifferentiated shock and acute severe bronchospasm.',
      expertBenchmark: {
        title: 'Emergency Shock Differential Hierarchy',
        summary: '1. Severe Anaphylactic Shock with Laryngeal Angioedema (Leading, 95%); 2. Severe Status Asthmaticus; 3. Foreign Body Airway Obstruction; 4. Septic Shock (e.g. rapid bacteremia); 5. Cardiogenic Shock / Acute STEMI (Kounis Syndrome - allergic coronary vasospasm).',
        keyPoints: [
          'Leading: Anaphylactic Shock.',
          'Kounis Syndrome: Allergic acute coronary syndrome caused by mast cell activation and coronary vasospasm (must perform 12-lead ECG once adrenaline is given).'
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
      prompt: 'Assess the ABCDE physical findings: Impending airway loss, respiratory mechanics, and peripheral shock parameters.',
      expertBenchmark: {
        title: 'ABCDE Emergency Examination Findings',
        summary: 'Airway (A): Marked swelling of uvula, soft palate, and vocal cords; hoarse voice; loud inspiratory stridor at rest (Impending total airway obstruction). Breathing (B): RR 34, severe intercostal indrawing, diffuse loud polyphonic expiratory wheezes throughout both lung fields, SpO2 86% on room air. Circulation (C): BP 68/38 mmHg, HR 142 (thready sinus tachycardia), peripheries warm and flushed initially (vasodilation) transitioning to pale/cyanotic, CRT 4.0 seconds. Disability (D): GCS 13/15, agitated, air hunger, pupils equal. Exposure (E): Extensive confluent erythematous wheals/urticaria over face, trunk, and extremities; 7 distinct sting puncture sites with central erythema on neck and arms.',
        keyPoints: [
          'Impending Upper Airway Loss: Stridor + Uvular/tongue swelling = Immediate adrenaline + Prepare for emergency difficult airway / surgical cricothyroidotomy.',
          'Distributive Shock: Severe vasodilation and capillary extravasation causing 35% intravascular volume shift in 10 minutes.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 9 Core Assignment: Resuscitation Algorithm',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Execute the Emergency Shock & Anaphylaxis Algorithm: Exact Intramuscular Adrenaline route/dose (1:1000 vs 1:10,000), fluid boluses, and serum tryptase timing.',
      assignmentDetails: {
        assignmentTitle: 'Week 9 Assignment: Anaphylaxis & Status Resuscitation Algorithm',
        type: 'status_resuscitation',
        data: {
          adrenalineDosingProtocol: {
            firstLineDrug: 'ADRENALINE (EPINEPHRINE) 1:1,000 (1 mg/mL)',
            doseAndRoute: '0.5 mg (0.5 mL) INTRAMUSCULARLY (IM) into the Anterolateral aspect of the Mid-Thigh (Vastus Lateralis muscle).',
            rationaleForIMThigh: 'IM injection into the thigh achieves peak plasma adrenaline concentrations significantly FASTER and HIGHER than subcutaneous or deltoid injection due to superior vascularity.',
            repeatInterval: 'Repeat every 5 to 15 minutes if symptoms persist or blood pressure does not respond (can repeat 2-3 times before considering IV adrenaline infusion).'
          },
          ivFluidResuscitation: 'Rapid IV infusion of Isotonic Crystalloid (Normal Saline or Hartmann’s Solution) 1000 - 2000 ml bolus stat via two large-bore (14-16G) IV cannulas.',
          secondaryAdjuncts: {
            antihistamines: 'IV Chlorpheniramine 10mg slow IV (H1-antagonist) + IV Ranitidine 50mg / Famotidine 20mg (H2-antagonist).',
            corticosteroids: 'IV Hydrocortisone 200mg IV stat (helps prevent biphasic / late-phase reaction occurring 4-12 hours later).',
            bronchodilators: 'Nebulized Salbutamol 5mg + Ipratropium 0.5mg driven by 100% Oxygen.'
          },
          diagnosticBiomarker: 'Serum Mast Cell Tryptase: Draw sample at 1-2 hours post-event (peak), and baseline sample at 24 hours to confirm IgE-mediated mast cell degranulation.'
        }
      },
      expertBenchmark: {
        title: 'Expert Anaphylaxis & Resuscitation Algorithm',
        summary: 'IM Adrenaline 0.5mg stat (Vastus Lateralis) + High-flow O2 + Aggressive IV Crystalloid Bolus + Airway readiness.',
        keyPoints: [
          'ADRENALINE IS THE FIRST-LINE LIFE-SAVING DRUG: It acts on alpha-1 (vasoconstriction, reverses shock and airway edema), beta-1 (inotropic/chronotropic support), and beta-2 receptors (bronchodilation and halts further mast cell mediator release).',
          'NEVER USE ANTIHISTAMINES OR STEROIDS AS FIRST-LINE: Antihistamines and steroids DO NOT reverse acute bronchospasm or shock and must never delay adrenaline.',
          'Positioning: Lie patient flat with legs elevated (Trendelenburg/passive leg raise). NEVER allow the patient to sit up or stand abruptly (sudden postural drop in venous return can precipitate the "empty heart syndrome" and sudden pulseless electrical activity cardiac arrest!).'
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
      prompt: 'State the complete diagnostic label including severity and organ involvement.',
      expertBenchmark: {
        title: 'Definitive Diagnostic Formulation',
        summary: 'Life-Threatening Anaphylactic Shock with Laryngeal Angioedema, Severe Bronchospasm, Distributive Hypotensive Shock (BP 68/38), and Generalized Urticaria secondary to Hymenoptera (Wasp/Hornet) Stings.',
        keyPoints: ['Classification: Life-Threatening Anaphylactic Shock.']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Immediate Resuscitation & Refractory Shock Management',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Formulate the refractory shock escalation (IV Adrenaline infusion, Noradrenaline, Glucagon in beta-blocker users) and mandatory observation period for Biphasic Reactions.',
      expertBenchmark: {
        title: 'Refractory Anaphylaxis & Biphasic Monitoring Protocol',
        summary: 'IM Adrenaline -> Repeat IM at 5 mins -> IV Adrenaline Infusion (0.1 mcg/kg/min) -> 12-24h observation for Biphasic Anaphylaxis -> EpiPen prescription.',
        keyPoints: [
          'Refractory Anaphylaxis: If shock persists after 2-3 doses of IM adrenaline + 2000ml IV fluids, initiate IV Adrenaline Infusion (e.g. 1mg in 100ml NS, titrating 1-10 mcg/min via infusion pump with continuous arterial line/cardiac monitoring) or IV Noradrenaline.',
          'Glucagon for Patients on Beta-Blockers: Patients on beta-blockers may be resistant to adrenaline; administer IV Glucagon 1-5mg IV over 5 mins (activates adenylate cyclase bypassing beta-receptors).',
          'Biphasic Anaphylaxis Precaution: Up to 20% of severe anaphylaxis cases experience a second rebound wave of shock/bronchospasm 4 to 12 hours after apparent recovery without re-exposure. Mandatory hospital observation for at least 12 to 24 hours is required!',
          'Discharge Preparation: Prescription and hands-on training for Auto-Injectable Adrenaline (EpiPen 0.3mg), MedicAlert bracelet, and Immunology/Allergy clinic referral for venom immunotherapy (VIT).'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Auto-Injector Training, Holistic Care & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Demonstrate the 4-step EpiPen auto-injector technique, venom allergy counseling, emergency preparedness, and complete the Section 8 reflection.',
      expertBenchmark: {
        title: 'Comprehensive Discharge, EpiPen & Bioethics',
        summary: 'Hands-on EpiPen technique ("Blue to the sky, orange to the thigh"), emergency preparedness, and metacognitive reflection.',
        keyPoints: [
          'EpiPen Auto-Injector Technique: 1. Form a fist around unit with orange tip pointing down; 2. Pull off blue safety release cap ("Blue to the sky"); 3. Hold orange tip firmly against outer mid-thigh at 90-degree angle until a "click" is heard ("Orange to the thigh"); 4. Hold in place for 3 full seconds, then massage area for 10 seconds. Call 999 immediately.',
          'Medical Imperative in Resuscitation: Immediate emergency administration of adrenaline is the essential standard of care for anaphylactic survival; educating workplace peers is vital.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'During the acute shock and post-resuscitation observation period, the patient requires close hemodynamic monitoring; keep patient rested in bed until vital signs and sensorium fully stabilize.',
    fastingRamadanGuidance: 'Acute anaphylaxis requiring IV resuscitation and intensive care requires full hydration and close monitoring; strict fasting is medically contraindicated during acute emergency recovery.',
    halalMedicationAndDiet: 'Adrenaline, hydrocortisone, antihistamines, and crystalloid fluids are life-saving standard pharmaceutical interventions.',
    familyCommunicationAndBioethics: 'Counsel Mr. Ganesan and his family on recognizing early anaphylaxis signs and educating plantation co-workers on carrying and administering the EpiPen in the estate.',
    patientEducationAndHolisticWellness: 'Teach environmental precautions: avoiding scented products, wearing protective outdoor clothing in plantations, and emergency auto-injector storage away from vehicle gloveboxes and direct tropical heat.'
  },
  keyLearningPoints: [
    'Intramuscular Adrenaline (0.5 mg IM into the anterolateral mid-thigh) is the FIRST-LINE and ONLY life-saving drug in anaphylaxis; never delay adrenaline for antihistamines or steroids.',
    'Keep anaphylactic patients FLAT with legs elevated; sudden standing or sitting upright can cause catastrophic drop in venous return ("empty heart syndrome") and cardiac arrest.',
    'Biphasic Anaphylaxis can recur up to 12-24 hours after symptom resolution; mandatory observation is required for all severe presentations.',
    'Every patient with hymenoptera anaphylaxis must be discharged with two adrenaline auto-injectors (EpiPen) and referred for venom immunotherapy.'
  ],
  referenceGuidelines: [
    'World Allergy Organization (WAO) Anaphylaxis Guidelines (2020)',
    'Resuscitation Council UK - Emergency Treatment of Anaphylactic Reactions (2021)',
    'Malaysian Society of Allergy and Immunology (MSAI) Guidelines on Anaphylaxis'
  ]
};
