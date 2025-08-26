import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const bubbleCount = 50;

function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2 });
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [bubbles, setBubbles] = useState([]);

  // Initialize bubbles
  useEffect(() => {
    const initialBubbles = Array.from({ length: bubbleCount }).map(() => {
      const depth = Math.random();
      return {
        size: 30 + depth * 50,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 0.3 * (1 + depth),
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

          const baseDrift = 0.005 * (1 + depth);
          dy -= baseDrift;
          dx += (Math.random() - 0.5) * 0.05;

          const distX = x + size / 2 - mousePos.x;
          const distY = y + size / 2 - mousePos.y;
          const dist = Math.sqrt(distX * distX + distY * distY);
          let repelStrength = 0;
          if (dist < 120) repelStrength = (1 - dist / 120) * 1.5 * (0.5 + depth);

          dx += (distX / dist) * repelStrength || 0;
          dy += (distY / dist) * repelStrength || 0;

          x += dx;
          y += dy;

          dx *= 0.96;
          dy *= 0.96;
          rot += rotSpeed;

          scale += 0.002 * scaleDir;
          if (scale > 1.1) scaleDir = -1;
          if (scale < 0.9) scaleDir = 1;

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
      className="relative overflow-hidden bg-black text-yellow-50 min-h-screen flex flex-col"
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
            zIndex: 10,
          }}
        />
      ))}

      {/* Hero + Features */}
      <section
        ref={heroRef}
        className="flex flex-col justify-between flex-grow px-6 pt-24 text-center relative z-20"
      >
        <AnimatePresence>
          {heroInView && (
            <motion.div
              className="space-y-12 w-full max-w-6xl mx-auto flex flex-col justify-between h-full"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sectionVariants}
            >
              {/* Hero */}
              <div className="space-y-6 mt-4">
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300">
                  JDH Aquatics
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto text-yellow-200">
                  Create your perfect tank.
                </p>
                <motion.a
                  href="/about"
                  className="inline-block px-8 py-4 mt-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold shadow-lg hover:scale-105 hover:rotate-1 transition-transform duration-500"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  Learn More
                </motion.a>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-8 w-full mt-12">
                {[
                  {
                    title: "Aquatic Guides",
                    color: "text-orange-400",
                    ring: "ring-orange-400",
                    text: "Step-by-step care guides for all types of freshwater and saltwater fish.",
                  },
                  {
                    title: "Tank Reviews",
                    color: "text-yellow-400",
                    ring: "ring-yellow-400",
                    text: "In-depth reviews of the latest fish tanks and aquarium equipment.",
                  },
                  {
                    title: "Community",
                    color: "text-orange-500",
                    ring: "ring-orange-500",
                    text: "Join our forums and discussions for tips, tricks, and sharing your tank setups.",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className={`p-6 bg-black/80 rounded-xl shadow-xl transition-all duration-500 ring-2 ${card.ring} hover:ring-yellow-400`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 1, delay: 0.3 + i * 0.2 },
                    }}
                  >
                    <h3 className={`text-2xl font-bold ${card.color} mb-3`}>
                      {card.title}
                    </h3>
                    <p>{card.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default Home;
