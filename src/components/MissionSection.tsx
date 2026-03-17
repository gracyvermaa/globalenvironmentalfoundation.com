import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, type Variants } from "framer-motion";
import { Leaf, Recycle, Users, TreePine } from "lucide-react";

const goals = [
  { icon: Recycle, title: "Reduce Plastic Waste", desc: "Eliminating single-use plastics through sustainable alternatives across Indian communities", hoverAnim: "rotate" },
  { icon: Leaf, title: "Promote Reusable Products", desc: "Distributing eco-friendly products that replace harmful plastics in daily life", hoverAnim: "sway" },
  { icon: Users, title: "Environmental Awareness", desc: "Educating millions through campaigns, events, and digital initiatives", hoverAnim: "pulse" },
  { icon: TreePine, title: "Build Sustainable Communities", desc: "Creating lasting green infrastructure and habits across India", hoverAnim: "grow" },
];

const counters = [
  { emoji: "🌱", label: "Trees Planted", value: 15000, suffix: "+" },
  { emoji: "♻️", label: "Plastic Reduced", value: 80, suffix: " Tons+" },
  { emoji: "🌍", label: "Communities Reached", value: 120, suffix: "+" },
  { emoji: "👥", label: "Volunteers Engaged", value: 500, suffix: "+" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" as const } },
};

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = count >= 1000 ? count.toLocaleString("en-IN") : count;
  return <>{formatted}{suffix}</>;
};

const iconHoverVariants: Record<string, Variants> = {
  rotate: { rest: { rotate: 0 }, hover: { rotate: 180, transition: { duration: 0.6, ease: "easeInOut" } } },
  sway: { rest: { rotate: 0 }, hover: { rotate: [0, -12, 12, -6, 0], transition: { duration: 0.8, ease: "easeInOut" } } },
  pulse: { rest: { scale: 1 }, hover: { scale: [1, 1.15, 1, 1.1, 1], transition: { duration: 0.8 } } },
  grow: { rest: { scaleY: 1 }, hover: { scaleY: [1, 1.15, 1], transition: { duration: 0.6 } } },
};

const MissionSection = () => {
  const ref = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterInView = useInView(counterRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="mission" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Subtle parallax decorative bg */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: 'radial-gradient(circle, hsla(122, 40%, 80%, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Soft green gradient glow behind cards */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-20 w-[80%] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, hsla(122,39%,49%,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Faint sunlight rays */}
      <div
        className="absolute top-0 left-1/4 w-[200px] h-[500px] pointer-events-none sunray"
        style={{
          background: "linear-gradient(180deg, hsla(45,80%,70%,0.04) 0%, transparent 100%)",
          transform: "rotate(15deg)",
          transformOrigin: "top center",
        }}
      />
      <div
        className="absolute top-0 right-1/3 w-[150px] h-[400px] pointer-events-none sunray"
        style={{
          background: "linear-gradient(180deg, hsla(45,80%,70%,0.03) 0%, transparent 100%)",
          transform: "rotate(-10deg)",
          transformOrigin: "top center",
          animationDelay: "2s",
        }}
      />

      {/* Floating leaf particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={`leaf-${i}`}
          className="absolute pointer-events-none text-primary/20"
          style={{
            fontSize: `${10 + i * 2}px`,
            left: `${8 + i * 16}%`,
            top: `${15 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0],
            x: [0, 10 - i * 3, 0],
            rotate: [0, 20 + i * 8, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.1,
          }}
        >
          🍃
        </motion.span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div variants={headingVariants}>
            <h2 className="section-title">About Our Environmental Mission</h2>
          </motion.div>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            Mission Zero Waste & Transport System Bharat is a national environmental initiative
            focused on reducing plastic pollution and promoting sustainable environmental practices
            through public awareness campaigns and eco-friendly product distribution.
          </motion.p>
        </motion.div>

        {/* Impact Counters */}
        <div ref={counterRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-2xl mb-2 block">{c.emoji}</span>
              <p
                className="font-display text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "hsl(var(--primary))" }}
              >
                <AnimatedCounter value={c.value} suffix={c.suffix} inView={counterInView} />
              </p>
              <p className="text-muted-foreground font-body text-sm">{c.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-8 text-center group cursor-default transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-12px_hsla(var(--primary),0.2),0_4px_16px_-4px_hsla(var(--forest),0.1)]"
              whileHover="hover"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl eco-gradient-vivid flex items-center justify-center mx-auto mb-6 transition-shadow duration-500 group-hover:shadow-[0_0_24px_-2px_hsla(122,60%,55%,0.5)]"
              >
                <motion.div
                  variants={iconHoverVariants[goal.hoverAnim]}
                  initial="rest"
                  className="flex items-center justify-center"
                >
                  <goal.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
              </motion.div>
              <h3 className="font-display text-xl font-semibold text-forest mb-3">{goal.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{goal.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
