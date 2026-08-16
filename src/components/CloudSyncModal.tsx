import React, { useState } from 'react';
import { Cloud, Copy, Check, Users, ArrowRight, ShieldCheck, X, RefreshCw } from 'lucide-react';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string | null;
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
  onDisconnectRoom: () => void;
  isSyncing: boolean;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  roomId,
  onCreateRoom,
  onJoinRoom,
  onDisconnectRoom,
  isSyncing
}) => {
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (!roomId) return;
    const url = `${window.location.origin}?room=${roomId}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCodeInput.trim()) {
      onJoinRoom(joinCodeInput.trim().toUpperCase());
      setJoinCodeInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Multi-Device Live Room Sync</h3>
              <p className="text-xs text-slate-400">Collaborate simultaneously across laptops &amp; tablets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-slate-800">
          {roomId ? (
            /* Active Room State */
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1.5">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-600 block">
                  Active Live Room Code
                </span>
                <div className="font-mono text-3xl font-black text-emerald-950 tracking-widest">
                  {roomId}
                </div>
                <p className="text-xs text-emerald-700 font-medium">
                  Team members on other devices can enter this code to join in real-time.
                </p>
              </div>

              {/* Copy Invite Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Invite URL Copied to Clipboard!' : 'Copy Direct Room Link'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Auto-syncing every 3 seconds
                </span>
                <button
                  onClick={onDisconnectRoom}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  Leave Room
                </button>
              </div>
            </div>
          ) : (
            /* Create or Join Options */
            <div className="space-y-4">
              <div className="space-y-2">
                <button
                  onClick={onCreateRoom}
                  disabled={isSyncing}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Start New Live Team Room</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  Creates a unique 6-character room code to sync your team&apos;s laptop and tablets.
                </p>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400 uppercase font-bold">or join existing</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Join Form */}
              <form onSubmit={handleJoinSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit Code (e.g. SDL-482)"
                    maxLength={10}
                    className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    disabled={!joinCodeInput.trim()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs disabled:opacity-50"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
