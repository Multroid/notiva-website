"use client"

import * as React from "react"
import Image from "next/image"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { NotivaInputField } from "@/components/ui/notiva-input-field"
import { getApiAppUrl } from "@/lib/app-url"

export interface WaitlistDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
    title?: string
    description?: string
    buttonText?: string
    placeholder?: string
}

export function WaitlistDialog({
    open,
    onOpenChange,
    children,
    title = "Join the Notiva waitlist",
    description = "Be the first to know when Notiva launches. We'll send you early access, tips & tricks to manage your finances better, and exclusive offers.",
    buttonText = "Join waitlist",
    placeholder = "Enter your Email",
}: WaitlistDialogProps) {
    const [submitted, setSubmitted] = React.useState(false)
    const [pending, setPending] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (email: string) => {
        if (!email || pending) return
        setPending(true)
        setError(null)
        try {
            const res = await fetch(`${getApiAppUrl()}/waitlist/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "website" }),
            })
            const json = await res.json().catch(() => null)
            if (res.ok) {
                setSubmitted(true)
                return
            }
            if (res.status === 409) {
                setSubmitted(true)
                return
            }
            const message =
                json?.error?.message ?? "Something went wrong. Please try again."
            setError(message)
        } catch {
            setError("Network error. Please check your connection and try again.")
        } finally {
            setPending(false)
        }
    }

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            {children ? (
                <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
            ) : null}
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className={cn(
                        "fixed inset-0 z-50 bg-black/40 backdrop-blur-md",
                        "data-[state=open]:animate-waitlist-overlay-in",
                        "data-[state=closed]:animate-waitlist-overlay-out"
                    )}
                />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed inset-0 z-50 m-auto h-fit w-[calc(100%-32px)] max-w-[560px]",
                        "overflow-hidden rounded-[22px] border border-[#BBBBBB] bg-white",
                        "shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]",
                        "data-[state=open]:animate-waitlist-card-in",
                        "data-[state=closed]:animate-waitlist-card-out"
                    )}
                >
                    <DialogPrimitive.Close
                        className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full text-[#67696B] transition-colors hover:bg-[#F3F4F4] hover:text-[#101113] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0047BA]"
                        aria-label="Close"
                    >
                        <XMarkIcon className="size-5" />
                    </DialogPrimitive.Close>

                    <div className="flex flex-col gap-14 px-10 py-10 md:px-14">
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex size-[60px] items-center justify-center rounded-[12px] bg-[#0047BA]">
                                <Image
                                    src="/Logo/Notiva Logo transparent white.svg"
                                    alt="Notiva"
                                    width={28}
                                    height={28}
                                />
                            </div>

                            <div className="flex w-full flex-col gap-8">
                                <DialogPrimitive.Title className="font-bold text-[32px] leading-[48px] text-[#101113]">
                                    {title}
                                </DialogPrimitive.Title>
                                <DialogPrimitive.Description className="font-medium text-[18px] leading-[27px] text-[#898C8E]">
                                    {description}
                                </DialogPrimitive.Description>
                            </div>
                        </div>

                        {submitted ? (
                            <div className="rounded-lg border border-[#0047BA] bg-[#E6EDF8] px-4 py-4 font-medium text-[16px] leading-6 text-[#00358C]">
                                You&apos;re on the list. We&apos;ll be in touch soon.
                            </div>
                        ) : (
                            <NotivaInputField
                                placeholder={placeholder}
                                buttonText={buttonText}
                                onSubmit={handleSubmit}
                                pending={pending}
                                message={error}
                                messageTone="error"
                            />
                        )}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}
