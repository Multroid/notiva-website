"use client"

import { ChevronRightIcon as ChevronRight } from "@heroicons/react/24/solid"
import React from "react"

type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>>
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useUpgrade } from "@/contexts/upgrade-context"
import { UpgradeReason } from "@/components/upgrade-modal"

export function NavMainCategorized({
  categories,
}: {
  categories: {
    title: string
    items: {
      title: string
      url: string
      icon: HeroIcon
      isActive?: boolean
      disabled?: boolean
      items?: {
        title: string
        url: string
        disabled?: boolean
      }[]
    }[]
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { showUpgradeModal } = useUpgrade()
  
  // Helper function to check if a path is active
  const isPathActive = (url: string, subItems?: { url: string }[]) => {
    // Exact match
    if (pathname === url) return true
    
    // Check if current path starts with the url (for nested routes)
    if (pathname.startsWith(url + '/')) return true
    
    // Check sub-items
    if (subItems) {
      return subItems.some(subItem => 
        pathname === subItem.url || pathname.startsWith(subItem.url + '/')
      )
    }
    
    return false
  }
  
  // Track which dropdowns are open - initialize with active items to match server
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(() => {
    const initialSet = new Set<string>()
    categories.forEach(category => {
      category.items.forEach(item => {
        if (isPathActive(item.url, item.items)) {
          initialSet.add(item.title)
        }
      })
    })
    return initialSet
  })

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle)
      } else {
        newSet.add(itemTitle)
      }
      return newSet
    })
  }

  const handleLinkClick = (e: React.MouseEvent, url: string, disabled?: boolean, title?: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Check if this is a disabled/upgrade link
    if (disabled && url === "/pricing") {
      // Show upgrade modal based on feature
      let upgradeReason: UpgradeReason | undefined
      
      if (title?.includes("Report") || title?.includes("Analytics")) {
        upgradeReason = "analytics"
      } else if (title?.includes("Import")) {
        upgradeReason = "bulk_import"
      }
      
      showUpgradeModal(upgradeReason, title)
      return
    }
    
    // Normal navigation
    router.push(url)
  }

  return (
    <>
      {categories.map((category) => (
        <SidebarGroup key={category.title}>
          <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
          <SidebarMenu>
            {category.items.map((item) => (
              <Collapsible 
                key={item.title} 
                asChild 
                open={openDropdowns.has(item.title)}
                onOpenChange={() => {}} // Prevent auto-closing
              >
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={isPathActive(item.url, item.items)}
                  >
                    <a 
                      href={item.url} 
                      onClick={(e) => handleLinkClick(e, item.url, item.disabled, item.title)}
                    >
                      <item.icon />
                      <span suppressHydrationWarning>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild onClick={() => toggleDropdown(item.title)}>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={pathname === subItem.url || pathname.startsWith(subItem.url + '/')}
                              >
                                <a 
                                  href={subItem.url} 
                                  onClick={(e) => handleLinkClick(e, subItem.url, subItem.disabled, subItem.title)}
                                >
                                  <span suppressHydrationWarning>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
