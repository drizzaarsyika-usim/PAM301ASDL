import React, { useState, useEffect } from 'react';
import { ALL_SDL_CASES } from './data/cases';
import { SdlCase, TeamReflection } from './types';
import { TEAM_ROLES } from './data/roles';
import { HeaderNav } from './components/HeaderNav';
import { TeamSetupBanner } from './components/TeamSetupBanner';
import { ClinicalStemBanner } from './components/ClinicalStemBanner';
import { StageStepper } from './components/StageStepper';
import { StageCommitmentView } from './components/StageCommitmentView';
import { WrapUpScreen } from './components/WrapUpScreen';
import { RoleSidebar } from './components/RoleSidebar';
import { PrintableReportModal } from './components/PrintableReportModal';
import { AiTutorModal } from './components/AiTutorModal';
import { MultiDeviceSyncModal } from './components/MultiDeviceSyncModal';
import { Cloud } from 'lucide-react';

const DEFAULT_TEAMMATES = [
  'Student 1',
  'Student 2',
  'Student 3',
  'Student 4',
  'Student 5',
  'Student 6',
  'Student 7',
  'Student 8'
];

const DEFAULT_ASSIGNMENTS: Record<string, string> = {
  chair: 'Student 1',
  presenter: 'Student 2',
  problem_lead: 'Student 3',
  ddx_lead: 'Student 4',
  investigation_strategist: 'Student 5',
  management_lead: 'Student 6',
  devils_advocate: 'Student 7',
  scribe: 'Student 8'
};

const DEFAULT_REFLECTION: TeamReflection = {
  diagnosticHurdle: '',
  teamCommunication: '',
  wardRoundTakeaway: ''
};

export default function App() {
  // 1. Core State
  const [currentCase, setCurrentCase] = useState<SdlCase>(ALL_SDL_CASES[0]);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [unlockedStages, setUnlockedStages] = useState<number[]>([0]); // Stage 0 (History) is unlocked by default
  const [stageAnswers, setStageAnswers] = useState<Record<string, string>>({});
  const [teammates, setTeammates] = useState<string[]>(DEFAULT_TEAMMATES);
  const [roleAssignments, setRoleAssignments] = useState<Record<string, string>>(DEFAULT_ASSIGNMENTS);
  const [reflection, setReflection] = useState<TeamReflection>(DEFAULT_REFLECTION);

  // 2. Modals & Drawers
  const [isRoleSidebarOpen, setIsRoleSidebarOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [aiTutorStageKey, setAiTutorStageKey] = useState<string>('history');

  // 3. Per-Stage Countdown Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(ALL_SDL_CASES[0].stages[0].suggestedDurationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // 4. Multi-Device Sync State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Load from local storage or URL query param on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseParam = urlParams.get('case');

    if (caseParam) {
      const found = ALL_SDL_CASES.find((c) => c.id === caseParam);
      if (found) setCurrentCase(found);
    }

    // Load cached local state
    try {
      const savedCaseId = localStorage.getItem('sdl_current_case_id');
      if (savedCaseId) {
        const found = ALL_SDL_CASES.find((c) => c.id === savedCaseId);
        if (found) setCurrentCase(found);
      }
      const savedAnswers = localStorage.getItem(`sdl_answers_${savedCaseId || ALL_SDL_CASES[0].id}`);
      if (savedAnswers) setStageAnswers(JSON.parse(savedAnswers));

      const savedUnlocked = localStorage.getItem(`sdl_unlocked_${savedCaseId || ALL_SDL_CASES[0].id}`);
      if (savedUnlocked) setUnlockedStages(JSON.parse(savedUnlocked));

      const savedReflection = localStorage.getItem(`sdl_reflection_${savedCaseId || ALL_SDL_CASES[0].id}`);
      if (savedReflection) setReflection(JSON.parse(savedReflection));

      const savedTeammates = localStorage.getItem('sdl_teammates');
      if (savedTeammates) setTeammates(JSON.parse(savedTeammates));

      const savedAssignments = localStorage.getItem('sdl_role_assignments');
      if (savedAssignments) setRoleAssignments(JSON.parse(savedAssignments));

      const roomParam = urlParams.get('room') || localStorage.getItem('sdl_active_room_id');
      if (roomParam) {
        setActiveRoomId(roomParam.toUpperCase());
      }
    } catch (e) {
      console.error('Error loading local state', e);
    }
  }, []);

  // Background Room Polling / Sync
  useEffect(() => {
    if (!activeRoomId) return;

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/room/${activeRoomId}`);
        if (!res.ok) return;
        const data = await res.json();
        const room = data.session || data.room;
        if (!room || !isMounted) return;

        // If remote has newer answers, merge them
        if (room.stageAnswers && Object.keys(room.stageAnswers).length > 0) {
          setStageAnswers((prev) => {
            let changed = false;
            const merged = { ...prev };
            for (const [k, v] of Object.entries(room.stageAnswers as Record<string, string>)) {
              if (v && v.trim() && (!prev[k] || !prev[k].trim())) {
                merged[k] = v;
                changed = true;
              }
            }
            return changed ? merged : prev;
          });
        }

        if (room.unlockedStages && Array.isArray(room.unlockedStages)) {
          setUnlockedStages((prev) => {
            const combined = Array.from(new Set([...prev, ...room.unlockedStages]));
            return combined.length !== prev.length ? combined : prev;
          });
        }

        setLastSyncedTime(new Date());
      } catch {
        // Silent poll error (e.g. offline)
      }
    }, 4500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeRoomId]);

  // Multi-Device Room Handlers
  const handleCreateRoom = async (): Promise<string | null> => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const res = await fetch('/api/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: currentCase.id,
          currentStageIndex,
          unlockedStages,
          stageAnswers,
          teammates,
          roleAssignments,
          reflection,
          timerSeconds,
          isTimerRunning
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const newRoomId = (data.roomId || '').toUpperCase();
      setActiveRoomId(newRoomId);
      localStorage.setItem('sdl_active_room_id', newRoomId);
      setLastSyncedTime(new Date());

      const url = new URL(window.location.href);
      url.searchParams.set('room', newRoomId);
      url.searchParams.set('case', currentCase.id);
      window.history.replaceState({}, '', url.toString());

      return newRoomId;
    } catch (err: any) {
      console.warn('Could not connect to live backend room server:', err);
      // Fallback: Generate local 6-digit room code for offline / manual sharing
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setActiveRoomId(code);
      localStorage.setItem('sdl_active_room_id', code);
      setSyncError('Live server unreachable. Use the "Code Export / Transfer" tab to share answers with teammates on static hosts.');
      return code;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleJoinRoom = async (roomIdToJoin: string): Promise<boolean> => {
    const cleanId = roomIdToJoin.trim().toUpperCase();
    if (!cleanId) return false;
    setIsSyncing(true);
    setSyncError(null);
    try {
      const res = await fetch(`/api/room/${cleanId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Room "${cleanId}" not found or session expired.`);
        }
        throw new Error(`Connection returned ${res.status}`);
      }
      const data = await res.json();
      const room = data.session || data.room;
      if (!room) throw new Error('Invalid room session data received.');

      if (room.caseId && room.caseId !== currentCase.id) {
        const found = ALL_SDL_CASES.find((c) => c.id === room.caseId);
        if (found) setCurrentCase(found);
      }
      if (room.currentStageIndex !== undefined) setCurrentStageIndex(room.currentStageIndex);
      if (room.unlockedStages) setUnlockedStages(room.unlockedStages);
      if (room.stageAnswers) setStageAnswers(room.stageAnswers);
      if (room.teammates && room.teammates.length > 0) setTeammates(room.teammates);
      if (room.roleAssignments) setRoleAssignments(room.roleAssignments);
      if (room.reflection) setReflection(room.reflection);

      setActiveRoomId(cleanId);
      localStorage.setItem('sdl_active_room_id', cleanId);
      setLastSyncedTime(new Date());

      const url = new URL(window.location.href);
      url.searchParams.set('room', cleanId);
      if (room.caseId) url.searchParams.set('case', room.caseId);
      window.history.replaceState({}, '', url.toString());

      return true;
    } catch (err: any) {
      console.warn('Failed to join room:', err);
      setSyncError(err.message || 'Could not connect to room.');
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLeaveRoom = () => {
    setActiveRoomId(null);
    localStorage.removeItem('sdl_active_room_id');
    const url = new URL(window.location.href);
    url.searchParams.delete('room');
    window.history.replaceState({}, '', url.toString());
  };

  const handleManualSync = async () => {
    if (!activeRoomId) return;
    setIsSyncing(true);
    setSyncError(null);
    try {
      const res = await fetch(`/api/room/${activeRoomId}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: currentCase.id,
          currentStageIndex,
          unlockedStages,
          stageAnswers,
          teammates,
          roleAssignments,
          reflection,
          timerSeconds,
          isTimerRunning
        })
      });
      if (!res.ok) throw new Error(`Sync returned ${res.status}`);
      const data = await res.json();
      const room = data.session || data.room;
      if (room) {
        if (room.stageAnswers) {
          setStageAnswers((prev) => ({ ...room.stageAnswers, ...prev }));
        }
        if (room.unlockedStages) {
          setUnlockedStages((prev) => Array.from(new Set([...prev, ...room.unlockedStages])));
        }
      }
      setLastSyncedTime(new Date());
    } catch {
      setSyncError('Could not sync to cloud room server right now.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImportState = (imported: any) => {
    if (imported.caseId) {
      const found = ALL_SDL_CASES.find((c) => c.id === imported.caseId);
      if (found) setCurrentCase(found);
    }
    if (imported.currentStageIndex !== undefined) setCurrentStageIndex(imported.currentStageIndex);
    if (imported.unlockedStages) setUnlockedStages(imported.unlockedStages);
    if (imported.stageAnswers) setStageAnswers(imported.stageAnswers);
    if (imported.teammates) setTeammates(imported.teammates);
    if (imported.roleAssignments) setRoleAssignments(imported.roleAssignments);
    if (imported.reflection) setReflection(imported.reflection);
  };
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Update timer whenever current stage changes
  const handleSelectStage = (index: number) => {
    setCurrentStageIndex(index);
    const stage = currentCase.stages[index];
    if (stage) {
      setTimerSeconds(stage.suggestedDurationMinutes * 60);
      setIsTimerRunning(false);
    }
  };

  // Case Change Handler
  const handleSelectCase = (newCase: SdlCase) => {
    setCurrentCase(newCase);
    setCurrentStageIndex(0);
    setUnlockedStages([0]);
    localStorage.setItem('sdl_current_case_id', newCase.id);

    // Try loading answers for this case
    try {
      const savedAnswers = localStorage.getItem(`sdl_answers_${newCase.id}`);
      setStageAnswers(savedAnswers ? JSON.parse(savedAnswers) : {});

      const savedUnlocked = localStorage.getItem(`sdl_unlocked_${newCase.id}`);
      setUnlockedStages(savedUnlocked ? JSON.parse(savedUnlocked) : [0]);

      const savedReflection = localStorage.getItem(`sdl_reflection_${newCase.id}`);
      setReflection(savedReflection ? JSON.parse(savedReflection) : DEFAULT_REFLECTION);
    } catch {
      setStageAnswers({});
      setUnlockedStages([0]);
      setReflection(DEFAULT_REFLECTION);
    }

    setTimerSeconds(newCase.stages[0].suggestedDurationMinutes * 60);
    setIsTimerRunning(false);
  };

  // Stage Answer Commit Handler
  const handleSaveStageAnswer = (text: string) => {
    const stageKey = currentCase.stages[currentStageIndex].stageKey;
    const updated = { ...stageAnswers, [stageKey]: text };
    setStageAnswers(updated);
    localStorage.setItem(`sdl_answers_${currentCase.id}`, JSON.stringify(updated));

    // Unlock next stage
    let nextUnlocked = unlockedStages;
    if (currentStageIndex + 1 < currentCase.stages.length) {
      const nextIdx = currentStageIndex + 1;
      if (!unlockedStages.includes(nextIdx)) {
        nextUnlocked = [...unlockedStages, nextIdx];
        setUnlockedStages(nextUnlocked);
        localStorage.setItem(`sdl_unlocked_${currentCase.id}`, JSON.stringify(nextUnlocked));
      }
    }

    // Push to active room if connected
    if (activeRoomId) {
      fetch(`/api/room/${activeRoomId}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: currentCase.id,
          currentStageIndex,
          unlockedStages: nextUnlocked,
          stageAnswers: updated,
          teammates,
          roleAssignments,
          reflection
        })
      }).catch(() => {});
    }
  };

  // Team & Role Management
  const handleUpdateTeammates = (names: string[]) => {
    setTeammates(names);
    localStorage.setItem('sdl_teammates', JSON.stringify(names));

    // Automatically clean up any role whose assigned student is no longer in the list
    const updatedAssignments = { ...roleAssignments };
    Object.keys(updatedAssignments).forEach((k) => {
      if (updatedAssignments[k] !== 'Unassigned' && !names.includes(updatedAssignments[k])) {
        updatedAssignments[k] = 'Unassigned';
      }
    });
    setRoleAssignments(updatedAssignments);
    localStorage.setItem('sdl_role_assignments', JSON.stringify(updatedAssignments));
  };

  const handleUpdateAssignments = (assignments: Record<string, string>) => {
    setRoleAssignments(assignments);
    localStorage.setItem('sdl_role_assignments', JSON.stringify(assignments));
  };

  const handleShuffleRoles = () => {
    if (teammates.length === 0) {
      const emptyAssignments: Record<string, string> = {};
      TEAM_ROLES.forEach((role) => {
        emptyAssignments[role.id] = 'Unassigned';
      });
      setRoleAssignments(emptyAssignments);
      localStorage.setItem('sdl_role_assignments', JSON.stringify(emptyAssignments));
      return;
    }

    const shuffledNames = [...teammates].sort(() => Math.random() - 0.5);
    const newAssignments: Record<string, string> = {};
    TEAM_ROLES.forEach((role, idx) => {
      // Tally strictly with number of students (if 3 students, only 3 roles assigned)
      if (idx < shuffledNames.length) {
        newAssignments[role.id] = shuffledNames[idx];
      } else {
        newAssignments[role.id] = 'Unassigned';
      }
    });
    setRoleAssignments(newAssignments);
    localStorage.setItem('sdl_role_assignments', JSON.stringify(newAssignments));
  };

  const handleUpdateReflection = (ref: TeamReflection) => {
    setReflection(ref);
    localStorage.setItem(`sdl_reflection_${currentCase.id}`, JSON.stringify(ref));
  };

  const activeStage = currentCase.stages[currentStageIndex];
  const isWrapUp = currentStageIndex === 7 || activeStage.stageKey === 'wrapup_reflection';
  const completedStagesCount = Object.keys(stageAnswers).filter((k) => !!stageAnswers[k]?.trim()).length;
  const completionRate = Math.round((completedStagesCount / 8) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      <div id="screen-app-content" className="flex flex-col flex-1">
        {/* 1. Header Navigation Bar */}
        <HeaderNav
          currentCase={currentCase}
          onSelectCase={handleSelectCase}
          onOpenRoleShuffle={() => setIsRoleSidebarOpen(true)}
          onOpenAiTutor={() => {
            setAiTutorStageKey(activeStage.stageKey);
            setIsAiTutorOpen(true);
          }}
          onPrintReport={() => setIsPrintModalOpen(true)}
          onResetCase={() => {
            if (window.confirm('Reset all team answers and locks for this case?')) {
              setStageAnswers({});
              setUnlockedStages([0]);
              setCurrentStageIndex(0);
              setReflection(DEFAULT_REFLECTION);
              localStorage.removeItem(`sdl_answers_${currentCase.id}`);
              localStorage.removeItem(`sdl_unlocked_${currentCase.id}`);
              localStorage.removeItem(`sdl_reflection_${currentCase.id}`);
            }
          }}
          onOpenSync={() => setIsSyncModalOpen(true)}
          activeRoomId={activeRoomId}
          isSyncing={isSyncing}
          roleAssignments={roleAssignments}
          teammates={teammates}
          roles={TEAM_ROLES}
          timerSeconds={timerSeconds}
          isTimerRunning={isTimerRunning}
          onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
          onResetTimer={() => {
            setTimerSeconds(activeStage.suggestedDurationMinutes * 60);
            setIsTimerRunning(false);
          }}
          onAddTimerMinute={() => setTimerSeconds((prev) => prev + 60)}
          completionRate={completionRate}
        />

        {/* Step 1: Mandatory Student Roster & Rotating Role Setup Banner */}
        <TeamSetupBanner
          teammates={teammates}
          roleAssignments={roleAssignments}
          onShuffleRoles={handleShuffleRoles}
          onOpenManageModal={() => setIsRoleSidebarOpen(true)}
          onOpenSync={() => setIsSyncModalOpen(true)}
          activeRoomId={activeRoomId}
        />

        {/* 2. Sticky Clinical Stem Banner */}
        <ClinicalStemBanner
          stem={currentCase.stem}
          weekNumber={currentCase.week}
          topicCategory={currentCase.topicCategory}
        />

        {/* 3. Stage Stepper Navigation Bar */}
        <StageStepper
          stages={currentCase.stages}
          currentStageIndex={currentStageIndex}
          unlockedStages={unlockedStages}
          stageAnswers={stageAnswers}
          onSelectStage={handleSelectStage}
        />

        {/* 4. Main Active Stage Workspace */}
        <main className="flex-1 pb-16">
          {isWrapUp ? (
            <WrapUpScreen
              currentCase={currentCase}
              stageAnswers={stageAnswers}
              roleAssignments={roleAssignments}
              reflection={reflection}
              onUpdateReflection={handleUpdateReflection}
              onPrintReport={() => setIsPrintModalOpen(true)}
            />
          ) : (
            <StageCommitmentView
              stage={activeStage}
              stageIndex={currentStageIndex}
              totalStages={currentCase.stages.length}
              teamAnswer={stageAnswers[activeStage.stageKey] || ''}
              onSaveAnswer={handleSaveStageAnswer}
              isUnlocked={unlockedStages.includes(currentStageIndex)}
              onUnlockNextStage={() => {
                if (currentStageIndex + 1 < currentCase.stages.length) {
                  const nextIdx = currentStageIndex + 1;
                  if (!unlockedStages.includes(nextIdx)) {
                    setUnlockedStages([...unlockedStages, nextIdx]);
                  }
                }
              }}
              onGoToNextStage={() => {
                if (currentStageIndex < currentCase.stages.length - 1) {
                  handleSelectStage(currentStageIndex + 1);
                }
              }}
              onGoToPrevStage={() => {
                if (currentStageIndex > 0) {
                  handleSelectStage(currentStageIndex - 1);
                }
              }}
              roleAssignments={roleAssignments}
              onOpenAiTutorWithStage={(stageKey) => {
                setAiTutorStageKey(stageKey);
                setIsAiTutorOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* 5. Drawers and Modals */}
      <RoleSidebar
        isOpen={isRoleSidebarOpen}
        onClose={() => setIsRoleSidebarOpen(false)}
        teammates={teammates}
        onUpdateTeammates={handleUpdateTeammates}
        roleAssignments={roleAssignments}
        onUpdateAssignments={handleUpdateAssignments}
      />

      <PrintableReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        currentCase={currentCase}
        stageAnswers={stageAnswers}
        roleAssignments={roleAssignments}
        teammates={teammates}
        reflection={reflection}
      />

      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentCase={currentCase}
        activeStageKey={aiTutorStageKey}
        stageAnswers={stageAnswers}
      />

      <MultiDeviceSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        activeRoomId={activeRoomId}
        onJoinRoom={handleJoinRoom}
        onCreateRoom={handleCreateRoom}
        onLeaveRoom={handleLeaveRoom}
        onManualSync={handleManualSync}
        isSyncing={isSyncing}
        lastSyncedTime={lastSyncedTime}
        syncError={syncError}
        currentCase={currentCase}
        stageAnswers={stageAnswers}
        unlockedStages={unlockedStages}
        currentStageIndex={currentStageIndex}
        teammates={teammates}
        roleAssignments={roleAssignments}
        reflection={reflection}
        onImportState={handleImportState}
      />

      {/* Persistent Floating Sync Button (ensures visible on any device or scroll position) */}
      <button
        id="floating-sync-btn"
        onClick={() => setIsSyncModalOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs border border-emerald-300/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Multi-Device Collaboration & Cloud Sync"
      >
        <Cloud className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
        {activeRoomId ? (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Room: {activeRoomId}</span>
          </span>
        ) : (
          <span>☁️ Sync Devices</span>
        )}
      </button>
    </div>
  );
}
