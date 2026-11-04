function SkillSwapLogo({ compact = false, className = "" }) {
  const svg = (
    <svg viewBox="0 0 220 220" aria-hidden="true" className="logo-mark" role="img">
      <defs>
        <linearGradient id="skillswap-bg" x1="26" y1="18" x2="188" y2="196" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="0.55" stopColor="#6D28D9" />
          <stop offset="1" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="skillswap-ribbon" x1="59" y1="42" x2="172" y2="182" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9D5FF" />
        </linearGradient>
      </defs>

      <rect x="14" y="14" width="192" height="192" rx="48" fill="url(#skillswap-bg)" />

      <path
        d="M71 66C87 47 111 39 134 44C155 49 170 62 174 81C178 99 169 117 151 129C136 139 120 145 108 154C95 163 88 175 94 188C101 201 119 207 140 203"
        fill="none"
        stroke="url(#skillswap-ribbon)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M150 58C134 74 112 82 89 81C68 80 49 69 41 51C33 33 39 16 56 9C70 4 86 4 100 9C118 15 130 23 139 34C148 45 152 52 152 58C152 67 146 76 136 82"
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M67 138C82 153 100 160 121 161C139 162 155 157 166 147"
        fill="none"
        stroke="rgba(255,255,255,0.74)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="64" cy="94" r="8.5" fill="white" fillOpacity="0.95" />
      <circle cx="158" cy="134" r="8.5" fill="white" fillOpacity="0.95" />

      <path d="M73 60L52 43" stroke="rgba(255,255,255,0.74)" strokeWidth="8" strokeLinecap="round" />
      <path d="M150 58L171 41" stroke="rgba(255,255,255,0.74)" strokeWidth="8" strokeLinecap="round" />
      <path d="M166 147L181 167" stroke="rgba(255,255,255,0.74)" strokeWidth="8" strokeLinecap="round" />
      <path d="M67 138L46 158" stroke="rgba(255,255,255,0.74)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );

  if (compact) {
    return <div className={`skillswap-logo compact ${className}`.trim()}>{svg}</div>;
  }

  return (
    <div className={`skillswap-logo ${className}`.trim()}>
      {svg}
      <div className="skillswap-wordmark" aria-label="SkillSwap brand name">
        <span className="skillswap-wordmark__skill">Skill</span>
        <span className="skillswap-wordmark__swap">Swap</span>
      </div>
    </div>
  );
}

export default SkillSwapLogo;
