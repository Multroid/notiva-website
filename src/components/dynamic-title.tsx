"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Map of path segments to display names (matching breadcrumb)
const pathMap: Record<string, string> = {
  // App pages
  home: "Home",
  dashboard: "Home", // Legacy support
  subscriptions: "Subscriptions",
  "all-subscriptions": "All Subscriptions",
  new: "Add New",
  import: "Import",
  documents: "Documents",
  library: "Library",
  templates: "Templates",
  calendar: "Calendar",
  deadlines: "Deadlines List",
  automations: "Automations",
  reports: "Reports",
  "spend-analysis": "Spending",
  renewals: "Renewals Forecast",
  compliance: "Compliance",
  integrations: "Integrations",
  members: "Members",
  invite: "Invite",
  roles: "Roles & Permissions",
  settings: "Settings",
  profile: "Profile",
  workspace: "Workspace",
  billing: "Billing & Plan",
  help: "Help Center",
  support: "Support",
  roadmap: "Roadmap & Changelog",
  contact: "Contact Support",
  notifications: "Notifications",
  search: "Search",
  reminders: "Reminders",
  expenses: "Expenses",
  workspaces: "Workspaces",
  organizations: "Organizations",
  folders: "Folders",
  sessions: "Active Sessions",
  preferences: "Preferences",
  debug: "Debug",
  "google-calendar": "Google Calendar",
  // Marketing pages
  pricing: "Pricing",
  features: "Features",
  "document-vault": "Document Vault",
  "calendar-sync": "Calendar Sync",
  collaboration: "Collaboration",
  security: "Security",
  "use-cases": "Use Cases",
  individuals: "For Individuals",
  families: "For Families",
  "teams-startups": "For Teams & Startups",
  enterprise: "Enterprise",
  blog: "Blog",
  compare: "Compare",
  about: "About",
  company: "Company",
  careers: "Careers",
  press: "Press",
  login: "Login",
  register: "Sign Up",
  // Admin pages
  admin: "Admin Panel",
}

// Routes in the (notiva) route group ship their own full titles
// ("Notiva · Warteliste", "Notiva · Hoodie ✦", …) from `metadata` and from the
// language toggle. This component must not overwrite them.
const OWN_TITLE_PREFIXES = [
  "/",
  "/for-investors",
  "/support",
  "/merch",
  "/basket",
]

function ownsItsTitle(pathname: string): boolean {
  return OWN_TITLE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

export function DynamicTitle() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && ownsItsTitle(pathname)) {
      return
    }

    // Function to update the title
    const updateTitle = () => {
      // Don't update if pathname isn't ready
      if (!pathname) {
        return
      }

      // Split pathname and filter out empty strings
      const segments = pathname.split('/').filter(Boolean)
      
      // Root "/" page - keep it as just "Notiva"
      if (segments.length === 0 || pathname === '/') {
        document.title = "Notiva"
        return
      }

      // Get the last segment for the page name
      const lastSegment = segments[segments.length - 1]
      
      // Check if it's a UUID (for dynamic routes like [id])
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lastSegment)
      
      let pageName: string
      
      if (isUuid && segments.length > 1) {
        // Use the parent segment name if the current segment is an ID
        const parentSegment = segments[segments.length - 2]
        pageName = pathMap[parentSegment] || parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1)
      } else {
        // Use the last segment name
        pageName = pathMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
      }

      // Update title with page name
      if (pageName) {
        document.title = `Notiva - ${pageName}`
      }
    }

    // Run immediately
    updateTitle()
    
    // Also run after a short delay to ensure it runs after any Next.js metadata hydration
    const timeoutId = setTimeout(updateTitle, 100)
    
    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}

