import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Leaf, CheckCircle } from "lucide-react";

/* ── Spike ring SVG (outer seal teeth) ── */
const SpikeRing = ({ size = 320, spikes = 36 }: { size?: number; spikes?: number }) => {
  const r = size / 2;
  const inner = r * 0.82;
  const outer = r;
  let d = "";
  for (let i = 0; i < spikes; i++) {
    const aOuter = (Math.PI * 2 * i) / spikes - Math.PI / 2;
    const aMid = (Math.PI * 2 * (i + 0.5)) / spikes - Math.PI / 2;
    const ox = r + outer * Math.cos(aOuter);
    const oy = r + outer * Math.sin(aOuter);
    const ix = r + inner * Math.cos(aMid);
    const iy = r + inner * Math.sin(aMid);
    d += i === 0 ? `M${ox},${oy}` : `L${ox},${oy}`;
    d += `L${ix},${iy}`;
  }
  d += "Z";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
      <defs>
        <linearGradient id="spikeGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(43 80% 58%)" />
          <stop offset="30%" stopColor="hsl(43 90% 68%)" />
          <stop offset="50%" stopColor="hsl(40 85% 55%)" />
          <stop offset="80%" stopColor="hsl(43 90% 65%)" />
          <stop offset="100%" stopColor="hsl(43 75% 50%)" />
        </linearGradient>
        <filter id="spikeGlow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={d} fill="url(#spikeGold)" filter="url(#spikeGlow)" opacity="0.4" />
      <path d={d} fill="url(#spikeGold)" />
    </svg>
  );
};

/* ── Dot ring SVG ── */
const DotRing = ({ size = 320, dots = 48, ringRadius = 0.72 }: { size?: number; dots?: number; ringRadius?: number }) => {
  const r = size / 2;
  const dr = r * ringRadius;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
      {Array.from({ length: dots }).map((_, i) => {
        const a = (Math.PI * 2 * i) / dots - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={r + dr * Math.cos(a)}
            cy={r + dr * Math.sin(a)}
            r={1.8}
            fill="hsl(43 80% 62%)"
            opacity={0.7}
          />
        );
      })}
    </svg>
  );
};

const TrustVerificationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const badgeSize = 320; // px

  return (
    <section ref={ref} className="section-padding bg-secondary/40 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ y: bgY, background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)", filter: "blur(100px)" }}
      />

      {/* Floating leaves */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={`leaf-${i}`}
          className="absolute pointer-events-none text-primary/10"
          style={{ fontSize: `${12 + i * 4}px`, left: `${10 + i * 22}%`, top: `${15 + i * 20}%` }}
          animate={{ y: [0, -18 - i * 5, 0], rotate: [0, 20 + i * 10, 0], opacity: [0.06, 0.2, 0.06] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        >
          🍃
        </motion.span>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="section-title">Official Trust Verification</h2>
          <p className="section-subtitle mx-auto">
            Global Environmental Foundation – Registered Environmental Trust
          </p>
        </motion.div>

        {/* Badge */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <div
            className="relative cursor-pointer"
            style={{ perspective: "1400px" }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped((f) => !f)}
          >
            {/* Ambient gold glow */}
            <div
              className="absolute -inset-12 rounded-full pointer-events-none transition-all duration-700"
              style={{
                background: "radial-gradient(circle, hsla(43, 74%, 55%, 0.3) 0%, hsla(43, 74%, 55%, 0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
                opacity: isFlipped ? 1 : 0.7,
              }}
            />

            {/* Drop shadow */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-56 h-10 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, hsla(0,0%,0%,0.18) 0%, transparent 70%)", filter: "blur(12px)" }}
            />

            {/* Flip container */}
            <motion.div
              className="relative"
              style={{ width: badgeSize, height: badgeSize, transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0, y: [0, -6, 0] }}
              transition={{
                rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* ═══════ FRONT ═══════ */}
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                {/* Outer spiked seal */}
                <SpikeRing size={badgeSize} spikes={36} />

                {/* Dot ring */}
                <DotRing size={badgeSize} dots={48} ringRadius={0.72} />

                {/* Second gold ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: badgeSize * 0.12,
                    background: "conic-gradient(from 0deg, hsl(43 74% 49%), hsl(43 85% 68%), hsl(43 74% 49%), hsl(43 85% 62%), hsl(43 74% 49%))",
                    boxShadow: "inset 0 2px 8px hsla(0,0%,100%,0.3), inset 0 -2px 8px hsla(0,0%,0%,0.2), 0 0 12px hsla(43,74%,49%,0.4)",
                  }}
                />

                {/* Green center */}
                <div
                  className="absolute rounded-full flex flex-col items-center justify-center p-6"
                  style={{
                    inset: badgeSize * 0.17,
                    background: "radial-gradient(ellipse at 35% 30%, hsl(152 70% 28%), hsl(152 75% 18%), hsl(150 80% 10%))",
                    boxShadow: "inset 0 4px 24px -4px hsla(0,0%,100%,0.18), inset 0 -6px 24px -4px hsla(0,0%,0%,0.35), 0 0 0 4px hsla(43,74%,49%,0.6)",
                  }}
                >
                  {/* Glossy reflection */}
                  <div
                    className="absolute top-3 left-1/4 w-1/2 h-10 rounded-full pointer-events-none"
                    style={{ background: "linear-gradient(180deg, hsla(0,0%,100%,0.18), transparent)", filter: "blur(6px)" }}
                  />

                  {/* Rotating light sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full"
                      style={{ background: "linear-gradient(180deg, hsla(43,80%,65%,0.12), transparent 40%, transparent 60%, hsla(43,80%,65%,0.06))", filter: "blur(8px)" }}
                    />
                  </motion.div>

                  <Shield className="w-7 h-7 mb-1.5" style={{ color: "hsl(43 74% 60%)" }} />
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(43 74% 65%)" }}>
                    Official
                  </span>
                  <span className="font-display text-base font-bold leading-tight text-center" style={{ color: "hsl(0 0% 100%)" }}>
                    Trust Registration
                  </span>
                  <div className="w-10 h-px my-1.5" style={{ background: "hsl(43 74% 55% / 0.5)" }} />
                  <span className="text-[11px] font-body font-semibold leading-snug text-center" style={{ color: "hsl(120 30% 80%)" }}>
                    Global Environmental
                    <br />
                    Foundation
                  </span>
                  <span className="text-[10px] font-body mt-1" style={{ color: "hsl(43 74% 65%)" }}>
                    Est. 2018
                  </span>
                </div>

                {/* Gold ribbon banner */}
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: badgeSize * 0.08, width: badgeSize * 0.75 }}>
                  <svg viewBox="0 0 240 44" className="w-full">
                    <defs>
                      <linearGradient id="ribbonGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(40 70% 42%)" />
                        <stop offset="20%" stopColor="hsl(43 80% 55%)" />
                        <stop offset="50%" stopColor="hsl(43 90% 65%)" />
                        <stop offset="80%" stopColor="hsl(43 80% 55%)" />
                        <stop offset="100%" stopColor="hsl(40 70% 42%)" />
                      </linearGradient>
                      <linearGradient id="ribbonFold" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(40 65% 38%)" />
                        <stop offset="100%" stopColor="hsl(40 60% 30%)" />
                      </linearGradient>
                    </defs>
                    {/* Ribbon folds */}
                    <polygon points="0,10 18,10 18,34 0,22" fill="url(#ribbonFold)" />
                    <polygon points="240,10 222,10 222,34 240,22" fill="url(#ribbonFold)" />
                    {/* Main ribbon */}
                    <rect x="16" y="8" width="208" height="28" rx="3" fill="url(#ribbonGold)" />
                    {/* Ribbon shadow */}
                    <rect x="16" y="30" width="208" height="6" rx="2" fill="hsla(0,0%,0%,0.12)" />
                    {/* Text */}
                    <text x="120" y="27" textAnchor="middle" fill="hsl(150 80% 10%)" fontSize="9" fontWeight="700" fontFamily="'Playfair Display', serif" letterSpacing="1.5">
                      VERIFIED ORGANIZATION
                    </text>
                  </svg>
                </div>
              </div>

              {/* ═══════ BACK ═══════ */}
              <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <SpikeRing size={badgeSize} spikes={36} />
                <DotRing size={badgeSize} dots={48} ringRadius={0.72} />

                <div
                  className="absolute rounded-full"
                  style={{
                    inset: badgeSize * 0.12,
                    background: "conic-gradient(from 180deg, hsl(43 74% 49%), hsl(43 85% 68%), hsl(43 74% 49%), hsl(43 85% 62%), hsl(43 74% 49%))",
                    boxShadow: "inset 0 2px 8px hsla(0,0%,100%,0.3), inset 0 -2px 8px hsla(0,0%,0%,0.2), 0 0 12px hsla(43,74%,49%,0.4)",
                  }}
                />

                <div
                  className="absolute rounded-full flex flex-col items-center justify-center p-6 gap-1"
                  style={{
                    inset: badgeSize * 0.17,
                    background: "radial-gradient(ellipse at 35% 30%, hsl(152 70% 28%), hsl(152 75% 18%), hsl(150 80% 10%))",
                    boxShadow: "inset 0 4px 24px -4px hsla(0,0%,100%,0.18), inset 0 -6px 24px -4px hsla(0,0%,0%,0.35), 0 0 0 4px hsla(43,74%,49%,0.6)",
                  }}
                >
                  <div
                    className="absolute top-3 left-1/4 w-1/2 h-10 rounded-full pointer-events-none"
                    style={{ background: "linear-gradient(180deg, hsla(0,0%,100%,0.18), transparent)", filter: "blur(6px)" }}
                  />

                  <Leaf className="w-6 h-6" style={{ color: "hsl(43 74% 60%)" }} />
                  {[
                    ["Registration", "Article 64 Trust"],
                    ["Certificate", "IN-DL14734"],
                    ["", "202351484Q"],
                  ].map(([label, value], i) => (
                    <div key={i} className="text-center">
                      {label && (
                        <span className="block text-[9px] font-body uppercase tracking-wider" style={{ color: "hsl(43 74% 65%)" }}>
                          {label}
                        </span>
                      )}
                      <span className="block text-xs font-body font-semibold" style={{ color: "hsl(0 0% 100%)" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                  <div className="w-10 h-px" style={{ background: "hsl(43 74% 55% / 0.5)" }} />
                  <div className="flex items-center gap-1" style={{ color: "hsl(120 30% 80%)" }}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-body font-semibold uppercase tracking-wider">Verified</span>
                  </div>
                </div>

                {/* Ribbon on back */}
                <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: badgeSize * 0.08, width: badgeSize * 0.75 }}>
                  <svg viewBox="0 0 240 44" className="w-full">
                    <use href="#ribbonFold" />
                    <polygon points="0,10 18,10 18,34 0,22" fill="hsl(40 60% 30%)" />
                    <polygon points="240,10 222,10 222,34 240,22" fill="hsl(40 60% 30%)" />
                    <rect x="16" y="8" width="208" height="28" rx="3" fill="url(#ribbonGold)" />
                    <rect x="16" y="30" width="208" height="6" rx="2" fill="hsla(0,0%,0%,0.12)" />
                    <text x="120" y="27" textAnchor="middle" fill="hsl(150 80% 10%)" fontSize="9" fontWeight="700" fontFamily="'Playfair Display', serif" letterSpacing="1.5">
                      ENVIRONMENTAL TRUST
                    </text>
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-center mt-10 text-xs font-body text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              Hover or tap to verify
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustVerificationSection;
