import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf } from "lucide-react";

const floatingLeaves = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${10 + i * 15}%`,
  size: 12 + (i % 3) * 4,
  duration: 8 + i * 2,
  delay: i * 1.5,
}));

const MarketingBanner = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden" style={{ background: "#E8F5E9" }}>
      {/* Gradient lighting */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 30% 50%, hsla(122, 60%, 55%, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, hsla(122, 40%, 45%, 0.1) 0%, transparent 50%)",
        }} />
      </motion.div>

      {/* Eco-green glow border */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 80px 20px hsla(122, 60%, 55%, 0.12)",
      }} />

      {/* Floating leaves */}
      {floatingLeaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute pointer-events-none"
          style={{ left: leaf.left, top: "-20px" }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, leaf.id % 2 === 0 ? 40 : -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
        >
          <Leaf size={leaf.size} style={{ color: "hsla(122, 50%, 35%, 0.18)" }} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          className="font-display font-bold uppercase tracking-wider mb-4"
          style={{ color: "#1B5E20", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", letterSpacing: "0.08em" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Free Public Distribution Campaign
        </motion.h2>

        <motion.p
          className="font-display font-bold mb-3"
          style={{ color: "#1B5E20", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Water Glass Bottles &amp; Eco Canvas Carry Bags
        </motion.p>

        <motion.p
          className="font-body font-semibold mb-2"
          style={{ color: "#2E7D32", fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Promote Your Brand While Protecting The Planet
        </motion.p>

        <motion.p
          className="font-body max-w-2xl mx-auto mb-10"
          style={{ color: "#388E3C", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Your Brand Reaches Thousands Through Eco-Friendly Environmental Impact
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-body font-bold text-lg tracking-wide transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1B5E20, #2E7D32)",
              color: "#fff",
              boxShadow: "0 6px 30px -6px hsla(122, 60%, 25%, 0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow = "0 10px 40px -6px hsla(122, 60%, 35%, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 30px -6px hsla(122, 60%, 25%, 0.5)";
            }}
          >
            Partner With This Campaign
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingBanner;
