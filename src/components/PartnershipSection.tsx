import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Award, Share2, Leaf } from "lucide-react";
import sceneGreen from "@/assets/scene-green.jpg";

const benefits = [
  { icon: Eye, title: "Brand Visibility", desc: "Your brand featured across eco campaigns reaching millions of citizens" },
  { icon: Award, title: "Positive Reputation", desc: "Associate your brand with environmental leadership and CSR impact" },
  { icon: Share2, title: "Social Media Promotion", desc: "Amplified reach through our social media and campaign channels" },
  { icon: Leaf, title: "Sustainability Branding", desc: "Position your company as a true sustainability champion" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" as const } },
};

const PartnershipSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={sceneGreen} alt="" className="w-full h-full object-cover scale-110" />
      </motion.div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsla(130, 70%, 12%, 0.92) 0%, hsla(122, 39%, 30%, 0.88) 100%)',
      }} />
      {/* Decorative bokeh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1,2,3].map(i => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 50,
              height: 200 + i * 50,
              top: `${10 + i * 20}%`,
              left: `${10 + i * 25}%`,
              background: `radial-gradient(circle, hsla(122, 60%, 55%, ${0.04 + i * 0.02}) 0%, transparent 70%)`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
            style={{ color: 'white', textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}
            variants={headingVariants}
          >
            Partner With the Environmental Mission
          </motion.h2>
        </motion.div>
        <motion.p
          className="font-body text-lg max-w-2xl mx-auto mb-16"
          style={{ color: 'hsla(0,0%,100%,0.75)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Companies can support environmental campaigns while promoting their brand
          and making a lasting positive impact on the planet.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="backdrop-blur-md border rounded-2xl p-7 text-center group transition-all duration-500 hover:-translate-y-1"
              style={{
                background: 'hsla(0,0%,100%,0.06)',
                borderColor: 'hsla(0,0%,100%,0.12)',
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{
                boxShadow: '0 8px 30px -8px hsla(122, 60%, 55%, 0.3)',
                borderColor: 'hsla(122, 60%, 55%, 0.3)',
              }}
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'hsla(122, 60%, 55%, 0.15)' }}>
                <b.icon className="w-6 h-6" style={{ color: 'hsla(122, 60%, 75%, 1)' }} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'white' }}>{b.title}</h3>
              <p className="text-sm font-body" style={{ color: 'hsla(0,0%,100%,0.6)' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <a href="#contact" className="btn-eco-outline">
            Become a Sponsor
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
