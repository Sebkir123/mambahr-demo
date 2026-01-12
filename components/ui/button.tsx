"use client";

/**
 * Unified Button Component
 *
 * Design System v3 - Single source of truth for all buttons
 *
 * Variants:
 * - default: Standard primary action button
 * - secondary: Secondary/neutral actions
 * - outline: Bordered button for tertiary actions
 * - ghost: Minimal button for subtle actions
 * - destructive: Dangerous/delete actions
 * - link: Text-only button that looks like a link
 * - gradient: Animated gradient border (use sparingly for CTAs)
 * - hero: High-emphasis button with rotating gradient (signup/signin only)
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - consistent across all variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - Solid primary color
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",

        // Secondary - Neutral background
        secondary: "bg-muted text-foreground hover:bg-accent shadow-sm border border-border",

        // Outline - Bordered, transparent bg
        outline: "border border-border bg-transparent text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground",

        // Ghost - No background, minimal
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",

        // Destructive - Red for dangerous actions
        destructive: "bg-gradient-to-br from-destructive to-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30 ring-1 ring-white/10",

        // Link - Text only
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover p-0 h-auto",

        // Gradient - Animated border gradient (for special CTAs)
        gradient: "relative text-white border-0 bg-card",

        // Hero - Rotating gradient border with glow (signup/signin only)
        hero: "relative text-white font-semibold bg-card border-0",

      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg",
        default: "h-11 px-5 text-sm rounded-xl",
        lg: "h-12 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    children,
    icon,
    iconPosition = "left",
    loading = false,
    disabled,
    ...props
  }, ref) => {
    const isGradient = variant === "gradient";
    const isHero = variant === "hero";
    const isDisabled = disabled || loading;

    // Content with optional icon
    const content = (
      <>
        {loading ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : icon && iconPosition === "left" ? (
          icon
        ) : null}
        {children}
        {!loading && icon && iconPosition === "right" ? icon : null}
      </>
    );

    // Hero variant - clean gradient border
    if (isHero) {
      return (
        <motion.button
          ref={ref}
          disabled={isDisabled}
          className={cn(
            buttonVariants({ variant, size, fullWidth, className }),
            "overflow-hidden group"
          )}
          whileHover={!isDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
          }}
          {...props}
        >
          {/* Inner dark background */}
          <div
            className="absolute inset-[1px] rounded-[11px] transition-opacity duration-300 group-hover:opacity-90"
            style={{ background: 'var(--bg-card)' }}
          />
          {/* Gradient fill on hover */}
          <div
            className="absolute inset-[1px] rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))' }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {content}
          </span>
        </motion.button>
      );
    }

    // Gradient variant - animated border gradient
    if (isGradient) {
      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          disabled={isDisabled}
          whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          {...props}
        >
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              padding: "1px",
              background: `linear-gradient(90deg,
                var(--gradient-start) 0%,
                var(--gradient-mid) 25%,
                var(--gradient-end) 50%,
                var(--gradient-mid) 75%,
                var(--gradient-start) 100%)`,
              backgroundSize: "200% 100%",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
              zIndex: 0,
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <div className="absolute inset-[1px] rounded-xl bg-card -z-10" />
          <span className="relative z-10 flex items-center justify-center gap-2">{content}</span>
        </motion.button>
      );
    }

    // Standard variants
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
