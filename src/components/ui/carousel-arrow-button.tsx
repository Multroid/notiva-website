"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

type CarouselArrowButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> & {
    direction: "left" | "right"
}

export const CarouselArrowButton = forwardRef<
    HTMLButtonElement,
    CarouselArrowButtonProps
>(function CarouselArrowButton(
    { direction, className = "", type = "button", ...rest },
    ref,
) {
    const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon
    return (
        <button
            ref={ref}
            type={type}
            {...rest}
            className={`appearance-none flex items-center justify-center rounded-full border-2 border-[#D9E3F5] bg-[#FEFDFD] p-4 transition-colors outline-none hover:border-[#0047BA] focus:outline-none focus-visible:border-[#0047BA] disabled:opacity-30 disabled:hover:border-[#D9E3F5] disabled:focus-visible:border-[#D9E3F5] ${className}`}
        >
            <Icon className="size-[14px] text-[#0047BA]" />
        </button>
    )
})
