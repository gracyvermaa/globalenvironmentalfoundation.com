import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Quote } from "lucide-react";

import founderImg from "@/assets/founder-portrait.jpg";

const descParagraphs = [
  "Hari Krishna Verma is the Founder and President of the Global Environmental Foundation and the visionary behind the Mission Zero Waste & Transport System Bharat initiative.",
  "With a deep commitment to environmental protection and sustainable development, he established the foundation to promote awareness about environmental conservation and encourage eco-friendly practices across communities.",
  "His vision focuses on creating practical environmental solutions that reduce plastic waste, promote sustainable living, and inspire individuals, businesses, and communities to participate in protecting nature.",
  "Under his leadership, the foundation continues to support environmental awareness campaigns, eco-friendly product initiatives, and community-driven sustainability programs across India.",
];

const fullText = descParagraphs.join("\n\n");

const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => setShowCursor(false), 1200);
      }
    }, 8);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <div ref={ref} className={className}>
      <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed whitespace-pre-line">
        {displayed}
        {showCursor && isInView && (
          <span className={`inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-text-bottom ${done ? "animate-pulse" : ""}`} 
                style={{ animation: done ? "pulse 1s steps(2) infinite" : "pulse 0.6s steps(2) infinite" }} />
        )}
      </p>
    </div>
  );
};

const FounderSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Eco-green gradient lighting */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsl(var(--glow-green) / 0.07) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-20, 20]),
          background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={`founder-leaf-${i}`}
          className="absolute pointer-events-none text-primary/10"
          style={{
            fontSize: `${10 + i * 3}px`,
            right: `${3 + i * 18}%`,
            top: `${10 + i * 18}%`,
          }}
          animate={{
            y: [0, -20 - i * 6, 0],
            x: [0, 8 - i * 4, 0],
            rotate: [0, 25 + i * 12, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: 9 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          🍃
        </motion.span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="section-title">Founder & President</h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left - Portrait */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-[2rem] -z-10 opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:-inset-6"
                style={{
                  background: "conic-gradient(from 180deg, hsl(var(--glow-green) / 0.15), hsl(var(--primary) / 0.08), hsl(var(--glow-green) / 0.15))",
                  filter: "blur(25px)",
                }}
              />
              {/* Inner glow */}
              <div
                className="absolute -inset-2 rounded-3xl -z-10 transition-all duration-700 group-hover:scale-110"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(var(--glow-green) / 0.18), transparent 70%)",
                  filter: "blur(35px)",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_70px_-15px_hsl(var(--primary)/0.3)] transition-shadow duration-700 group-hover:shadow-[0_30px_80px_-10px_hsl(var(--primary)/0.4)]">
                <img
                  src={founderImg}
                  alt="Hari Krishna Verma – Founder & President"
                  className="w-72 md:w-80 lg:w-full object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, hsl(var(--forest) / 0.5), transparent)",
                  }}
                />
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                     style={{ background: "linear-gradient(135deg, transparent 40%, hsl(var(--glow-green) / 0.08) 50%, transparent 60%)" }} />
              </div>
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          >
            {/* Name with animated underline */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-forest relative inline-block">
                Hari Krishna Verma
                <motion.span
                  className="absolute bottom-0 left-0 h-[3px] rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                />
              </h3>
            </motion.div>

            <motion.p
              className="text-primary font-body font-semibold text-base md:text-lg mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Founder & President – Global Environmental Foundation
            </motion.p>

            {/* Typewriter description */}
            <div className="mb-8">
              <TypewriterText text={fullText} />
            </div>

            {/* Quote highlight */}
            <motion.blockquote
              className="relative pl-6 py-5 rounded-r-xl overflow-hidden"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary) / 0.07), hsl(var(--primary) / 0.02), transparent)",
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {/* Animated green vertical line */}
              <motion.div
                className="absolute left-0 top-0 w-1 rounded-full bg-primary"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
              />
              {/* Glowing quote icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Quote className="w-6 h-6 text-primary/50 mb-2 drop-shadow-[0_0_8px_hsl(var(--glow-green)/0.4)]" />
              </motion.div>
              <p className="font-display text-lg md:text-xl italic text-foreground/90 leading-relaxed">
                "Our mission is to inspire communities and organizations to take responsibility for protecting our planet."
              </p>
            </motion.blockquote>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
