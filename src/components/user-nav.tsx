"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Button,
} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import {
    Cog6ToothIcon as Settings,
    Squares2X2Icon as LayoutDashboard,
    ArrowRightStartOnRectangleIcon as LogOut,
} from "@heroicons/react/24/solid"
import { getConsumerAppUrl } from "@/lib/app-url"

export function UserNav() {
    const { data: session } = useSession()
    
    if (!session?.user) return null

    // Handle type casting for safe access
    const user = session.user as {
        name?: string | null
        email?: string | null
        image?: string | null
        avatar?: string | null
    }

    const getInitials = (name?: string | null) => {
        return name
            ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
            : 'U'
    }

    const consumerAppUrl = getConsumerAppUrl()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-lg overflow-hidden p-0">
                    <Avatar className="h-9 w-9 rounded-lg">
                        <AvatarImage src={user.image || user.avatar || ""} alt={user.name || "User"} />
                        <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild className="cursor-pointer p-3">
                    <a href={`${consumerAppUrl}/settings/profile`}>
                        <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-9 w-9 rounded-lg">
                                <AvatarImage src={user.image || user.avatar || ""} alt={user.name || "User"} />
                                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <a href={`${consumerAppUrl}/home`}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href={`${consumerAppUrl}/settings`}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

