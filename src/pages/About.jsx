import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const bubbleCount = 50;

export default function About() {
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.2 });
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
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white min-h-screen flex flex-col">
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

      <section
        ref={aboutRef}
        className="flex flex-col justify-between flex-grow px-6 pt-24 text-center relative z-20"
      >
        <motion.div
          className="space-y-12 w-full max-w-6xl mx-auto flex flex-col justify-between h-full"
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {/* Hero */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 leading-snug md:leading-tight">
              About
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto text-yellow-200">
              Diving deep into aquarium care!
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/@jdhaquatics6096"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-orange-500 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-colors duration-300"
            >
              Visit YouTube Channel
            </a>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-black/80 p-6 rounded-xl shadow-xl ring-2 ring-white hover:ring-orange-500 transition-all duration-300">
              <h3 className="text-orange-500 font-bold text-2xl mb-2">Mission</h3>
              <p className="text-yellow-200">
                To educate, inspire, and empower aquarium hobbyists by sharing engaging content, practical tips, and creative aquarium setups.
              </p>
            </div>
            <div className="bg-black/80 p-6 rounded-xl shadow-xl ring-2 ring-white hover:ring-orange-500 transition-all duration-300">
              <h3 className="text-orange-500 font-bold text-2xl mb-2">Vision</h3>
              <p className="text-yellow-200">
                To build a vibrant, knowledgeable community that celebrates aquatic life, promotes sustainable practices, and encourages creative aquarium designs.
              </p>
            </div>
          </div>

          {/* Why Follow */}
          <div className="mt-12 mb-12 pb-12 text-center">
  <div className="inline-block space-y-4 text-left md:text-center">
    <h2 className="text-2xl md:text-4xl font-bold text-orange-500">
      Why Follow JDH Aquatics?
    </h2>
    <ul className="text-lg md:text-xl space-y-2 list-disc md:list-none">
      {[
        "Learn aquarium care basics",
        "See rare fish and setups",
        "Get tips for sustainable hobby",
        "Discover DIY tank projects",
        "Join a passionate community"
      ].map((item, index) => (
        <li
          key={index}
          className={`
            ${index % 2 === 0 ? "text-yellow-200" : "text-white"} 
            md:block
            md:text-center
            relative
          `}
        >
          {/* Mobile bullet */}
          <span className="md:hidden">{item}</span>

          {/* Desktop dashes */}
          <span className="hidden md:inline">- {item} -</span>
        </li>
      ))}
    </ul>
  </div>
</div>











          
        </motion.div>
      </section>
    </div>
  );
}
