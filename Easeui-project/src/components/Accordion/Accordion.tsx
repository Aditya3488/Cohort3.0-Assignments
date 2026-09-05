import { cva, type VariantProps } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../libs/utils";
import { entranceAnimations } from "../../libs/animations/entranceAnimation";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

const accordionVariants = cva("w-full rounded-lg overflow-hidden divide-y", {
  variants: {
    variant: {
      light: "bg-white text-gray-800 border border-gray-200 divide-gray-200",
      dark: "bg-slate-900 text-white border border-slate-700 divide-slate-700",
      outline:
        "bg-transparent border border-gray-300 divide-gray-300 text-gray-800 dark:border-zinc-700 dark:divide-zinc-700 dark:text-zinc-200",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "md",
  },
});

type AccordionSize = "sm" | "md" | "lg";

const rowPadding: Record<AccordionSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
};

export type AccordionItem = {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

const toArray = (value?: string | string[]) => {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue">,
    Omit<VariantProps<typeof accordionVariants>, "size"> {
  items: AccordionItem[];
  type?: "single" | "multiple";
  size?: AccordionSize;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (open: string[]) => void;
  collapsible?: boolean;
  animation?: keyof typeof entranceAnimations;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      type = "single",
      className,
      variant,
      size = "md",
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      animation = "none",
      ...props
    },
    ref
  ) => {
    const uid = React.useId();
    const [internal, setInternal] = useState(() => toArray(defaultValue));
    const rootRef = useRef<HTMLDivElement | null>(null);
    const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const firstRun = useRef(true);

    const isControlled = value !== undefined;
    const open = isControlled ? toArray(value) : internal;

    const toggle = (item: AccordionItem) => {
      if (item.disabled) return;

      let next: string[];
      if (type === "multiple") {
        next = open.includes(item.value)
          ? open.filter((v) => v !== item.value)
          : [...open, item.value];
      } else if (open.includes(item.value)) {
        next = collapsible ? [] : open;
      } else {
        next = [item.value];
      }

      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    useEffect(() => {
      if (!rootRef.current || animation === "none") return;
      entranceAnimations[animation]?.(rootRef.current);
    }, [animation]);

    useEffect(() => {
      items.forEach((item) => {
        const el = panelRefs.current[item.value];
        if (!el) return;

        const isOpen = open.includes(item.value);
        gsap.killTweensOf(el);

        if (firstRun.current) {
          gsap.set(el, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
          return;
        }

        if (isOpen) {
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" }
          );
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
        }
      });

      firstRun.current = false;
    }, [open, items]);

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(accordionVariants({ variant, size }), className)}
        {...props}
      >
        {items.map((item) => {
          const isOpen = open.includes(item.value);

          return (
            <div key={item.value}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${item.value}`}
                disabled={item.disabled}
                onClick={() => toggle(item)}
                className={cn(
                  "w-full flex items-center justify-between gap-4 text-left font-medium cursor-pointer transition-colors",
                  rowPadding[size],
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80"
                )}
              >
                {item.title}
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              <div
                id={`${uid}-${item.value}`}
                ref={(node) => {
                  panelRefs.current[item.value] = node;
                }}
                className="overflow-hidden"
              >
                <div className={cn("pt-0 opacity-80", rowPadding[size])}>
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";
export { Accordion, accordionVariants };
