"use client"

import { useState, FormEvent, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (!tokenParam) {
      toast.error("Invalid password reset link")
      router.push("/login")
    } else {
      setToken(tokenParam)
    }
  }, [searchParams, router])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!token) {
      toast.error("Invalid password reset link")
      return
    }
    
    setLoading(true)
    
    try {
      const form = e.currentTarget
      const password = (form.elements.namedItem("password") as HTMLInputElement).value
      const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value

      // Validate passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        setLoading(false)
        return
      }

      // Validate password length
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        setLoading(false)
        return
      }

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        toast.error(data.error || "Failed to reset password")
        setLoading(false)
        return
      }

      toast.success("Password reset successful! Redirecting to login...")
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
      
    } catch (error) {
      setLoading(false)
      console.error("Reset password error:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
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
          <span className="font-montserrat font-semibold text-[26px] uppercase tracking-[2px] text-white leading-none">
            Notiva
          </span>
        </Link>

        <Card className="overflow-hidden border-2">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={onSubmit}>
              <FieldGroup>
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-bold">Reset Password</h1>
                  <p className="text-muted-foreground text-balance">
                    Enter your new password below
                  </p>
                </div>
                
                <Field>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <FieldDescription>
                    Must be at least 6 characters
                  </FieldDescription>
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </Field>
                
                <Field>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Resetting Password..." : "Reset Password"}
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}

