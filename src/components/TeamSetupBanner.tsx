import React, { useState } from 'react';
import { TeamRole } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { 
  Users, 
  Shuffle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  UserPlus, 
  Sparkles,
  Gavel,
  Target,
  Layers,
  Microscope,
  HeartHandshake,
  FileText,
  ShieldAlert,
  HelpCircle,
  RotateCw,
  Info,
  Check
} from 'lucide-react';

interface TeamSetupBannerProps {
  teammates: string[];
  roleAssignments: Record<string, string>;
  onShuffleRoles: () => void;
  onOpenManageModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Gavel: <Gavel className="w-3.5 h-3.5" />,
  UserCheck: <UserCheck className="w-3.5 h-3.5" />,
  Target: <Target className="w-3.5 h-3.5" />,
  Layers: <Layers className="w-3.5 h-3.5" />,
  Microscope: <Microscope className="w-3.5 h-3.5" />,
  HeartHandshake: <HeartHandshake className="w-3.5 h-3.5" />,
  FileText: <FileText className="w-3.5 h-3.5" />,
  ShieldAlert: <ShieldAlert className="w-3.5 h-3.5" />
};

export const TeamSetupBanner: React.FC<TeamSetupBannerProps> = ({
  teammates,
  roleAssignments,
  onShuffleRoles,
  onOpenManageModal
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isShufflingAnim, setIsShufflingAnim] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [allFlipped, setAllFlipped] = useState<boolean>(false);

  const handleShuffleClick = () => {
    setIsShufflingAnim(true);
    onShuffleRoles();
    setTimeout(() => setIsShufflingAnim(false), 500);
  };

  const handleCardFlip = (roleId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  const handleToggleFlipAll = () => {
    const nextState = !allFlipped;
    setAllFlipped(nextState);
    const newMap: Record<string, boolean> = {};
    TEAM_ROLES.forEach((r) => {
      newMap[r.id] = nextState;
    });
    setFlippedCards(newMap);
  };

  const assignedCount = Object.keys(roleAssignments).filter(
    (k) => !!roleAssignments[k] && roleAssignments[k] !== 'Unassigned' && teammates.includes(roleAssignments[k])
  ).length;

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white border-b border-indigo-900/60 shadow-inner">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
        
        {/* Top Summary Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/90 text-white flex items-center justify-center font-black text-sm shadow-md border border-indigo-400/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  Step 1 • Initial Setup
                </span>
                {teammates.length === 0 ? (
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    0 / 8 Roles Assigned (Add students)
                  </span>
                ) : (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {assignedCount} / 8 Roles Assigned ({teammates.length} student{teammates.length === 1 ? '' : 's'})
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 mt-0.5">
                <span>Student Roster &amp; Rotating Role Shuffler</span>
              </h2>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            {/* Flip All Cards Toggle */}
            <button
              id="team-setup-flip-all-btn"
              onClick={handleToggleFlipAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 hover:text-white text-xs font-bold border border-indigo-500/40 shadow-xs transition-all"
              title="Flip all 8 cards to reveal role responsibilities & job duties"
            >
              <RotateCw className="w-3.5 h-3.5 text-indigo-300" />
              <span>{allFlipped ? 'Show Student Names' : '🔄 Flip All (View Job Duties)'}</span>
            </button>

            {/* Shuffle Button */}
            <button
              id="team-setup-shuffle-btn"
              onClick={handleShuffleClick}
              disabled={teammates.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold shadow-sm transition-all border border-indigo-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              title={teammates.length === 0 ? 'Add students first to shuffle roles' : 'Randomly shuffle roles among all listed students'}
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShufflingAnim ? 'animate-spin' : ''}`} />
              <span>{isShufflingAnim ? 'Shuffling...' : '🎲 Shuffle Roles'}</span>
            </button>

            {/* Edit Students */}
            <button
              id="team-setup-manage-students-btn"
              onClick={onOpenManageModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit Students ({teammates.length})</span>
            </button>

            {/* Collapse / Expand */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
              title={isExpanded ? 'Collapse role cards' : 'Expand role cards'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded 8-Role Grid with 3D Flip Cards */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-indigo-900/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
              {TEAM_ROLES.map((role, idx) => {
                const rawAssignee = roleAssignments[role.id];
                const isAssigned = !!rawAssignee && rawAssignee !== 'Unassigned' && teammates.includes(rawAssignee);
                const assignedStudent = isAssigned ? rawAssignee : 'Unassigned';
                const isFlipped = !!flippedCards[role.id];

                return (
                  <div
                    key={role.id}
                    className="perspective-1000 min-h-[170px] cursor-pointer group"
                    onClick={() => handleCardFlip(role.id)}
                    title="Click / tap to flip card and view role duties"
                  >
                    <div
                      className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* FRONT OF CARD: Student Assignment View */}
                      <div
                        className={`absolute inset-0 w-full h-full rounded-xl border p-3 flex flex-col justify-between backface-hidden transition-all shadow-sm ${
                          isAssigned
                            ? 'bg-slate-800/95 border-indigo-500/50 hover:border-indigo-400'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div>
                          {/* Role Header */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] font-bold text-indigo-300 truncate uppercase flex items-center gap-1">
                              {ICON_MAP[role.icon] || <UserCheck className="w-3.5 h-3.5" />}
                              <span className="truncate">{role.shortName}</span>
                            </span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-300">
                              #{idx + 1}
                            </span>
                          </div>

                          {/* Full Role Name */}
                          <div className="text-xs font-bold text-white leading-tight line-clamp-2" title={role.name}>
                            {role.name}
                          </div>
                        </div>

                        {/* Assigned Student Name Badge & Flip Prompt */}
                        <div className="mt-2 pt-2 border-t border-slate-700/70">
                          <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                            Assigned to:
                          </span>
                          {isAssigned ? (
                            <div className="text-xs font-black text-emerald-300 truncate mt-0.5" title={assignedStudent}>
                              {assignedStudent}
                            </div>
                          ) : (
                            <div className="text-xs font-semibold text-amber-300/80 italic truncate mt-0.5">
                              Unassigned
                            </div>
                          )}

                          <div className="mt-2 flex items-center justify-between text-[9px] text-indigo-300 font-semibold group-hover:text-indigo-200">
                            <span className="flex items-center gap-1">
                              <RotateCw className="w-2.5 h-2.5" />
                              <span>Flip for duties</span>
                            </span>
                            <span className="text-slate-500">&rarr;</span>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF CARD: Role Job & Key Duties View */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl border border-indigo-400/60 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 p-2.5 flex flex-col justify-between backface-hidden rotate-y-180 text-white shadow-lg overflow-y-auto text-left"
                      >
                        <div>
                          {/* Back Header */}
                          <div className="flex items-center justify-between border-b border-indigo-800/80 pb-1 mb-1.5">
                            <span className="text-[10px] font-bold text-amber-300 uppercase flex items-center gap-1 truncate">
                              <Info className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>Job: {role.shortName}</span>
                            </span>
                            <span className="text-[9px] text-indigo-300 flex items-center gap-0.5 font-bold shrink-0">
                              <RotateCw className="w-2.5 h-2.5" />
                              Flip
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-[10px] text-slate-200 leading-snug font-medium line-clamp-3 mb-1.5">
                            {role.description}
                          </p>

                          {/* Key Duties Bullets */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-bold uppercase tracking-wider text-indigo-300 block">
                              Key Duties:
                            </span>
                            <ul className="text-[9px] text-slate-300 space-y-0.5 leading-tight list-disc pl-3">
                              {role.duties.slice(0, 2).map((duty, dIdx) => (
                                <li key={dIdx} className="line-clamp-2">
                                  {duty}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Cardinal Key Question */}
                        <div className="mt-1.5 pt-1 border-t border-indigo-900/60">
                          <p className="text-[8.5px] italic text-emerald-300 leading-tight line-clamp-2">
                            &ldquo;{role.keyQuestion}&rdquo;
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-indigo-200/80 font-medium px-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  <strong>Tip for Students:</strong> Click/tap any card to flip between the assigned student and their exact job responsibilities during this stage.
                </span>
              </span>
              <button
                onClick={onOpenManageModal}
                className="text-indigo-300 hover:text-indigo-100 underline font-semibold mt-1 sm:mt-0"
              >
                View full role descriptions &amp; responsibilities &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
