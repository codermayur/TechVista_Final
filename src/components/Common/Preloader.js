import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';

const Preloader = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const isFinished = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Handle completion with a single-run guard
  useEffect(() => {
    if (percent === 100 && !isFinished.current) {
      isFinished.current = true;
      const timeout = setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [percent, onFinish]);

  return (
    <div className="loader-wrapper ar-vr-theme">
      <div className="preloader-bg-cinema"></div>
      <div className="scanline-overlay"></div>

      <div className="central-hub-alignment">
        <div className="vr-goggle-system">
          <div className="vr-lens-outer">
            <div className="vr-lens-inner">
              <div className="hud-grid-3d"></div>
              <div className="visor-reflection"></div>

              <div className="hud-ui-layer">
                <div className="hud-corner-meta font-orbitron">
                  <span className="rec-status-left">REC ●</span>
                  <span className="vision-status-right blink-text">AI_VISOR_ACTIVE</span>
                </div>

                <div className="techvista-branding-wrapper">
                  <h1 className="techvista-title font-orbitron">
                    TECHVISTA <span className="edition-tag">4.0</span>
                  </h1>
                  <div className="logo-underline"></div>
                </div>

                <div className="absolute-center-percent font-orbitron">
                  {percent}<span className="percent-symbol">%</span>
                </div>

                <div className="hud-progress-fixed">
                  <div className="hud-progress-bar" style={{ width: `${percent}%` }}>
                    <div className="hud-progress-glow"></div>
                  </div>
                </div>

                <div className="hud-status-logs font-roboto">
                  <div className="typing-log">
                    {percent < 30 && "> INITIALIZING_NEURAL_LINK"}
                    {percent >= 30 && percent < 70 && "> LOADING_VIRTUAL_ASSETS"}
                    {percent >= 70 && "> SYNCING_BIO_METRICS"}
                  </div>
                </div>
              </div>

              {/* HUD Decorative Corners */}
              <div className="hud-corner top-left"></div>
              <div className="hud-corner top-right"></div>
              <div className="hud-corner bottom-left"></div>
              <div className="hud-corner bottom-right"></div>
            </div>
          </div>
        </div>

        <div className="init-block">
          <div className="ai-pulse-bar"></div>
          <div className="init-text-wrapper">
             <p className="font-orbitron tracking-widest init-text">
              ESTABLISHING <span className="text-neon-green">VIRTUAL_PRESENCE</span>
            </p>
          </div>
          <div className="ai-pulse-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
