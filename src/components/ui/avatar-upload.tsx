"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CameraIcon, ArrowPathIcon, TrashIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  userName?: string | null
  onUploadSuccess?: (avatarUrl: string) => void
  onDeleteSuccess?: () => void
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-40 w-40"
}

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8"
}

export function AvatarUpload({
  currentAvatarUrl,
  userName,
  onUploadSuccess,
  onDeleteSuccess,
  size = "lg",
  className
}: AvatarUploadProps) {
  const { update } = useSession()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync local state with prop changes
  useEffect(() => {
    console.log("currentAvatarUrl prop changed to:", currentAvatarUrl)
    setAvatarUrl(currentAvatarUrl || null)
  }, [currentAvatarUrl])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("avatar", file)

      const response = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to upload avatar")
      }

      const data = await response.json()
      const newAvatarUrl = data.user.avatarUrl
      
      console.log("Avatar uploaded, new URL:", newAvatarUrl)
      setAvatarUrl(newAvatarUrl)
      setPreviewUrl(null)
      
      toast.success("Profile picture updated successfully!")
      
      // Call success callback to update parent component
      onUploadSuccess?.(newAvatarUrl)
      
      // Trigger session refresh to update avatar everywhere
      if (update) {
        await update()
      }
      
      // Delay reload slightly to ensure session is updated
      setTimeout(() => {
        window.location.reload()
      }, 800)
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload avatar")
      setPreviewUrl(null)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async () => {
    if (!avatarUrl) return

    setDeleting(true)
    try {
      const response = await fetch("/api/user/avatar", {
        method: "DELETE"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete avatar")
      }

      console.log("Avatar deleted successfully")
      setAvatarUrl(null)
      setPreviewUrl(null)
      
      toast.success("Profile picture removed successfully!")
      
      // Call delete callback to update parent component
      onDeleteSuccess?.()
      
      // Trigger session refresh to update avatar everywhere
      if (update) {
        await update()
      }
      
      // Delay reload slightly to ensure session is updated
      setTimeout(() => {
        window.location.reload()
      }, 800)
    } catch (error) {
      console.error("Error deleting avatar:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete avatar")
    } finally {
      setDeleting(false)
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const displayUrl = previewUrl || avatarUrl

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative group">
        <Avatar className={cn(sizeClasses[size], "border-2 border-border")}>
          <AvatarImage src={displayUrl || undefined} alt={userName || "User"} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>

        {/* Upload overlay on hover */}
        {!uploading && !deleting && (
          <div
            className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <CameraIcon className={cn("text-white", iconSizes[size])} />
          </div>
        )}

        {/* Loading overlay */}
        {(uploading || deleting) && (
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
            <ArrowPathIcon className={cn("text-white animate-spin", iconSizes[size])} />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
        >
          {uploading ? (
            <>
              <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
              {avatarUrl ? "Change" : "Upload"}
            </>
          )}
        </Button>

        {avatarUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={uploading || deleting}
          >
            {deleting ? (
              <>
                <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <TrashIcon className="h-4 w-4 mr-2" />
                Remove
              </>
            )}
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Recommended: Square image, at least 200x200px. Max size: 5MB.
      </p>
    </div>
  )
}

