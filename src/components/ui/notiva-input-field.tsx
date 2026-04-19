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
    pending?: boolean
    message?: string | null
    messageTone?: "success" | "error" | "info"
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
    pending = false,
    message,
    messageTone = "info",
}: NotivaInputFieldProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const inputValue = (formData.get(name) as string) ?? ""
        onSubmit?.(inputValue)
    }

    const messageColor =
        messageTone === "error"
            ? "text-[#B42318]"
            : messageTone === "success"
            ? "text-[#009966]"
            : "text-[#00358C]"

    return (
        <div className={cn("flex w-full flex-col gap-2", className)}>
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#0047BA] bg-[#E6EDF8] p-2"
            >
                <input
                    type={type}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    disabled={pending}
                    aria-label={ariaLabel}
                    className="flex-1 min-w-0 bg-transparent px-[30px] font-normal text-base leading-5 tracking-[0.32px] text-[#00358C] placeholder:text-[#00358C] outline-none focus:outline-none disabled:opacity-60"
                />
                <Button type="submit" variant="primary" disabled={pending}>
                    {pending ? "Sending..." : buttonText}
                </Button>
            </form>
            {message ? (
                <p className={cn("px-1 text-sm font-medium", messageColor)}>{message}</p>
            ) : null}
        </div>
    )
}
