import React, { useState } from 'react';
import { SdlCase, StageData } from '../types';
import { Sparkles, X, Send, Bot, RefreshCw, AlertTriangle, BookOpen } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: SdlCase;
  activeStageKey: string;
  stageAnswers: Record<string, string>;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  currentCase,
  activeStageKey,
  stageAnswers
}) => {
  const [selectedStageKey, setSelectedStageKey] = useState<string>(activeStageKey || currentCase.stages[0].stageKey);
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentStage = currentCase.stages.find((s) => s.stageKey === selectedStageKey) || currentCase.stages[0];
  const teamCommitmentText = stageAnswers[selectedStageKey] || '';

  const handleAskTutor = async (customPrompt?: string) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseTitle: `${currentCase.title} (Week ${currentCase.week})`,
          patientStem: `${currentCase.stem.patientName}, ${currentCase.stem.age}yo ${currentCase.stem.gender}. PC: ${currentCase.stem.presentingComplaint}. Vitals: BP ${currentCase.stem.vitals.bp}, HR ${currentCase.stem.vitals.hr}, RR ${currentCase.stem.vitals.rr}, SpO2 ${currentCase.stem.vitals.spo2}.`,
          stageTitle: `Stage ${currentStage.stageNumber}: ${currentStage.title}`,
          stagePrompt: currentStage.prompt,
          teamAnswer: teamCommitmentText,
          expertBenchmark: currentStage.expertBenchmark.summary,
          userQuestion: customPrompt || userQuery
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get feedback from AI Facilitator');
      }

      setAiResponse(data.feedback);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while connecting to the Clinical Reasoning Tutor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-purple-950 text-white flex items-center justify-between border-b border-purple-900">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/30 text-purple-300 border border-purple-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Gemini Clinical Facilitator</h3>
              <p className="text-xs text-purple-300">Socratic Diagnostic Reasoning &amp; Metacognitive Feedback</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Selector Sub-header */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Select Stage:</span>
            <select
              value={selectedStageKey}
              onChange={(e) => {
                setSelectedStageKey(e.target.value);
                setAiResponse(null);
              }}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
            >
              {currentCase.stages.map((st) => (
                <option key={st.stageKey} value={st.stageKey}>
                  Stage {st.stageNumber}: {st.shortTitle}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleAskTutor('Evaluate our team commitment against the expert benchmark, highlight strengths, identify any missing life-threatening red flags or cognitive biases, and provide 2 Socratic follow-up questions.')}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-xs transition-all disabled:opacity-50"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Critique Stage Reasoning</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-800">
          
          {/* Team Answer Preview */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-indigo-600 block">
              Team Commitment for {currentStage.title}:
            </span>
            <p className="text-slate-700 italic">
              {teamCommitmentText ? teamCommitmentText : '(No team answer typed yet for this stage. You can still ask clinical questions below!)'}
            </p>
          </div>

          {/* AI Response Display */}
          {isLoading && (
            <div className="p-8 text-center space-y-2">
              <RefreshCw className="w-6 h-6 text-purple-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                AI Clinical Facilitator is analyzing your team&apos;s reasoning...
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {aiResponse && (
            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2 text-slate-800">
              <div className="flex items-center gap-1.5 text-purple-900 font-bold border-b border-purple-200/80 pb-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Faculty Socratic Feedback &amp; Analysis:</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed space-y-2 font-medium">
                {aiResponse}
              </div>
            </div>
          )}

          {/* Quick Prompts */}
          {!aiResponse && !isLoading && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Discussion Prompts:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'What cognitive biases are we most vulnerable to in this presentation?',
                  'Explain the exact pathophysiology connecting the vital signs to the diagnosis.',
                  'What would happen if we gave normal saline vs nitrates in this hemodynamic state?',
                  'How does the Islamic bioethical principle of Hifz an-Nafs apply to this resuscitation?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserQuery(q);
                      handleAskTutor(q);
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-200 text-left text-slate-700 font-medium transition-all"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Input Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && userQuery.trim() && !isLoading) {
                handleAskTutor();
              }
            }}
            placeholder="Ask the AI Tutor a specific clinical reasoning or pathophysiology question..."
            className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
          <button
            onClick={() => handleAskTutor()}
            disabled={!userQuery.trim() || isLoading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
};
