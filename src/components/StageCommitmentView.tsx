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
  Lightbulb
} from 'lucide-react';

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

          {/* Role Lead Badge */}
          {assignedRole && (
            <div className="flex items-center gap-2.5 bg-indigo-50 border border-indigo-200/80 px-3.5 py-2 rounded-xl shrink-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 block">
                  Lead Facilitator
                </span>
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
            assignmentTitle={stage.assignmentDetails.assignmentTitle}
          />
        )}
      </div>

      {/* 4. Team Commitment Section (The Pedagogical Core) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${hasCommitted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {hasCommitted ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {hasCommitted ? 'Team Pre-Commitment Submitted' : 'Submit Team Pre-Commitment to Unlock Benchmark'}
              </h3>
              <p className="text-xs text-slate-500">
                Type your synthesized reasoning before unlocking the expert benchmark.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {wordCount} words
          </span>
        </div>

        {/* Text Input Area */}
        <textarea
          id="team-stage-commitment-input"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder={`Type the team's discussion conclusions and reasoning here...\n\nExample scaffold:\n• Key findings / hypothesis:\n• Pathophysiological mechanism:\n• Justification & next priorities:`}
          rows={6}
          className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-sans text-slate-800 placeholder:text-slate-400"
        />

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              id="submit-team-commitment-btn"
              onClick={handleCommitAnswer}
              disabled={!localText.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                hasCommitted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {hasCommitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Committed Response</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Commit Answer &amp; Unlock Benchmark</span>
                </>
              )}
            </button>

            {showSavedFeedback && (
              <span className="text-xs text-emerald-600 font-bold animate-fade-in flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved &amp; Synced!
              </span>
            )}
          </div>

          {/* AI Clinical Facilitator Feedback */}
          {hasCommitted && (
            <button
              id="trigger-stage-ai-tutor-btn"
              onClick={() => onOpenAiTutorWithStage(stage.stageKey)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Get AI Socratic Feedback</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. Expert Clinical Benchmark (Locked vs Unlocked) */}
      <div className="transition-all duration-300">
        {!hasCommitted ? (
          /* LOCKED STATE STAMP */
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-700 uppercase tracking-wide">
                🔒 EXPERT BENCHMARK LOCKED
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                In self-directed clinical reasoning, committing your team&apos;s answer first builds diagnostic resilience and prevents hindsight bias.
              </p>
            </div>
            <p className="text-xs font-semibold text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-100">
              Type your team&apos;s answer above and click &ldquo;Commit Answer&rdquo; to reveal.
            </p>
          </div>
        ) : (
          /* UNLOCKED EXPERT BENCHMARK */
          <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-600">
                    Expert Faculty Benchmark
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {stage.expertBenchmark.title}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> Benchmark Unlocked
              </span>
            </div>

            {/* Benchmark Summary */}
            <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {stage.expertBenchmark.summary}
            </div>

            {/* Key Pathophysiological Teaching Points */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                Key Diagnostic &amp; Mechanistic Benchmarks:
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {stage.expertBenchmark.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metacognitive Biases Alert Box */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Devil&apos;s Advocate &amp; Bias Check:</span>
                <span className="text-amber-800 text-[11px]">
                  Did your team succumb to <em>anchoring bias</em> (fixating on the first symptom) or <em>premature closure</em>? Compare how your team&apos;s reasoning prioritized high-threat life safety over benign explanations.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Navigation Stepper Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          id="stage-prev-btn"
          onClick={onGoToPrevStage}
          disabled={stageIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Stage</span>
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          Stage {stageIndex + 1} of {totalStages}
        </span>

        <button
          id="stage-next-btn"
          onClick={onGoToNextStage}
          disabled={stageIndex === totalStages - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs"
        >
          <span>Next Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
