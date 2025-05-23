
      import React from 'react';
      import { Slot } from '@radix-ui/react-slot';
      import { cva } from 'class-variance-authority';
      import { cn } from '@/lib/utils';

      const buttonVariants = cva(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden button-grunge', // Added relative, overflow-hidden and button-grunge
        {
          variants: {
            variant: {
              default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/40', // Added shadow
              destructive:
                'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-destructive/40', // Added shadow
              outline:
                'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground', // Changed bg to transparent
              secondary:
                'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm shadow-secondary/30', // Added shadow
              ghost: 'hover:bg-accent hover:text-accent-foreground',
              link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
              default: 'h-10 px-4 py-2',
              sm: 'h-9 rounded-md px-3',
              lg: 'h-11 rounded-md px-8 text-base', // Increased text size for lg
              icon: 'h-10 w-10',
            },
          },
          defaultVariants: {
            variant: 'default',
            size: 'default',
          },
        }
      );

      const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        );
      });
      Button.displayName = 'Button';

      export { Button, buttonVariants };
  