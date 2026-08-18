import React from 'react';
import { TeamRole } from '../types';
import { 
  X, 
  HelpCircle,
  ShieldAlert,
  Gavel,
  UserCheck,
  Target,
  Layers,
  Microscope,
  HeartHandshake,
  FileText,
  User,
  CheckCircle2,
  BookOpen,
  MessageSquareQuote,
  Sparkles
} from 'lucide-react';

interface RoleDetailModalProps {
  role: TeamRole | null;
  assignedStudent?: string;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Gavel: <Gavel className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Microscope: <Microscope className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />
};

export const RoleDetailModal: React.FC<RoleDetailModalProps> = ({
  role,
  assignedStudent,
  onClose
}) => {
  if (!role) return null;

  const isAssigned = assignedStudent && assignedStudent !== 'Unassigned';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-indigo-500/40 text-slate-100 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Role Title & Badge */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-800/60 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-400/40 flex items-center justify-center shadow-inner shrink-0">
              {ICON_MAP[role.icon] || <UserCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  SDL Rotating Role
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {role.shortName}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight">
                {role.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0 cursor-pointer"
            title="Close this window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm leading-relaxed">
          
          {/* Active Assignee Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">
                  Currently Assigned Student:
                </span>
                <span className="text-base font-extrabold text-white">
                  {isAssigned ? assignedStudent : 'Unassigned'}
                </span>
              </div>
            </div>
            {isAssigned ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active on Duty
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium shrink-0">
                Pending Assignment
              </span>
            )}
          </div>

          {/* Role Core Objective / Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Core Role Objective &amp; Mission</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 font-medium">
              {role.description}
            </p>
          </div>

          {/* Key Cardinal Question (Socratic Prompt) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <MessageSquareQuote className="w-4 h-4 text-amber-400" />
              <span>Cardinal Question to Challenge the Team</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
              <p className="text-base sm:text-lg font-bold italic">
                &ldquo;{role.keyQuestion}&rdquo;
              </p>
              <p className="text-xs text-amber-300/80 mt-1.5 font-medium">
                Ask this during group discussions to keep the clinical reasoning structured and prevent premature closure.
              </p>
            </div>
          </div>

          {/* Comprehensive Job Responsibilities */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Specific Clinical Stage Duties</span>
            </div>
            <div className="space-y-2">
              {role.duties.map((duty, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/70 hover:border-indigo-500/40 transition-colors"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 text-sm font-medium leading-normal">
                    {duty}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Close Button */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Medical Student Self-Directed Learning Clinical Reasoning System
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Done Reading / Close
          </button>
        </div>
      </div>
    </div>
  );
};
