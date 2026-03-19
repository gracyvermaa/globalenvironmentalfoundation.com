import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1 } },
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Build Gmail compose URL to open web Gmail compose with prefilled fields
  const to = "globalenvironmentalfou@gmail.com,gogreenfou@gmail.com"; // recipients (primary + additional)
    const subject = `Website message from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open Gmail compose in a new tab. If the user isn't logged into Gmail, they will be prompted to sign in.
    window.open(gmailUrl, "_blank");

    // Optionally clear the form locally and show a toast indicating the compose window opened
    toast.success("Opening Gmail compose...\nPlease send the message from your Gmail window.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-secondary relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <motion.h2 className="section-title" variants={headingVariants}>
            Get In Touch
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have questions about our campaigns or want to partner with us? Reach out today.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-xl font-semibold text-forest mb-6">Contact Us</h3>
            <div className="space-y-5">
              <a href="mailto:gogreenfou@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">gogreenfou@gmail.com</span>
              </a>
              <a href="mailto:globalenvironmentalfou@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">globalenvironmentalfou@gmail.com</span>
              </a>
              <a href="tel:+919769991449" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">+91 97699 91449</span>
              </a>
              <a href="tel:+919819283849" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">+91 98192 83849</span>
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border/60 font-body focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/40 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border/60 font-body focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/40 transition-all duration-300"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              className="w-full px-5 py-3.5 rounded-xl bg-card border border-border/60 font-body focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/40 transition-all duration-300 resize-none"
            />
            <motion.button
              type="submit"
              className="btn-eco w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
