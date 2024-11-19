//reusable animated image for steps components
'use client';
import { motion } from 'framer-motion';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className: string;
  rotate: number;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  rotate,
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
    />
  );
};

export default AnimatedImage;
