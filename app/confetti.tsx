"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      numberOfPieces={running ? 300 : 0}
      recycle={false}
      onConfettiComplete={(confetti) => {
        setRunning(false);
        confetti?.reset();
      }}
      style={{ position: "fixed", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
