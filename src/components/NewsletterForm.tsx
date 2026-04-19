"use client"

import * as React from "react"
import { NotivaInputField, type NotivaInputFieldProps } from "@/components/ui/notiva-input-field"
import { getApiAppUrl } from "@/lib/app-url"

type NewsletterFormProps = Pick<
    NotivaInputFieldProps,
    "placeholder" | "buttonText" | "className"
> & {
    source?: string
}

export default function NewsletterForm({ source = "website", ...rest }: NewsletterFormProps) {
    const [pending, setPending] = React.useState(false)
    const [message, setMessage] = React.useState<string | null>(null)
    const [tone, setTone] = React.useState<"success" | "error">("success")
    const [done, setDone] = React.useState(false)

    const handleSubmit = async (email: string) => {
        if (!email || pending) return
        setPending(true)
        setMessage(null)
        try {
            const res = await fetch(`${getApiAppUrl()}/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source }),
            })
            const json = await res.json().catch(() => null)
            if (res.ok) {
                setTone("success")
                setMessage(
                    json?.data?.message ?? "Thanks! You're subscribed to the newsletter."
                )
                setDone(true)
                return
            }
            if (res.status === 409) {
                setTone("success")
                setMessage("You're already subscribed. Thanks!")
                setDone(true)
                return
            }
            setTone("error")
            setMessage(
                json?.error?.message ?? "Something went wrong. Please try again."
            )
        } catch {
            setTone("error")
            setMessage("Network error. Please check your connection and try again.")
        } finally {
            setPending(false)
        }
    }

    if (done) {
        return (
            <div className="rounded-lg border border-[#0047BA] bg-[#E6EDF8] px-4 py-3 font-medium text-base leading-6 text-[#00358C]">
                {message}
            </div>
        )
    }

    return (
        <NotivaInputField
            {...rest}
            onSubmit={handleSubmit}
            pending={pending}
            message={message}
            messageTone={tone}
        />
    )
}
