"use client";

import Lenis from "lenis";
import { usePathname } from "@/i18n/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = instance;
    setLenis(instance);
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
