import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const bubbleCount = 50;
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

export default function Guides() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2 });
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [bubbles, setBubbles] = useState([]);

  // Initialize bubbles
  useEffect(() => {
    const initialBubbles = Array.from({ length: bubbleCount }).map(() => {
      const depth = Math.random();
      return {
        size: 20 + depth * 40,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 0.2 * (1 + depth),
        dy: -((Math.random() * 0.3 + 0.1) * (1 + depth)),
        depth,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.1,
        scale: 0.9 + Math.random() * 0.2,
        scaleDir: Math.random() > 0.5 ? 1 : -1,
        opacity: 0.1 + depth * 0.3,
      };
    });
    setBubbles(initialBubbles);
  }, []);

  // Animate bubbles
  useEffect(() => {
    let animationFrame;
    const animateBubbles = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          let { x, y, dx, dy, size, rot, rotSpeed, scale, scaleDir, depth } = b;

          // Repel from mouse
          const distX = x + size / 2 - mousePos.x;
          const distY = y + size / 2 - mousePos.y;
          const dist = Math.sqrt(distX * distX + distY * distY);
          let repelStrength = 0;
          if (dist < 120) repelStrength = (1 - dist / 120) * 1.5 * (0.5 + depth);

          dx += (distX / dist) * repelStrength || 0;
          dy += (distY / dist) * repelStrength || 0;

          // Natural drift
          const baseDrift = 0.005 * (1 + depth);
          dy -= baseDrift;
          dx += (Math.random() - 0.5) * 0.01;

          // Move bubble
          x += dx;
          y += dy;

          dx *= 0.96;
          dy *= 0.96;

          // Rotation
          rot += rotSpeed;

          // Scale pulsation
          scale += 0.002 * scaleDir;
          if (scale > 1.1) scaleDir = -1;
          if (scale < 0.9) scaleDir = 1;

          // Reset if off screen
          if (y + size < 0) {
            y = window.innerHeight + size;
            x = Math.random() * window.innerWidth;
            dy = -((Math.random() * 0.3 + 0.1) * (1 + depth));
          }
          if (x < -size) x = window.innerWidth + size;
          if (x > window.innerWidth + size) x = -size;

          return { ...b, x, y, dx, dy, rot, rotSpeed, scale, scaleDir };
        })
      );
      animationFrame = requestAnimationFrame(animateBubbles);
    };
    animateBubbles();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
  const handleTouchMove = (e) =>
    e.touches.length > 0 && setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });

  // CTA button style
  const CTAClass =
    "inline-block px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-xl transition-transform duration-200 hover:scale-105";

  return (
    <div
      className="relative overflow-hidden min-h-screen bg-black text-yellow-50"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Bubbles */}
      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            pointerEvents: "none",
            transform: `translate(${bubble.x}px, ${bubble.y}px) rotate(${bubble.rot}deg) scale(${bubble.scale})`,
            opacity: bubble.opacity,
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), rgba(255,255,255,0.05), rgba(255,255,255,0))`,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow:
              "inset -2px -2px 6px rgba(255,255,255,0.2), inset 2px 2px 4px rgba(0,0,0,0.1)",
            zIndex: Math.round(bubble.depth * 10),
          }}
        />
      ))}

      {/* Hero */}
      <section ref={heroRef} className="text-center pt-16 px-6 relative z-20">
        <AnimatePresence>
          {heroInView && (
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 mb-4">
                Guides
              </h1>
              <p className="text-yellow-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Explore detailed guides for freshwater and saltwater aquariums.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Guide Cards */}
      <section className="w-4/5 mx-auto flex flex-col gap-10 mt-6 relative z-20">
        {/* Freshwater */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          className="bg-gray-900 p-12 rounded-3xl shadow-xl border border-transparent hover:border-orange-400 transition-colors duration-300"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-3">Freshwater</h2>
            <p className="text-yellow-200 text-lg md:text-xl text-center max-w-3xl mb-6">
              Tips, techniques, and care guides for freshwater aquariums.
            </p>
            <button
              className={CTAClass}
              onClick={() => window.location.assign("/guides/freshwater")}
            >
              Explore Freshwater
            </button>
          </div>
        </motion.div>

        {/* Saltwater */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
          className="bg-gray-900 p-12 rounded-3xl shadow-xl border border-transparent hover:border-orange-400 transition-colors duration-300"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-3">Saltwater</h2>
            <p className="text-yellow-200 text-lg md:text-xl text-center max-w-3xl mb-6">
              Explore saltwater aquarium setups, fish, and coral care.
            </p>
            <button
              className={CTAClass}
              onClick={() => window.location.assign("/guides/saltwater")}
            >
              Explore Saltwater
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
