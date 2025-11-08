import React from 'react';
import { cn } from '../../lib/utils';
import LogoIcon from './LogoIcon';

const Logo = ({ className, textClassName }: { className?: string; textClassName?: string }) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoIcon className="h-8 w-auto" />
      <span className={cn("font-display text-2xl font-bold text-secondary", textClassName)}>
        hypnate
      </span>
    </div>
  );
};

export default Logo;
