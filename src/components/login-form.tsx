"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { getLogoUrl, CompanyLogos } from "@/lib/logo-dev"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [providerLoading, setProviderLoading] = useState<string | null>(null)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const form = e.currentTarget
      const email = (form.elements.namedItem("email") as HTMLInputElement).value
      const password = (form.elements.namedItem("password") as HTMLInputElement).value
      const name = isRegisterMode ? (form.elements.namedItem("name") as HTMLInputElement).value : null
      const confirmPassword = isRegisterMode ? (form.elements.namedItem("confirmPassword") as HTMLInputElement).value : null

      if (isRegisterMode) {
        // Handle registration - store data and redirect to onboarding
        if (password !== confirmPassword) {
          toast.error("Passwords do not match")
          setLoading(false)
          return
        }
        
        // Store registration data in localStorage
        localStorage.setItem('pendingRegistration', JSON.stringify({
          name,
          email,
          password,
          timestamp: Date.now()
        }))
        
        // Redirect to onboarding page
        window.location.href = "/onboarding"
        return
      } else {
        // Handle login
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })
        
        setLoading(false)
        
        if (!res || res.error) {
          toast.error(res?.error === "CredentialsSignin" ? "Invalid email or password" : "Sign in failed")
          return
        }
        
        // Clear any pending registration data on successful login
        localStorage.removeItem('pendingRegistration')
        
        window.location.href = "/home"
      }
    } catch (error) {
      setLoading(false)
      console.error(isRegisterMode ? "Registration error:" : "Login error:", error)
      toast.error(`An error occurred during ${isRegisterMode ? "registration" : "sign in"}`)
    }
  }

  async function handleProvider(providerId: string) {
    setProviderLoading(providerId)
    try {
      const result = await signIn(providerId, { callbackUrl: "/home" })
      if (result?.error) {
        toast.error("Unable to sign in with that provider")
      }
    } catch {
      toast.error("Unable to sign in with that provider")
    } finally {
      setProviderLoading(null)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {isRegisterMode ? "Create Account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground text-balance">
              {isRegisterMode ? "Sign up for your Notiva account" : "Login to your Notiva account"}
            </p>
          </div>

          <div className="grid gap-6">
            {isRegisterMode && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isRegisterMode && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
              />
            </div>
            
            {isRegisterMode && (
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full"
            >
              {loading 
                ? (isRegisterMode ? "Creating account..." : "Signing in...") 
                : (isRegisterMode ? "Create Account" : "Login")
              }
            </Button>
          </div>
          
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => handleProvider("google")}
              disabled={Boolean(providerLoading)}
              className="gap-2"
            >
              <Image 
                src={getLogoUrl({ domain: CompanyLogos.GOOGLE, size: 32 })} 
                alt="Google" 
                width={16} 
                height={16}
                className="size-4"
              />
              <span className="sr-only">Login with Google</span>
              Google
            </Button>
            <Button 
              variant="outline" 
              type="button"
              onClick={() => handleProvider("apple")}
              disabled={Boolean(providerLoading)}
              className="gap-2"
            >
              <Image 
                src={getLogoUrl({ domain: CompanyLogos.APPLE, size: 32 })} 
                alt="Apple" 
                width={16} 
                height={16}
                className="size-4"
              />
              <span className="sr-only">Login with Apple</span>
              Apple
            </Button>
          </div>
          
          <div className="text-center text-sm">
            {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="underline underline-offset-4 hover:text-primary"
            >
              {isRegisterMode ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </form>
      
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link>{" "}
        and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
