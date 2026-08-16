import React from 'react';
import { SdlCase, TeamReflection, TeamRole } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { Printer, X, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';

interface PrintableReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: SdlCase;
  stageAnswers: Record<string, string>;
  roleAssignments: Record<string, string>;
  teammates: string[];
  reflection: TeamReflection;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({
  isOpen,
  onClose,
  currentCase,
  stageAnswers,
  roleAssignments,
  teammates,
  reflection
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Top Control Bar (Hidden during window.print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold">
              SDL Group Clinical Reasoning Portfolio Report
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 print:p-0 print:space-y-4">
          
          {/* Header Block */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 block">
                Clinical Reasoning Self-Directed Learning (SDL)
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                Week {currentCase.week}: {currentCase.title}
              </h1>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Case Code: <span className="font-mono">{currentCase.caseCode}</span> • Module: {currentCase.topicCategory}
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 font-medium shrink-0">
              <p>Generated: {new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <p>Patient: {currentCase.stem.patientName}, {currentCase.stem.age}yo {currentCase.stem.gender}</p>
            </div>
          </div>

          {/* Team Roles Matrix */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              Assigned Team Roster (8 Rotating Roles)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TEAM_ROLES.map((role) => (
                <div key={role.id} className="p-2 rounded bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{role.name}</div>
                  <div className="font-bold text-indigo-900 truncate">
                    {roleAssignments[role.id] || 'Unassigned'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stages Progression: Team Pre-Commitments */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-950 uppercase tracking-wider border-b border-slate-200 pb-1">
              Stage-by-Stage Clinical Pre-Commitments
            </h3>

            {currentCase.stages.map((stage) => {
              const teamText = stageAnswers[stage.stageKey];
              return (
                <div key={stage.stageKey} className="border border-slate-200 rounded-xl p-3.5 space-y-2 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-xs text-slate-900">
                      Stage {stage.stageNumber}: {stage.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Committed
                    </span>
                  </div>

                  {/* Team's Written Answer */}
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-800">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-0.5">
                      Team Synthesized Reasoning:
                    </span>
                    <p className="whitespace-pre-wrap font-medium">
                      {teamText?.trim() || 'No text committed for this stage.'}
                    </p>
                  </div>

                  {/* Expert Summary Reference */}
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-950">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-0.5">
                      Faculty Clinical Benchmark:
                    </span>
                    <p className="leading-snug">
                      {stage.expertBenchmark.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 8: Group Metacognitive Reflections */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">
              Section 8: Team Metacognitive Reflections
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  1. Diagnostic Hurdle &amp; Cognitive Biases Guarded Against:
                </span>
                <p className="text-slate-700 italic">
                  {reflection.diagnosticHurdle || 'N/A'}
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  2. Role Allocation Dynamics &amp; Team Communication:
                </span>
                <p className="text-slate-700 italic">
                  {reflection.teamCommunication || 'N/A'}
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  3. Tomorrow&apos;s Bedside Ward Round Takeaway:
                </span>
                <p className="text-slate-700 italic">
                  {reflection.wardRoundTakeaway || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Sign-off signatures box */}
          <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
            <div>
              <p className="font-bold text-slate-900">Student Scribe Signature:</p>
              <div className="h-10 border-b border-dashed border-slate-400 mt-2" />
              <p className="text-slate-500 mt-1">Name: {roleAssignments['scribe'] || 'Scribe'}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Clinical Facilitator / Faculty Sign-Off:</p>
              <div className="h-10 border-b border-dashed border-slate-400 mt-2" />
              <p className="text-slate-500 mt-1">Date &amp; Stamp:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
