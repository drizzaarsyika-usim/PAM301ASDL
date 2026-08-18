import React, { useState, useEffect } from 'react';
import { StageData, TeamRole } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { AssignmentWidgets } from './AssignmentWidgets';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  UserCheck,
  Send,
  BookOpen,
  Award,
  Lightbulb,
  Maximize2
} from 'lucide-react';
import { RoleDetailModal } from './RoleDetailModal';

interface StageCommitmentViewProps {
  stage: StageData;
  stageIndex: number;
  totalStages: number;
  teamAnswer: string;
  onSaveAnswer: (answer: string) => void;
  isUnlocked: boolean;
  onUnlockNextStage: () => void;
  onGoToNextStage: () => void;
  onGoToPrevStage: () => void;
  roleAssignments: Record<string, string>;
  onOpenAiTutorWithStage: (stageKey: string) => void;
}

export const StageCommitmentView: React.FC<StageCommitmentViewProps> = ({
  stage,
  stageIndex,
  totalStages,
  teamAnswer,
  onSaveAnswer,
  isUnlocked,
  onUnlockNextStage,
  onGoToNextStage,
  onGoToPrevStage,
  roleAssignments,
  onOpenAiTutorWithStage
}) => {
  const [localText, setLocalText] = useState(teamAnswer || '');
  const [hasCommitted, setHasCommitted] = useState(!!teamAnswer?.trim());
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<TeamRole | null>(null);

  useEffect(() => {
    setLocalText(teamAnswer || '');
    setHasCommitted(!!teamAnswer?.trim());
  }, [stage.stageKey, teamAnswer]);

  const assignedRole = TEAM_ROLES.find((r) => r.id === stage.primaryRole);
  const assignedTeammateName = assignedRole ? roleAssignments[assignedRole.id] : null;

  const handleCommitAnswer = () => {
    if (!localText.trim()) return;
    onSaveAnswer(localText);
    setHasCommitted(true);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
    onUnlockNextStage();
  };

  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* 1. Stage Header & Assigned Lead Student Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Stage {stage.stageNumber} of {totalStages}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Target: {stage.suggestedDurationMinutes} minutes
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {stage.title}
            </h2>
          </div>

          {/* Role Lead Badge with Expand / Zoom capability */}
          {assignedRole && (
            <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-200/80 px-3.5 py-2 rounded-xl shrink-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 block">
                    Lead Facilitator
                  </span>
                  <button
                    onClick={() => setSelectedRoleForDetail(assignedRole)}
                    className="text-[10px] text-indigo-700 hover:text-indigo-900 font-bold underline flex items-center gap-0.5 cursor-pointer"
                    title="Open full duties in readable modal"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>View Role Duties</span>
                  </button>
                </div>
                <span className="text-xs font-bold text-indigo-950">
                  {assignedRole.name}: <span className="text-indigo-700 underline font-extrabold">{assignedTeammateName || 'Unassigned'}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Guiding Clinical Prompt */}
        <div className="mt-4 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Team Clinical Task
            </h4>
            <p className="text-sm font-semibold leading-relaxed text-slate-900">
              {stage.prompt}
            </p>
          </div>

          {/* Guiding Questions (if present) */}
          {stage.guidingQuestions && stage.guidingQuestions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-100 text-xs text-indigo-950 space-y-1.5">
              <span className="font-bold text-indigo-900 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                Guiding Facilitation Questions:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {stage.guidingQuestions.map((q, idx) => (
                  <li key={idx} className="leading-snug">{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Interactive Assignment Widget (for Stage 5 or other interactive stages) */}
        {stage.assignmentDetails && (
          <AssignmentWidgets
            type={stage.assignmentDetails.type}
            data={stage.assignmentDetails.data}
            assignmentTitle={stage.assignmentDetails.title}
          />
        )}
      </div>

      {/* 2. Student Team Decision Commitment Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Team Reasoning Commitment</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Type and lock your synthesized group consensus to reveal the faculty benchmark.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">
              {wordCount} words
            </span>
            {hasCommitted ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Decision Committed
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Benchmark Locked
              </span>
            )}
          </div>
        </div>

        {/* Textarea Input */}
        <div>
          <textarea
            id={`stage-reasoning-input-${stage.stageKey}`}
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            placeholder={`Type your team's consensus reasoning for Stage ${stage.stageNumber} here (e.g., semantic qualifiers, differential list with red flags, required labs, or management plan)...`}
            rows={6}
            className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans text-sm text-slate-800 leading-relaxed placeholder:text-slate-400 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Action Commit Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              id="stage-commit-save-btn"
              onClick={handleCommitAnswer}
              disabled={!localText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{hasCommitted ? 'Update & Re-commit Consensus' : 'Commit Decision & Reveal Benchmark'}</span>
            </button>

            <button
              onClick={() => onOpenAiTutorWithStage(stage.stageKey)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-colors cursor-pointer"
              title="Get Socratic guidance from AI Tutor without spoiling answers"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Ask AI Facilitator</span>
            </button>
          </div>

          {showSavedFeedback && (
            <span className="text-xs font-bold text-emerald-600 animate-fade-in flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Consensus committed &amp; benchmark unlocked!
            </span>
          )}
        </div>
      </div>

      {/* 3. Faculty Expert Benchmark Section (Revealed once committed) */}
      {hasCommitted ? (
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-2xl border border-emerald-500/40 p-5 sm:p-6 shadow-lg space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-800/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 block">
                  Faculty Benchmark Unlocked
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Expert Clinical Reasoning Standard
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
              <Unlock className="w-3.5 h-3.5" />
              Benchmark Revealed
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] uppercase font-bold text-emerald-300 block mb-1">
                Faculty Clinical Synthesis:
              </span>
              <p className="font-medium text-slate-100">
                {stage.expertBenchmark.summary}
              </p>
            </div>

            {/* Key Clinical Points Checklist */}
            {stage.expertBenchmark.keyPoints && stage.expertBenchmark.keyPoints.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  Cardinal Points to Check Against Your Consensus:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stage.expertBenchmark.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-200">
                      <span className="text-emerald-400 font-bold mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-slate-100 border border-dashed border-slate-300 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-700">
            Faculty Benchmark is Protected
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            To prevent confirmation bias, you must synthesize and commit your group's decision above before the official standard is unlocked.
          </p>
        </div>
      )}

      {/* 4. Footer Stage Navigation Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onGoToPrevStage}
          disabled={stageIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Stage</span>
        </button>

        <span className="text-xs font-semibold text-slate-500">
          Stage {stageIndex + 1} of {totalStages}
        </span>

        <button
          onClick={onGoToNextStage}
          disabled={stageIndex === totalStages - 1}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom Role Detail Modal */}
      <RoleDetailModal
        role={selectedRoleForDetail}
        assignedStudent={selectedRoleForDetail ? roleAssignments[selectedRoleForDetail.id] : undefined}
        onClose={() => setSelectedRoleForDetail(null)}
      />
    </div>
  );
};
