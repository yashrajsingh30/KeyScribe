import React from 'react';
import { motion } from 'framer-motion';
export default function Button({ children, onClick, variant='primary', ...props }) {
  const base = 'px-6 py-2 rounded-lg font-medium transition-colors';
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary/90'
  }[variant];
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${styles}`}
      onClick={onClick}
      {...props}
    >{children}</motion.button>
  );
}