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
    } catch (e) {
      console.error('Error loading local state', e);
    }
  }, []);

  // Timer tick effect
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
    if (currentStageIndex + 1 < currentCase.stages.length) {
      const nextIdx = currentStageIndex + 1;
      if (!unlockedStages.includes(nextIdx)) {
        const newUnlocked = [...unlockedStages, nextIdx];
        setUnlockedStages(newUnlocked);
        localStorage.setItem(`sdl_unlocked_${currentCase.id}`, JSON.stringify(newUnlocked));
      }
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
    </div>
  );
}
