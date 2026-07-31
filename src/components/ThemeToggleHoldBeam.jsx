import { useState, useRef, useCallback, useEffect } from "react";

/**
 * ThemeToggleHoldBeam
 * ---------------------------------------------------------
 * Toggle dark/light mode dengan interaksi "hold-to-charge":
 * user harus menekan & menahan tombol mata, beam intensity
 * naik bertahap, dan begitu mencapai 100% baru theme wipe
 * ke-trigger dari titik pupil.
 *
 * INTEGRASI:
 * - Panggil <ThemeToggleHoldBeam onComplete={(x, y) => ...} />
 *   onComplete dipanggil dengan koordinat klik terakhir,
 *   dipakai sebagai origin untuk <ThemeWipe /> yang sudah ada.
 * - Ganti CHARGE_DURATION sesuai selera (ms).
 * - Style pakai Tailwind, warna pakai CSS var yang sudah ada
 *   di project (--color-terracotta, --color-dark-bg, dll)
 *   silakan sesuaikan class di bawah kalau nama var beda.
 */

const CHARGE_DURATION = 650; // ms, durasi hold sampai penuh

export default function ThemeToggleHoldBeam({ onComplete, isDark }) {
  const [progress, setProgress] = useState(0); // 0 - 1
  const [isHolding, setIsHolding] = useState(false);
  const [isEyeSquinting, setIsEyeSquinting] = useState(false);

  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const btnRef = useRef(null);

  const cancelCharge = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTimeRef.current = null;
    setIsHolding(false);
    setIsEyeSquinting(false);
    setProgress(0);
  }, []);

  const tick = useCallback(
    (timestamp) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pct = Math.min(elapsed / CHARGE_DURATION, 1);
      setProgress(pct);

      // mata mulai menyipit begitu progress lewat setengah,
      // biar terasa "menahan cahaya"
      if (pct > 0.5 && !isEyeSquinting) setIsEyeSquinting(true);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // charge penuh -> trigger wipe dari posisi tombol
        const rect = btnRef.current?.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        onComplete?.(x, y);
        cancelCharge();
      }
    },
    [isEyeSquinting, onComplete, cancelCharge]
  );

  const startCharge = useCallback(
    (e) => {
      e.preventDefault();
      setIsHolding(true);
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  // batalin kalau user lepas sebelum penuh (pointer up di mana saja)
  useEffect(() => {
    if (!isHolding) return;
    const handleUp = () => cancelCharge();
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [isHolding, cancelCharge]);

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={isDark ? "Hold to switch to light mode" : "Hold to switch to dark mode"}
      onPointerDown={startCharge}
      className="relative flex h-9 w-9 items-center justify-center rounded-full select-none touch-none"
      style={{
        background: "var(--color-surface, #1a1a1a)",
        border: "1px solid var(--color-terracotta, #c46a4a)",
      }}
    >
      {/* ring progress charge */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 36 36"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="var(--color-terracotta, #c46a4a)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 16}
          strokeDashoffset={2 * Math.PI * 16 * (1 - progress)}
          style={{
            transition: isHolding ? "none" : "stroke-dashoffset 0.15s ease-out",
            opacity: isHolding ? 1 : 0,
          }}
        />
      </svg>

      {/* mata mini sebagai icon toggle */}
      <svg
        viewBox="0 0 40 24"
        className="relative h-3.5 w-6"
        style={{
          transform: isEyeSquinting ? "scaleY(0.35)" : "scaleY(1)",
          transformOrigin: "center",
          transition: "transform 0.18s ease-out",
        }}
      >
        <path
          d="M2 12 C 10 -2, 30 -2, 38 12 C 30 26, 10 26, 2 12 Z"
          fill="none"
          stroke="var(--color-terracotta, #c46a4a)"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="12"
          r={isHolding ? 3 + progress * 3 : 4}
          fill="var(--color-terracotta, #c46a4a)"
          style={{ transition: isHolding ? "none" : "r 0.15s ease-out" }}
        />
      </svg>

      {/* glow beam radial pas charging, makin terang mendekati 100% */}
      {isHolding && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 ${8 + progress * 20}px ${
              2 + progress * 6
            }px var(--color-terracotta, #c46a4a)`,
            opacity: 0.15 + progress * 0.5,
          }}
        />
      )}
    </button>
  );
}
