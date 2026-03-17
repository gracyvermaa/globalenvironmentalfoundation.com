import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const SiteFooter = () => (
  <footer className="relative overflow-hidden py-16 px-6" style={{ background: 'linear-gradient(135deg, hsl(130, 70%, 8%) 0%, hsl(130, 60%, 14%) 100%)' }}>
    {/* Decorative glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsla(122, 60%, 55%, 0.3), transparent)' }} />
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <motion.div
        className="flex items-center justify-center gap-3 mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-10 h-10 rounded-xl eco-gradient-vivid flex items-center justify-center">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-forest-foreground">
          Mission Zero Waste & Transport System Bharat
        </span>
      </motion.div>
      <p className="font-body text-sm mb-2" style={{ color: 'hsla(0,0%,100%,0.5)' }}>
        Powered By: <span style={{ color: 'hsla(0,0%,100%,0.7)' }}>Go Green</span> & <span style={{ color: 'hsla(0,0%,100%,0.7)' }}>Global Environmental Foundation</span>
      </p>
      <p className="font-body italic text-sm mt-5" style={{ color: 'hsla(122, 60%, 65%, 0.8)' }}>
        Break the Plastic, Save the Planet.
      </p>
      <div className="mt-8 pt-6" style={{ borderTop: '1px solid hsla(0,0%,100%,0.06)' }}>
        <p className="text-xs font-body" style={{ color: 'hsla(0,0%,100%,0.3)' }}>
          © {new Date().getFullYear()} Go Green & Global Environmental Foundation. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
