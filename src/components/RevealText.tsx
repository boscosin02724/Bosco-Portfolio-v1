import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
