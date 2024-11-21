//Aceternity UI component with implemented changes
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';
import { cn } from '@/lib/utils';

const WavyBackground = ({
  children,
  className,
  containerClassName,
  theme,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  theme: 'light' | 'dark';
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
  [key: string]: any;
}) => {
  // Initializing noise generator for creating wave patterns
  const noise = createNoise3D();

  // Declaring variables for canvas dimensions, animation properties, and canvas context.
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to determine wave speed based on the 'speed' prop.
  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };

  // Initializing canvas and set up the rendering environment.
  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  // Defining the colors for the waves based on the theme (dark or light).
  const waveColors =
    colors ??
    (theme === 'dark'
      ? ['#6bdb42', '#934dd8', '#22d3ee', '#d1e422', '#e879f9']
      : ['#4fda54', '#ff5722', '#03a9f4', '#ffeb3b', '#e92480']);

  // Function to draw waves on the canvas using noise generation.
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 90;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;

  // Main rendering function that draws the waves repeatedly.
  const render = () => {
    ctx.fillStyle =
      backgroundFill ||
      (theme === 'dark' ? 'rgb(24, 24, 27)' : 'rgb(245, 245, 245)');
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  // Effect hook to initialize the canvas and start rendering when the component mounts.
  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check for Safari browser
    if (typeof window !== 'undefined') {
      setIsSafari(
        navigator.userAgent.includes('Safari') &&
          !navigator.userAgent.includes('Chrome')
      );
    }
  }, []);

  return (
    <div
      className={cn(
        'h-screen flex flex-col items-center justify-center',
        containerClassName
      )}
    >
      <canvas
        className='absolute inset-0 z-[-1] overflow-hidden'
        ref={canvasRef}
        id='canvas'
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}), // Applying additional blur for Safari.
        }}
      ></canvas>
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  );
};

export { WavyBackground };
