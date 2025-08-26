import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const bubbleCount = 50;

function Home() {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [bubbles, setBubbles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe detection state
  const startRef = useRef(null);
  const lastRef = useRef(null);

  const features = [
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
  ];

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

  const handleMouseMove = (e) =>
    setMousePos({ x: e.clientX, y: e.clientY });
  const handleTouchMove = (e) =>
    e.touches.length > 0 &&
    setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });

  // --- Swipe handlers (works without Framer drag) ---
  const onTouchStart = (e) => {
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY };
    lastRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchMove = (e) => {
    if (!startRef.current) return;
    const t = e.touches[0];
    lastRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = () => {
    if (!startRef.current || !lastRef.current) {
      startRef.current = null;
      lastRef.current = null;
      return;
    }

    const dx = lastRef.current.x - startRef.current.x;
    const dy = lastRef.current.y - startRef.current.y;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && currentIndex < features.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (dx > 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    }

    startRef.current = null;
    lastRef.current = null;
  };

  // Mouse-based swipe (desktop)
  const mouseDownRef = useRef(false);
  const onMouseDown = (e) => {
    mouseDownRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e) => {
    if (!mouseDownRef.current || !startRef.current) return;
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    if (!mouseDownRef.current) return;
    mouseDownRef.current = false;
    onTouchEnd();
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" && currentIndex > 0) setCurrentIndex((i) => i - 1);
    if (e.key === "ArrowRight" && currentIndex < features.length - 1)
      setCurrentIndex((i) => i + 1);
  };

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
        <motion.div
          className="space-y-12 w-full max-w-6xl mx-auto flex flex-col justify-between h-full"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
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

          {/* Mobile: Single fade-only card */}
          <div className="block md:hidden mt-12 w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={`w-80 max-w-full p-6 bg-black/80 rounded-xl shadow-xl ring-2 ${features[currentIndex].ring} flex flex-col justify-between min-h-[220px]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onKeyDown={onKeyDown}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label={`Feature ${currentIndex + 1} of ${features.length}`}
              >
                <h3
                  className={`text-2xl font-bold ${features[currentIndex].color} mb-3`}
                >
                  {features[currentIndex].title}
                </h3>
                <p>{features[currentIndex].text}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentIndex ? "bg-yellow-400" : "bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 w-full mt-12">
            {features.map((card, i) => (
              <div
                key={i}
                className={`p-6 bg-black/80 rounded-xl shadow-xl ring-2 ${card.ring} flex flex-col justify-between min-h-[220px]`}
              >
                <h3 className={`text-2xl font-bold ${card.color} mb-3`}>
                  {card.title}
                </h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
