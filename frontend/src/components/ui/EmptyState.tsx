import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Empty State Component
 * Usage: <EmptyState icon={<FileText />} title="No Data" description="Get started by adding your first item" action={<Button>Add Item</Button>} />
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Icon */}
      <motion.div
        className="text-gray-400 dark:text-gray-600 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <motion.div
          className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full shadow-lg"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-2xl font-heading font-bold text-text-dark dark:text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-text-gray dark:text-gray-400 mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
