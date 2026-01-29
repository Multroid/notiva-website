import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

/**
 * Notiva Button Design System
 * 
 * Double-layer button design matching Figma specifications:
 * - Outer container with background, border, and padding
 * - Inner button with the actual button background
 * 
 * Variants:
 * - primary: Blue inner button (default)
 * - primaryBlack: Black inner button
 * - secondary: Grey inner with blue border
 * - important: Orange inner button
 * - danger: Red inner button
 * - cta: CTA button with arrow icon
 */

export interface NotivaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primaryBlack" | "secondary" | "important" | "danger" | "cta"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
  ctaText?: string // For CTA variant
}

const variantClasses = {
  primary: "notiva-btn-primary",
  primaryBlack: "notiva-btn-primary-black",
  secondary: "notiva-btn-secondary",
  important: "notiva-btn-important",
  danger: "notiva-btn-danger",
  cta: "notiva-btn-cta",
}

const sizeClasses = {
  default: "",
  sm: "text-sm",
  lg: "text-lg",
}

const NotivaButton = React.forwardRef<HTMLButtonElement, NotivaButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      ctaText,
      children,
      ...props
    },
    ref
  ) => {
    // CTA variant has different structure
    if (variant === "cta") {
      const Comp = asChild ? Slot : "button"
      return (
        <Comp
          className={cn(
            "notiva-btn",
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          ref={ref}
          {...props}
        >
          <span className="notiva-btn-cta-text">{ctaText || children}</span>
          <span className="notiva-btn-cta-arrow">
            <ArrowRight />
          </span>
        </Comp>
      )
    }

    // Standard double-layer button
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "notiva-btn",
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        <span className={cn("notiva-btn-inner", sizeClasses[size])}>
          {children}
        </span>
      </Comp>
    )
  }
)
NotivaButton.displayName = "NotivaButton"

/**
 * NotivaButtonLink - For use with Next.js Link or anchor tags
 * Uses the asChild pattern to wrap links
 */
export interface NotivaButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "primaryBlack" | "secondary" | "important" | "danger" | "cta"
  size?: "default" | "sm" | "lg"
  ctaText?: string
}

const NotivaButtonLink = React.forwardRef<HTMLAnchorElement, NotivaButtonLinkProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      ctaText,
      children,
      ...props
    },
    ref
  ) => {
    // CTA variant has different structure
    if (variant === "cta") {
      return (
        <a
          className={cn(
            "notiva-btn",
            variantClasses[variant],
            sizeClasses[size],
            "no-underline",
            className
          )}
          ref={ref}
          {...props}
        >
          <span className="notiva-btn-cta-text">{ctaText || children}</span>
          <span className="notiva-btn-cta-arrow">
            <ArrowRight />
          </span>
        </a>
      )
    }

    // Standard double-layer button
    return (
      <a
        className={cn(
          "notiva-btn",
          variantClasses[variant],
          "no-underline",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className={cn("notiva-btn-inner", sizeClasses[size])}>
          {children}
        </span>
      </a>
    )
  }
)
NotivaButtonLink.displayName = "NotivaButtonLink"

export { NotivaButton, NotivaButtonLink }
