import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const LIGHT_RADIUS = 230; // px — cursor se kitni door tak icons roshan honge

export default function TechScreen({ items }) {
  const screenRef = useRef(null);
  const iconRefs = useRef([]);
  const glowRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const tickingRef = useRef(false);

  useLayoutEffect(() => {
    const screen = screenRef.current;

    const ctx = gsap.context(() => {
      const glowX = gsap.quickTo(glowRef.current, "x", {
        duration: 0.35,
        ease: "power3",
      });
      const glowY = gsap.quickTo(glowRef.current, "y", {
        duration: 0.35,
        ease: "power3",
      });

      function updateLighting() {
        tickingRef.current = false;
        const { x, y, active } = mouseRef.current;
        const screenRect = screen.getBoundingClientRect();

        iconRefs.current.forEach((icon) => {
          if (!icon) return;
          const r = icon.getBoundingClientRect();
          const iconX = r.left + r.width / 2 - screenRect.left;
          const iconY = r.top + r.height / 2 - screenRect.top;

          const dist = active ? Math.hypot(iconX - x, iconY - y) : Infinity;
          const t = Math.max(0, 1 - dist / LIGHT_RADIUS); // 0 = dim, 1 = cursor ke bilkul neeche

          const box = icon.querySelector(".tech-box");
          const label = icon.querySelector(".tech-label");

          gsap.to(box, {
            opacity: 0.2 + t * 0.8,
            filter: `grayscale(${1 - t}) brightness(${1 + t * 0.6})`,
            scale: 1 + t * 0.25,
            duration: 0.25,
            overwrite: "auto",
          });
          gsap.to(label, {
            opacity: t > 0.5 ? (t - 0.5) * 2 : 0,
            duration: 0.25,
            overwrite: "auto",
          });
        });
      }

      function onMove(e) {
        const rect = screen.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
        glowX(mouseRef.current.x);
        glowY(mouseRef.current.y);
        if (!tickingRef.current) {
          tickingRef.current = true;
          requestAnimationFrame(updateLighting);
        }
      }

      function onLeave() {
        mouseRef.current.active = false;
        requestAnimationFrame(updateLighting);
      }

      screen.addEventListener("mousemove", onMove);
      screen.addEventListener("mouseleave", onLeave);
      updateLighting(); // initial dim state

      return () => {
        screen.removeEventListener("mousemove", onMove);
        screen.removeEventListener("mouseleave", onLeave);
      };
    }, screenRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-3 bg-line rounded-b-md" />
      <div className="w-36 h-2 bg-line/60 rounded-full mb-3" />

      <div className="border-[6px] border-line rounded-2xl p-3 bg-[#0a0a0b] w-full max-w-2xl">
        <div
          ref={screenRef}
          className="relative w-full h-[340px] md:h-[420px] rounded-lg overflow-hidden bg-[#101012] p-6"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20 z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.06) 3px)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ boxShadow: "inset 0 0 70px rgba(0,0,0,0.75)" }}
          />

          {/* cursor-following spotlight halo */}
          <div
            ref={glowRef}
            className="absolute pointer-events-none rounded-full z-0"
            style={{
              width: LIGHT_RADIUS * 2,
              height: LIGHT_RADIUS * 2,
              left: -LIGHT_RADIUS,
              top: -LIGHT_RADIUS,
              background:
                "radial-gradient(circle, rgba(255,77,46,0.35) 0%, rgba(255,77,46,0.12) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* FIXED GRID — icons ab apni jagah rehte hain, koi random
              movement nahi, bas cursor ke pass aane par reveal hote hain */}
          <div className="relative z-20 grid grid-cols-5 md:grid-cols-6 gap-6 place-items-center h-full content-center">
            {items.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => (iconRefs.current[i] = el)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="tech-box w-11 h-11 rounded-xl bg-[#1b1b1e] border border-line flex items-center justify-center"
                  style={{ opacity: 0.2, filter: "grayscale(1)" }}
                >
                  <item.icon size={20} className="text-paper" />
                </div>
                <span
                  className="tech-label text-[10px] text-muted whitespace-nowrap"
                  style={{ opacity: 0 }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted mt-4">
        Cursor ko screen pe le jao — tech icons roshan honge
      </p>
    </div>
  );
}
