import React, { useState } from 'react';
import { TeamRole } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { 
  Users, 
  Shuffle, 
  X, 
  Plus, 
  Trash2, 
  HelpCircle,
  ShieldAlert,
  Gavel,
  UserCheck,
  Target,
  Layers,
  Microscope,
  HeartHandshake,
  FileText,
  Maximize2
} from 'lucide-react';
import { RoleDetailModal } from './RoleDetailModal';

interface RoleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  teammates: string[];
  onUpdateTeammates: (names: string[]) => void;
  roleAssignments: Record<string, string>;
  onUpdateAssignments: (assignments: Record<string, string>) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Gavel: <Gavel className="w-4 h-4" />,
  UserCheck: <UserCheck className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Microscope: <Microscope className="w-4 h-4" />,
  HeartHandshake: <HeartHandshake className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />
};

export const RoleSidebar: React.FC<RoleSidebarProps> = ({
  isOpen,
  onClose,
  teammates,
  onUpdateTeammates,
  roleAssignments,
  onUpdateAssignments
}) => {
  const [newName, setNewName] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeTab, setActiveTab] = useState<'roster' | 'members'>('roster');
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<TeamRole | null>(null);

  if (!isOpen) return null;

  const assignedCount = Object.keys(roleAssignments).filter(
    (k) => !!roleAssignments[k] && roleAssignments[k] !== 'Unassigned' && teammates.includes(roleAssignments[k])
  ).length;

  const handleAddTeammate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && !teammates.includes(newName.trim())) {
      onUpdateTeammates([...teammates, newName.trim()]);
      setNewName('');
    }
  };

  const handleRemoveTeammate = (indexToRemove: number) => {
    const removedName = teammates[indexToRemove];
    const updated = teammates.filter((_, idx) => idx !== indexToRemove);
    onUpdateTeammates(updated);

    // Also unassign this student from any role
    const updatedAssignments = { ...roleAssignments };
    Object.keys(updatedAssignments).forEach((k) => {
      if (updatedAssignments[k] === removedName) {
        updatedAssignments[k] = 'Unassigned';
      }
    });
    onUpdateAssignments(updatedAssignments);
  };

  const handleClearAllStudents = () => {
    if (window.confirm('Clear all students from roster? All roles will become Unassigned.')) {
      onUpdateTeammates([]);
      const emptyAssignments: Record<string, string> = {};
      TEAM_ROLES.forEach((role) => {
        emptyAssignments[role.id] = 'Unassigned';
      });
      onUpdateAssignments(emptyAssignments);
    }
  };

  const handleLoadSampleRoster = () => {
    const sample = [
      'Student 1',
      'Student 2',
      'Student 3',
      'Student 4',
      'Student 5',
      'Student 6',
      'Student 7',
      'Student 8'
    ];
    onUpdateTeammates(sample);
  };

  const handleShuffleRoles = () => {
    if (teammates.length === 0) return;
    setIsShuffling(true);
    const shuffledNames = [...teammates].sort(() => Math.random() - 0.5);
    const newAssignments: Record<string, string> = {};

    TEAM_ROLES.forEach((role, idx) => {
      if (idx < shuffledNames.length) {
        newAssignments[role.id] = shuffledNames[idx];
      } else {
        newAssignments[role.id] = 'Unassigned';
      }
    });

    setTimeout(() => {
      onUpdateAssignments(newAssignments);
      setIsShuffling(false);
    }, 400);
  };

  const handleRoleSelectChange = (roleId: string, studentName: string) => {
    const updated = { ...roleAssignments, [roleId]: studentName };
    onUpdateAssignments(updated);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
        <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 leading-tight">
                  Team Roles &amp; Shuffler
                </h2>
                <p className="text-xs text-slate-500">
                  {assignedCount} of 8 Roles Assigned ({teammates.length} student{teammates.length === 1 ? '' : 's'} in roster)
                </p>
              </div>
            </div>
            <button
              id="close-role-sidebar-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector & Quick Shuffle Button */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-2 bg-slate-100/60">
            <div className="flex gap-1 bg-slate-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'roster'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Assigned Roles ({assignedCount}/8)
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'members'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Teammates ({teammates.length})
              </button>
            </div>

            <button
              id="shuffle-roles-action-btn"
              onClick={handleShuffleRoles}
              disabled={isShuffling || teammates.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title={teammates.length === 0 ? 'Add students first to shuffle roles' : 'Shuffle roles randomly'}
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'Shuffling...' : 'Shuffle Roles'}</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'roster' ? (
              <div className="space-y-3">
                {teammates.length === 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center space-y-2">
                    <p className="font-bold">No students in roster (0 roles assigned)</p>
                    <p className="text-[11px] text-amber-800">
                      Go to the <strong>Teammates</strong> tab to add students, or click below to load sample students:
                    </p>
                    <button
                      onClick={handleLoadSampleRoster}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
                    >
                      + Load Sample 8-Member Team
                    </button>
                  </div>
                )}

                {TEAM_ROLES.map((role) => {
                  const rawAssignee = roleAssignments[role.id];
                  const isAssigned = !!rawAssignee && rawAssignee !== 'Unassigned' && teammates.includes(rawAssignee);
                  const currentVal = isAssigned ? rawAssignee : 'Unassigned';

                  return (
                    <div
                      key={role.id}
                      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                            {ICON_MAP[role.icon] || <Users className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-slate-800">
                                {role.name}
                              </h4>
                              <button
                                onClick={() => setSelectedRoleForDetail(role)}
                                title="Expand and zoom role duties"
                                className="p-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer"
                              >
                                <Maximize2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {role.description}
                            </p>
                          </div>
                        </div>

                        {/* Dropdown Selector for Exact Assignment */}
                        <div className="shrink-0">
                          <select
                            value={currentVal}
                            onChange={(e) => handleRoleSelectChange(role.id, e.target.value)}
                            className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer ${
                              isAssigned
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}
                          >
                            <option value="Unassigned">-- Unassigned --</option>
                            {teammates.map((student) => (
                              <option key={student} value={student}>
                                {student}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Key Duties & Core Question */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold text-indigo-900 bg-indigo-50/50 px-2 py-1 rounded border border-indigo-100/60 truncate flex-1">
                          <span className="font-bold">Key Question:</span> &ldquo;{role.keyQuestion}&rdquo;
                        </p>
                        <button
                          onClick={() => setSelectedRoleForDetail(role)}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline shrink-0 cursor-pointer"
                        >
                          Read Details &rarr;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Add Teammate Form */}
                <form onSubmit={handleAddTeammate} className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter medical student name..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={!newName.trim()}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </form>

                {/* Quick actions for student roster */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleLoadSampleRoster}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                  >
                    + Load 8 Sample Students
                  </button>
                  {teammates.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllStudents}
                      className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 underline cursor-pointer"
                    >
                      Clear Roster (0 Students)
                    </button>
                  )}
                </div>

                {/* Teammates List */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Enrolled Cohort ({teammates.length})</span>
                    <span>Action</span>
                  </div>

                  {teammates.length === 0 ? (
                    <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
                      No students entered yet. Type student names above or load sample cohort.
                    </div>
                  ) : (
                    teammates.map((student, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {student}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveTeammate(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove student from roster"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {teammates.length} student{teammates.length === 1 ? '' : 's'} registered
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>

      {/* Role Detail Zoom Modal */}
      <RoleDetailModal
        role={selectedRoleForDetail}
        assignedStudent={selectedRoleForDetail ? roleAssignments[selectedRoleForDetail.id] : undefined}
        onClose={() => setSelectedRoleForDetail(null)}
      />
    </>
  );
};
