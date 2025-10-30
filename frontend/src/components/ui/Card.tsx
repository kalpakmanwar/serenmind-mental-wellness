import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  className?: string;
}

/**
 * Enhanced Card Component with Hover Effects
 * Usage: <Card hover glow>Content</Card>
 */
export const Card = ({
  children,
  hover = true,
  glow = false,
  gradient = false,
  className = '',
  ...props
}: CardProps) => {
  const baseClasses = 'relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300';
  
  const gradientBg = gradient
    ? 'bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-gray-800 dark:via-primary-900/10 dark:to-gray-800'
    : '';

  const glowClasses = glow
    ? 'shadow-lg hover:shadow-2xl hover:shadow-primary-500/20'
    : 'shadow-md hover:shadow-lg';

  return (
    <motion.div
      className={`${baseClasses} ${gradientBg} ${glowClasses} ${className}`}
      whileHover={
        hover
          ? {
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={hover ? { scale: 0.98 } : undefined}
      {...props}
    >
      {/* Gradient Overlay (appears on hover) */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 rounded-xl pointer-events-none"
          whileHover={{
            background: [
              'linear-gradient(to bottom right, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0))',
              'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.1))',
            ],
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {children}
    </motion.div>
  );
};

/**
 * Interactive Card with Click Animation
 */
export const InteractiveCard = ({
  children,
  onClick,
  className = '',
  ...props
}: CardProps & { onClick?: () => void }) => {
  return (
    <motion.div
      className={`card cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stat Card with Animated Number
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
}: StatCardProps) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  return (
    <Card hover glow>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary} text-white shadow-lg`}>
            {icon}
          </div>
          {trend && trendValue && (
            <span className={`text-sm font-semibold ${trendColors[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-text-gray dark:text-gray-400 mb-1">
          {title}
        </h3>
        <motion.p
          className="text-3xl font-bold text-text-dark dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.p>
      </div>
    </Card>
  );
};

export default Card;

