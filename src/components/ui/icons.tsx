import React from 'react';

export const GoogleIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.27 1.44-1.64 3.87-4.56 3.87-2.79 0-5.09-2.31-5.09-5.14s2.3-5.14 5.09-5.14c1.56 0 2.58.64 3.18 1.22l2.49-2.38C17.21 4.28 15.08 3 12.48 3c-4.18 0-7.58 3.4-7.58 7.58s3.4 7.58 7.58 7.58c4.49 0 7.22-3.11 7.22-7.35 0-.5-.05-.92-.12-1.32H12.48z" fill="currentColor"/>
    </svg>
);
