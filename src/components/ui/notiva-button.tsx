import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export interface NotivaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primaryBlack" | "primaryDark" | "secondary" | "important" | "danger" | "cta"
  size?: "sm" | "lg"
  asChild?: boolean
  fullWidth?: boolean
  ctaText?: string
}

const variantClasses = {
  primary: "notiva-btn-primary",
  primaryBlack: "notiva-btn-primary-black",
  primaryDark: "notiva-btn-primary-dark",
  secondary: "notiva-btn-secondary",
  important: "notiva-btn-important",
  danger: "notiva-btn-danger",
  cta: "notiva-btn-cta",
}

const sizeClasses = {
  sm: "notiva-btn-sm",
  lg: "notiva-btn-lg",
}

const NotivaButton = React.forwardRef<HTMLButtonElement, NotivaButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      asChild = false,
      fullWidth = false,
      ctaText,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    if (variant === "cta") {
      return (
        <Comp
          className={cn(
            "notiva-btn",
            variantClasses[variant],
            sizeClasses[size],
            fullWidth && "notiva-btn-full",
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

    return (
      <Comp
        className={cn(
          "notiva-btn",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "notiva-btn-full",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="notiva-btn-inner">
          {children}
        </span>
      </Comp>
    )
  }
)
NotivaButton.displayName = "NotivaButton"

export interface NotivaButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "primaryBlack" | "primaryDark" | "secondary" | "important" | "danger" | "cta"
  size?: "sm" | "lg"
  fullWidth?: boolean
  ctaText?: string
}

const NotivaButtonLink = React.forwardRef<HTMLAnchorElement, NotivaButtonLinkProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      fullWidth = false,
      ctaText,
      children,
      ...props
    },
    ref
  ) => {
    if (variant === "cta") {
      return (
        <a
          className={cn(
            "notiva-btn",
            variantClasses[variant],
            sizeClasses[size],
            fullWidth && "notiva-btn-full",
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

    return (
      <a
        className={cn(
          "notiva-btn",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "notiva-btn-full",
          "no-underline",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="notiva-btn-inner">
          {children}
        </span>
      </a>
    )
  }
)
NotivaButtonLink.displayName = "NotivaButtonLink"

export { NotivaButton, NotivaButtonLink }
