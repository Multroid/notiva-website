"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const form = e.currentTarget
      const emailInput = (form.elements.namedItem("email") as HTMLInputElement).value

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        toast.error(data.error || "Failed to send reset email")
        setLoading(false)
        return
      }

      setEmail(emailInput)
      setEmailSent(true)
      toast.success("Password reset email sent")
      
    } catch (error) {
      setLoading(false)
      console.error("Forgot password error:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="relative w-12 h-12">
            <Image 
              src="/Notiva-Logo.svg" 
              alt="Notiva Logo" 
              width={48}
              height={48}
              className="group-hover:scale-110 transition-transform duration-200 rounded-lg"
            />
          </div>
          <span className="text-3xl font-bold text-white">
            Notiva
          </span>
        </Link>

        <Card className="overflow-hidden border-2">
          <CardContent className="p-6 md:p-8">
            {!emailSent ? (
              <form onSubmit={onSubmit}>
                <FieldGroup>
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-muted-foreground text-balance">
                      Enter your email address and we'll send you a link to reset your password
                    </p>
                  </div>
                  
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  
                  <Field>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </Field>
                  
                  <FieldDescription className="text-center">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Back to Login
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Check Your Email</h1>
                  <p className="text-muted-foreground">
                    If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The link will expire in 1 hour.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => {
                        setEmailSent(false)
                        setLoading(false)
                      }}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      try again
                    </button>
                  </p>
                  
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

