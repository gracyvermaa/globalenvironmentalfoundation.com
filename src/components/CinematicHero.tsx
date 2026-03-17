import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sceneDry from "@/assets/scene-dry.jpg";
import sceneRain from "@/assets/scene-rain.jpg";
import scenePlanting from "@/assets/scene-planting.jpg";
import sceneGrowing from "@/assets/scene-growing.jpg";
import sceneGreen from "@/assets/scene-green.jpg";

const scenes = [
  { src: sceneDry, duration: 3500 },
  { src: sceneRain, duration: 3500 },
  { src: scenePlanting, duration: 4000 },
  { src: sceneGrowing, duration: 4000 },
  { src: sceneGreen, duration: 0 },
];

/* ---------- RAIN ---------- */
const RainOverlay = () => {
  const drops = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 0.5 + Math.random() * 0.5,
      width: Math.random() > 0.7 ? 2 : 1,
      height: 20 + Math.random() * 25,
      opacity: 0.15 + Math.random() * 0.45,
    })), []
  );

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Rain streaks */}
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute rain-drop"
          style={{
            left: `${d.left}%`,
            width: d.width,
            height: d.height,
            background: `linear-gradient(180deg, transparent, hsla(200, 50%, 75%, ${d.opacity * 0.6}), hsla(200, 60%, 80%, ${d.opacity}))`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            borderRadius: 2,
          }}
        />
      ))}
      {/* Rain mist at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(0deg, hsla(200, 20%, 60%, 0.15) 0%, transparent 100%)',
        }}
      />
    </motion.div>
  );
};

/* ---------- SUNRAYS ---------- */
const SunraysOverlay = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2.5 }}
  >
    {Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="absolute sunray"
        style={{
          top: '-10%',
          left: `${10 + i * 12}%`,
          width: `${3 + Math.random() * 4}px`,
          height: '120%',
          background: `linear-gradient(180deg, hsla(45, 100%, 75%, ${0.15 + Math.random() * 0.2}) 0%, hsla(45, 80%, 60%, 0.05) 50%, transparent 80%)`,
          transform: `rotate(${-15 + i * 4}deg)`,
          transformOrigin: 'top center',
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
          filter: 'blur(1px)',
        }}
      />
    ))}
    {/* Golden wash */}
    <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse 60% 40% at 50% 20%, hsla(45, 90%, 65%, 0.12) 0%, transparent 70%)',
    }} />
  </motion.div>
);

/* ---------- MIST ---------- */
const MistOverlay = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 3 }}
  >
    {Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className="absolute float-mist"
        style={{
          bottom: `${i * 8}%`,
          left: `${-10 + i * 15}%`,
          width: '60%',
          height: '80px',
          background: `linear-gradient(90deg, transparent, hsla(120, 20%, 95%, ${0.1 + i * 0.04}), transparent)`,
          filter: `blur(${20 + i * 8}px)`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${8 + i * 2}s`,
        }}
      />
    ))}
  </motion.div>
);

/* ---------- PARTICLES ---------- */
const FloatingParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 10 + Math.random() * 80,
      delay: Math.random() * 6,
      size: 1.5 + Math.random() * 4,
      duration: 5 + Math.random() * 6,
      glow: Math.random() > 0.6,
    })), []
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full float-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.glow
              ? 'hsla(45, 90%, 75%, 0.7)'
              : 'hsla(122, 60%, 70%, 0.5)',
            boxShadow: p.glow
              ? '0 0 6px 2px hsla(45, 90%, 75%, 0.3)'
              : '0 0 4px 1px hsla(122, 60%, 70%, 0.2)',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </motion.div>
  );
};

/* ---------- LEAVES ---------- */
const FallingLeaves = () => {
  const leaves = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: i * 2.5,
      duration: 10 + Math.random() * 5,
      size: 6 + Math.random() * 6,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((l) => (
        <div
          key={l.id}
          className="absolute leaf-drift"
          style={{
            left: `${l.left}%`,
            top: '-5%',
            width: l.size,
            height: l.size,
            borderRadius: '0 50% 50% 50%',
            background: 'hsla(110, 50%, 45%, 0.6)',
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ---------- CINEMATIC VIGNETTE ---------- */
const CinematicOverlay = ({ scene }: { scene: number }) => {
  const isDark = scene <= 1;
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      {/* Top-bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, hsla(0,0%,0%,0.45) 0%, transparent 35%, transparent 65%, hsla(0,0%,0%,0.55) 100%)'
            : 'linear-gradient(180deg, hsla(0,0%,0%,0.25) 0%, transparent 30%, transparent 70%, hsla(0,0%,0%,0.4) 100%)',
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, hsla(0,0%,0%,0.35) 100%)',
        }}
      />
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
};

/* ========== MAIN HERO ========== */
const CinematicHero = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showBranding, setShowBranding] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 10;
    const y = (clientY / window.innerHeight - 0.5) * 10;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const advanceScene = (index: number) => {
      if (index < scenes.length - 1) {
        const t = setTimeout(() => {
          setCurrentScene(index + 1);
          advanceScene(index + 1);
        }, scenes[index].duration);
        timeouts.push(t);
      } else {
        const t = setTimeout(() => setShowBranding(true), 1200);
        timeouts.push(t);
      }
    };
    advanceScene(0);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const showRain = currentScene === 1;
  const showSunrays = currentScene >= 3;
  const showMist = currentScene >= 3;
  const showParticles = currentScene >= 4;
  const showLeaves = currentScene >= 4;

  return (
    <section className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouse}>
      {/* Scene images with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentScene}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <motion.img
            src={scenes[currentScene].src}
            alt="Environmental cinematic scene"
            className="w-full h-full object-cover gentle-zoom"
            style={{
              transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px) scale(1.08)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlays */}
      <CinematicOverlay scene={currentScene} />

      {/* Atmospheric effects */}
      <AnimatePresence>{showRain && <RainOverlay />}</AnimatePresence>
      {showSunrays && <SunraysOverlay />}
      {showMist && <MistOverlay />}
      {showParticles && <FloatingParticles />}
      {showLeaves && <FallingLeaves />}

      {/* Branding Reveal */}
      <AnimatePresence>
        {showBranding && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Multi-layered glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, hsla(122, 60%, 55%, 0.2) 0%, hsla(122, 60%, 55%, 0.05) 50%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 2 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, hsla(45, 90%, 70%, 0.15) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.8 }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
            />

            {/* Decorative line */}
            <motion.div
              className="relative mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            >
              <div className="w-20 h-[1px] mx-auto" style={{ background: 'hsla(122, 60%, 70%, 0.5)' }} />
            </motion.div>

            <motion.p
              className="font-body text-sm md:text-base tracking-[0.35em] uppercase mb-5 relative"
              style={{ color: 'hsla(0, 0%, 100%, 0.75)', textShadow: '0 1px 15px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.6, duration: 1.2 }}
            >
              Go Green & Global Environmental Foundation
            </motion.p>

            <motion.h1
              className="font-display text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] relative max-w-5xl"
              style={{ color: 'white', textShadow: '0 4px 50px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Mission Zero Waste &
              <br />
              <span className="text-gradient-eco" style={{ WebkitTextFillColor: 'unset', color: 'unset', background: 'linear-gradient(135deg, hsla(122, 60%, 70%, 1), hsla(45, 90%, 80%, 1))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextStroke: '0' }}>
                Transport System Bharat
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-2xl font-body italic relative"
              style={{ color: 'hsla(120, 40%, 88%, 1)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.2 }}
            >
              Break the Plastic, Not the Planet
            </motion.p>

            {/* Decorative line below tagline */}
            <motion.div
              className="mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
            >
              <div className="w-32 h-[1px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, hsla(122, 60%, 70%, 0.5), transparent)' }} />
            </motion.div>

            <motion.div
              className="mt-10 relative flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <a href="#mission" className="btn-eco">
                Explore Our Mission
              </a>
              <a href="#contact" className="btn-eco-outline">
                Partner With Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      {showBranding && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8], y: [10, 0, 0] }}
          transition={{ delay: 4, duration: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-7 h-11 border-2 rounded-full flex items-start justify-center p-1.5" style={{ borderColor: 'hsla(0,0%,100%,0.35)' }}>
              <motion.div
                className="w-1.5 h-2.5 rounded-full"
                style={{ background: 'hsla(0,0%,100%,0.6)' }}
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CinematicHero;
