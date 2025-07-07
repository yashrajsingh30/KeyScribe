import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
export default function Toast({ show, message='Copied!', onDone }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          exit={{opacity:0,y:20}}
          transition={{ duration:0.3 }}
          onAnimationComplete={onDone}
          className="fixed bottom-6 right-6 bg-neutral-900 text-white px-4 py-2 rounded-xl flex items-center shadow-lg"
        >
          <CheckCircle size={20} className="mr-2" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
