import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import rainwater from "@/assets/rainwater.jpg";
import bamboo from "@/assets/bamboo.jpg";
import { Droplets, TreePine } from "lucide-react";

const projects = [
  {
    icon: Droplets,
    image: rainwater,
    title: "Rain Water Harvesting",
    desc: "Install rainwater harvesting systems to promote water conservation across urban and rural India.",
    locations: ["Societies", "Hotels & Resorts", "Schools & Colleges", "Hospitals"],
  },
  {
    icon: TreePine,
    image: bamboo,
    title: "Bamboo Plantation",
    desc: "Plant bamboo along roads and dividers to improve air quality, absorb pollution, and enhance AQI levels.",
    locations: ["Road Dividers", "Highway Corridors", "Urban Areas", "Industrial Zones"],
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" as const } },
};

const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          y: bgY,
          background: 'radial-gradient(circle, hsla(200, 40%, 70%, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <motion.h2 className="section-title" variants={headingVariants}>
            Upcoming Environmental Projects
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card-hover overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl eco-gradient-vivid flex items-center justify-center shadow-lg">
                    <p.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-forest-foreground drop-shadow-lg">{p.title}</h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-muted-foreground mb-5 font-body leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.locations.map((loc) => (
                    <span key={loc} className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold font-body border border-border/50">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
