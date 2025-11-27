import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-black shadow-[var(--shadow-brand)] hover:shadow-[var(--shadow-gold)] hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline: "border-2 border-brand-steel bg-transparent text-brand-steel hover:bg-brand-steel/10 hover:border-brand-steel-light active:scale-[0.98]",
        secondary: "bg-gradient-to-br from-brand-steel to-brand-steel-light text-brand-gold shadow-[var(--shadow-steel)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        ghost: "text-brand-gold hover:bg-brand-gold/10 active:scale-[0.98]",
        link: "text-brand-gold underline-offset-4 hover:underline",
        hero: "bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-black shadow-[var(--shadow-brand)] hover:shadow-[0_20px_60px_-5px_hsl(38_75%_48%/0.6)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0 active:shadow-[0_8px_30px_-5px_hsl(38_75%_48%/0.4)]",
        "hero-secondary": "bg-gradient-to-br from-brand-black to-brand-dark text-brand-gold border-2 border-brand-gold/40 shadow-lg hover:shadow-[0_20px_60px_-5px_hsl(38_75%_48%/0.5)] hover:border-brand-gold/60 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.99] active:translate-y-0 active:shadow-lg",
        steel: "bg-gradient-to-br from-brand-steel to-brand-steel-light text-white shadow-[var(--shadow-steel)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-16 px-12 text-lg",
        hero: "h-20 px-16 text-xl rounded-3xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
