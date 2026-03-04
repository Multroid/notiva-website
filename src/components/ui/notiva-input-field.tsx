"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface NotivaInputFieldProps {
  variant?: "blue" | "orange"
  placeholder?: string
  buttonText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
  className?: string
}

const variantStyles = {
  blue: {
    outer: "bg-[#D9E3F5] border-[#0047BA]",
    button: "bg-[#0047BA] hover:bg-[#003995]",
    placeholder: "placeholder:text-[#00358C]",
  },
  orange: {
    outer: "bg-[#D9E3F5] border-[#F05627]",
    button: "bg-[#F05627] hover:bg-[#E34E23]",
    placeholder: "placeholder:text-[#AA3D1C]",
  },
}

export function NotivaInputField({
  variant = "blue",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  value,
  onChange,
  onSubmit,
  className,
}: NotivaInputFieldProps) {
  const styles = variantStyles[variant]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit?.()
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-[8px] p-[8px] rounded-[4px] border",
        styles.outer,
        className
      )}
    >
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex-1 bg-transparent border-none outline-none text-[16px] font-normal px-[12px] py-[8px]",
          "text-[#101113]",
          styles.placeholder
        )}
      />
      <button
        type="button"
        onClick={onSubmit}
        className={cn(
          "rounded-[12px] px-[24px] py-[12px] text-[#F0EEE9] font-medium text-[14px] transition-colors whitespace-nowrap",
          styles.button
        )}
      >
        {buttonText}
      </button>
    </div>
  )
}
