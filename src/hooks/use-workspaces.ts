"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export type Workspace = {
  id: string
  name: string
  type: "personal" | "family"
  ownerId: string
  orgId?: string | null
  region: string
  settings?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
  organization?: {
    id: string
    name: string
    slug: string
  }
}

export function useWorkspaces() {
  const { data: session } = useSession()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.id) {
      setIsLoading(false)
      return
    }

    // Minimal implementation - return empty workspaces for marketing site
    setWorkspaces([])
    setIsLoading(false)
  }, [session])

  return {
    workspaces,
    isLoading,
    error: null,
  }
}

