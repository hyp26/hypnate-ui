import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
    return twMerge(clsx(inputs));
}

interface CurrencyFormatOptions {
    style: 'currency';
    currency: string;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    } as CurrencyFormatOptions).format(amount);
}
