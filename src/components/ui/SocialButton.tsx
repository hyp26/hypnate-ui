import React from 'react';
import { cn } from '../../lib/utils';

const SocialButton = ({ icon: Icon, provider, className, ...props }: { icon: React.ElementType; provider: string; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-border rounded-md text-sm font-medium text-foreground bg-muted hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary',
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5" />
      <span>Sign in with {provider}</span>
    </button>
  );
};

export default SocialButton;
