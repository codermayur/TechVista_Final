import React, { useState, useEffect } from 'react';
import '../../App.css';

/**
 * Enhanced Cyber-Tactical Event Registration Form
 * Optimized for full-device responsiveness and seamless parent state integration.
 */
const RegistrationForm = ({ title, fields, onFieldUpdate, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncPercent, setSyncPercent] = useState(0);
  const [dynamicFields, setDynamicFields] = useState(fields);

  // Sync internal fields state when props change
  useEffect(() => {
    setDynamicFields(fields);

    const initialData = {};
    fields.forEach(field => {
      if (field.value !== undefined) {
        initialData[field.id] = field.value;
      }
    });
    setFormData(prev => ({ ...prev, ...initialData }));
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    if (onFieldUpdate) {
      onFieldUpdate(name, fieldValue);
    }

    const fieldConfig = dynamicFields.find(f => f.id === name);
    if (fieldConfig && fieldConfig.onChange) {
      fieldConfig.onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSyncing(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        setSyncPercent(100);
        clearInterval(interval);

        // Brief pause at 100% for visual impact before switching views
        setTimeout(() => {
          if (onSubmit) onSubmit(formData);
          setIsSyncing(false);
          setSyncPercent(0);
        }, 800);
      } else {
        setSyncPercent(progress);
      }
    }, 150);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative group px-2 sm:px-6 lg:px-8 my-6 md:my-10">
      {/* Tactical Decorative Borders */}
      <div className="absolute -top-1 -left-1 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-10 sm:h-10 border-t-2 border-l-2 border-[#39ff14] z-20 transition-all group-hover:scale-110"></div>
      <div className="absolute -bottom-1 -right-1 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-10 sm:h-10 border-b-2 border-r-2 border-[#00ffd5] z-20 transition-all group-hover:scale-110"></div>

      <div className="bg-black/85 backdrop-blur-3xl border border-white/10 rounded-2xl px-4 py-8 sm:p-10 md:p-16 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">

        {/* Animated Scanning Line */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#39ff14]/5 to-transparent h-[200%] -top-full animate-[scan_8s_linear_infinite]"></div>

        <div className="text-center mb-10 md:mb-16 relative z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-6 mb-6 font-orbitron text-[8px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.5em] text-[#39ff14] opacity-70">
            <span className="w-6 sm:w-16 h-[1px] bg-[#39ff14]"></span>
            ESTABLISHING_NEURAL_LINK
            <span className="w-6 sm:w-16 h-[1px] bg-[#39ff14]"></span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-4xl md:text-5xl tracking-[0.1em] sm:tracking-[0.15em] uppercase text-gradient-ai glow-ai mb-5 leading-tight">
            {title}
          </h2>
          <div className="h-[2px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-[#00ffd5] to-transparent mx-auto mb-5"></div>
          <p className="font-roboto text-white/50 text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em]">
            Protocol_v4.0 // Secure_Node: VSIT_HUB
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
            {dynamicFields.map((field) => (
              <div key={field.id} className={`${field.fullWidth ? "md:col-span-2" : ""} group/input`}>
                <div className="flex justify-between items-center mb-3">
                  <label className="block font-orbitron text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#00ffd5] group-focus-within/input:text-[#39ff14] transition-colors">
                    {field.label}
                  </label>
                  {field.required && (
                    <span className="text-[7px] sm:text-[8px] font-orbitron text-[#ff0044] animate-pulse whitespace-nowrap">REQUIRED</span>
                  )}
                </div>

                <div className="relative">
                  {field.type === 'select' ? (
                    <select
                      name={field.id}
                      value={formData[field.id] || ""}
                      required={field.required}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-white font-roboto focus:outline-none focus:border-[#39ff14]/50 focus:bg-[#0a1a12] transition-all duration-500 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#030f0a] text-white/40" disabled>SELECT_OPTION</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#030f0a] text-white">
                          {opt} {field.id.toLowerCase().includes('member') ? (opt === '1' ? 'PLAYER' : 'PLAYERS') : ''}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      name={field.id}
                      required={field.required}
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-white font-roboto file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-orbitron file:bg-[#39ff14] file:text-black hover:file:bg-[#00ffd5] cursor-pointer"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.id}
                      value={formData[field.id] || ""}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 sm:px-5 py-4 sm:py-5 text-sm sm:text-base text-white font-roboto placeholder:text-white/20 focus:outline-none focus:border-[#39ff14]/50 focus:bg-white/10 transition-all duration-500 shadow-inner"
                    />
                  )}

                  {field.type === 'select' && (
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#39ff14]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#39ff14] to-[#00ffd5] w-0 transition-all duration-700 group-focus-within/input:w-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 md:pt-12">
            <button
              type="submit"
              disabled={isSyncing || isSubmitting}
              className={`w-full relative group/btn h-14 sm:h-20 rounded-xl overflow-hidden transition-all duration-500 flex items-center justify-center px-2 ${isSyncing || isSubmitting ? 'opacity-50' : 'hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] active:scale-[0.98]'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14] via-[#00ffd5] to-[#39ff14] bg-[length:200%_auto] transition-transform duration-500"></div>
              <span className={`relative z-10 font-orbitron font-black uppercase text-[#031f14] flex items-center justify-center text-center whitespace-nowrap text-[10px] xs:text-[12px] sm:text-[14px] md:text-base tracking-[0.05em] xs:tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.5em] ${isSyncing ? 'animate-pulse' : ''}`}>
                {isSyncing ? `NEURAL_SYNCING_${syncPercent}%` : 'INITIALIZE_REGISTRATION'}
              </span>
              {isSyncing && (
                <div className="absolute bottom-0 left-0 h-1.5 bg-white/50 transition-all duration-300 z-20" style={{ width: `${syncPercent}%` }}></div>
              )}
            </button>
          </div>
        </form>

        {/* Success Overlay - Triggers just before parent switches view */}
        {syncPercent === 100 && (
          <div className="absolute inset-0 z-50 bg-[#030f0a] flex flex-col items-center justify-center animate-in fade-in duration-500 px-4 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#39ff14] rounded-full flex items-center justify-center mb-8 animate-pulse shadow-[0_0_30px_#39ff14]">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-orbitron text-xl sm:text-3xl text-[#39ff14] tracking-[0.3em] sm:tracking-[0.4em] uppercase glow-ai">SYNC_SUCCESSFUL</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
