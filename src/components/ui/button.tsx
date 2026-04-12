import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "appearance-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0047BA] text-white border border-[#B0C6EA] hover:bg-[#3D87FF] active:bg-[#00286A]",
        secondary:
          "bg-white text-[#0047BA] border border-[#0047BA] hover:bg-[#E8E8E8] active:bg-[#A4A4A4] active:text-white",
        secondaryClean:
          "bg-transparent text-[#0047BA] hover:bg-[#E8E8E8] active:bg-[#A4A4A4] active:text-white",
        important:
          "bg-[#F05627] text-white border border-[#F58E6E] hover:bg-[#CA3A0E] active:bg-[#8E290A]",
        danger:
          "bg-[#F32735] text-white border border-[#FBBCC0] hover:bg-[#B61D28] active:bg-[#550E13]",
        inactive:
          "bg-[#F3F4F4] text-[#898C8E] border border-[#898C8E] cursor-not-allowed",
        link: "text-[#0047BA] underline-offset-4 hover:underline",
        // shadcn aliases — kept so internal shadcn UI components keep working
        default:
          "bg-[#0047BA] text-white border border-[#B0C6EA] hover:bg-[#3D87FF] active:bg-[#00286A]",
        outline:
          "bg-white text-[#0047BA] border border-[#0047BA] hover:bg-[#E8E8E8]",
        ghost:
          "bg-transparent text-[#0047BA] hover:bg-[#E8E8E8]",
        destructive:
          "bg-[#F32735] text-white border border-[#FBBCC0] hover:bg-[#B61D28] active:bg-[#550E13]",
      },
      size: {
        default: "px-8 py-4 text-base leading-[18px]",
        sm: "px-6 py-3 text-sm leading-[16px]",
        lg: "px-10 py-5 text-lg leading-[20px]",
        icon: "size-12",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
