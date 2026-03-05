import React from "react"
import {
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyYenIcon,
  CurrencyRupeeIcon,
  BanknotesIcon
} from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"

interface CurrencyIconProps extends React.SVGProps<SVGSVGElement> {
  currency: string
}

export function CurrencyIcon({ currency, className, ...props }: CurrencyIconProps) {
  const code = currency?.toUpperCase()
  
  switch (code) {
    case "USD":
    case "AUD":
    case "CAD":
    case "MXN":
    case "NZD":
    case "SGD":
    case "ARS":
    case "CLP":
    case "COP":
    case "BRL": // R$ - Dollar sign is close enough or use generic
      return <CurrencyDollarIcon className={cn("h-4 w-4", className)} {...props} />
    case "EUR":
      return <CurrencyEuroIcon className={cn("h-4 w-4", className)} {...props} />
    case "GBP":
    case "EGP": // £
      return <CurrencyPoundIcon className={cn("h-4 w-4", className)} {...props} />
    case "JPY":
    case "CNY": // ¥
      return <CurrencyYenIcon className={cn("h-4 w-4", className)} {...props} />
    case "INR":
      return <CurrencyRupeeIcon className={cn("h-4 w-4", className)} {...props} />
    case "RUB":
      return <BanknotesIcon className={cn("h-4 w-4", className)} {...props} />
    case "CHF":
      return <BanknotesIcon className={cn("h-4 w-4", className)} {...props} />
    case "BTC":
      return <CurrencyDollarIcon className={cn("h-4 w-4", className)} {...props} />
    // Fallback for others
    default:
      return <BanknotesIcon className={cn("h-4 w-4", className)} {...props} />
  }
}

