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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
    Settings,
    LayoutDashboard,
    LogOut,
    User
} from "lucide-react"

export function UserNav() {
    const { data: session } = useSession()
    const router = useRouter()
    
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
                <DropdownMenuItem 
                    onClick={() => router.push("/settings/profile")}
                    className="cursor-pointer p-3"
                >
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
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/home")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
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

