import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import glassBottle from "@/assets/glass-bottle.jpg";
import backBottle from "@/assets/back-bottle.png";
import canvasBagFront from "@/assets/canvas-bag.png";
import canvasBagBack from "@/assets/canvas-bag-back.png";

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" as const } },
};
interface HighlightConfig {
  phrase: string;
  style?: React.CSSProperties;
  className?: string;
}

const TypingParagraph = ({ text, highlights = [] }: { text: string; highlights?: HighlightConfig[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (displayedCount >= text.length) return;
    const timeout = setTimeout(() => setDisplayedCount((c) => c + 1), 20);
    return () => clearTimeout(timeout);
  }, [isInView, displayedCount, text.length]);

  const renderWithHighlights = (visibleText: string) => {
    if (highlights.length === 0) return visibleText;
    const parts: React.ReactNode[] = [];
    let remaining = visibleText;
    let key = 0;
    while (remaining.length > 0) {
      let earliestIdx = remaining.length;
      let matchedHL: HighlightConfig | null = null;
      for (const hl of highlights) {
        const idx = remaining.indexOf(hl.phrase);
        if (idx >= 0 && idx < earliestIdx) {
          earliestIdx = idx;
          matchedHL = hl;
        }
      }
      if (!matchedHL) {
        parts.push(remaining);
        break;
      }
      if (earliestIdx > 0) parts.push(remaining.slice(0, earliestIdx));
      parts.push(
        <span key={key++} className={matchedHL.className} style={matchedHL.style}>
          {matchedHL.phrase}
        </span>
      );
      remaining = remaining.slice(earliestIdx + matchedHL.phrase.length);
    }
    return parts;
  };

  const paragraphs = text.split("\n\n");
  let charIndex = 0;

  return (
    <div ref={ref} className="text-muted-foreground font-body leading-relaxed">
      {paragraphs.map((p, i) => {
        const start = charIndex;
        charIndex += p.length + (i < paragraphs.length - 1 ? 2 : 0);
        const visible = Math.max(0, Math.min(p.length, displayedCount - start));
        if (visible === 0 && displayedCount < start) return null;
        const visibleText = p.slice(0, visible);
        return (
          <p key={i} className={i > 0 ? "mt-0.5" : ""}>
            {renderWithHighlights(visibleText)}
            {displayedCount < text.length && displayedCount >= start && displayedCount < start + p.length && (
              <span className="inline-block w-[2px] h-[1em] bg-foreground/70 align-middle ml-[1px] animate-[pulse_1s_steps(2)_infinite]" />
            )}
          </p>
        );
      })}
      {displayedCount >= text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-foreground/70 align-middle ml-[1px] animate-[pulse_1s_steps(2)_infinite_2s]" style={{ animationIterationCount: 3 }} />
      )}
    </div>
  );
};
const CampaignsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBagFlipped, setIsBagFlipped] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="section-padding bg-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <motion.h2 className="section-title" variants={headingVariants}>
            Environmental Campaigns
          </motion.h2>
        </motion.div>

        {/* Campaign 1 */}
        <motion.div
          className="glass-card-hover overflow-hidden mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div
              className="relative overflow-hidden h-[420px] flex items-center justify-center bg-secondary/30 cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Soft radial eco-green glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 50% 60% at 50% 50%, hsla(122,39%,49%,0.12) 0%, hsla(122,39%,49%,0.04) 50%, transparent 80%)",
                }}
              />
              {/* Soft bottom shadow for depth */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
                style={{
                  width: "55%",
                  height: "18px",
                  background: "radial-gradient(ellipse at center, hsla(130,70%,12%,0.18) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
              {/* Floating leaf particles */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="absolute pointer-events-none text-primary/30"
                  style={{
                    fontSize: `${8 + i * 2}px`,
                    left: `${18 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -12 - i * 3, 0],
                    x: [0, 6 - i * 2, 0],
                    rotate: [0, 15 + i * 10, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                >
                  🍃
                </motion.span>
              ))}
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d", y: imgY1 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
              >
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
                  <div className="relative">
                    <img
                      src={glassBottle}
                      alt="Reusable glass water bottle - front"
                      className="max-w-full max-h-full object-contain"
                    />
                    {/* Glass reflection overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, hsla(0,0%,100%,0.12) 0%, transparent 40%, transparent 60%, hsla(0,0%,100%,0.06) 100%)",
                      }}
                    />
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <img
                    src={backBottle}
                    alt="Reusable glass water bottle - back"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
              <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/60 font-body pointer-events-none">Click to flip</span>
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <motion.span
                className="text-gradient-eco font-body font-bold text-sm tracking-[0.2em] uppercase mb-3 inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Campaign 01
              </motion.span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-forest mb-5">Glass Bottle Campaign</h3>
              <blockquote className="border-l-4 border-primary/60 pl-5 mb-6 italic text-muted-foreground">
                "I'm Proud To Be Part Of This Mega Campaign"<br />
                <span className="not-italic font-semibold text-foreground mt-1 block">Break the Plastic, Not the Planet.</span>
              </blockquote>
              <TypingParagraph
                text="Reusable glass bottles will be distributed publicly to reduce plastic waste. Each bottle carries the mission message, turning every user into an ambassador for environmental change.
                Each branded bottle is produced using durable reusable glass with eco printing and campaign distribution support. A contribution of ₹149 – ₹157 per bottle helps cover responsible production, branding, and distribution for the Mission Zero Waste initiative."
                highlights={[{
                  phrase: "₹149 – ₹157 per bottle",
                  className: "inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-sm",
                  style: { background: "#E8F5E9", color: "#4CAF50", boxShadow: "0 1px 4px hsla(130,70%,12%,0.08)" },
                }]}
              />
            </div>
          </div>
        </motion.div>

        {/* Campaign 2 */}
        <motion.div
          className="glass-card-hover overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-14 flex flex-col justify-center order-2 md:order-1">
              <motion.span
                className="text-gradient-eco font-body font-bold text-sm tracking-[0.2em] uppercase mb-3 inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Campaign 02
              </motion.span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-forest mb-5">Canvas Cotton Carry Bag Campaign</h3>
              <div className="bg-forest/5 rounded-xl p-6 mb-6 border border-forest/10">
                <p className="text-sm text-foreground font-body font-semibold mb-2">Bag Back Message:</p>
                <p className="text-muted-foreground italic text-sm leading-relaxed">
                  Replacing Plastic Save the Planet<br />
                  Mission Zero Waste & Transport System Bharat<br />
                  <span className="font-bold not-italic">पर्यावरण रक्षक</span>
                </p>
              </div>
              <TypingParagraph
                text="Free distribution of eco-friendly canvas cotton carry bags to reduce plastic bag usage across communities, markets, and public events. Each bag is crafted at ₹199 – ₹207 per piece to ensure quality fabric, eco printing, and wide distribution reach."
                highlights={[{
                  phrase: "₹199 – ₹207 per piece",
                  className: "inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[0.95em]",
                  style: { background: "#E8F5E9", color: "#4CAF50", boxShadow: "0 1px 4px hsla(130,70%,12%,0.08)" },
                }]}
              />
            </div>
            <div
              className="relative overflow-hidden order-1 md:order-2 h-[420px] flex items-center justify-center bg-secondary/30 cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setIsBagFlipped(!isBagFlipped)}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d", y: imgY2 }}
                animate={{ rotateY: isBagFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
              >
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
                  <img src={canvasBagFront} alt="Canvas cotton carry bag - front" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <img src={canvasBagBack} alt="Canvas cotton carry bag - back" className="max-w-full max-h-full object-contain" />
                </div>
              </motion.div>
              <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/60 font-body pointer-events-none">Click to flip</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignsSection;
