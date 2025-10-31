import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

/**
 * Success Animation Component
 * Usage: <SuccessAnimation show={isSuccess} message="Saved!" />
 */
export const SuccessAnimation = ({
  show,
  message,
  onComplete,
}: SuccessAnimationProps) => {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
      >
        {/* Success Checkmark */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        {message && (
          <motion.p
            className="text-xl font-semibold text-text-dark dark:text-white text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
        )}

        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
              style={{
                left: `${50 + (Math.random() - 0.5) * 100}%`,
                top: '50%',
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [-50, 100],
                x: (Math.random() - 0.5) * 200,
                opacity: [1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1 + Math.random(),
                delay: 0.3 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Checkmark Animation (Inline)
 */
export const CheckmarkAnimation = () => {
  return (
    <motion.div
      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.4 }}
    >
      <Check className="w-4 h-4 text-white" strokeWidth={3} />
    </motion.div>
  );
};

export default SuccessAnimation;

