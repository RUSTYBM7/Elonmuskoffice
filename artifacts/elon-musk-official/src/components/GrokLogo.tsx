const GrokLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.15"/>
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="4" fill="currentColor"/>
    <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8.2" y1="8.2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="34" y1="34" x2="39.8" y2="39.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="39.8" y1="8.2" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="34" x2="8.2" y2="39.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
export default GrokLogo;