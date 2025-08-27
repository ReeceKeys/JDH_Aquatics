import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTint, FaWater } from "react-icons/fa";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const bubbleCount = 50;

export default function Guides() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2 });

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [bubbles, setBubbles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startRef = useRef(null);
  const lastRef = useRef(null);
  const mouseDownRef = useRef(false);

  const guides = [
    {
      title: "Freshwater",
      description: "Tips, techniques, and care guides for freshwater aquariums.",
      color: "text-yellow-400",
      ring: "ring-white",
      hover: "hover:ring-yellow-400",
      desktophover: "hover:-translate-y-3",
      href: "/guides/freshwater",
      icon: <FaTint className="text-6xl mb-2" />,
    },
    {
      title: "Saltwater",
      description: "Explore saltwater aquarium setups, fish, and coral care.",
      color: "text-orange-400",
      ring: "ring-white",
      hover: "hover:ring-orange-400",
      desktophover: "hover:-translate-y-3",
      href: "/guides/saltwater",
      icon: <FaWater className="text-6xl mb-2" />,
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

  const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
  const handleTouchMove = (e) =>
    e.touches.length > 0 &&
    setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });

  // Swipe handlers
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
    if (!startRef.current || !lastRef.current) return;
    const dx = lastRef.current.x - startRef.current.x;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        // Swipe left → next
        setCurrentIndex((i) => (i + 1) % guides.length);
      } else if (dx > 0) {
        // Swipe right → previous, wrap to end if at start
        setCurrentIndex((i) => (i - 1 + guides.length) % guides.length);
}

    }
    startRef.current = null;
    lastRef.current = null;
  };
  const onMouseDown = (e) => {
    mouseDownRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY };
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMoveSwipe = (e) => {
    if (!mouseDownRef.current || !startRef.current) return;
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    if (!mouseDownRef.current) return;
    mouseDownRef.current = false;
    onTouchEnd();
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

      {/* Hero */}
      <section ref={heroRef} className="flex flex-col justify-between flex-grow px-6 pt-24 text-center relative z-20">
        <motion.div
          className="space-y-8 w-full max-w-6xl mx-auto flex flex-col justify-between h-full"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <div className="space-y-4 mt-2 md:space-y-6 md:mt-4 text-center">
            <h1 className="text-5xl md:text-5xl font-extrabold text-orange-500 leading-snug md:leading-tight">
              Guides
            </h1>
            <p className="text-lg md:text-2xl max-w-xs md:max-w-2xl mx-auto text-yellow-200">
              From setting up to everyday care!
            </p>
          </div>


          {/* Mobile carousel */}
          <div className="block md:hidden mt-12 w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.a
                key={currentIndex}
                href={guides[currentIndex].href}
                className={`w-80 max-w-full p-6 bg-black/80 rounded-xl shadow-xl ring-2 ${guides[currentIndex].ring} ${guides[currentIndex].hover} flex flex-col items-center justify-start gap-2 min-h-[220px] transition-colors duration-200`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMoveSwipe}
                onMouseUp={onMouseUp}
              >
                {guides[currentIndex].icon}
                <h3 className={`text-2xl font-bold ${guides[currentIndex].color} leading-tight`}>
                  {guides[currentIndex].title}
                </h3>
                <p className="text-yellow-200 text-center">{guides[currentIndex].description}</p>
              </motion.a>
            </AnimatePresence>

            <div className="flex justify-center mt-4 space-x-2">
              {guides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors duration-150 ${i === currentIndex ? "bg-yellow-400" : "bg-gray-500"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:flex justify-center gap-8 w-4/5 mx-auto mt-12">
            {guides.map((card, i) => (
              <a
                key={i}
                href={card.href}
                className={`flex-1 p-6 bg-black/80 rounded-xl shadow-xl ring-2 ${card.ring} ${card.hover} ${card.desktophover} flex flex-col items-center justify-between min-h-[220px] transition-colors duration-200`}
              >
                {card.icon}
                <h3 className={`text-2xl font-bold ${card.color} mb-3`}>{card.title}</h3>
                <p className="text-yellow-200 text-center">{card.description}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
