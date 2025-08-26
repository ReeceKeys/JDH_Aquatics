import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const bubbleCount = 50;

export default function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.3 });

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const initialBubbles = Array.from({ length: bubbleCount }).map(() => {
      const depth = Math.random();
      return {
        size: 30 + depth * 50,
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

  useEffect(() => {
    let animationFrame;

    const animateBubbles = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          let { x, y, dx, dy, size, rot, rotSpeed, scale, scaleDir, depth } = b;

          // Repel from mouse/finger
          const distX = x + size / 2 - mousePos.x;
          const distY = y + size / 2 - mousePos.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          let repelStrength = 0;
          if (dist < 120) repelStrength = (1 - dist / 120) * 1.5 * (0.5 + depth);

          dx += (distX / dist) * repelStrength || 0;
          dy += (distY / dist) * repelStrength || 0;

          // Move bubble
          x += dx;
          y += dy;

          // Slow drift
          dx *= 0.96;
          dy *= 0.96;

          // Rotation wobble
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
    e.touches.length > 0 &&
    setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });

  return (
    <div
      className="relative overflow-hidden min-h-screen bg-black text-yellow-50"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Moving bubbles */}
      {bubbles.map((bubble, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center justify-center h-screen px-6 text-center relative z-20"
      >
        <AnimatePresence>
          {heroInView && (
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sectionVariants}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300">
                JDH Aquatics
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto text-yellow-200">
                Explore aquatic life, fish care tips, and the best tanks for your home.
              </p>
              <motion.a
                href="/about"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 hover:rotate-1 transition-transform duration-500"
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="px-6 py-32 grid md:grid-cols-3 gap-12 relative z-20"
      >
        <AnimatePresence>
          {featuresInView && (
            <>
              <motion.div
                className="p-6 bg-black/80 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-400"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-orange-400 mb-3">Aquatic Guides</h3>
                <p>Step-by-step care guides for all types of freshwater and saltwater fish.</p>
              </motion.div>

              <motion.div
                className="p-6 bg-black/80 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-yellow-400"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
                whileHover={{ scale: 1.05 }}

              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">Tank Reviews</h3>
                <p>In-depth reviews of the latest fish tanks and aquarium equipment.</p>
              </motion.div>

              <motion.div
                className="p-6 bg-black/80 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.4 } }}
                whileHover={{ scale: 1.05 }}

              >
                <h3 className="text-2xl font-bold text-orange-500 mb-3">Community</h3>
                <p>Join our forums and discussions for tips, tricks, and sharing your tank setups.</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-16 bg-black/90 relative z-20">
        <motion.a
          href="/shop"
          className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 font-bold text-black shadow-xl hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.08 }}
        >
          Visit the Shop
        </motion.a>
      </section>
    </div>
  );
}
