"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface NotivaInputFieldProps {
    placeholder?: string
    buttonText?: string
    type?: React.HTMLInputTypeAttribute
    name?: string
    required?: boolean
    defaultValue?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit?: (value: string) => void
    className?: string
    "aria-label"?: string
}

export function NotivaInputField({
    placeholder = "Enter your Email",
    buttonText = "Subscribe",
    type = "email",
    name = "email",
    required = true,
    defaultValue,
    value,
    onChange,
    onSubmit,
    className,
    "aria-label": ariaLabel = "Email address",
}: NotivaInputFieldProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const inputValue = (formData.get(name) as string) ?? ""
        onSubmit?.(inputValue)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#0047BA] bg-[#E6EDF8] p-2",
                className
            )}
        >
            <input
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                aria-label={ariaLabel}
                className="flex-1 min-w-0 bg-transparent px-[30px] font-normal text-base leading-5 tracking-[0.32px] text-[#00358C] placeholder:text-[#00358C] outline-none focus:outline-none"
            />
            <Button type="submit" variant="primary">
                {buttonText}
            </Button>
        </form>
    )
}
