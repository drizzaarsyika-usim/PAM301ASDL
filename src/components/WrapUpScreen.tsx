import React, { useState } from 'react';
import { SdlCase, TeamReflection } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { 
  HeartHandshake, 
  BookOpen, 
  HelpCircle, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Award,
  Compass,
  FileCheck,
  Moon,
  Users
} from 'lucide-react';

interface WrapUpScreenProps {
  currentCase: SdlCase;
  stageAnswers: Record<string, string>;
  roleAssignments: Record<string, string>;
  reflection: TeamReflection;
  onUpdateReflection: (reflection: TeamReflection) => void;
  onPrintReport: () => void;
}

export const WrapUpScreen: React.FC<WrapUpScreenProps> = ({
  currentCase,
  stageAnswers,
  roleAssignments,
  reflection,
  onUpdateReflection,
  onPrintReport
}) => {
  const [localReflection, setLocalReflection] = useState<TeamReflection>(reflection);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateReflection(localReflection);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const answeredCount = Object.keys(stageAnswers).filter((k) => !!stageAnswers[k]?.trim()).length;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Stage 8 • Final Synthesis &amp; Reflection
              </span>
              <span className="text-xs text-slate-300">
                Week {currentCase.week} SDL Master
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {currentCase.title} — Wrap-Up &amp; Metacognition
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Congratulations on completing the diagnostic and management reasoning stages. Synthesize the patient-centered holistic aspects and record your group reflection.
            </p>
          </div>

          <button
            id="wrapup-print-report-btn"
            onClick={onPrintReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs shadow-lg transition-all shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Generate &amp; Print Group Report</span>
          </button>
        </div>

        {/* Completion summary pills */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stages Completed: <strong>{answeredCount}/8</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Roles Assigned: <strong>{Object.keys(roleAssignments).length}/8</strong></span>
          </div>
        </div>
      </div>

      {/* 1. Patient-Centered & Islamic Medical Considerations Card */}
      {currentCase.islamicConsiderations && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Moon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Patient-Centred, Bioethical &amp; Islamic Medical Considerations
              </h3>
              <p className="text-xs text-slate-500">
                Contextualizing clinical care within local culture, religious concessions (Rukhsah), and family dynamics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Rukhsah Solat */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                Rukhsah in Solat (Prayer Concessions)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {currentCase.islamicConsiderations.rukhsahSolat}
              </p>
            </div>

            {/* Fasting Ramadan */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Ramadan Fasting Risk Assessment
              </span>
              <p className="text-slate-700 leading-relaxed">
                {currentCase.islamicConsiderations.fastingRamadanGuidance}
              </p>
            </div>

            {/* Halal Meds & Diet */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                Halal Medication &amp; Prescriptions
              </span>
              <p className="text-slate-700 leading-relaxed">
                {currentCase.islamicConsiderations.halalMedicationAndDiet}
              </p>
            </div>

            {/* Family & Bioethics */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-indigo-800 flex items-center gap-1.5 text-xs">
                <HeartHandshake className="w-3.5 h-3.5 text-indigo-600" />
                Family Communication &amp; Musyawarah
              </span>
              <p className="text-slate-700 leading-relaxed">
                {currentCase.islamicConsiderations.familyCommunicationAndBioethics}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Key Learning Points */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Award className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            High-Yield Clinical Learning Takeaways
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {currentCase.keyLearningPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="font-medium leading-relaxed">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Section 8: Group Metacognitive Reflection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Section 8: Team Metacognitive Reflection Prompts
              </h3>
              <p className="text-xs text-slate-500">
                Reflect on diagnostic friction, communication efficacy, and tomorrow&apos;s ward takeaway.
              </p>
            </div>
          </div>

          <button
            id="save-reflection-btn"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Save Reflection</span>
          </button>
        </div>

        {isSaved && (
          <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Group Reflection saved successfully and included in the final report!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          {/* Prompt 1 */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block leading-snug">
              1. What was the most challenging diagnostic fork or counter-intuitive finding in this case, and how did your team prevent cognitive biases (e.g. anchoring, premature closure)?
            </label>
            <textarea
              id="reflection-diagnostic-hurdle-input"
              value={localReflection.diagnosticHurdle}
              onChange={(e) => setLocalReflection({ ...localReflection, diagnosticHurdle: e.target.value })}
              placeholder="Reflect on diagnostic reasoning forks (e.g. why nitrates in RV infarction would have been fatal, or how normal PaCO2 deceived us in severe asthma)..."
              rows={3}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
            />
          </div>

          {/* Prompt 2 */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block leading-snug">
              2. How did the rotating role allocation (Chair, Presenter, DDx Lead, Devil&apos;s Advocate, Scribe, etc.) enhance your team&apos;s efficiency and psychological safety?
            </label>
            <textarea
              id="reflection-team-communication-input"
              value={localReflection.teamCommunication}
              onChange={(e) => setLocalReflection({ ...localReflection, teamCommunication: e.target.value })}
              placeholder="Reflect on role dynamics and how the Devil's Advocate challenged assumptions without fear..."
              rows={3}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
            />
          </div>

          {/* Prompt 3 */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block leading-snug">
              3. What is ONE specific, actionable clinical rule or bedside investigation skill your team will apply during ward rounds tomorrow?
            </label>
            <textarea
              id="reflection-ward-takeaway-input"
              value={localReflection.wardRoundTakeaway}
              onChange={(e) => setLocalReflection({ ...localReflection, wardRoundTakeaway: e.target.value })}
              placeholder="e.g. Always order right-sided leads V4R in inferior STEMI before giving sublingual GTN..."
              rows={3}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
