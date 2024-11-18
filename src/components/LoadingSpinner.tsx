// reusable loading spinner component
'use client';
import Image from 'next/image';
interface LoadingSpinnerProps {
  containerClassName?: string;
  imageSize?: number;
  imageSrc?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  containerClassName = 'flex items-center justify-center h-full',
}) => {
  return (
    <div className={containerClassName}>
      <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
    </div>
  );
};

export default LoadingSpinner;
