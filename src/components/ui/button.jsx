import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        transparent: 'bg-transparent',
        emergency: 'bg-emergency hover:bg-emergency-hover',
        vetCare: 'bg-vetCare hover:bg-vetCare-hover',
        homeCare: 'bg-homeCare hover:bg-homeCare-hover',
        icon: 'bg-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'emergency',
      size: 'default',
    },
  },
);

function Button({ className, variant, size, to, icon, children, ...props }) {
  const Comp = to === undefined ? 'button' : Link;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: icon === undefined ? size : 'icon',
          className,
        }),
      )}
      to={to}
      {...props}
    >
      {icon && <img className='w-8 h-8' src={icon} alt="icon"/>}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
