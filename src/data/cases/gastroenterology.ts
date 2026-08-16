import { SdlCase } from '../../types';

export const GASTRO_CASE: SdlCase = {
  id: 'w5-gastro',
  week: 5,
  topicCategory: 'Gastroenterology & Hepatology',
  caseCode: 'SDL-W5-GI-CIRRHOSIS-LFT',
  title: 'Haematemesis & Jaundice in Chronic Liver Disease',
  subTitle: 'Decompensated Cirrhosis with Bleeding Oesophageal Varices & Hepatic Encephalopathy',
  assignmentName: 'Liver Function Test (LFT) & R-Ratio Pattern Interpretation',
  stem: {
    patientName: 'Encik Zainal Abidin bin Kassim',
    age: 58,
    gender: 'Male',
    occupation: 'Night market trader (Peniaga Pasar Malam)',
    setting: 'Emergency Department Red Zone (Resuscitation)',
    triageCategory: 'Red (Resuscitation)',
    presentingComplaint: 'Three episodes of vomiting fresh red blood (haematemesis) totaling approximately 800ml over 6 hours, accompanied by passage of black tarry stools (melena) and altered behavior.',
    historyOfPresentingIllness: [
      'Onset: Woke up at 3:00 AM with sudden nausea and vomited large mouthfuls of fresh red blood containing dark clots.',
      'Melena: Passed 2 copious foul-smelling, black tarry bowel motions yesterday evening.',
      'Altered Behavior: Family noted he has been increasingly disoriented over the past 48 hours, reversing day-night sleep cycle, talking irrelevantly, and unable to recognize his son.',
      'Abdominal distension: Progressive swelling of the abdomen and yellowish discoloration of the eyes over the past 2 months.'
    ],
    systemicReview: [
      'GI: Massive haematemesis, melena, anorexia, distended abdomen.',
      'Hepatic: Deep jaundice, pruritus, dark urine, pale stools.',
      'Neuro: Confusion, day-night reversal, flapping hand tremors.',
      'Resp: Mild tachypnoea from anemia/acidosis, no cough.'
    ],
    pastMedicalSurgicalHistory: [
      'Chronic Hepatitis B infection diagnosed 12 years ago (defaulter from hepatology follow-up for 6 years).',
      'No prior upper endoscopy (OGDS).',
      'No history of peptic ulcer disease.'
    ],
    medications: ['No current medications. Taking herbal detox tonics (Air rebusan akar kayu).'],
    allergies: ['No known allergies.'],
    familyHistory: ['Mother died of "liver cancer" (Hepatocellular Carcinoma) at age 55.'],
    socialHistory: ['Denies alcohol consumption. Ex-smoker (quit 10 years ago).'],
    vitals: {
      bp: '86/50 mmHg (Hemorrhagic Shock)',
      hr: 122,
      rr: 24,
      spo2: '95% on room air',
      temp: '37.8°C (Spontaneous Bacterial Peritonitis risk)',
      gcs: '12/15 (E3 V4 M5 - West Haven Grade 2-3 Hepatic Encephalopathy)',
      painScore: '3/10 (diffuse abdominal discomfort)',
      rbs: '4.2 mmol/L (Borderline hypoglycaemia due to impaired hepatic gluconeogenesis)'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Decompensated Cirrhosis Stigmatas',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Synthesize the history. Connect chronic Hepatitis B, portal hypertension, variceal hemorrhage, and hepatic encephalopathy precipitants.',
      guidingQuestions: [
        'What are the cardinal precipitants of Hepatic Encephalopathy in this patient (GI bleeding -> nitrogen load)?',
        'Why does chronic Hepatitis B carry high Hepatocellular Carcinoma (HCC) risk even without full cirrhosis?',
        'What constitutes hemorrhagic shock in variceal bleeding?'
      ],
      expertBenchmark: {
        title: 'Hepatology Clinical Synthesis',
        summary: 'A 58-year-old male with chronic Hepatitis B presenting with massive Upper GI Bleeding (bleeding oesophageal varices) complicated by hypovolemic shock, West Haven Grade 2-3 Hepatic Encephalopathy, and decompensated cirrhosis (Child-Pugh Class C).',
        keyPoints: [
          'Precipitants of Encephalopathy: Blood in the GI tract contains high protein/hemoglobin. Colonic bacteria break this down into toxic ammonia (NH3) which bypasses the cirrhotic/shunted liver and crosses the blood-brain barrier.',
          'Cirrhosis Complications Triad: Portal hypertension (varices, ascites, splenomegaly), synthetic failure (coagulopathy, hypoalbuminemia), and metabolic failure (hyperbilirubinemia, encephalopathy).'
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
      prompt: 'Draft a 2-sentence problem statement with semantic qualifiers.',
      expertBenchmark: {
        title: 'Expert Problem Representation',
        summary: 'A 58-year-old gentleman with chronic hepatitis B presenting with acute massive upper gastrointestinal bleeding (haematemesis and melena) complicated by hemorrhagic shock, deep jaundice, and acute hepatic encephalopathy in the setting of decompensated liver cirrhosis.',
        keyPoints: ['Chronic Hepatitis B + Acute massive UGI bleed + Hemorrhagic shock + Encephalopathy + Decompensated cirrhosis.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Construct the differential diagnosis for Upper GI Bleed and Jaundice in chronic liver disease.',
      expertBenchmark: {
        title: 'Gastroenterology Differential Matrix',
        summary: '1. Ruptured Oesophageal / Gastric Varices secondary to Portal Hypertension (Leading, 80%); 2. Peptic Ulcer Disease (Gastric/Duodenal ulcer, 15%); 3. Portal Hypertensive Gastropathy; 4. Mallory-Weiss Tear; 5. Bleeding Hepatocellular Carcinoma (HCC) with hemobilia.',
        keyPoints: [
          'Variceal bleed is most likely given massive volume, chronic Hepatitis B, and gross portal hypertension.',
          'Peptic ulcer is common in cirrhotics and must be identified on urgent endoscopy.'
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
      prompt: 'Detail the physical examination signs of Chronic Liver Disease, Portal Hypertension, and Liver Failure.',
      expertBenchmark: {
        title: 'Targeted Examination Findings',
        summary: 'General: Lethargic, icteric sclera, pale conjunctivae, bilateral spider naevi on anterior chest (>5), palmar erythema, leuconychia, bilateral Dupuytren’s contracture. Neuro: Flapping tremor (asterixis) positive, hyperreflexia. Abdomen: Distended with caput medusae (dilated periumbilical veins); firm, irregular, shrunken liver span (7 cm); palpable splenomegaly (3 cm below left costal margin - Hackett Grade 2); Shifting dullness positive with fluid thrill (moderate-to-severe ascites); mild diffuse abdominal tenderness without rebound tenderness (rule out SBP). Rectal (PR) Exam: Black tarry melena on glove.',
        keyPoints: [
          'Stigmata of Chronic Liver Disease: Spider naevi, palmar erythema, gynecomastia, leuconychia.',
          'Signs of Portal Hypertension: Caput medusae, splenomegaly, ascites, bleeding varices.',
          'Asterixis confirms toxic encephalopathy from hyperammonemia.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 5 Core Assignment: LFT Deep-Dive',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Interpret the complete Liver Function Test panel (Bilirubin, ALT, AST, ALP, Albumin, PT/INR) and calculate the R-ratio (Hepatocellular vs Cholestatic vs Mixed pattern).',
      assignmentDetails: {
        assignmentTitle: 'Week 5 Assignment: Comprehensive LFT & Coagulation Interpretation',
        type: 'lft',
        data: {
          liverFunctionTest: {
            totalBilirubin: '124 µmol/L (Markedly elevated, normal < 21 µmol/L)',
            directConjugatedBilirubin: '88 µmol/L (Conjugated hyperbilirubinemia, normal < 5 µmol/L)',
            alt: '98 U/L (Normal 10 - 40 U/L; 2.5x ULN)',
            ast: '184 U/L (Normal 15 - 37 U/L; AST:ALT ratio > 1.8 indicating advanced cirrhosis/fibrosis)',
            alp: '182 U/L (Normal 40 - 130 U/L; 1.4x ULN)',
            ggt: '110 U/L (Normal 10 - 50 U/L)',
            albumin: '21 g/L (Severe hypoalbuminemia, normal 35 - 50 g/L)',
            globulin: '42 g/L (Reversed A:G ratio)',
            rRatioCalculation: 'R = (ALT / ULN_ALT) / (ALP / ULN_ALP) = (98/40) / (182/130) = 2.45 / 1.40 = 1.75 (Mixed pattern with underlying hepatocellular failure and portal cholestasis)'
          },
          coagulationProfile: {
            prothrombinTime: '24.2 seconds (Control 12.0s)',
            inr: '2.1 (Severe coagulopathy due to loss of hepatic clotting factor synthesis II, VII, IX, X)',
            aptt: '48 seconds (Control 32s)'
          },
          fullBloodCount: {
            hb: '6.4 g/dL (Severe hemorrhagic anemia)',
            platelets: '58 x 10^9/L (Thrombocytopenia secondary to congestive splenomegaly / hypersplenism)'
          },
          viralAndTumorMarkers: {
            hBsAg: 'Reactive / Positive',
            hbvDnaLevel: '4.8 x 10^6 IU/mL (High viral replication)',
            alphaFetoprotein: '1480 ng/mL (Markedly elevated, normal < 10 ng/mL; strongly concerning for underlying Hepatocellular Carcinoma / HCC!)'
          }
        }
      },
      expertBenchmark: {
        title: 'Expert LFT & Biomarker Synthesis',
        summary: 'Decompensated Hepatitis B Cirrhosis (Child-Pugh Score 12, Class C / MELD-Na 28) with severe coagulopathy, hypersplenism, mixed LFT pattern, and extremely high AFP indicating probable underlying Hepatocellular Carcinoma (HCC).',
        keyPoints: [
          'Synthetic Failure: Albumin 21 g/L + INR 2.1 = Severe loss of functional hepatocytes.',
          'AST > ALT in viral hepatitis indicates cirrhosis and extensive sinusoidal capillarization.',
          'Thrombocytopenia (Platelets 58k) confirms portal hypertension with splenic sequestration.',
          'AFP 1480 ng/mL is diagnostic of underlying HCC in a cirrhotic liver until proven otherwise; urgent triple-phase CT Liver is indicated.'
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
      prompt: 'Formulate the complete diagnosis with staging and complications.',
      expertBenchmark: {
        title: 'Definitive Diagnostic Formulation',
        summary: 'Acute Upper Gastrointestinal Bleeding secondary to Ruptured Oesophageal Varices in Decompensated Hepatitis B Liver Cirrhosis (Child-Pugh Class C, Score 12), complicated by Hemorrhagic Shock, Severe Anemia (Hb 6.4 g/dL), West Haven Grade 2-3 Hepatic Encephalopathy, Hypersplenism, Coagulopathy, and Suspected Hepatocellular Carcinoma (AFP 1480 ng/mL).',
        keyPoints: ['Etiology: Hepatitis B.', 'Decompensation: Bleeding varices + Ascites + Jaundice + Encephalopathy.', 'Underlying malignancy: Probable HCC.']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Resuscitation & Endoscopic Variceal Banding Protocol',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Formulate the resuscitation bundle for variceal bleeding: Transfusion target, Vasoactive drugs, Prophylactic antibiotics, and Urgent Endoscopy.',
      expertBenchmark: {
        title: 'Variceal Bleeding Resuscitation Protocol',
        summary: 'Restrictive Transfusion (Target Hb 7-8 g/dL) + IV Terlipressin + IV Ceftriaxone + Urgent Endoscopic Variceal Ligation (EVL) + Lactulose.',
        keyPoints: [
          'Restrictive Transfusion Strategy: Transfuse Packed Red Blood Cells (PRBC) to target Hb 7.0 - 8.0 g/dL only. Over-transfusion increases portal pressure and provokes fatal re-bleeding!',
          'Vasoactive Splanchnic Vasoconstrictor: IV Terlipressin 2mg IV bolus stat, then 1-2mg every 4 hours (or IV Octreotide 50mcg bolus followed by 50mcg/hr infusion) to reduce portal inflow.',
          'Prophylactic Antibiotics: IV Ceftriaxone 1g OD x 7 days (reduces re-bleeding, SBP, and mortality in cirrhotics with GI bleed).',
          'Urgent Diagnostic & Therapeutic OGDS (within 12 hours): Perform Endoscopic Variceal Ligation (EVL / rubber band ligation). If refractory massive bleeding, deploy Sengstaken-Blakemore balloon tube or emergency TIPS.',
          'Hepatic Encephalopathy Management: Oral/NG Lactulose 30ml TDS (titrated to 2-3 soft stools/day to eliminate ammonia) + Oral Rifaximin 550mg BD.',
          'Antiviral Therapy: Initiate Tab Tenofovir Alafenamide (TAF) or Entecavir for active chronic Hepatitis B.'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Islamic Considerations & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Counseling on Hepatitis B family screening, Halal antiviral compliance, palliative/transplant readiness, and Section 8 reflection.',
      expertBenchmark: {
        title: 'Holistic Hepatology Wrap-Up',
        summary: 'Family screening, HCC surveillance, liver transplantation pathway, and metacognitive reflection.',
        keyPoints: [
          'Hepatitis B Contact Screening & Vaccination: Screen wife and children for HBsAg and Anti-HBs; vaccinate seronegative household members.',
          'Spiritual & Palliative Support: With Child-Pugh C cirrhosis and suspected HCC, initiate honest prognostic discussions (Musyawarah), exploring liver transplant eligibility while preparing holistic spiritual support.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'Hepatic encephalopathy and active hematemesis with IV lines, urinary catheter, and sedative state warrant solat postponement during unconsciousness/delirium. When regaining consciousness, perform prayer with sitting/lying postures with Tayammum.',
    fastingRamadanGuidance: 'Strictly contraindicated: Cirrhosis with portal hypertension, active variceal bleeding, and severe hypoalbuminemia requires constant nutritional support and frequent carbohydrate intake to prevent fatal hypoglycaemia.',
    halalMedicationAndDiet: 'Octreotide, Terlipressin, Lactulose, Ceftriaxone, and Tenofovir are halal and life-preserving. Avoid alcohol-based traditional tonics.',
    familyCommunicationAndBioethics: 'Empathize with the family regarding the serious prognosis of decompensated cirrhosis and potential HCC. Encourage patience, spiritual supplication (Dua), and shared decision-making.',
    patientEducationAndHolisticWellness: 'Complete avoidance of traditional herbal extracts, which are frequently hepatotoxic and worsen acute-on-chronic liver failure.'
  },
  keyLearningPoints: [
    'In acute variceal bleeding, adopt a RESTRICTIVE blood transfusion strategy (target Hb 7-8 g/dL) to avoid rebound portal pressure surges.',
    'Start IV Terlipressin / Octreotide and prophylactic IV Ceftriaxone IMMEDIATELY upon suspicion of variceal bleeding, before endoscopy.',
    'AST > ALT with reversed A:G ratio and thrombocytopenia strongly indicates advanced hepatic cirrhosis with portal hypertension.',
    'GI bleeding is a potent trigger of Hepatic Encephalopathy due to colonic bacterial metabolism of blood proteins into ammonia.'
  ],
  referenceGuidelines: [
    'Baveno VII Consensus Guidelines on Portal Hypertension (2022)',
    'EASL Clinical Practice Guidelines on Decompensated Cirrhosis (2018)',
    'Malaysian Society of Gastroenterology & Hepatology (MSGH) Guidelines on Upper GI Bleeding'
  ]
};
