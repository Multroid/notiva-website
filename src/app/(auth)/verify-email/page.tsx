"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react"
import { toast } from "sonner"

type VerificationStatus = "verifying" | "success" | "error"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<VerificationStatus>("verifying")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const data = searchParams.get("data")
        const token = searchParams.get("token")

        if (!data && !token) {
          setStatus("error")
          setMessage("No verification token provided")
          return
        }

        let verificationData: { token: string; newEmail: string } | null = null

        // Handle email change verification (with data parameter)
        if (data) {
          try {
            const decoded = Buffer.from(data, "base64url").toString("utf-8")
            verificationData = JSON.parse(decoded)
          } catch (error) {
            setStatus("error")
            setMessage("Invalid verification link")
            return
          }

          // Verify email change
          const response = await fetch("/api/user/email/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: verificationData.token,
              newEmail: verificationData.newEmail,
            }),
          })

          const result = await response.json()

          if (!response.ok) {
            throw new Error(result.error || "Verification failed")
          }

          setStatus("success")
          setMessage("Email successfully verified and updated!")
          toast.success("Email successfully verified!")

          // Redirect to profile after 3 seconds
          setTimeout(() => {
            router.push("/settings/profile")
          }, 3000)
        } 
        // Handle initial email verification (with token parameter)
        else if (token) {
          // Verify initial signup email
          const response = await fetch("/api/auth/verify-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          })

          const result = await response.json()

          if (!response.ok) {
            throw new Error(result.error || "Verification failed")
          }

          setStatus("success")
          setMessage(result.message || "Email successfully verified!")
          toast.success("Email verified!")

          setTimeout(() => {
            router.push("/home")
          }, 3000)
        }
      } catch (error) {
        console.error("Verification error:", error)
        setStatus("error")
        setMessage(error instanceof Error ? error.message : "Verification failed. Please try again.")
        toast.error("Verification failed")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {status === "verifying" && (
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            )}
            {status === "error" && (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "verifying" && "Verifying Your Email"}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>
            {status === "verifying" && "Please wait while we verify your email address..."}
            {status === "success" && message}
            {status === "error" && message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "verifying" && (
            <div className="flex justify-center py-8">
              <div className="space-y-2 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Processing...</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Redirecting you shortly...
              </p>
              <Button
                onClick={() => router.push("/settings/profile")}
                className="w-full"
              >
                Go to Profile
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/settings/profile")}
                  className="w-full"
                >
                  Back to Profile
                </Button>
                <Button
                  onClick={() => router.push("/support")}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}

