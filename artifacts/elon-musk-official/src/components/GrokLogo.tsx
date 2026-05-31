import grokLogoImg from "@/assets/grok-logo-new.png";

const GrokLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <img
    src={grokLogoImg}
    alt="Grok AI"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: "contain", flexShrink: 0 }}
    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
  />
);
export default GrokLogo;