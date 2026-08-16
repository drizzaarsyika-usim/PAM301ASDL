import React, { useState } from 'react';
import { ClinicalStem } from '../types';
import { 
  User, 
  Activity, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Pill, 
  FileText, 
  History,
  Heart,
  Thermometer,
  Wind
} from 'lucide-react';

interface ClinicalStemBannerProps {
  stem: ClinicalStem;
  weekNumber: number;
  topicCategory: string;
}

export const ClinicalStemBanner: React.FC<ClinicalStemBannerProps> = ({
  stem,
  weekNumber,
  topicCategory
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTriageColor = (triage: string) => {
    if (triage.includes('Red')) return 'bg-rose-500 text-white border-rose-600';
    if (triage.includes('Yellow')) return 'bg-amber-500 text-white border-amber-600';
    return 'bg-emerald-500 text-white border-emerald-600';
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
        
        {/* Top summary row: Patient Header & Vitals */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Patient Details & Presenting Complaint */}
          <div className="flex items-start gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5 border border-slate-200">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Step 2 • Triage Intake
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${getTriageColor(stem.triageCategory)}`}>
                  {stem.triageCategory}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Week {weekNumber} • {topicCategory}
                </span>
                <span className="text-xs font-semibold text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-700">
                  {stem.setting}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {stem.patientName}, {stem.age}yo {stem.gender}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  ({stem.occupation})
                </span>
              </div>

              {/* Presenting Complaint highlight */}
              <p className="text-xs sm:text-sm font-semibold text-rose-900 bg-rose-50/70 border border-rose-200/80 px-2.5 py-1 rounded-md mt-1.5 inline-block">
                <span className="font-bold text-rose-800">PC:</span> {stem.presentingComplaint}
              </p>
            </div>
          </div>

          {/* Vitals Summary Pill Grid */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Blood Pressure</div>
              <div className={`text-xs font-bold ${stem.vitals.bp.includes('Hypotensive') || stem.vitals.bp.includes('68/') || stem.vitals.bp.includes('88/') || stem.vitals.bp.includes('86/') ? 'text-rose-600 font-extrabold' : 'text-slate-800'}`}>
                {stem.vitals.bp}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Heart Rate</div>
              <div className={`text-xs font-bold ${stem.vitals.hr > 100 || stem.vitals.hr < 60 ? 'text-rose-600 font-extrabold' : 'text-slate-800'}`}>
                {stem.vitals.hr} bpm
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Resp Rate</div>
              <div className={`text-xs font-bold ${stem.vitals.rr > 20 ? 'text-rose-600 font-extrabold' : 'text-slate-800'}`}>
                {stem.vitals.rr} /min
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">SpO2</div>
              <div className="text-xs font-bold text-slate-800">
                {stem.vitals.spo2}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Temp</div>
              <div className="text-xs font-bold text-slate-800">
                {stem.vitals.temp}
              </div>
            </div>

            {stem.vitals.gcs && (
              <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-center">
                <div className="text-[10px] text-slate-400 font-bold uppercase">GCS</div>
                <div className="text-xs font-bold text-slate-800">
                  {stem.vitals.gcs}
                </div>
              </div>
            )}

            {/* Toggle Full Stem Button */}
            <button
              id="toggle-full-stem-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-all ml-auto lg:ml-0"
            >
              <span>{isExpanded ? 'Hide Stem Details' : 'Full Stem Details'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expandable Deep History Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-150">
            
            {/* Column 1: History of Presenting Illness */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>History of Presenting Illness (HPI)</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
                {stem.historyOfPresentingIllness.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Past History & Medications */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                  <History className="w-4 h-4 text-emerald-600" />
                  <span>Past Medical / Surgical History</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {stem.pastMedicalSurgicalHistory.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                  <Pill className="w-4 h-4 text-purple-600" />
                  <span>Medications & Allergies</span>
                </div>
                <div className="text-xs text-slate-700">
                  <p className="font-semibold text-slate-800">Meds:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {stem.medications.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                  <p className="font-semibold text-rose-800 mt-1">Allergies: <span className="font-normal text-rose-700">{stem.allergies.join(', ')}</span></p>
                </div>
              </div>
            </div>

            {/* Column 3: Systemic Review & Social History */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  <span>Systemic Review & Social History</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {stem.systemicReview.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60 text-xs text-slate-600">
                <p><span className="font-semibold text-slate-800">Social:</span> {stem.socialHistory.join(' ')}</p>
                <p className="mt-0.5"><span className="font-semibold text-slate-800">Family:</span> {stem.familyHistory.join(' ')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
