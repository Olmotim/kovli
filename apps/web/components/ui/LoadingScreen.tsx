"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const DURATION_MS = 1500;

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // requestAnimationFrame asegura que el navegador pinte el 0% antes de
    // saltar a 100%; si lo hiciéramos en el mismo tick, no habría transición
    // visible porque no llegaría a pintarse el estado inicial.
    const frame = requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => setLoading(false), DURATION_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {loading && (
        <div
          className="fixed inset-0 z-[999] bg-crema flex flex-col items-center justify-center gap-8"
        >
          {/* Logo */}
          <div
            className="flex flex-col items-center gap-4"
          >
            <Image
              src="/kovliLoading.png"
              alt="Kovli"
              width={640}
              height={640}
              priority
              className="h-64 w-auto object-contain"
            />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cafe">
              Kovli
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="w-32 h-px bg-beige overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-apricot to-chocolate transition-all ease-linear"
              style={{ width: `${progress}%`, transitionDuration: `${DURATION_MS}ms` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
