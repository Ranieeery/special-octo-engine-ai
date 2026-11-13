"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carrega a lib só no cliente e fora do bundle inicial.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!size || done) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      numberOfPieces={300}
      recycle={false}
      // Desmonta ao terminar, liberando canvas e o loop de animação.
      onConfettiComplete={() => setDone(true)}
      style={{ position: "fixed", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
