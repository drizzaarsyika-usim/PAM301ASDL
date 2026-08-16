import { SdlCase } from '../../types';

export const RHEUM_DERM_NEURO_CASE: SdlCase = {
  id: 'w7-rheum-derm-neuro',
  week: 7,
  topicCategory: 'Rheumatology, Dermatology & Neurology',
  caseCode: 'SDL-W7-NEURO-RHEUM-HEADACHE',
  title: 'Severe Headache, Confusion & Rash in a Young Female',
  subTitle: 'Acute Meningoencephalitis vs Neuropsychiatric Systemic Lupus Erythematosus (NPSLE) & Secondary Headache Red Flags',
  assignmentName: 'Structured Approach to Acute Headache & SNOOP4 Red Flags',
  stem: {
    patientName: 'Puan Nur Sabrina binti Hashim',
    age: 28,
    gender: 'Female',
    occupation: 'Graphic designer',
    setting: 'Emergency Department Yellow/Red Zone',
    triageCategory: 'Red (Resuscitation)',
    presentingComplaint: 'Excruciating throbbing headache for 3 days, accompanied by progressive confusion, photophobia, fever, and a generalized facial and body rash.',
    historyOfPresentingIllness: [
      'Headache onset: Severe, throbbing, holocranial headache starting 3 days ago, peaking rapidly and rated 9/10, exacerbated by bright light and neck bending.',
      'Mental state changes: Husband noticed that since yesterday, she became disoriented to time and place, talking nonsense, and had an episode of generalized tonic-clonic jerking lasting 2 minutes.',
      'Rash: Developed an erythematous, raised butterfly-shaped rash across her cheeks and bridge of nose (sparing nasolabial folds) over the last 2 weeks after a beach holiday, as well as painful oral mouth ulcers and alopecia (hair shedding).',
      'Joint pains: Symmetrical polyarthralgia affecting bilateral MCP, PIP joints, and wrists for 4 months, worse with morning stiffness lasting > 1 hour.'
    ],
    systemicReview: [
      'Neuro: Severe headache, photophobia, seizure, confusion, neck stiffness.',
      'Derm: Malar rash sparing nasolabial folds, painless oral palate ulcers, non-scarring alopecia.',
      'Rheum: Symmetrical inflammatory polyarthritis.',
      'Renal: Noticed frothy urine for 1 month.'
    ],
    pastMedicalSurgicalHistory: [
      'Diagnosed with "inflammatory arthritis" 6 months ago; took herbal painkillers.',
      'No previous history of epilepsy.'
    ],
    medications: ['Mefenamic acid PRN for joint pain. No disease-modifying antirheumatic drugs (DMARDs).'],
    allergies: ['No known drug allergies.'],
    familyHistory: ['Elder sister has Systemic Lupus Erythematosus (SLE) with lupus nephritis.'],
    socialHistory: ['Non-smoker, non-drinker. Married with 1 child.'],
    vitals: {
      bp: '142/92 mmHg',
      hr: 104,
      rr: 20,
      spo2: '98% on room air',
      temp: '38.6°C (High fever)',
      gcs: '11/15 (E3 V3 M5 - Confused, restless)',
      painScore: '9/10',
      rbs: '5.8 mmol/L'
    }
  },
  stages: [
    {
      stageKey: 'history',
      stageNumber: 1,
      title: 'Clinical Stem & Multisystem Autoimmune vs Infectious Features',
      shortTitle: 'History',
      suggestedDurationMinutes: 8,
      primaryRole: 'presenter',
      prompt: 'Synthesize the clinical history. Correlate the neurological emergency (headache + fever + seizure + altered sensorium) with the multisystem rheumatological and dermatological cues.',
      guidingQuestions: [
        'What are the cardinal ACR/EULAR criteria for Systemic Lupus Erythematosus present in this patient?',
        'Why must Acute Bacterial/Viral Meningoencephalitis be actively treated even if Neuropsychiatric SLE is suspected?',
        'What is the significance of the malar rash sparing the nasolabial folds?'
      ],
      expertBenchmark: {
        title: 'Neuro-Rheumatology Clinical Synthesis',
        summary: 'A 28-year-old female presenting with an acute neuro-infectious / neuro-inflammatory syndrome (fever, severe headache, photophobia, seizure, encephalopathy) against a background of undiagnosed active Systemic Lupus Erythematosus (malar rash, photosensitivity, oral ulcers, inflammatory polyarthritis).',
        keyPoints: [
          'Diagnostic Dilemma: Is this Acute Bacterial/Viral/Tubercular Meningoencephalitis occurring in an immunocompromised host, OR is it Acute Lupus Cerebritis / CNS Vasculitis (NPSLE)?',
          'Crucial Clinical Rule: INFECTION MUST BE PRESUMED AND TREATED FIRST until sterile CSF and negative cultures are confirmed, because high-dose immunosuppression in untreated CNS infection is fatal.',
          'Malar Rash vs Rosacea: SLE malar rash characteristically SPARES the nasolabial folds (unlike rosacea/seborrheic dermatitis).'
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
        summary: 'A 28-year-old female with clinical features of active multisystem autoimmune disease presenting with acute febrile encephalopathy, severe secondary headache, meningism, and new-onset seizures, concerning for acute meningoencephalitis versus severe neuropsychiatric systemic lupus erythematosus (lupus cerebritis).',
        keyPoints: ['Young female + Active SLE stigmata + Acute febrile encephalopathy + Meningism + Seizure.']
      }
    },
    {
      stageKey: 'differential_diagnosis',
      stageNumber: 3,
      title: 'Differential Diagnosis Matrix',
      shortTitle: 'DDx Matrix',
      suggestedDurationMinutes: 10,
      primaryRole: 'ddx_lead',
      prompt: 'Construct the differential diagnosis matrix applying the SNOOP4 Secondary Headache framework.',
      expertBenchmark: {
        title: 'Neurological Differential Hierarchy',
        summary: '1. Acute Bacterial / Viral (HSV-1) / Fungal Meningoencephalitis (Must-not-miss life threat); 2. Neuropsychiatric SLE / Lupus Cerebritis / CNS Vasculitis (Leading Autoimmune); 3. Subarachnoid Haemorrhage (SAH) / Cerebral Venous Sinus Thrombosis (CVST - high risk in antiphospholipid syndrome); 4. Cryptococcal Meningitis / TB Meningitis; 5. Autoimmune Encephalitis (Anti-NMDA).',
        keyPoints: [
          'Must-not-miss: Acute Bacterial Meningitis (Streptococcus pneumoniae / Neisseria meningitidis) and HSV Encephalitis (temporal lobe necrosis).',
          'CVST: Hypercoagulable state from secondary Antiphospholipid Syndrome (APS) can cause dural venous sinus thrombosis presenting with headache and seizures.'
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
      prompt: 'Detail neurological meningeal signs (Kernig, Brudzinski, Jolt accentuation) and dermatological/rheumatological stigmata.',
      expertBenchmark: {
        title: 'Targeted Examination Findings',
        summary: 'General: Febrile (38.6°C), photophobic, curled in fetal position away from light. Derm: Erythematous, indurated confluent maculopapular rash over malar eminence sparing nasolabial folds (Butterfly rash); multiple painless shallow ulcers over hard palate; non-scarring alopecia with frontotemporal thinning. Neuro: GCS 11/15; Marked nuchal rigidity (neck stiffness) with positive Kernig sign and Brudzinski sign; Fundoscopy shows sharp disc margins (no papilledema); Cranial nerves intact; No focal motor deficit; Hyperreflexia bilaterally with extensor plantar responses. Musculoskeletal: Tenderness and boggy synovial thickening over bilateral PIP, MCP, and wrist joints without joint deformities.',
        keyPoints: [
          'Meningeal irritation confirmed: Neck stiffness, Kernig sign (+), Brudzinski sign (+).',
          'Lupus criteria met clinically: Malar rash, oral ulcers, alopecia, inflammatory synovitis.'
        ]
      }
    },
    {
      stageKey: 'investigations',
      stageNumber: 5,
      title: 'Investigations & Week 7 Core Assignment: Approach to Headache & SNOOP4',
      shortTitle: 'Investigations',
      suggestedDurationMinutes: 10,
      primaryRole: 'investigation_strategist',
      prompt: 'Apply the SNOOP4 red flags framework, evaluate Urgent CT Brain vs Lumbar Puncture sequence, and interpret the CSF analysis & Autoimmune Serology.',
      assignmentDetails: {
        assignmentTitle: 'Week 7 Assignment: SNOOP4 Red Flags & CSF Analysis',
        type: 'headache',
        data: {
          snoop4RedFlagsChecklist: {
            s_systemic: 'Present: High fever (38.6°C), weight loss, malar rash, polyarthritis.',
            n_neurological: 'Present: Encephalopathy (GCS 11), confusion, witnessed generalized tonic-clonic seizure.',
            o_onset: 'Subacute / rapidly progressive over 72 hours (non-thunderclap).',
            o_olderAge: 'Age 28 (Young adult, rule out secondary causes).',
            p_patternChange: 'New onset headache never experienced previously, progressive, positional worsening, photophobia.',
            p_papilloedema_posture_precipitation: 'Papilloedema absent, photophobia marked.'
          },
          neuroimaging: 'Non-Contrast CT Brain: No intracranial hemorrhage, no hydrocephalus, no midline shift, no mass lesion (Safe to proceed with Lumbar Puncture). MRI Brain + MRA/MRV: Shows hyperintensity in bilateral cortical gray-white matter junctions with leptomeningeal enhancement; MRV shows patent dural venous sinuses (no CVST).',
          cerebrospinalFluidAnalysis: {
            openingPressure: '22 cm H2O (Mildly elevated, normal 10 - 20 cm H2O)',
            appearance: 'Clear / slightly opalescent',
            wbc: '120 cells/µL (Lymphocytic predominance: 85% lymphocytes, 15% neutrophils)',
            protein: '1.45 g/L (Elevated, normal 0.15 - 0.45 g/L)',
            csfToSerumGlucoseRatio: '3.6 / 5.8 mmol/L = 0.62 (Normal > 0.60; preserved glucose excludes typical acute pyogenic bacterial meningitis)',
            gramStainAndIndiaInk: 'Negative for bacteria, negative for encapsulated yeast (Cryptococcus)',
            csfHsvPcr: 'Negative',
            csfViralPanel: 'Negative',
            csfOligoclonalBands: 'Positive'
          },
          autoimmuneAndImmunologyPanel: {
            ana: 'Positive (1:1280, Homogeneous / Speckled pattern)',
            antiDsDna: 'Positive (High titer 280 IU/mL, normal < 20)',
            complementLevels: 'C3 0.42 g/L (Markedly low, normal 0.9-1.8) and C4 0.06 g/L (Markedly low - indicates active immune-complex consumption)',
            antiSmAntibody: 'Positive (Highly specific for SLE)',
            urinalysis: 'Protein 2+ (Urine Protein:Creatinine Ratio 1.2 g/g indicating concurrent Lupus Nephritis)'
          }
        }
      },
      expertBenchmark: {
        title: 'Expert Diagnostic Synthesis',
        summary: 'Neuropsychiatric Systemic Lupus Erythematosus (Lupus Cerebritis / Aseptic Meningitis) with active SLE disease flare (hypocomplementemia, high anti-dsDNA, lupus nephritis), with infectious meningoencephalitis ruled out by sterile CSF PCR.',
        keyPoints: [
          'SNOOP4: Identifies high-risk secondary headache requiring urgent neuroimaging + LP.',
          'CSF: Aseptic/lymphocytic meningitis with high protein, normal glucose, negative Gram stain/PCR, and positive oligoclonal bands.',
          'Serology: ANA 1:1280, Anti-dsDNA 280, Anti-Smith (+), low C3/C4 confirms massive systemic autoimmune flare.'
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
      prompt: 'Formulate the final multi-organ rheumatological-neurological diagnosis.',
      expertBenchmark: {
        title: 'Definitive Diagnostic Formulation',
        summary: 'Severe Neuropsychiatric Systemic Lupus Erythematosus (NPSLE) manifesting as Lupus Cerebritis, Aseptic Meningoencephalitis, and Acute Symptomatic Seizures, in the setting of Active Multisystem SLE Flare (Malar Rash, Inflammatory Synovitis, Class III/IV Lupus Nephritis, and Hypocomplementemia).',
        keyPoints: ['Diagnosis: NPSLE (Lupus Cerebritis) + Active Systemic Flare + Class-defining antibodies.']
      }
    },
    {
      stageKey: 'management',
      stageNumber: 7,
      title: 'Empirical Anti-Infective & Immunosuppressive Therapy',
      shortTitle: 'Management',
      suggestedDurationMinutes: 8,
      primaryRole: 'management_lead',
      prompt: 'Formulate the acute management sequence: 1. Empirical antimicrobial cover pending CSF; 2. Seizure control; 3. Pulse Methylprednisolone + Cyclophosphamide; 4. Hydroxychloroquine.',
      expertBenchmark: {
        title: 'Acute Neuro-Lupus Management Protocol',
        summary: 'Empirical IV Antibiotics/Acyclovir -> High-Dose IV Pulse Methylprednisolone -> IV Cyclophosphamide / Rituximab + Antiepileptics + Hydroxychloroquine.',
        keyPoints: [
          'Initial Empirical Step: While waiting for CSF results, immediately administer IV Ceftriaxone 2g BD + IV Acyclovir 10mg/kg TDS + IV Dexamethasone. Once CSF bacterial/viral PCRs return negative, de-escalate and stop antimicrobials.',
          'Seizure Control: IV Levetiracetam (Keppra) 1000mg IV loading, then 500mg BD (preferred in lupus over phenytoin due to lower drug interaction with immunosuppressants).',
          'High-Dose Induction Immunosuppression: IV Methylprednisolone 500mg - 1000mg daily for 3 consecutive days ("Pulse Steroids"), followed by oral prednisolone 1mg/kg/day.',
          'Disease-Modifying Immunosuppression: IV Cyclophosphamide (NIH or Euro-Lupus regimen) or IV Rituximab / Mycophenolate Mofetil (MMF) for organ-threatening NPSLE and lupus nephritis.',
          'Universal SLE Foundation: Tab Hydroxychloroquine 200mg OD (reduces flares, vascular events, and mortality in all SLE patients).'
        ]
      }
    },
    {
      stageKey: 'wrapup_reflection',
      stageNumber: 8,
      title: 'Wrap-Up, Sun Protection, Islamic Care & Reflection',
      shortTitle: 'Wrap-Up',
      suggestedDurationMinutes: 7,
      primaryRole: 'scribe',
      prompt: 'Counseling on UV/Sun avoidance (Hijab as photoprotection), pregnancy planning with teratogenic DMARDs, and Section 8 reflection.',
      expertBenchmark: {
        title: 'Comprehensive Lupus Counseling & Bioethics',
        summary: 'Photoprotection, Cyclophosphamide gonadal preservation, teratogenicity counseling, and metacognitive reflection.',
        keyPoints: [
          'Photoprotection & Hijab: UV radiation is a direct trigger for keratinocyte apoptosis and autoantigen exposure. Sunscreen SPF 50+ plus covering attire (Hijab and long sleeves) provides excellent physical UV barrier.',
          'Fertility & Cyclophosphamide: Cyclophosphamide carries risk of premature ovarian failure. Discuss GnRH agonists (Leuprolide) for ovarian protection during pulse therapy.',
          'Teratogenicity: Teratogenic drugs (Mycophenolate, Cyclophosphamide) require strict dual contraception until disease is quiescent for >= 6 months before planning pregnancy.'
        ]
      }
    }
  ],
  islamicConsiderations: {
    rukhsahSolat: 'During the acute encephalopathic and post-ictal state, the patient is excused from solat. When sensorium clears, perform prayer in bed/chair with dry tayammum if intravenous lines or severe arthritis impair wudhu.',
    fastingRamadanGuidance: 'High-dose pulse steroids, active lupus nephritis, and acute CNS inflammation require adequate hydration, frequent medications, and tight electrolyte monitoring. Fasting is excused during active flares.',
    halalMedicationAndDiet: 'All recommended immunosuppressants and biologics are halal. Explain the medical imperative of preserving neurological function.',
    familyCommunicationAndBioethics: 'Counsel husband and extended family on the chronic fluctuating nature of SLE, emphasizing psychological support, debunking "black magic" or "santau" misconceptions often attributed to mysterious rashes and seizures in local culture.',
    patientEducationAndHolisticWellness: 'Teach holistic lupus management: strict sun protection (broad-spectrum sunscreen SPF 50+), regular clinic visits, avoidance of smoking, and early reporting of fever.'
  },
  keyLearningPoints: [
    'Always apply the SNOOP4 framework to detect secondary headaches requiring emergency neuroimaging and lumbar puncture.',
    'In febrile encephalopathy with meningism, NEVER delay empirical antimicrobials (Ceftriaxone + Acyclovir) while pursuing autoimmune serologies.',
    'Malar rash (sparing nasolabial folds), inflammatory arthritis, oral ulcers, and cytopenias in a young female should immediately prompt testing for SLE (ANA, anti-dsDNA, anti-Smith, C3, C4).',
    'Severe Neuropsychiatric SLE (lupus cerebritis/meningitis) requires prompt high-dose IV pulse Methylprednisolone and cyclophosphamide/biologics once infection is ruled out.'
  ],
  referenceGuidelines: [
    'EULAR Recommendations for the Management of Systemic Lupus Erythematosus (2023 Update)',
    'Malaysian Clinical Practice Guidelines on Management of Systemic Lupus Erythematosus',
    'International Headache Society (IHS) - ICHD-3 Classification of Secondary Headaches'
  ]
};
