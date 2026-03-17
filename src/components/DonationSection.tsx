import { motion } from "framer-motion";
import { Banknote, Building2, Hash, MapPin } from "lucide-react";

const bankDetails = [
  { icon: Banknote, label: "Account Name", value: "Go Green" },
  { icon: Hash, label: "Account Number", value: "60312304306" },
  { icon: Building2, label: "IFSC Code", value: "MAHB0001112" },
  { icon: Building2, label: "Bank", value: "Bank of Maharashtra" },
  { icon: MapPin, label: "Branch", value: "Lokhandwala Complex, Andheri West, Mumbai 400053" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1 } },
};

const DonationSection = () => (
  <section className="section-padding bg-background relative overflow-hidden">
    {/* Decorative glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsla(122, 40%, 70%, 0.05) 0%, transparent 60%)', filter: 'blur(60px)' }}
    />
    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <motion.h2 className="section-title" variants={headingVariants}>
          Support Environmental Campaigns
        </motion.h2>
      </motion.div>
      <motion.p
        className="section-subtitle mx-auto mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9 }}
      >
        Your contribution directly funds plastic reduction campaigns and environmental restoration projects across India.
      </motion.p>

      <motion.div
        className="glass-card-hover p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h3 className="font-display text-xl font-semibold text-forest mb-8">Bank Transfer Details</h3>
        <div className="space-y-5">
          {bankDetails.map((d, i) => (
            <motion.div
              key={d.label}
              className="flex items-start gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
            >
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/50">
                <d.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-0.5">{d.label}</p>
                <p className="text-foreground font-body font-semibold">{d.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          className="btn-eco w-full mt-10"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Donate Now
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default DonationSection;
