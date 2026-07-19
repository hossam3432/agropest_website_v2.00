"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type AnimationProps = {
  children: ReactNode;
  className?: string;
};

type RevealSectionProps = AnimationProps & {
  amount?: number;
  delay?: number;
};

type StaggerContainerProps = AnimationProps & {
  amount?: number;
  delay?: number;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onMouseMove?: MouseEventHandler<HTMLDivElement>;
  stagger?: number;
  style?: CSSProperties;
};

type RevealItemProps = AnimationProps & {
  hoverLift?: boolean;
};

type AnimatedAccentLineProps = {
  className?: string;
  width?: string;
  amount?: number;
  delay?: number;
};

export function RevealSection({ children, className, amount = 0.2, delay = 0 }: RevealSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {
          opacity: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : 18
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: reducedMotion ? 0 : delay,
            duration: reducedMotion ? 0 : 0.85,
            ease: premiumEase
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  amount = 0.15,
  delay = 0,
  stagger = 0.08,
  ...rest
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      {...rest}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reducedMotion ? 0 : delay,
            staggerChildren: reducedMotion ? 0 : stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, hoverLift = false }: RevealItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : 16
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : 0.72,
            ease: premiumEase
          }
        }
      }}
      whileHover={hoverLift && !reducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.32, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedAccentLine({
  className,
  width = "100%",
  amount = 0.2,
  delay = 0
}: AnimatedAccentLineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        width: reducedMotion ? width : "0%"
      }}
      whileInView={{
        opacity: 1,
        width
      }}
      viewport={{ once: true, amount }}
      transition={{
        delay: reducedMotion ? 0 : delay,
        duration: reducedMotion ? 0 : 1.05,
        ease: premiumEase
      }}
    />
  );
}

type AnimatedAccentLineVerticalProps = {
  className?: string;
  height?: string;
  amount?: number;
  delay?: number;
};

export function AnimatedAccentLineVertical({
  className,
  height = "100%",
  amount = 0.2,
  delay = 0
}: AnimatedAccentLineVerticalProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        height: reducedMotion ? height : "0%"
      }}
      whileInView={{
        opacity: 1,
        height
      }}
      viewport={{ once: true, amount }}
      transition={{
        delay: reducedMotion ? 0 : delay,
        duration: reducedMotion ? 0 : 1.05,
        ease: premiumEase
      }}
    />
  );
}
