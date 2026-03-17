import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const paragraphs = [
  "Mission Zero Waste & Transport System Bharat is an environmental initiative dedicated to reducing plastic pollution and promoting sustainable environmental practices across India.",
  "The campaign focuses on practical environmental solutions that encourage individuals, communities, and organizations to adopt eco-friendly habits and reduce their environmental footprint.",
  "Through initiatives such as reusable glass bottle campaigns, eco-friendly canvas carry bag distribution, plantation drives, rainwater harvesting awareness, and environmental education programs, the mission aims to create long-term positive environmental impact.",
  "The initiative works to spread awareness about responsible consumption, environmental protection, and sustainable living while encouraging businesses, institutions, and citizens to participate in environmental responsibility programs.",
  "Our vision is to build a cleaner and greener Bharat where communities work together to protect nature and ensure a sustainable future for the next generations.",
];

const AboutUsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Eco gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 40%, hsla(122,39%,49%,0.05) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: "radial-gradient(circle, hsla(122,40%,80%,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating leaf particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={`about-leaf-${i}`}
          className="absolute pointer-events-none text-primary/15"
          style={{
            fontSize: `${12 + i * 3}px`,
            left: `${10 + i * 22}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -18 - i * 4, 0],
            x: [0, 8 - i * 2, 0],
            rotate: [0, 15 + i * 5, 0],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{
            duration: 7 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          🍃
        </motion.span>
      ))}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="section-title">About Our Mission</h2>
        </motion.div>

        <motion.p
          className="text-primary font-display text-xl md:text-2xl font-semibold mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Mission Zero Waste & Transport System Bharat
        </motion.p>

        <div className="space-y-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
