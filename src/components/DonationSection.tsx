import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const DonationSection = () => {
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(122, 40%, 70%, 0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Heading */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Support Environmental Campaigns 🌱
        </motion.h2>

        {/* Subtext */}
        <motion.p className="section-subtitle mx-auto mb-12">
          Your contribution helps reduce plastic waste, restore ecosystems, and build a greener India.
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="glass-card-hover p-6">
            <h4 className="font-semibold text-lg">Fill Form</h4>
            <p className="text-sm text-muted-foreground">
              Submit your details in 1 minute
            </p>
          </div>

          <div className="glass-card-hover p-6">
            <h4 className="font-semibold text-lg">We Contact You</h4>
            <p className="text-sm text-muted-foreground">
              Private & secure communication
            </p>
          </div>

          <div className="glass-card-hover p-6">
            <h4 className="font-semibold text-lg">Complete Donation</h4>
            <p className="text-sm text-muted-foreground">
              Simple & transparent process
            </p>
          </div>

        </div>

        {/* CTA BUTTON */}
        <motion.a
          href="https://forms.gle/vQxNbc4Q5LAypD6S9"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-eco inline-flex items-center gap-2 px-8 py-4 text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Donate via Form <ArrowRight size={18} />
        </motion.a>

        {/* TEXT BELOW BUTTON */}
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowDetails(true)}
            className="text-sm text-muted-foreground underline"
          >
            Prefer direct transfer? View Bank Details
          </button>
        </div>

        {/* BANK SECTION */}
        {showDetails && (
          <motion.div
            className="max-w-3xl mx-auto mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="bg-gradient-to-br from-forest/10 to-emerald-100/10 border border-border/50 rounded-2xl p-8 backdrop-blur-xl shadow-xl">

              <h3 className="text-center text-xl font-semibold mb-10">
                Direct Bank Transfer
              </h3>

              {/* Account Name */}
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground">Account Name</p>
                <p className="text-lg font-semibold">Go Green</p>
              </div>

              {/* Account Number */}
              <div className="bg-white/5 border border-border rounded-xl p-6 mb-10 text-center">
                <p className="text-xs text-muted-foreground uppercase mb-2">
                  Account Number
                </p>
                <p className="text-2xl font-bold tracking-widest">
                  60312304306
                </p>

                <button
                  onClick={() => copyToClipboard("60312304306")}
                  className="text-xs text-primary underline mt-2"
                >
                  Copy
                </button>
              </div>

              {/* DETAILS */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">

                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                  <div className="flex gap-2 justify-center md:justify-start">
                    <p className="font-semibold">MAHB0001112</p>
                    <button
                      onClick={() => copyToClipboard("MAHB0001112")}
                      className="text-xs text-primary underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground">Bank</p>
                  <p className="font-semibold">Bank of Maharashtra</p>
                </div>

                <div className="md:col-span-2 text-center">
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-semibold">
                    Lokhandwala Complex, Andheri West, Mumbai
                  </p>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col md:flex-row gap-4">

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919819283849"
                  target="_blank"
                  className="flex-1 btn-eco text-center py-3"
                >
                  Confirm via WhatsApp
                </a>

                {/* Email (BOTH EMAILS) */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const to = "gogreenfou@gmail.com,globalenvironmentalfou@gmail.com";
                    const subject = "Donation Confirmation";
                    const body = `Hi, I have completed a donation.`;
                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      to
                    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(gmailUrl, "_blank");
                  }}
                  className="flex-1 border border-border rounded-lg py-3 text-center"
                >
                  Send Email Receipt
                </a>

              </div>

              {/* NOTE */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                🔒 After payment, please share your transaction screenshot for verification.
              </p>

            </div>
          </motion.div>
        )}

        {/* TRUST NOTE */}
        <p className="text-xs text-muted-foreground mt-10 max-w-md mx-auto">
          🔐 Your information is kept private and secure. We ensure full transparency in all contributions.
        </p>

      </div>
    </section>
  );
};

export default DonationSection;