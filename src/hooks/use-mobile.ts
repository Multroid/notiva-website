import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Separate hook for detecting if app sidebar should be collapsed (tablets + small laptops)
// Uses 1024px breakpoint for full desktop experience
export function useIsCompactView() {
  const [isCompact, setIsCompact] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: 1023px)`) // Below 1024px (desktop breakpoint)
    const onChange = () => {
      setIsCompact(window.innerWidth < 1024)
    }
    mql.addEventListener("change", onChange)
    setIsCompact(window.innerWidth < 1024)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isCompact
}

