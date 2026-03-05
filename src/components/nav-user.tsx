"use client"

import * as React from "react"
import {
  BellIcon as Bell,
  ChevronRightIcon as ChevronRight,
  HomeIcon as Home,
  ArrowRightStartOnRectangleIcon as LogOut,
  ComputerDesktopIcon as Monitor,
  MoonIcon as Moon,
  SparklesIcon as Sparkles,
  SunIcon as Sun,
  UserPlusIcon as UserPlus,
  ArrowPathIcon as Loader2,
} from "@heroicons/react/24/solid"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { PersonalTier } from "@prisma/client"
import {
  storeAccount,
  getStoredAccounts,
  removeAccount,
  getCurrentSessionToken,
  setSessionToken,
  type StoredAccount,
} from "@/lib/multi-account"
import { useWorkspaces } from "@/hooks/use-workspaces"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { data: session, update: updateSession } = useSession()
  const { toast } = useToast()
  const { userTier } = useWorkspaces()
  const [mounted, setMounted] = React.useState(false)
  const [savedAccounts, setSavedAccounts] = React.useState<StoredAccount[]>([])
  const [switching, setSwitching] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    loadSavedAccounts()
  }, [])

  // Store current account session when logged in
  React.useEffect(() => {
    if (session?.user && mounted) {
      const sessionToken = getCurrentSessionToken()
      if (sessionToken) {
        const userId = (session.user as { id?: string }).id
        if (userId) {
          const account: StoredAccount = {
            userId,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            sessionToken,
            expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
            lastUsed: Date.now(),
          }
          storeAccount(account)
          loadSavedAccounts()
        }
      }
    }
  }, [session, user, mounted])

  const loadSavedAccounts = () => {
    const accounts = getStoredAccounts()
    setSavedAccounts(accounts)
  }

  const handleLogout = async () => {
    // Remove current account from storage
    removeAccount(user.email)
    await signOut({ callbackUrl: "/login" })
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleAddAccount = () => {
    // Redirect to login page to add another account
    router.push('/login?add_account=true')
  }

  const handleSwitchAccount = async (account: StoredAccount) => {
    if (switching) return
    
    setSwitching(true)
    
    try {
      // Validate the stored session token
      const response = await fetch('/api/auth/switch-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionToken: account.sessionToken,
        }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        
        if (error.error === 'Session has expired' || error.error === 'Invalid session token') {
          // Session expired, remove from storage and redirect to login
          removeAccount(account.email)
          loadSavedAccounts()
          
          toast({
            title: "Session Expired",
            description: "Please sign in again to continue.",
            variant: "destructive",
          })
          
          router.push(`/login?email=${encodeURIComponent(account.email)}`)
          return
        }
        
        throw new Error(error.error || 'Failed to switch account')
      }
      
      // Set the session token cookie
      setSessionToken(account.sessionToken)
      
      // Update the session
      await updateSession()
      
      // Store updated last used time
      storeAccount({
        ...account,
        lastUsed: Date.now(),
      })
      
      toast({
        title: "Account Switched",
        description: `Switched to ${account.name}`,
      })
      
      // Refresh the page to reload with new session
      router.refresh()
      
    } catch (error) {
      console.error('Error switching account:', error)
      toast({
        title: "Switch Failed",
        description: error instanceof Error ? error.message : "Failed to switch account",
        variant: "destructive",
      })
    } finally {
      setSwitching(false)
    }
  }

  // Generate initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Filter out current user from saved accounts
  const otherAccounts = savedAccounts.filter(acc => acc.email !== user.email)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={isCollapsed ? user.name : undefined}
              className={cn(
                "h-14 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                "hover:bg-muted/50 transition-colors",
                isCollapsed && "h-8 w-8 p-0 justify-center"
              )}
            >
              <Avatar className={cn("rounded-lg bg-muted", isCollapsed ? "h-7 w-7" : "h-9 w-9")}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className={cn("rounded-lg bg-muted text-muted-foreground", isCollapsed && "text-xs")}>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={() => handleNavigation("/settings/profile")}
              className="cursor-pointer p-2"
            >
              <div className="flex items-center gap-2 w-full">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            {/* Account Switching Section */}
            {otherAccounts.length > 0 && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider px-2 py-1.5">
                    Switch Account
                  </DropdownMenuLabel>
                  {otherAccounts.slice(0, 3).map((account) => (
                    <DropdownMenuItem
                      key={account.email}
                      onClick={() => handleSwitchAccount(account)}
                      className="cursor-pointer"
                      disabled={switching}
                    >
                      <Avatar className="h-6 w-6 rounded-lg mr-2">
                        <AvatarImage src={account.avatar} alt={account.name} />
                        <AvatarFallback className="rounded-lg text-xs">
                          {getInitials(account.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{account.name}</span>
                        <span className="text-xs text-muted-foreground">{account.email}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
            
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleAddAccount}
                className="cursor-pointer"
                disabled={switching}
              >
                <UserPlus />
                Add Account
              </DropdownMenuItem>
              
              {switching && (
                <DropdownMenuItem disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Switching account...
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => handleNavigation("/")}
                className="cursor-pointer"
              >
                <Home />
                Go to Homepage
              </DropdownMenuItem>
              {userTier === PersonalTier.FREE && (
                <DropdownMenuItem 
                  onClick={() => handleNavigation("/pricing")}
                  className="cursor-pointer"
                >
                  <Sparkles className="text-amber-500" />
                  Upgrade to Pro
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => handleNavigation("/notifications")}
                className="cursor-pointer"
              >
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider px-0 mb-2">
                Appearance
              </DropdownMenuLabel>
              {mounted ? (
                <TooltipProvider>
                  <ToggleGroup 
                    type="single" 
                    value={theme}
                    onValueChange={(value) => {
                      if (value) setTheme(value)
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ToggleGroupItem 
                          value="light" 
                          aria-label="Light mode"
                          className="flex-1 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=on]:!border-primary"
                        >
                          <Sun className="h-4 w-4" />
                        </ToggleGroupItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Light</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ToggleGroupItem 
                          value="dark" 
                          aria-label="Dark mode"
                          className="flex-1 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=on]:!border-primary"
                        >
                          <Moon className="h-4 w-4" />
                        </ToggleGroupItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dark</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ToggleGroupItem 
                          value="system" 
                          aria-label="System mode"
                          className="flex-1 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=on]:!border-primary"
                        >
                          <Monitor className="h-4 w-4" />
                        </ToggleGroupItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>System</p>
                      </TooltipContent>
                    </Tooltip>
                  </ToggleGroup>
                </TooltipProvider>
              ) : (
                <div className="h-9 w-full animate-pulse bg-muted rounded-md" />
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer"
              variant="destructive"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
