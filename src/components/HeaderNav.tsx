import React from 'react';
import { ALL_SDL_CASES } from '../data/cases';
import { SdlCase, TeamRole } from '../types';
import { 
  Users, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Cloud, 
  CloudOff, 
  Printer, 
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

interface HeaderNavProps {
  currentCase: SdlCase;
  onSelectCase: (c: SdlCase) => void;
  onOpenRoleShuffle: () => void;
  onOpenCloudSync: () => void;
  onOpenAiTutor: () => void;
  onPrintReport: () => void;
  onResetCase: () => void;
  teammates: string[];
  roleAssignments: Record<string, string>;
  roles: TeamRole[];
  roomId: string | null;
  isCloudSynced: boolean;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAddTimerMinute: () => void;
  completionRate: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentCase,
  onSelectCase,
  onOpenRoleShuffle,
  onOpenCloudSync,
  onOpenAiTutor,
  onPrintReport,
  onResetCase,
  teammates,
  roleAssignments,
  roles,
  roomId,
  isCloudSynced,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onAddTimerMinute,
  completionRate
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const assignedCount = Object.keys(roleAssignments).filter(
    (k) => !!roleAssignments[k] && roleAssignments[k] !== 'Unassigned' && teammates.includes(roleAssignments[k])
  ).length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Brand and Case Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm">
              <span className="text-base tracking-tighter">SDL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-white leading-none">
                  Clinical Reasoning SDL
                </h1>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Medical Y3/Y4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Self-Directed Learning Case Simulation
              </p>
            </div>
          </div>

          {/* Case Dropdown */}
          <div className="relative group ml-1 sm:ml-2">
            <select
              id="case-select-dropdown"
              value={currentCase.id}
              onChange={(e) => {
                const found = ALL_SDL_CASES.find((c) => c.id === e.target.value);
                if (found) onSelectCase(found);
              }}
              className="appearance-none bg-slate-800 hover:bg-slate-750 text-slate-100 text-xs sm:text-sm font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-[200px] sm:max-w-[280px] truncate"
            >
              {ALL_SDL_CASES.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100 py-1">
                  Week {c.week}: {c.topicCategory} - {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Center: Stage Timer */}
        <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span className={`font-mono text-sm sm:text-base font-bold ${timerSeconds <= 60 && timerSeconds > 0 ? 'text-amber-400 animate-pulse' : timerSeconds === 0 ? 'text-rose-400' : 'text-slate-100'}`}>
            {formatTime(timerSeconds)}
          </span>
          <button
            id="timer-play-pause-btn"
            onClick={onToggleTimer}
            title={isTimerRunning ? 'Pause timer' : 'Start timer'}
            className="p-1 hover:bg-slate-700 rounded text-slate-200 transition-colors"
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            id="timer-add-min-btn"
            onClick={onAddTimerMinute}
            title="Add +1 minute"
            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
          >
            +1m
          </button>
          <button
            id="timer-reset-btn"
            onClick={onResetTimer}
            title="Reset timer"
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions (Role Shuffle, Multi-Device Cloud Sync, AI Tutor, Print) */}
        <div className="flex items-center gap-2">
          {/* Step 1: Roles Shuffler Button */}
          <button
            id="open-role-shuffle-btn"
            onClick={onOpenRoleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white border border-indigo-400/40 text-xs font-bold shadow-xs transition-all ring-2 ring-indigo-400/30"
            title="Step 1: Assign Student Team Roster & Shuffle 8 Rotating Roles"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Step 1: Roles</span>
            <span className="bg-indigo-900/80 px-1.5 py-0.5 rounded text-[10px] text-indigo-200">
              {assignedCount}/8
            </span>
          </button>

          {/* Cloud Sync Button */}
          <button
            id="open-cloud-sync-btn"
            onClick={onOpenCloudSync}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              roomId
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
            }`}
          >
            {roomId ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono font-bold tracking-wider">{roomId}</span>
              </>
            ) : (
              <>
                <Cloud className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sync Room</span>
              </>
            )}
          </button>

          {/* AI Clinical Tutor Button */}
          <button
            id="open-ai-tutor-btn"
            onClick={onOpenAiTutor}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-medium transition-all"
            title="Ask AI Clinical Facilitator for Socratic feedback"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden lg:inline">AI Tutor</span>
          </button>

          {/* Print Report */}
          <button
            id="header-print-report-btn"
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
            title="Print or Export Group Report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report</span>
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full bg-slate-800 h-1">
        <div 
          className="bg-emerald-500 h-1 transition-all duration-300"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </header>
  );
};
