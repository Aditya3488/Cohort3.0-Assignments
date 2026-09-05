import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../libs/utils";
import gsap from "gsap";

const tooltipVariants = cva(
  "absolute z-50 w-max max-w-xs rounded-md font-medium shadow-lg pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white",
        light: "bg-white text-gray-900 border border-gray-200",
        outline:
          "bg-white/70 text-gray-800 border border-gray-400 backdrop-blur-md dark:bg-zinc-900/70 dark:text-zinc-100 dark:border-zinc-600",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      side: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
      side: "top",
    },
  }
);

type TooltipSide = "top" | "bottom" | "left" | "right";

const arrowPosition: Record<TooltipSide, string> = {
  top: "left-1/2 -translate-x-1/2 -bottom-1",
  bottom: "left-1/2 -translate-x-1/2 -top-1",
  left: "top-1/2 -translate-y-1/2 -right-1",
  right: "top-1/2 -translate-y-1/2 -left-1",
};

const arrowColor = {
  dark: "bg-slate-900",
  light: "bg-white",
  outline: "bg-white/70 dark:bg-zinc-900/70",
};

const entryOffset: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: 0, y: 6 },
  bottom: { x: 0, y: -6 },
  left: { x: 6, y: 0 },
  right: { x: -6, y: 0 },
};

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    Omit<VariantProps<typeof tooltipVariants>, "side"> {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  arrow?: boolean;
  disabled?: boolean;
  open?: boolean;
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      className,
      variant,
      size,
      side = "top",
      delay = 120,
      arrow = true,
      disabled = false,
      open,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const tipRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<number | null>(null);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : hovered;

    const show = () => {
      if (disabled || isControlled) return;
      timer.current = window.setTimeout(() => setHovered(true), delay);
    };

    const hide = () => {
      if (isControlled) return;
      if (timer.current) clearTimeout(timer.current);
      setHovered(false);
    };

    useEffect(() => {
      const el = tipRef.current;
      if (!el) return;
      const { x, y } = entryOffset[side];
      gsap.fromTo(
        el,
        { opacity: 0, x, y, scale: 0.96 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }
      );
    }, [isOpen, side]);

    useEffect(() => {
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }, []);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}

        {isOpen && (
          <div
            ref={tipRef}
            role="tooltip"
            className={tooltipVariants({ variant, size, side })}
          >
            {content}

            {arrow && (
              <span
                className={cn(
                  "absolute h-2 w-2 rotate-45",
                  arrowPosition[side],
                  arrowColor[variant ?? "dark"]
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
