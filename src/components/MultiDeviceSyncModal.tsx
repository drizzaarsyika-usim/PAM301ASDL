import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  RefreshCw, 
  Copy, 
  Check, 
  Share2, 
  Smartphone, 
  Laptop, 
  ArrowRight, 
  LogOut, 
  Download, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Radio
} from 'lucide-react';
import { SdlCase, TeamReflection } from '../types';

interface MultiDeviceSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoomId: string | null;
  onJoinRoom: (roomId: string) => Promise<boolean>;
  onCreateRoom: () => Promise<string | null>;
  onLeaveRoom: () => void;
  onManualSync: () => Promise<void>;
  isSyncing: boolean;
  lastSyncedTime: Date | null;
  syncError: string | null;
  currentCase: SdlCase;
  stageAnswers: Record<string, string>;
  unlockedStages: number[];
  currentStageIndex: number;
  teammates: string[];
  roleAssignments: Record<string, string>;
  reflection: TeamReflection;
  onImportState: (importedData: any) => void;
}

export const MultiDeviceSyncModal: React.FC<MultiDeviceSyncModalProps> = ({
  isOpen,
  onClose,
  activeRoomId,
  onJoinRoom,
  onCreateRoom,
  onLeaveRoom,
  onManualSync,
  isSyncing,
  lastSyncedTime,
  syncError,
  currentCase,
  stageAnswers,
  unlockedStages,
  currentStageIndex,
  teammates,
  roleAssignments,
  reflection,
  onImportState
}) => {
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnapshot, setCopiedSnapshot] = useState(false);
  const [importInput, setImportInput] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cloud' | 'offline'>('cloud');
  const [localActionLoading, setLocalActionLoading] = useState(false);

  useEffect(() => {
    if (activeRoomId) {
      setJoinCodeInput(activeRoomId);
    }
  }, [activeRoomId]);

  if (!isOpen) return null;

  const handleCopyRoomCode = () => {
    if (!activeRoomId) return;
    navigator.clipboard.writeText(activeRoomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShareLink = () => {
    if (!activeRoomId) return;
    const url = new URL(window.location.href);
    url.searchParams.set('room', activeRoomId);
    url.searchParams.set('case', currentCase.id);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreate = async () => {
    setLocalActionLoading(true);
    try {
      await onCreateRoom();
    } finally {
      setLocalActionLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = joinCodeInput.trim().toUpperCase();
    if (!clean) return;
    setLocalActionLoading(true);
    try {
      await onJoinRoom(clean);
    } finally {
      setLocalActionLoading(false);
    }
  };

  // Generate offline snapshot code (Base64 JSON)
  const handleExportSnapshot = () => {
    const payload = {
      app: 'DigiSCRIBE',
      version: 1,
      timestamp: Date.now(),
      caseId: currentCase.id,
      currentStageIndex,
      unlockedStages,
      stageAnswers,
      teammates,
      roleAssignments,
      reflection
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    navigator.clipboard.writeText(encoded);
    setCopiedSnapshot(true);
    setTimeout(() => setCopiedSnapshot(false), 2500);
  };

  const handleApplyImport = () => {
    setImportError(null);
    setImportSuccess(false);
    try {
      const trimmed = importInput.trim();
      if (!trimmed) {
        setImportError('Please paste an exported session code');
        return;
      }
      let jsonStr = '';
      try {
        jsonStr = decodeURIComponent(escape(atob(trimmed)));
      } catch {
        jsonStr = trimmed; // maybe plain JSON was pasted
      }
      const parsed = JSON.parse(jsonStr);
      if (!parsed || !parsed.caseId) {
        throw new Error('Invalid session code format');
      }
      onImportState(parsed);
      setImportSuccess(true);
      setImportInput('');
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (err: any) {
      setImportError(err.message || 'Failed to decode session code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Multi-Device Sync
                </h2>
                {activeRoomId ? (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Connected
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Team Session
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Synchronize clinical reasoning and team answers across phones & laptops
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs: Live Cloud vs Quick Code Transfer */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'cloud'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live 6-Digit Room Sync</span>
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'offline'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Code Export / Transfer</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 text-slate-800 max-h-[75vh] overflow-y-auto">
          
          {syncError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Sync Notice</p>
                <p>{syncError}</p>
              </div>
            </div>
          )}

          {activeTab === 'cloud' ? (
            activeRoomId ? (
              /* Active Room Connected State */
              <div className="space-y-4">
                <div className="bg-emerald-50/70 border-2 border-emerald-500/30 rounded-2xl p-5 text-center space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Your Team Room Code</span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-slate-900 tracking-widest bg-white px-5 py-2 rounded-xl shadow-xs border border-emerald-200">
                      {activeRoomId}
                    </span>
                    <button
                      onClick={handleCopyRoomCode}
                      className="p-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl shadow-xs transition-all"
                      title="Copy 6-digit room code"
                    >
                      {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Teammates can open DigiSCRIBE on their phone or tablet and enter this code to collaborate in real-time.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={handleCopyShareLink}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 shadow-2xs transition-all active:scale-95"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Share Link'}</span>
                    </button>

                    <button
                      onClick={onManualSync}
                      disabled={isSyncing}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-2xs transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Syncing...' : 'Force Sync Now'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    Last synchronized:{' '}
                    <strong className="text-slate-700">
                      {lastSyncedTime ? lastSyncedTime.toLocaleTimeString() : 'Just now'}
                    </strong>
                  </span>
                  <button
                    onClick={onLeaveRoom}
                    className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold hover:underline"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Disconnect Room</span>
                  </button>
                </div>
              </div>
            ) : (
              /* No Room Connected: Options to Create or Join */
              <div className="space-y-5">
                {/* Visual Devices Illustration */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-around text-slate-600 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <Laptop className="w-7 h-7 text-indigo-600" />
                    <span className="font-semibold text-[11px]">Laptop (Chair/Scribe)</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-mono font-bold text-xs">
                    <span>•••••</span>
                    <Cloud className="w-4 h-4 text-emerald-600" />
                    <span>•••••</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Smartphone className="w-7 h-7 text-indigo-600" />
                    <span className="font-semibold text-[11px]">Teammates' Phones</span>
                  </div>
                </div>

                {/* Create Room Block */}
                <div className="border border-slate-200 rounded-xl p-4.5 bg-white shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Start a New Team Room</h3>
                      <p className="text-xs text-slate-500">
                        Create a session code for this case and let all 8 teammates join instantly.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCreate}
                    disabled={localActionLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>{localActionLoading ? 'Creating Room...' : 'Create 6-Digit Room Code'}</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-slate-400 text-xs font-semibold uppercase">Or Join An Existing Room</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Join Room Form */}
                <form onSubmit={handleJoin} className="border border-slate-200 rounded-xl p-4.5 bg-white shadow-2xs space-y-3">
                  <div>
                    <label htmlFor="join-room-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Enter Team Room Code:
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="join-room-input"
                        type="text"
                        placeholder="e.g. 4K9M2P"
                        value={joinCodeInput}
                        onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                        maxLength={8}
                        className="flex-1 font-mono tracking-widest uppercase text-base font-bold px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!joinCodeInput.trim() || localActionLoading}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
                      >
                        <span>Join</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )
          ) : (
            /* Quick Code Export & Import (Universal Fallback for WhatsApp/Telegram or Offline) */
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  Instant Transfer via Chat / WhatsApp
                </p>
                <p className="text-slate-600">
                  Ideal for static deployments (e.g. GitHub Pages) or sharing your team's answers and unlocked progress directly with a group member.
                </p>
              </div>

              {/* 1. Export Current Snapshot */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">1. Share Current Case State</h4>
                    <p className="text-[11px] text-slate-500">Copies an encoded snapshot of all team answers and roster.</p>
                  </div>
                  <button
                    onClick={handleExportSnapshot}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    {copiedSnapshot ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnapshot ? 'Copied to Clipboard!' : 'Copy Session Code'}</span>
                  </button>
                </div>
              </div>

              {/* 2. Import Snapshot */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900">2. Import Teammate's Session Code</h4>
                <textarea
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  placeholder="Paste teammate's session code here..."
                  rows={3}
                  className="w-full text-xs font-mono p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                {importError && (
                  <p className="text-xs font-semibold text-rose-600">{importError}</p>
                )}
                {importSuccess && (
                  <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Session state successfully imported and applied!
                  </p>
                )}

                <button
                  onClick={handleApplyImport}
                  disabled={!importInput.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Load and Apply Answers</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-400" />
            <span>Optimized for mobile & desktop</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
