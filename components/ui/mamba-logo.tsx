'use client';

/**
 * MambaLogo - Theme-aware logo component
 *
 * File naming convention (what background they're designed FOR):
 * - mamba_logo_white.svg = designed FOR white/light backgrounds
 * - mamba_logo_dark.svg = designed FOR dark backgrounds
 */

import Image from 'next/image';

interface MambaLogoProps {
  size?: number;
  className?: string;
  /** Force a specific variant: 'forDark' (dark bg), 'forLight' (light bg), or 'auto' */
  variant?: 'forDark' | 'forLight' | 'auto';
}

export function MambaLogo({ size = 32, className = '', variant = 'auto' }: MambaLogoProps) {
  // Force logo for dark backgrounds
  if (variant === 'forDark') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <Image
          src="/logos/mamba_logo_dark.svg"
          alt="MambaHR"
          fill
          className="object-contain"
          sizes={`${size}px`}
          priority
        />
      </div>
    );
  }

  // Force logo for light backgrounds
  if (variant === 'forLight') {
    return (
      <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <Image
          src="/logos/mamba_logo_white.svg"
          alt="MambaHR"
          fill
          className="object-contain"
          sizes={`${size}px`}
          priority
        />
      </div>
    );
  }

  // Auto mode - switch based on theme
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Dark mode: use logo designed for dark backgrounds */}
      <Image
        src="/logos/mamba_logo_dark.svg"
        alt="MambaHR"
        fill
        className="object-contain hidden dark:block"
        sizes={`${size}px`}
        priority
      />
      {/* Light mode: use logo designed for light/white backgrounds */}
      <Image
        src="/logos/mamba_logo_white.svg"
        alt="MambaHR"
        fill
        className="object-contain block dark:hidden"
        sizes={`${size}px`}
        priority
      />
    </div>
  );
}

export default MambaLogo;
