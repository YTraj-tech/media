import React from 'react'

const Loading = () => {
  return (
    <div className="loading-wrap">
      {/* Map grid background */}
      <div className="map-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="0.8"/>
            </pattern>
            <radialGradient id="spotlight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#spotlight)" />
        </svg>
      </div>

      {/* Animated road lines */}
      <div className="roads">
        <div className="road road-h road-h1" />
        <div className="road road-h road-h2" />
        <div className="road road-v road-v1" />
        <div className="road road-v road-v2" />
      </div>

      {/* Center content */}
      <div className="center">
        <div className="scan-ring sr1" />
        <div className="scan-ring sr2" />
        <div className="scan-ring sr3" />

        <div className="radar-wrap">
          <div className="radar-sweep" />
        </div>

        <div className="pin-wrap">
          <div className="pin-head">
            <div className="pin-dot" />
          </div>
          <div className="pin-tail" />
          <div className="pin-shadow" />
        </div>
      </div>

      {/* Status card */}
      <div className="status-card">
        <div className="card-top">
          <div className="signal-bars">
            <span className="bar b1" />
            <span className="bar b2" />
            <span className="bar b3" />
            <span className="bar b4" />
          </div>
          <div className="status-text">
            <p className="status-title">Acquiring location</p>
            <p className="status-sub">GPS · Triangulating signal<span className="ellipsis">...</span></p>
          </div>
        </div>
        <div className="coord-wrap">
          <span className="coord-label">LAT</span>
          <span className="coord-val">12.9716°</span>
          <span className="coord-label">LNG</span>
          <span className="coord-val coord-val2">77.5946°</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;500;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .loading-wrap {
          min-height: 100vh;
          
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .map-bg { position: absolute; inset: 0; }

        .roads { position: absolute; inset: 0; }
        .road {
          position: absolute;
          background: rgba(56,189,248,0.06);
          border: 0.5px solid rgba(56,189,248,0.1);
        }
        .road-h { height: 2px; left: 0; right: 0; }
        .road-v { width: 2px; top: 0; bottom: 0; }
        .road-h1 { top: 35%; }
        .road-h2 { top: 65%; }
        .road-v1 { left: 30%; }
        .road-v2 { left: 70%; }

        .center {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .scan-ring {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(56,189,248,0.25);
          animation: expand 3s ease-out infinite;
        }
        .sr2 { animation-delay: 1s; }
        .sr3 { animation-delay: 2s; }

        .radar-wrap {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(56,189,248,0.15);
          background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%);
        }
        .radar-sweep {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 50%;
          transform-origin: bottom left;
          background: conic-gradient(from -5deg, transparent, rgba(56,189,248,0.35) 60deg, transparent 80deg);
          animation: sweep 2.5s linear infinite;
          border-radius: 0 100% 0 0;
        }

        .pin-wrap {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: pin-float 2s ease-in-out infinite;
          z-index: 10;
        }
        .pin-head {
          width: 28px;
          height: 28px;
          background: #38bdf8;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(56,189,248,0.6), 0 0 40px rgba(56,189,248,0.2);
        }
        .pin-dot {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        }
        .pin-tail {
          width: 2px;
          height: 8px;
          background: #38bdf8;
          margin-top: -1px;
        }
        .pin-shadow {
          width: 14px;
          height: 5px;
          background: rgba(56,189,248,0.3);
          border-radius: 50%;
          filter: blur(3px);
          animation: shadow-pulse 2s ease-in-out infinite;
        }

        .status-card {
          background: rgba(12,22,40,0.85);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          backdrop-filter: blur(12px);
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 20;
        }
        .status-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .signal-bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 18px;
          flex-shrink: 0;
        }
        .bar {
          display: block;
          width: 5px;
          background: rgba(56,189,248,0.25);
          border-radius: 2px;
          animation: signal-pulse 1.2s ease-in-out infinite;
        }
        .b1 { height: 4px;  animation-delay: 0s; }
        .b2 { height: 8px;  animation-delay: 0.2s; }
        .b3 { height: 12px; animation-delay: 0.4s; }
        .b4 { height: 18px; animation-delay: 0.6s; }

        .status-text { flex: 1; }
        .status-title {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.01em;
        }
        .status-sub {
          font-size: 11px;
          color: rgba(56,189,248,0.65);
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          letter-spacing: 0.04em;
          margin-top: 2px;
        }

        .coord-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid rgba(56,189,248,0.1);
          padding-top: 10px;
          font-family: 'DM Mono', monospace;
        }
        .coord-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: rgba(56,189,248,0.4);
          font-weight: 400;
        }
        .coord-val {
          font-size: 12px;
          color: rgba(56,189,248,0.85);
          font-weight: 500;
          animation: flicker 0.15s steps(1) infinite;
        }
        .coord-val2 { animation-delay: 0.07s; }

        .ellipsis {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          animation: ellipsis-anim 1.5s steps(4, end) infinite;
          width: 1.5em;
        }

        @keyframes expand {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pin-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50%       { transform: scaleX(0.55); opacity: 0.12; }
        }
        @keyframes signal-pulse {
          0%, 100% { background: rgba(56,189,248,0.2); }
          50%       { background: rgba(56,189,248,1); }
        }
        @keyframes flicker {
          0%  { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes ellipsis-anim {
          0%   { width: 0; }
          33%  { width: 0.5em; }
          66%  { width: 1em; }
          100% { width: 1.5em; }
        }
      `}</style>
    </div>
  )
}

export default Loading