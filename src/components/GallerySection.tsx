import { motion } from "framer-motion";
import scenePlanting from "@/assets/scene-planting.jpg";
import sceneGreen from "@/assets/scene-green.jpg";
import glassBottle from "@/assets/glass-bottle.jpg";
import canvasBag from "@/assets/canvas-bag.jpg";
import bamboo from "@/assets/bamboo.jpg";
import rainwater from "@/assets/rainwater.jpg";
import litter from "@/assets/litter.jpg";

const images = [
  { src: scenePlanting, alt: "Tree planting drive", span: "md:col-span-2 md:row-span-2" },
  { src: glassBottle, alt: "Glass bottle distribution", span: "" },
  { src: sceneGreen, alt: "Environmental awareness campaign", span: "" },
  { src: canvasBag, alt: "Carry bag campaign", span: "" },
  { src: bamboo, alt: "Bamboo plantation drive", span: "md:col-span-2" },
  { src: rainwater, alt: "Rainwater harvesting project", span: "" },
  { src: litter, alt: "Plastic waste cleanup", span: "" },
];

const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" as const } },
};

const GallerySection = () => (
  <section className="section-padding bg-secondary">
    <div className="max-w-6xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-14">
        <motion.h2 className="section-title" variants={headingVariants}>
          Campaign Gallery
        </motion.h2>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3 md:gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <p className="text-forest-foreground font-body text-sm font-medium p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {img.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
