import React from 'react';
import { StageData } from '../types';
import { Check, Lock, ChevronRight, Clock } from 'lucide-react';

interface StageStepperProps {
  stages: StageData[];
  currentStageIndex: number;
  unlockedStages: number[];
  stageAnswers: Record<string, string>;
  onSelectStage: (index: number) => void;
}

export const StageStepper: React.FC<StageStepperProps> = ({
  stages,
  currentStageIndex,
  unlockedStages,
  stageAnswers,
  onSelectStage
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 overflow-x-auto py-2.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 min-w-[760px]">
        {stages.map((stage, idx) => {
          const isCurrent = idx === currentStageIndex;
          const isUnlocked = unlockedStages.includes(idx);
          const isAnswered = !!stageAnswers[stage.stageKey]?.trim();

          let statusBg = 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600';
          if (isCurrent) {
            statusBg = 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30';
          } else if (isAnswered) {
            statusBg = 'bg-emerald-950/70 text-emerald-300 border-emerald-700/80 hover:bg-emerald-900/60';
          } else if (isUnlocked) {
            statusBg = 'bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-750';
          }

          return (
            <React.Fragment key={stage.stageKey}>
              <button
                id={`stage-step-btn-${idx}`}
                disabled={!isUnlocked}
                onClick={() => onSelectStage(idx)}
                className={`flex-1 flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${statusBg} ${
                  !isUnlocked ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Step Number or Status Icon */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCurrent
                      ? 'bg-white text-emerald-800'
                      : isAnswered
                      ? 'bg-emerald-500 text-white'
                      : isUnlocked
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isAnswered ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : !isUnlocked ? (
                    <Lock className="w-3 h-3 text-slate-500" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Stage Title and Duration */}
                <div className="overflow-hidden">
                  <div className="text-[11px] font-bold truncate leading-tight">
                    {stage.shortTitle}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{stage.suggestedDurationMinutes}m</span>
                  </div>
                </div>
              </button>

              {idx < stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
