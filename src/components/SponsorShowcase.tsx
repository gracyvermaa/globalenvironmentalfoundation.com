import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Gift, Users, Share2, Heart, Truck } from "lucide-react";

/* ── MARQUEE TEXT BAR ── */
const marqueeText =
  "Join Hands With Environmentalists • FREE Distribution Of Water Glass Bottles & Canvas Cotton Carry Bags • Promote Your Brand Through Eco-Friendly Environmental Impact • FREE Distribution Of Your Products At Public Places & Social Media • Unique Way To Advertise Your Brand Through Environmental Campaigns • ";

const MarqueeBar = () => (
  <div
    className="relative w-full overflow-hidden py-4"
    style={{
      background: "#E8F5E9",
      boxShadow: "inset 0 0 40px 10px hsla(122,60%,55%,0.08), 0 2px 12px -4px hsla(122,50%,30%,0.12)",
    }}
  >
    {/* gradient edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to right, #E8F5E9, transparent)" }} />
    <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to left, #E8F5E9, transparent)" }} />

    <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="inline-block font-body font-bold uppercase tracking-widest text-sm md:text-base"
          style={{ color: "#1B5E20" }}
        >
          {marqueeText}
        </span>
      ))}
    </div>
  </div>
);

/* ── BENEFIT CARDS ── */
const benefits = [
  { icon: Gift, title: "Free Product Distribution", text: "Your branded glass bottles and eco bags distributed at public places." },
  { icon: Users, title: "Public Awareness Campaign", text: "Environmental campaigns reaching thousands of people." },
  { icon: Share2, title: "Social Media Promotion", text: "Campaign photos, videos and social media coverage for your brand." },
  { icon: Heart, title: "Eco-Friendly Brand Promotion", text: "Promote your brand through meaningful environmental impact." },
  { icon: Truck, title: "Campaign Logistics", text: "Includes bottle production, logo printing, distribution volunteers, photography and social media posts." },
];

const BenefitCard = ({ icon: Icon, title, text, index }: { icon: typeof Gift; title: string; text: string; index: number }) => (
  <motion.div
    className="min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-2xl p-6 cursor-grab select-none"
    style={{
      background: "hsla(120,20%,98%,0.9)",
      border: "1px solid hsla(122,40%,70%,0.3)",
      boxShadow: "0 8px 30px -8px hsla(122,40%,30%,0.1)",
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -6, boxShadow: "0 16px 40px -8px hsla(122,50%,35%,0.18)" }}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
      style={{ background: "linear-gradient(135deg, hsla(122,50%,45%,0.15), hsla(122,50%,45%,0.05))" }}
    >
      <Icon size={24} style={{ color: "#2E7D32" }} />
    </div>
    <h4 className="font-display font-bold text-lg mb-2" style={{ color: "#1B5E20" }}>
      {title}
    </h4>
    <p className="font-body text-sm leading-relaxed" style={{ color: "#388E3C" }}>
      {text}
    </p>
  </motion.div>
);

/* ── MAIN SECTION ── */
const SponsorShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  /* drag-to-scroll */
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.style.cursor = "grabbing";
    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX);
    };
    const onUp = () => {
      el.style.cursor = "grab";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* parallax glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, hsla(122,60%,55%,0.08) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Marquee */}
      <MarqueeBar />

      {/* Benefits slider */}
      <div className="py-12 md:py-16 px-6 md:px-12 lg:px-24">
        <motion.h3
          className="font-display font-bold text-2xl md:text-3xl mb-8 text-center"
          style={{ color: "#1B5E20" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Sponsor Benefits
        </motion.h3>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          className="flex gap-5 overflow-x-auto pb-4 cursor-grab snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>

      {/* floating leaves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${20 + i * 30}%`, top: "-10px" }}
          animate={{ y: ["0vh", "100vh"], x: [0, i % 2 === 0 ? 30 : -30, 0], rotate: [0, 360] }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 }}
        >
          <Leaf size={14} style={{ color: "hsla(122,50%,35%,0.12)" }} />
        </motion.div>
      ))}
    </section>
  );
};

export default SponsorShowcase;
