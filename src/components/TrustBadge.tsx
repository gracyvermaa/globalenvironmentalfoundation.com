import { motion } from "framer-motion";
import { Shield, Leaf, CheckCircle } from "lucide-react";

const TrustBadge = () => (
  <motion.div
    className="relative overflow-hidden rounded-2xl border-2 max-w-md mx-auto lg:mx-0"
    style={{
      background: "hsl(120 40% 95%)",
      borderColor: "hsl(122 39% 49% / 0.4)",
      boxShadow: "0 8px 40px -8px hsl(122 39% 49% / 0.15), 0 0 0 1px hsl(122 39% 49% / 0.05)",
    }}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    whileHover={{ y: -4, boxShadow: "0 16px 50px -8px hsl(122 39% 49% / 0.25), 0 0 20px -4px hsl(122 60% 55% / 0.2)" }}
  >
    {/* Verified ribbon */}
    <div
      className="absolute top-0 right-0 z-10 overflow-hidden w-28 h-28 pointer-events-none"
    >
      <div
        className="absolute top-[18px] right-[-34px] w-[170px] text-center rotate-45 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground flex items-center justify-center gap-1"
        style={{ background: "hsl(122 39% 49%)" }}
      >
        <CheckCircle className="w-3 h-3" />
        Verified
      </div>
    </div>

    {/* Content */}
    <div className="p-6 pt-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(122 39% 49% / 0.15)" }}
        >
          <Shield className="w-6 h-6" style={{ color: "hsl(130 70% 12%)" }} />
        </div>
        <div>
          <h4 className="font-display text-base font-bold" style={{ color: "hsl(130 70% 12%)" }}>
            Official Trust Registration
          </h4>
          <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(122 39% 49%)" }}>
            <Leaf className="w-3 h-3" />
            <span className="font-semibold">Environmental Mission</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm">
        {[
          ["Organization", "Global Environmental Foundation"],
          ["Founded", "2018"],
          ["Registration Type", "Article 64 Trust"],
          ["Certificate Number", "IN-DL14734202351484Q"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between items-baseline gap-4">
            <span className="font-medium whitespace-nowrap" style={{ color: "hsl(150 10% 45%)" }}>{label}</span>
            <span className="font-semibold text-right" style={{ color: "hsl(130 70% 12%)" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Verified footer */}
      <div
        className="mt-5 pt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider"
        style={{ borderTop: "1px solid hsl(122 39% 49% / 0.2)", color: "hsl(122 39% 49%)" }}
      >
        <CheckCircle className="w-4 h-4" />
        Verified Organization
      </div>
    </div>
  </motion.div>
);

export default TrustBadge;
