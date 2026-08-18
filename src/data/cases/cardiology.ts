import { SdlCase } from '../../types';

export const CARDIO_CASES: SdlCase[] = [
  {
    id: 'w1-cardio-1',
    week: 1,
    topicCategory: 'Cardiology (1)',
    caseCode: 'SDL-W1-CARDIO-ACS',
    title: 'Acute Chest Pain in a Diabetic Gentleman',
    subTitle: 'Ischaemic Heart Disease / Acute Coronary Syndrome with RV Involvement',
    assignmentName: '12-Lead ECG & Right-Sided Lead Interpretation',
    stem: {
      patientName: 'Encik Rosli bin Mansor',
      age: 62,
      gender: 'Male',
      occupation: 'Retired lorry driver',
      setting: 'Emergency Department Resuscitation Zone',
      triageCategory: 'Red (Resuscitation)',
      presentingComplaint: 'Crushing central retrosternal chest pain radiating to the left arm and jaw for 2 hours, associated with diaphoresis and lightheadedness.',
      historyOfPresentingIllness: [
        'Onset: Sudden onset while watching television at home at 7:00 AM.',
        'Character: Heavy crushing sensation, described like "an elephant sitting on my chest", rated 9/10 in severity.',
        'Radiation: Radiates across the left shoulder, down the medial aspect of the left arm to the ring finger, and into the left mandible.',
        'Associated symptoms: Profuse cold sweating, nausea with 1 episode of non-bilious vomiting, marked lightheadedness when sitting up.',
        'Relieving/Aggravating factors: No relief with resting; took 1 sublingual glyceryl trinitrate (GTN) tablet at home from his neighbor which caused sudden severe dizziness and blackouts.'
      ],
      systemicReview: [
        'CVS: No preceding palpitation, no chronic claudication.',
        'Resp: Mild shortness of breath, no cough or hemoptysis.',
        'GI: Epigastric burning discomfort preceding the severe chest pain.',
        'Neuro: Giddiness on upright posture, no limb weakness.'
      ],
      pastMedicalSurgicalHistory: [
        'Type 2 Diabetes Mellitus x 15 years (poorly controlled, last HbA1c 9.4%).',
        'Hypertension x 10 years.',
        'Dyslipidaemia x 8 years.',
        'No prior documented myocardial infarction.'
      ],
      medications: [
        'Tab Metformin 1g BD',
        'Tab Gliclazide 80mg BD',
        'Tab Amlodipine 10mg OD',
        'Tab Atorvastatin 20mg ON'
      ],
      allergies: ['No known drug allergies (NKDA)'],
      familyHistory: ['Father passed away at age 52 due to sudden cardiac death.'],
      socialHistory: ['Chronic smoker: 35 pack-years. Denies alcohol or illicit substance use.'],
      vitals: {
        bp: '88/54 mmHg (Hypotensive)',
        hr: 52,
        rr: 22,
        spo2: '96% on room air',
        temp: '36.8°C',
        gcs: '15/15',
        painScore: '9/10',
        rbs: '14.2 mmol/L'
      }
    },
    stages: [
      {
        stageKey: 'history',
        stageNumber: 1,
        title: 'Clinical Stem & History Exploration',
        shortTitle: 'History',
        suggestedDurationMinutes: 8,
        primaryRole: 'presenter',
        prompt: 'Review the presenting illness, past medical history, and risk factors. Identify the pivotal clinical cues, pertinent positives, and pertinent negatives.',
        guidingQuestions: [
          'What are the cardinal red flags in this chest pain presentation?',
          'Why did the patient experience profound hypotension/dizziness after taking sublingual GTN?',
          'What high-risk vascular comorbid profile does this patient possess?'
        ],
        scaffoldHints: [
          'Look closely at the blood pressure and heart rate combination.',
          'Consider why nitrates cause profound haemodynamic collapse in specific STEMI territories (Right Ventricular Infarction).'
        ],
        expertBenchmark: {
          title: 'Expert History Synthesis',
          summary: 'A 62-year-old diabetic smoker presenting with acute onset, crushing retrosternal chest pain with autonomic symptoms, bradycardia, and hypotension exacerbated by nitrates.',
          keyPoints: [
            'Cardinal features of ACS: Crushing character, radiation to left arm/jaw, diaphoresis, autonomic symptoms.',
            'High pre-test vascular risk: 62 yo, male, long-standing DM (micro/macrovascular risk), smoking 35 pack-years, strong premature CVD family history.',
            'Critical hemodynamic warning: Borderline bradycardia (HR 52) and hypotension (BP 88/54) post-nitrate points strongly towards Inferior Wall STEMI with Right Ventricular (RV) involvement or complete heart block.',
            'Preload dependence: RV infarction causes right ventricular failure, rendering cardiac output exquisitely dependent on preload (venous return). Nitrates drop preload dramatically, causing hemodynamic shock.'
          ],
          pathophysiologyRationale: 'Occlusion of the proximal Right Coronary Artery (RCA) supplies the inferior LV wall, right ventricle, and AV node, producing the triad of hypotension, clear lung fields, and elevated JVP.',
          cognitiveBiasWarning: 'Beware of Anchoring Bias on "epigastric discomfort/GERD" in diabetics, and avoid Premature Closure before obtaining right-sided ECG leads.'
        }
      },
      {
        stageKey: 'problem_representation',
        stageNumber: 2,
        title: 'Problem Representation Synthesis',
        shortTitle: 'Problem Rep',
        suggestedDurationMinutes: 5,
        primaryRole: 'problem_lead',
        prompt: 'Formulate a precise, two-sentence problem representation using opposing semantic qualifiers (Who + When + What).',
        guidingQuestions: [
          'Who is the patient? (Demographics + key baseline vascular risk)',
          'When? (Acute vs hyperacute vs subacute onset)',
          'What? (Clinical syndrome: anginal chest pain + autonomic & hemodynamic compromise)'
        ],
        scaffoldHints: [
          'Template: [Age/Gender + Key Risk Factors] presenting with [Temporal Tempo] [Syndrome Description] complicated by [Hemodynamic State].'
        ],
        expertBenchmark: {
          title: 'Expert Problem Representation',
          summary: 'A 62-year-old gentleman with multiple cardiovascular risk factors (chronic heavy smoking, poorly controlled diabetes, hypertension) presenting with acute-onset (2 hours), severe crushing retrosternal chest pain accompanied by diaphoresis and nitrate-induced hypotension and bradycardia, concerning for acute coronary syndrome with right ventricular involvement.',
          keyPoints: [
            'Demographics & Risk: 62yo male, vasculopathic (DM, HTN, 35 pack-year smoker, family history).',
            'Tempo: Hyperacute / acute (<2 hours duration).',
            'Clinical Syndrome: Severe ischemic chest pain with autonomic arousal and preload-sensitive hemodynamic instability.'
          ]
        }
      },
      {
        stageKey: 'differential_diagnosis',
        stageNumber: 3,
        title: 'Differential Diagnosis Matrix',
        shortTitle: 'DDx Matrix',
        suggestedDurationMinutes: 10,
        primaryRole: 'ddx_lead',
        prompt: 'Construct a structured differential diagnosis matrix prioritizing Must-Not-Miss life-threatening emergencies, Leading working hypotheses, and Other alternative causes.',
        guidingQuestions: [
          'What are the "Big 5" lethal causes of acute chest pain?',
          'What makes Inferior-Posterior STEMI + RV infarction the highest probability?',
          'How do you rule out Acute Aortic Dissection and Pulmonary Embolism clinically?'
        ],
        scaffoldHints: [
          'Categories: 1. Must-Not-Miss Life Threats; 2. Most Likely Working Diagnosis; 3. Alternative/Benign Diagnoses.'
        ],
        expertBenchmark: {
          title: 'Expert Differential Hierarchy',
          summary: '1. Inferior STEMI with Right Ventricular Myocardial Infarction (Leading); 2. Acute Aortic Dissection Stanford Type A (Must-Not-Miss); 3. Acute Massive Pulmonary Embolism (Must-Not-Miss); 4. Acute Myopericarditis with tamponade; 5. Peptic Ulcer Disease / Perforation (Alternative).',
          keyPoints: [
            'Must-Not-Miss #1: Acute STEMI (Inferior + RV territory) - 90% pre-test probability.',
            'Must-Not-Miss #2: Acute Aortic Dissection (tearing back pain, unequal pulses, focal neuro deficits - absent here, but must exclude before thrombolysis).',
            'Must-Not-Miss #3: Massive Pulmonary Embolism (sudden dyspnea, pleuritic pain, risk factors for DVT).',
            'Must-Not-Miss #4: Acute Pericarditis / Cardiac Tamponade (positional chest pain, friction rub, electrical alternans).',
            'Alternative: Perforated Peptic Ulcer / Boerhaave Syndrome.'
          ],
          cognitiveBiasWarning: 'Search Satisficing: Do not stop at "Inferior STEMI" without checking for RV infarction (V4R lead) and posterior wall extension (V7-V9).'
        }
      },
      {
        stageKey: 'physical_examination',
        stageNumber: 4,
        title: 'Targeted Physical Examination',
        shortTitle: 'Exam',
        suggestedDurationMinutes: 7,
        primaryRole: 'investigation_strategist',
        prompt: 'Outline your targeted physical examination steps. What specific clinical signs will confirm RV infarction and exclude other life threats?',
        guidingQuestions: [
          'What is the classic clinical triad of Right Ventricular Infarction?',
          'How do you examine for unequal peripheral pulses and aortic regurgitation murmur?',
          'What are the lung findings (Killip classification)?'
        ],
        scaffoldHints: [
          'Triad of RV Infarction: Hypotension, Elevated JVP, and Clear Lung Fields.'
        ],
        expertBenchmark: {
          title: 'Targeted Examination Findings',
          summary: 'General: Diaphoretic, pale, distress (Killip Class I/IV on auscultation, but hemodynamically unstable). Vitals: BP 88/54, HR 52 (regular), RR 22, SpO2 96%. CVS: JVP elevated at 5 cm above sternal angle with prominent V-wave; Heart sounds S1, S2 present, no audible S3/S4, no murmurs, bilateral radial pulses synchronous and equal (no pulse deficit). Chest: Dual breath sounds, lungs clear bilaterally with NO bibasilar crackles. Abdomen: Soft, non-tender, no pulsatile abdominal mass. Extremities: Cool peripheries, capillary refill time 3.5 seconds, no bilateral pedal edema.',
          keyPoints: [
            'Classic RV Infarction Triad identified: Hypotension (88/54), Elevated JVP (5cm), Clear Lung Fields (no crackles).',
            'Killip class: Clear chest = Killip I (no left ventricular failure/pulmonary edema), yet in cardiogenic shock physiology from isolated right heart failure.',
            'Dissection screen negative: Symmetrical radial/femoral pulses, no diastolic murmur of aortic incompetence.'
          ]
        }
      },
      {
        stageKey: 'investigations',
        stageNumber: 5,
        title: 'Hypothesis-Driven Investigations & Core Assignment',
        shortTitle: 'Investigations',
        suggestedDurationMinutes: 10,
        primaryRole: 'investigation_strategist',
        prompt: 'Order and interpret the initial diagnostic investigations. Deep-dive into the Week 1 Core Assignment: 12-Lead ECG Analysis & Right-Sided Lead interpretation.',
        guidingQuestions: [
          'What are the hallmark ECG criteria for STEMI in Leads II, III, and aVF?',
          'Which reciprocal changes confirm acute inferior infarction?',
          'Why MUST a Right-Sided ECG (Lead V4R) be performed immediately?'
        ],
        scaffoldHints: [
          'ST elevation >= 1mm in inferior leads (II, III, aVF).',
          'Reciprocal ST depression in high lateral leads (I, aVL).',
          'ST elevation >= 0.5-1mm in V4R is highly sensitive and specific for RV infarction.'
        ],
        assignmentDetails: {
          assignmentTitle: 'Week 1 Assignment: 12-Lead ECG & V4R Analysis',
          type: 'ecg',
          data: {
            rate: '52 bpm (Sinus bradycardia with 1st degree AV block, PR interval 240ms)',
            rhythm: 'Regular sinus rhythm with nodal escape beats',
            axis: 'Normal cardiac axis (+60°)',
            stChanges: {
              inferior: 'ST elevation 3.5mm in lead II, 4.0mm in lead III, 3.0mm in lead aVF (Lead III ST elevation > Lead II).',
              highLateral: 'Reciprocal ST depression 2.5mm with T-wave inversion in Leads I and aVL.',
              anterior: 'ST depression 1.5mm in V1-V3 (suggestive of posterior wall ischemia/infarction extension).',
              rightSided: 'Lead V4R demonstrates 2.0mm ST segment elevation with upright T wave (Confirmatory for Right Ventricular Infarction).'
            },
            cardiacBiomarkers: 'High-Sensitivity Troponin T: 840 ng/L (Markedly elevated, ref < 14 ng/L). CK-MB: 48 U/L.',
            pointOfCareEcho: 'Hypokinesia of the inferior LV wall and dilated, hypokinetic right ventricle with RV free-wall akinesia. LV EF estimated at 48%. No pericardial effusion. No aortic root dilatation.'
          }
        },
        expertBenchmark: {
          title: 'Expert ECG & Lab Interpretation',
          summary: 'Acute Inferior-Posterior STEMI with Right Ventricular Myocardial Infarction due to acute thrombotic occlusion of the proximal dominant Right Coronary Artery (RCA).',
          keyPoints: [
            'ST elevation in II, III, aVF confirms Inferior STEMI.',
            'ST elevation in III > II plus reciprocal depression in I, aVL strongly points to proximal RCA as the culprit vessel (rather than circumflex).',
            'ST elevation >= 1mm in V4R confirms acute RV infarction with 90% sensitivity and 95% specificity.',
            'Reciprocal ST depression in V1-V3 indicates true posterior wall involvement (perform V7-V9 to document ST elevation).'
          ]
        }
      },
      {
        stageKey: 'definitive_diagnosis',
        stageNumber: 6,
        title: 'Working & Definitive Diagnosis',
        shortTitle: 'Diagnosis',
        suggestedDurationMinutes: 5,
        primaryRole: 'problem_lead',
        prompt: 'Formulate the complete, unified diagnostic label including anatomical territory, culprit lesion, and hemodynamic complications.',
        guidingQuestions: [
          'What is the precise full diagnosis?',
          'What is the Killip / hemodynamic classification?'
        ],
        expertBenchmark: {
          title: 'Definitive Diagnostic Label',
          summary: 'Acute ST-Elevation Myocardial Infarction (STEMI) of the Inferior and Right Ventricular territory, secondary to proximal Right Coronary Artery (RCA) acute thrombosis, complicated by Right Ventricular failure, Sinus Bradycardia with First-Degree AV Block, and Nitrate-Induced Hypotension.',
          keyPoints: [
            'Anatomical accuracy: Inferior + RV + Posterior STEMI.',
            'Etiology: Plaque rupture with acute thrombotic coronary occlusion.',
            'Complications: Preload-dependent RV cardiogenic shock, conduction system ischemia.'
          ]
        }
      },
      {
        stageKey: 'management',
        stageNumber: 7,
        title: 'Immediate & Comprehensive Management Plan',
        shortTitle: 'Management',
        suggestedDurationMinutes: 8,
        primaryRole: 'management_lead',
        prompt: 'Formulate the urgent resuscitation, reperfusion strategy, medical anti-thrombotic therapy, and CONTRAINDICATED medications.',
        guidingQuestions: [
          'What is the emergency reperfusion target (Primary PCI vs Thrombolysis door-to-needle time)?',
          'What are the absolute contraindications to standard STEMI drugs (Nitrates, Morphine, Beta-blockers, Diuretics)?',
          'How do you manage the hypotension in RV infarction?'
        ],
        scaffoldHints: [
          'RV shock requires Volume expansion with IV Normal Saline boluses, NOT diuretics or nitrates!',
          'Dual antiplatelet therapy (Aspirin + Ticagrelor/Clopidogrel) + Anticoagulation (Heparin).'
        ],
        expertBenchmark: {
          title: 'Expert Management Protocol',
          summary: 'Emergency Reperfusion + Volume Expansion + Antithrombotic Therapy while strictly avoiding preload-reducing agents.',
          keyPoints: [
            'Immediate Reperfusion: Emergency activation of Cardiac Catheterization Lab for Primary Percutaneous Coronary Intervention (PPCI, door-to-balloon target < 90 mins). If PCI unavailable within 120 mins, administer IV Thrombolysis (Tenecteplase) within 30 mins.',
            'Hemodynamic Resuscitation: IV Normal Saline 500ml-1000ml rapid boluses to restore RV preload and maintain cardiac output. If refractory hypotension, start Inotrope/Vasopressor (IV Noradrenaline / Dobutamine).',
            'STRICT CONTRAINDICATIONS: STOP all Nitrates (GTN), Morphine, Diuretics (Furosemide), and Beta-Blockers (reduces heart rate and preload, worsening RV shock).',
            'Antiplatelet & Anticoagulant Loading: Tab Aspirin 300mg stat (chewed), Tab Ticagrelor 180mg stat (or Clopidogrel 600mg), IV Unfractionated Heparin 5000 units IV bolus.',
            'Monitoring: Continuous cardiac telemetry (watch for complete heart block), high-dependency / CCU admission, transcutaneous pacing pads ready on standby.'
          ]
        }
      },
      {
        stageKey: 'wrapup_reflection',
        stageNumber: 8,
        title: 'Wrap-Up, Patient-Centred/Islamic Care & Group Reflection',
        shortTitle: 'Wrap-Up',
        suggestedDurationMinutes: 7,
        primaryRole: 'scribe',
        prompt: 'Review the holistic patient-centered care, Islamic medical bioethics, and complete the three mandatory group reflection prompts.',
        guidingQuestions: [
          'How do we counsel Encik Rosli regarding prayer (solat) while bedridden in CCU?',
          'What dietary and lifestyle modifications are needed in the context of Malaysian diet?',
          'What are our three group reflection takeaways?'
        ],
        expertBenchmark: {
          title: 'Holistic & Islamic Care Overview',
          summary: 'Integrating spiritual comfort (Rukhsah for solat), smoking cessation, cardiac rehab, and structured metacognitive group reflection.',
          keyPoints: [
            'Rukhsah in Solat: Patient is in acute critical state with femoral/radial sheath and lines. Educate that he can pray lying down (solat secara baring/isyarat) with Tayammum if wudhu is contraindicated due to catheter sites.',
            'Cardiac Rehabilitation: Structured smoking cessation clinic referral, diabetic control optimization, Mediterranean/low-glycaemic diet adaptation for local food.',
            'Family conference: Empathetic explanation to spouse and children regarding the nature of heart attack, stent placement, and warning signs.'
          ]
        }
      }
    ],
    islamicConsiderations: {
      rukhsahSolat: 'During the acute CCU stay with arterial sheaths and strict bedrest, the patient is granted the Rukhsah (concession) to perform solat in the supine or semi-recumbent position using head/eye gestures (solat secara isyarat). Tayammum using a clean dust pad can substitute for water ablution if moving or wetting limb dressing is hazardous.',
      fastingRamadanGuidance: 'The patient has an acute unstable coronary event with high myocardial oxygen demand and heavy medication regimen. Fasting is contraindicated during the acute recovery phase; fidya/qada rules apply once stable upon consultant clearance.',
      halalMedicationAndDiet: 'Inform patient regarding medications: Standard gelatin-free or synthetic capsules where available; porcine-free heparin / enoxaparin sources if inquired by patient (fatwa allows standard heparin during life-saving cardiac emergencies under the principle of Darurah/Necessity).',
      familyCommunicationAndBioethics: 'Hold a family conference (Musyawarah) involving spouse and key caregivers to explain the angiogram/angioplasty consent, reassuring them and encouraging spiritual resilience (Sabr and Dua).',
      patientEducationAndHolisticWellness: 'Holistic secondary prevention: Smoking cessation counseling with religious motivation regarding bodily stewardship (Amanah), diet modification reducing santan/deep-fried foods, and gradual cardiac rehab exercise.'
    },
    keyLearningPoints: [
      'Inferior STEMI (leads II, III, aVF) is complicated by Right Ventricular Myocardial Infarction in up to 40% of cases (proximal RCA occlusion).',
      'Right Ventricular infarction is exquisitely PRELOAD DEPENDENT. Nitrates, morphine, and diuretics drop preload and cause catastrophic hypotension.',
      'Always record Lead V4R in any inferior STEMI before administering nitrates. ST elevation >= 1mm in V4R is diagnostic of RV infarction.',
      'Primary PCI is the gold standard reperfusion modality (Door-to-balloon < 90 mins).'
    ],
    referenceGuidelines: [
      'National Heart Association of Malaysia (NHAM) STEMI Clinical Practice Guidelines (2020)',
      'ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation (2023)',
      'Islamic Medical Association of Malaysia (IMAM) - Clinical Bioethics in Critical Care'
    ]
  },
  {
    id: 'w2-cardio-2',
    week: 2,
    topicCategory: 'Cardiology (2)',
    caseCode: 'SDL-W2-CARDIO-VALVE-HF',
    title: 'Worsening Breathlessness & Irregular Pulse in a Young Mother',
    subTitle: 'Rheumatic Mitral Stenosis complicated by Rapid Atrial Fibrillation & Acute Pulmonary Oedema',
    assignmentName: 'Rhythm Strip & Valvular Echocardiography Reasoning',
    stem: {
      patientName: 'Madam Tan Mei Ling',
      age: 38,
      gender: 'Female',
      occupation: 'Secondary school science teacher',
      setting: 'Medical Assessment Unit (MAU)',
      triageCategory: 'Yellow (Urgent)',
      presentingComplaint: 'Progressive shortness of breath for 1 week, acutely worsening over the last 24 hours with orthopnoea and heart palpitations.',
      historyOfPresentingIllness: [
        'Onset: Dyspnoea on moderate exertion for 3 months, but acutely deteriorated 24 hours ago following a febrile upper respiratory tract infection.',
        'Orthopnoea: Needs 4 pillows to sleep at night; woke up gasping for air 2 hours after sleeping (Paroxysmal Nocturnal Dyspnoea - PND).',
        'Palpitations: Sensation of fast, irregular fluttering inside the chest starting yesterday.',
        'Cough: Productive of frothy, pink-tinged sputum.',
        'Past history of childhood sore throats with joint pains treated with herbal remedies at age 10.'
      ],
      systemicReview: [
        'CVS: No crushing chest pain. Rapid fluttering pulse.',
        'Resp: Tachypnoea, orthopnoea, pink frothy sputum.',
        'Neuro: Mild dizziness, no focal neurological deficits, no history of TIA/stroke.',
        'Constitutional: Low-grade fever 37.8°C with sore throat 3 days ago.'
      ],
      pastMedicalSurgicalHistory: [
        'History of recurrent migratory polyarthritis and sore throats during childhood (suspected untreated Rheumatic Fever).',
        'Gravida 2, Para 2 (uneventful pregnancies 6 and 4 years ago).'
      ],
      medications: ['Paracetamol 1g PRN for fever. No regular cardiac medications.'],
      allergies: ['No known allergies.'],
      familyHistory: ['No family history of cardiomyopathy or early sudden cardiac death.'],
      socialHistory: ['Non-smoker, non-drinker. Lives with husband and two young children.'],
      vitals: {
        bp: '106/72 mmHg',
        hr: 138,
        rr: 28,
        spo2: '90% on room air (improves to 96% on 6L/min Hudson mask)',
        temp: '37.4°C',
        gcs: '15/15',
        painScore: '0/10',
        rbs: '6.1 mmol/L'
      }
    },
    stages: [
      {
        stageKey: 'history',
        stageNumber: 1,
        title: 'Clinical Stem & History Exploration',
        shortTitle: 'History',
        suggestedDurationMinutes: 8,
        primaryRole: 'presenter',
        prompt: 'Analyze the patient presentation. Connect the childhood history with the current acute decompensation and describe the physiological trigger.',
        guidingQuestions: [
          'What is the significance of childhood sore throats and migratory polyarthritis?',
          'Why did the onset of rapid atrial fibrillation precipitate sudden acute pulmonary oedema?',
          'What does pink frothy sputum signify?'
        ],
        expertBenchmark: {
          title: 'Expert History Synthesis',
          summary: 'A 38-year-old female with probable underlying Rheumatic Heart Disease (Mitral Stenosis) presenting with acute pulmonary congestion precipitated by new-onset rapid Atrial Fibrillation following a viral trigger.',
          keyPoints: [
            'Childhood Rheumatic Fever: Classic history of untreated streptococcal pharyngitis progressing to rheumatic carditis and progressive mitral valvular fibrosis/stenosis over decades.',
            'Loss of Atrial Kick & Shortened Diastole: In mitral stenosis, left ventricular filling occurs during diastole. Rapid AF reduces diastolic filling time and removes the 20-30% atrial booster pump, causing sudden dramatic rise in Left Atrial Pressure transmitted backward into pulmonary capillaries (producing acute pulmonary oedema with pink frothy sputum).',
            'Thromboembolic Risk: Dilated, fibrillating left atrium has extremely high stasis risk (CHA2DS2-VASc score + high intrinsic rheumatic MS risk).'
          ]
        }
      },
      {
        stageKey: 'problem_representation',
        stageNumber: 2,
        title: 'Problem Representation Synthesis',
        shortTitle: 'Problem Rep',
        suggestedDurationMinutes: 5,
        primaryRole: 'problem_lead',
        prompt: 'Craft a two-sentence problem representation using semantic qualifiers.',
        guidingQuestions: ['Integrate the chronic valvular substrate with the acute tachyarrhythmic decompensation.'],
        expertBenchmark: {
          title: 'Expert Problem Representation',
          summary: 'A 38-year-old female with a history suggestive of childhood rheumatic fever presenting with subacute exertional dyspnoea acutely complicated by new-onset rapid palpitations, orthopnoea, and pink frothy sputum, in the setting of acute decompensated pulmonary venous hypertension.',
          keyPoints: ['Young female + Rheumatic substrate + Acute-on-chronic decompensation + Tachyarrhythmia + Pulmonary congestion.']
        }
      },
      {
        stageKey: 'differential_diagnosis',
        stageNumber: 3,
        title: 'Differential Diagnosis Matrix',
        shortTitle: 'DDx Matrix',
        suggestedDurationMinutes: 10,
        primaryRole: 'ddx_lead',
        prompt: 'Build your differential diagnosis matrix with valvular, arrhythmic, infectious, and pulmonary etiologies.',
        guidingQuestions: ['Differentiate Rheumatic MS from Mitral Regurgitation, Aortic Valve Disease, and Infective Endocarditis.'],
        expertBenchmark: {
          title: 'Expert Differential Diagnosis',
          summary: '1. Rheumatic Mitral Stenosis with rapid Atrial Fibrillation and Acute Pulmonary Oedema (Leading); 2. Infective Endocarditis on pre-existing valvulopathy (Must-not-miss); 3. Acute Myocarditis / Dilated Cardiomyopathy; 4. Massive Pulmonary Embolism; 5. Severe Pneumonia with parapneumonic effusion.',
          keyPoints: [
            'Leading: Rheumatic Mitral Stenosis decompensated by rapid AF.',
            'Must-not-miss: Infective Endocarditis (low-grade fever + murmur = 3 sets of blood cultures needed).',
            'Must-not-miss: Left atrial appendage thrombus / embolic stroke.'
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
        prompt: 'Detail the precordial auscultation and peripheral signs of Mitral Stenosis and Heart Failure.',
        guidingQuestions: [
          'What are the auscultatory hallmarks of Mitral Stenosis at the apex (in left lateral position with bell)?',
          'What are the signs of pulmonary hypertension?'
        ],
        expertBenchmark: {
          title: 'Targeted Examination Findings',
          summary: 'General: Tachypnoeic, sitting upright, malar flush (mitral facies). Vitals: Pulse 138 bpm (irregularly irregular, variable volume), BP 106/72, SpO2 92% on 4L nasal cannula. Precordium: Tapping apex beat (palpable S1) in 5th intercostal space midclavicular line; left parasternal heave (RV hypertrophy); loud P2 component of S2 at pulmonary area. Auscultation at apex (left lateral, expiration with bell): Loud First Heart Sound (S1), Opening Snap followed by a low-pitched mid-diastolic rumbling murmur with presystolic accentuation (though presystolic accentuation is lost in AF). Chest: Bilateral coarse crackles over lower and middle lung zones with expiratory wheezing ("cardiac asthma").',
          keyPoints: [
            'Auscultation quartet of MS: Loud S1 + Opening Snap + Mid-diastolic rumbling murmur + Tapping apex beat.',
            'Signs of Pulmonary Hypertension: Left parasternal heave, loud palpable P2.',
            'Malar flush: Cyanotic purplish patches on cheeks due to severe low cardiac output and pulmonary vasoconstriction.'
          ]
        }
      },
      {
        stageKey: 'investigations',
        stageNumber: 5,
        title: 'Investigations & Week 2 Core Assignment',
        shortTitle: 'Investigations',
        suggestedDurationMinutes: 10,
        primaryRole: 'investigation_strategist',
        prompt: 'Order and analyze ECG rhythm strip and Echocardiography parameters.',
        guidingQuestions: [
          'What ECG features confirm Atrial Fibrillation?',
          'What echocardiographic measurements define severe Mitral Stenosis (Valve area, mean gradient, Wilkins score)?'
        ],
        assignmentDetails: {
          assignmentTitle: 'Week 2 Assignment: AF Rhythm & Echo Reasoning',
          type: 'ecg',
          data: {
            ecgFindings: 'Absent P waves, irregularly irregular baseline fibrillatory waves (f waves), rapid ventricular response rate 142 bpm, Right Axis Deviation (+110°), Tall R wave in V1 (RV hypertrophy).',
            chestXray: 'Straightening of left heart border (dilated Left Atrial Appendage), double heart border (dilated Left Atrium), prominent pulmonary vasculature (cephalization / upper lobe blood diversion), Kerley B lines at costophrenic angles.',
            transthoracicEcho: 'Mitral Valve Area (MVA) 0.8 cm² (Severe MS, normal > 4.0 cm²); Mean trans-mitral pressure gradient 14 mmHg; Thickened mitral leaflets with hockey-stick appearance (doming of anterior mitral leaflet); Left atrial diameter 54 mm (severely dilated); Estimated Pulmonary Artery Systolic Pressure (PASP) 55 mmHg (Severe Pulmonary Hypertension); LVEF 60%.'
          }
        },
        expertBenchmark: {
          title: 'Expert Diagnostic Interpretation',
          summary: 'Severe Rheumatic Mitral Stenosis (MVA 0.8 cm², mean gradient 14 mmHg) with severe Left Atrial enlargement, secondary severe Pulmonary Hypertension, in rapid Atrial Fibrillation with Acute Pulmonary Congestion.',
          keyPoints: [
            'Severe MS defined by MVA < 1.0 cm² and mean gradient > 10 mmHg.',
            'ECG confirms rapid Atrial Fibrillation + Right Ventricular Hypertrophy.',
            'CXR demonstrates classical left atrial enlargement and pulmonary interstitial oedema (Kerley B lines).'
          ]
        }
      },
      {
        stageKey: 'definitive_diagnosis',
        stageNumber: 6,
        title: 'Working & Definitive Diagnosis',
        shortTitle: 'Diagnosis',
        suggestedDurationMinutes: 5,
        primaryRole: 'problem_lead',
        prompt: 'State the comprehensive unified diagnosis.',
        expertBenchmark: {
          title: 'Definitive Diagnostic Formulation',
          summary: 'Acute Decompensated Heart Failure (Killip II / NYHA IV) with Acute Pulmonary Oedema secondary to Severe Rheumatic Mitral Stenosis precipitated by Rapid Atrial Fibrillation and upper respiratory tract infection, with Severe Secondary Pulmonary Hypertension.',
          keyPoints: ['Underlying etiology: Rheumatic Heart Disease.', 'Structural lesion: Severe Mitral Stenosis.', 'Precipitant: Rapid Atrial Fibrillation + viral URI.']
        }
      },
      {
        stageKey: 'management',
        stageNumber: 7,
        title: 'Comprehensive Management Plan',
        shortTitle: 'Management',
        suggestedDurationMinutes: 8,
        primaryRole: 'management_lead',
        prompt: 'Design immediate decongestion, ventricular rate control, anticoagulation, and definitive valvular intervention.',
        guidingQuestions: [
          'What is the immediate medical management for pulmonary oedema?',
          'What rate control agents are preferred in rapid AF with mitral stenosis (Digoxin vs Beta-blocker)?',
          'Why is Warfarin mandatory over DOACs in rheumatic mitral stenosis?',
          'What is the definitive intervention (PTMC / BMV vs MVR)?'
        ],
        expertBenchmark: {
          title: 'Expert Management Strategy',
          summary: 'Oxygenation + IV Diuresis + Rate Control (Digoxin/Beta-blocker) + Anticoagulation (Warfarin) + Percutaneous Transvenous Mitral Commisurotomy (PTMC).',
          keyPoints: [
            'Immediate Resuscitation: High-flow O2 via non-rebreather mask (or CPAP/NIV if refractory), IV Furosemide 40mg-80mg stat to reduce pulmonary capillary wedge pressure.',
            'Ventricular Rate Control: IV Digoxin 0.5mg slow infusion or IV Metoprolol / Esmolol titrated carefully to prolong diastole and reduce left atrial pressure.',
            'Anticoagulation: Vitamin K Antagonist (Warfarin target INR 2.0-3.0). DOACs (Apixaban/Rivaroxaban) are NOT approved for moderate-to-severe Rheumatic Mitral Stenosis.',
            'Definitive Intervention: Percutaneous Transvenous Mitral Commissurotomy (PTMC / Balloon Valvotomy) if Wilkins echocardiographic score <= 8 and no LA thrombus or significant MR. Otherwise, Surgical Mitral Valve Replacement (MVR).',
            'Secondary Prevention: Intramuscular Benzathine Penicillin G 1.2 million units every 3-4 weeks until age 40 (or lifelong if high-risk).'
          ]
        }
      },
      {
        stageKey: 'wrapup_reflection',
        stageNumber: 8,
        title: 'Wrap-Up, Patient-Centred Counseling & Reflection',
        shortTitle: 'Wrap-Up',
        suggestedDurationMinutes: 7,
        primaryRole: 'scribe',
        prompt: 'Formulate patient-centered counseling, anticoagulation safety, ergonomics and rest adaptations, and answer the Section 8 reflection prompts.',
        expertBenchmark: {
          title: 'Wrap-Up & Group Reflection',
          summary: 'Holistic counseling regarding pregnancy risks, lifelong anticoagulation, secondary antibiotic prophylaxis, and reflective debrief.',
          keyPoints: [
            'Warfarin Counseling: High teratogenic risk in pregnancy (counsel on contraception/switch to LMWH if planning pregnancy), consistent vitamin K diet, regular INR monitoring.',
            'Ergonomics & Physical Rest: Patient experiencing orthopnoea and severe dyspnoea needs elevated backrest (semi-Fowler position); permit seated rest during teaching duties until cardiac decongestion is achieved.',
            'Infective Endocarditis Prophylaxis: Education on meticulous dental hygiene and antibiotic prophylaxis prior to dental procedures.'
          ]
        }
      }
    ],
    islamicConsiderations: {
      rukhsahSolat: 'Severe orthopnoea prevents flat supine or strenuous exertion; patient is supported in an upright 45-degree semi-Fowler posture with adequate pillow support for comfortable resting and breathing.',
      fastingRamadanGuidance: 'Acute pulmonary congestion and active initiation of IV diuretics and Warfarin require adequate hydration and frequent drug titration; strict fasting is medically deferred during unstable cardiac stages.',
      halalMedicationAndDiet: 'Warfarin dietary education: Maintain consistent dietary intake of green leafy vegetables (kangkung, sawi, broccoli) to avoid erratic INR fluctuations; discuss safe over-the-counter and complementary health product precautions.',
      familyCommunicationAndBioethics: 'Discuss reproductive planning empathetically with Madam Tan and her husband: severe mitral stenosis poses maternal mortality risks in pregnancy; planned valve repair/replacement is crucial prior to future conception.',
      patientEducationAndHolisticWellness: 'Secondary prophylaxis education: Monthly penicillin injections prevent further recurrent rheumatic attacks; explain that compliance protects her heart valves for life.'
    },
    keyLearningPoints: [
      'Rheumatic Mitral Stenosis creates a mechanical bottleneck to left ventricular inflow; acute tachyarrhythmias (such as rapid AF) dramatically reduce diastolic filling time and trigger flash pulmonary oedema.',
      'Auscultatory findings: Loud S1, opening snap, and low-pitched mid-diastolic rumbling murmur at the apex in left lateral position.',
      'Valvular AF in Rheumatic Mitral Stenosis carries a massive stroke risk and MANDATES anticoagulation with Warfarin (DOACs are not non-inferior in moderate-severe rheumatic MS).',
      'Definitive relief is achieved via Percutaneous Transvenous Mitral Commissurotomy (PTMC) or surgical replacement.'
    ],
    referenceGuidelines: [
      'AHA/ACC Guideline for the Management of Patients With Valvular Heart Disease (2020)',
      'Malaysian Clinical Practice Guidelines on Heart Failure (2019)',
      'World Heart Federation Criteria for Echocardiographic Diagnosis of Rheumatic Heart Disease'
    ]
  }
];
