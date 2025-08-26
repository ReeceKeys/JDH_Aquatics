import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const bubbleCount = 50;
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

export default function Socials() {
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

          // Repel from mouse/finger
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

          // Slow drift/friction
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

  const socials = [
    { href: "https://www.instagram.com/jdh_aquatics/", Icon: FaInstagram, glow: "from-purple-400 via-pink-500 to-yellow-400" },
    { href: "https://www.tiktok.com/@jdhaquatics", Icon: FaTiktok, glow: "from-black via-gray-400 to-white" },
    { href: "https://www.youtube.com/channel/UCEX8SE5H_3YHcFu88qsjUtg", Icon: FaYoutube, glow: "from-red-500 via-red-400 to-yellow-400" },
  ];

  return (
    <div
      className="relative overflow-hidden min-h-screen bg-black text-yellow-50"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Bubbles (cover full viewport) */}
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
            boxShadow: "inset -2px -2px 6px rgba(255,255,255,0.2), inset 2px 2px 4px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative flex flex-col items-center justify-start pt-16 px-6 min-h-screen z-20">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center mb-16 w-full max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 mb-4">Join the Community!</h1>
            <p className="text-yellow-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Stay updated with our latest content and join the community!
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Social Icons */}
        <div className="flex space-x-16 items-center">
          {socials.map(({ href, Icon, glow }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.15}}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative flex items-center justify-center w-24 h-24 rounded-xl bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/20"
            >
              <Icon className="text-white text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)]" />
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${glow} opacity-30 blur-xl animate-pulse pointer-events-none`}
              />
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
}
