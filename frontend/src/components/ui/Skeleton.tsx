import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

/**
 * Skeleton Loader Component
 * Usage: <Skeleton variant="text" count={3} />
 */
export const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}: SkeletonProps) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'h-48 rounded-xl',
  };

  const shimmer = {
    initial: { backgroundPosition: '-200%' },
    animate: {
      backgroundPosition: '200%',
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const skeletons = Array.from({ length: count });

  return (
    <div className="space-y-3">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={{
            width: width || '100%',
            height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '3rem' : '8rem'),
            backgroundSize: '200% 100%',
          }}
          initial="initial"
          animate="animate"
          variants={shimmer}
        />
      ))}
    </div>
  );
};

/**
 * Card Skeleton Loader
 * Usage: <CardSkeleton />
 */
export const CardSkeleton = () => {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width="48px" height="48px" />
        <div className="flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" className="mt-2" />
        </div>
      </div>
      <Skeleton variant="rectangular" height="120px" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="80px" height="32px" />
        <Skeleton variant="rectangular" width="80px" height="32px" />
      </div>
    </div>
  );
};

/**
 * Table Skeleton Loader
 * Usage: <TableSkeleton rows={5} />
 */
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  const rowItems = Array.from({ length: rows });

  return (
    <div className="space-y-4">
      {rowItems.map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="15%" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;

