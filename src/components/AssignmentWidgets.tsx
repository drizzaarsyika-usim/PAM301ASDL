import React, { useState } from 'react';
import { 
  Activity, 
  Calculator, 
  Microscope, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Heart, 
  Zap, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface AssignmentWidgetProps {
  type: string;
  data: any;
  assignmentTitle: string;
}

export const AssignmentWidgets: React.FC<AssignmentWidgetProps> = ({
  type,
  data,
  assignmentTitle
}) => {
  const [selectedLead, setSelectedLead] = useState<string>('inferior');
  const [abgPh, setAbgPh] = useState<number>(7.34);
  const [abgPco2, setAbgPco2] = useState<number>(44);
  const [abgHco3, setAbgHco3] = useState<number>(23);
  const [dkaNa, setDkaNa] = useState<number>(128);
  const [dkaCl, setDkaCl] = useState<number>(94);
  const [dkaHco3, setDkaHco3] = useState<number>(6.4);
  const [baselineHct, setBaselineHct] = useState<number>(40);
  const [currentHct, setCurrentHct] = useState<number>(51.5);
  const [epipenStep, setEpipenStep] = useState<number>(1);

  if (!data) return null;

  return (
    <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-md">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              Core Weekly Diagnostic Assignment
            </span>
            <h3 className="text-sm font-bold text-slate-100">
              {assignmentTitle}
            </h3>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
          Interactive Diagnostic Visualizer
        </span>
      </div>

      {/* 1. ECG & Rhythm Widget */}
      {type === 'ecg' && (
        <div className="space-y-3">
          {data.stChanges ? (
            <div>
              {/* Lead Territory Selector */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  { id: 'inferior', label: 'Inferior Leads (II, III, aVF)' },
                  { id: 'highLateral', label: 'High Lateral (I, aVL)' },
                  { id: 'anterior', label: 'Anterior (V1 - V3)' },
                  { id: 'rightSided', label: 'Right-Sided V4R (Crucial!)' }
                ].map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                      selectedLead === lead.id
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {lead.label}
                  </button>
                ))}
              </div>

              {/* Lead Findings Box */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800/80 font-sans">
                  <span>Selected Lead Analysis</span>
                  <span className="font-bold text-slate-300">Rate: {data.rate}</span>
                </div>
                <p className="pt-1 text-slate-100 font-medium">
                  {data.stChanges[selectedLead] || 'Select a lead territory above'}
                </p>
              </div>

              {/* Biomarkers and Echo */}
              {data.cardiacBiomarkers && (
                <div className="mt-2 text-xs bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/70 text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span><strong>Biomarkers:</strong> {data.cardiacBiomarkers}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-emerald-300">
                <p><strong>ECG Rhythm Strip:</strong> {data.ecgFindings}</p>
                <p><strong>Chest X-Ray:</strong> {data.chestXray}</p>
                <p><strong>Echocardiography:</strong> {data.transthoracicEcho}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. ABG Widget */}
      {type === 'abg' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">pH</span>
              <span className="font-bold text-rose-400 text-sm">{data.abgOnRoomAir?.pH}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">PaCO2 (Warning!)</span>
              <span className="font-bold text-amber-400 text-sm">{data.abgOnRoomAir?.paCO2}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">PaO2</span>
              <span className="font-bold text-rose-400 text-sm">{data.abgOnRoomAir?.paO2}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">HCO3</span>
              <span className="font-bold text-slate-200 text-sm">{data.abgOnRoomAir?.hco3}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Key Physiological Warning: Pseudonormal PaCO2 in Severe Asthma</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              In a tachypnoeic asthmatic (RR 36), hyperventilation should cause hypocapnia (PaCO2 &lt; 30 mmHg). A &ldquo;normal&rdquo; PaCO2 (44 mmHg) indicates impending diaphragmatic fatigue, loss of respiratory reserve, and life-threatening Type 2 failure.
            </p>
          </div>
        </div>
      )}

      {/* 3. Renal & UFEME Cast Widget */}
      {type === 'renal_ufeme' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-slate-200">
              <div className="text-emerald-400 font-bold text-[11px] font-sans">Serum Renal Panel</div>
              <p>Urea: {data.serumRenalProfile?.urea}</p>
              <p className="text-rose-400 font-bold">Creatinine: {data.serumRenalProfile?.creatinine}</p>
              <p className="text-rose-400 font-bold">Potassium: {data.serumRenalProfile?.potassium} (PEAKED T WAVES!)</p>
              <p>HCO3: {data.serumRenalProfile?.bicarbonate}</p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-slate-200">
              <div className="text-emerald-400 font-bold text-[11px] font-sans">UFEME & Casts Analysis</div>
              <p>Urine Na: {data.urinaryBiomarkers?.urinarySodium}</p>
              <p className="text-amber-300 font-bold">FeNa: {data.urinaryBiomarkers?.fractionalExcretionOfSodium}</p>
              <p className="text-amber-300 font-bold">Microscopy: {data.ufemeAndMicroscopy?.casts}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. LFT Widget */}
      {type === 'lft' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Total Bilirubin</span>
              <span className="font-bold text-amber-400">{data.liverFunctionTest?.totalBilirubin}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">ALT / AST</span>
              <span className="font-bold text-slate-200">{data.liverFunctionTest?.alt} / {data.liverFunctionTest?.ast}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Albumin</span>
              <span className="font-bold text-rose-400">{data.liverFunctionTest?.albumin}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">INR</span>
              <span className="font-bold text-rose-400">{data.coagulationProfile?.inr}</span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-300 space-y-1">
            <p><strong>R-Ratio Score:</strong> {data.liverFunctionTest?.rRatioCalculation}</p>
            <p className="text-rose-400"><strong>Tumour Marker AFP:</strong> {data.viralAndTumorMarkers?.alphaFetoprotein}</p>
          </div>
        </div>
      )}

      {/* 5. DKA Widget */}
      {type === 'dka' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Interactive Anion Gap Formula: Na - (Cl + HCO3)</span>
              <span className="font-mono text-sm text-rose-400">
                Gap: {(dkaNa - (dkaCl + dkaHco3)).toFixed(1)} mmol/L
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block">Sodium (Na)</label>
                <input
                  type="number"
                  value={dkaNa}
                  onChange={(e) => setDkaNa(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Chloride (Cl)</label>
                <input
                  type="number"
                  value={dkaCl}
                  onChange={(e) => setDkaCl(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Bicarbonate (HCO3)</label>
                <input
                  type="number"
                  value={dkaHco3}
                  onChange={(e) => setDkaHco3(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200">
            <strong>Key Emergency Rule:</strong> Total body potassium is severely depleted despite normal/high serum level. Add 20-30 mmol KCl per liter of infusion once urine output &gt; 0.5 ml/kg/hr.
          </div>
        </div>
      )}

      {/* 6. Headache SNOOP4 Widget */}
      {type === 'headache' && (
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="font-bold text-rose-400 block">S - Systemic Symptoms</span>
              <span className="text-slate-300">{data.snoop4RedFlagsChecklist?.s_systemic}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="font-bold text-rose-400 block">N - Neurological Signs</span>
              <span className="text-slate-300">{data.snoop4RedFlagsChecklist?.n_neurological}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="font-bold text-amber-400 block">O - Onset</span>
              <span className="text-slate-300">{data.snoop4RedFlagsChecklist?.o_onset}</span>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="font-bold text-cyan-400 block">P - Pattern &amp; Papilloedema</span>
              <span className="text-slate-300">{data.snoop4RedFlagsChecklist?.p_patternChange}</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Dengue Haematocrit Widget */}
      {type === 'fbc' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Haematocrit % Rise Formula: [(Current - Baseline) / Baseline] x 100</span>
              <span className="font-mono text-sm text-rose-400 font-bold">
                {(((currentHct - baselineHct) / baselineHct) * 100).toFixed(1)}% Rise
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block">Baseline Hct (%)</label>
                <input
                  type="number"
                  value={baselineHct}
                  onChange={(e) => setBaselineHct(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Current Day 5 Hct (%)</label>
                <input
                  type="number"
                  value={currentHct}
                  onChange={(e) => setCurrentHct(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono"
                />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-amber-300">
            ★ Hct rise &gt;= 20% confirms significant plasma leakage into pleural/peritoneal cavities.
          </p>
        </div>
      )}

      {/* 8. Anaphylaxis & EpiPen Widget */}
      {type === 'status_resuscitation' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200 space-y-1">
            <span className="font-bold text-rose-300 uppercase tracking-wider text-[10px] block">
              1st Line Life-Saving Emergency Drug
            </span>
            <p className="font-bold text-sm text-white">
              {data.adrenalineDosingProtocol?.firstLineDrug}
            </p>
            <p className="text-rose-100 font-medium">
              {data.adrenalineDosingProtocol?.doseAndRoute}
            </p>
          </div>

          {/* 4-Step Interactive EpiPen Guide */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold text-[11px]">
              <span>EpiPen Auto-Injector Step-by-Step Simulator</span>
              <span className="text-emerald-400">Step {epipenStep} / 4</span>
            </div>
            
            <div className="p-2 bg-slate-900 rounded-lg text-slate-200">
              {epipenStep === 1 && (
                <p><strong>Step 1:</strong> Form a fist around the auto-injector with the orange tip pointing down.</p>
              )}
              {epipenStep === 2 && (
                <p><strong>Step 2 (&ldquo;Blue to the sky&rdquo;):</strong> Pull off the blue safety release cap with other hand.</p>
              )}
              {epipenStep === 3 && (
                <p><strong>Step 3 (&ldquo;Orange to the thigh&rdquo;):</strong> Swing and push the orange tip firmly into outer mid-thigh at 90° until it clicks.</p>
              )}
              {epipenStep === 4 && (
                <p><strong>Step 4:</strong> Hold firmly in place for 3 full seconds. Remove and massage thigh for 10 seconds. Call 999.</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEpipenStep((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Previous
              </button>
              <button
                onClick={() => setEpipenStep((prev) => (prev < 4 ? prev + 1 : 1))}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1"
              >
                <span>{epipenStep === 4 ? 'Restart Guide' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
