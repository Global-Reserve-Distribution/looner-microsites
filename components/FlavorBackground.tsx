import { motion, AnimatePresence } from 'framer-motion';

export function FlavorBackground({ color }: { color: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={color}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          backgroundColor: color,
          filter: 'blur(60px)',
        }}
        className="absolute inset-0 z-0 rounded-b-[80%]"
      />
    </AnimatePresence>
  );
}