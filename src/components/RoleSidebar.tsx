import React, { useState } from 'react';
import { TeamRole } from '../types';
import { TEAM_ROLES } from '../data/roles';
import { 
  Users, 
  Shuffle, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  HelpCircle,
  ShieldAlert,
  Gavel,
  UserCheck,
  Target,
  Layers,
  Microscope,
  HeartHandshake,
  FileText
} from 'lucide-react';

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

  if (!isOpen) return null;

  const handleAddTeammate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && !teammates.includes(newName.trim())) {
      onUpdateTeammates([...teammates, newName.trim()]);
      setNewName('');
    }
  };

  const handleRemoveTeammate = (indexToRemove: number) => {
    const updated = teammates.filter((_, idx) => idx !== indexToRemove);
    onUpdateTeammates(updated);
  };

  const handleShuffleRoles = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffledNames = [...teammates].sort(() => Math.random() - 0.5);
      const newAssignments: Record<string, string> = {};

      TEAM_ROLES.forEach((role, idx) => {
        // If there are fewer teammates than 8 roles, cycle through them
        newAssignments[role.id] = shuffledNames[idx % shuffledNames.length] || 'Unassigned';
      });

      onUpdateAssignments(newAssignments);
      setIsShuffling(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 leading-tight">
                Team Roles & Shuffler
              </h2>
              <p className="text-xs text-slate-500">
                8 Rotating SDL Clinical Reasoning Roles
              </p>
            </div>
          </div>
          <button
            id="close-role-sidebar-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Quick Shuffle Button */}
        <div className="p-3 border-b border-slate-200 flex items-center justify-between gap-2 bg-slate-100/60">
          <div className="flex gap-1 bg-slate-200/80 p-0.5 rounded-lg">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'roster'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Assigned Roles ({Object.keys(roleAssignments).length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{isShuffling ? 'Shuffling...' : 'Shuffle Roles'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'roster' ? (
            <div className="space-y-3">
              {TEAM_ROLES.map((role) => {
                const assignedStudent = roleAssignments[role.id];
                return (
                  <div
                    key={role.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                          {ICON_MAP[role.icon] || <Users className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            {role.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {role.description}
                          </p>
                        </div>
                      </div>

                      {/* Assigned Student Tag */}
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${
                        assignedStudent 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}>
                        {assignedStudent || 'Unassigned'}
                      </span>
                    </div>

                    {/* Key Duties & Core Question */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-indigo-900 bg-indigo-50/50 px-2 py-1 rounded border border-indigo-100/60">
                        <span className="font-bold">Key Question:</span> &ldquo;{role.keyQuestion}&rdquo;
                      </p>
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
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Teammates List */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Current Team Members ({teammates.length})
                </label>
                {teammates.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                        {index + 1}
                      </span>
                      <span>{name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTeammate(index)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove student"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Rotate roles every weekly SDL session to cultivate comprehensive clinical reasoning skills.
          </p>
        </div>
      </div>
    </div>
  );
};
