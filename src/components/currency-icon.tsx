import { 
  DollarSign, 
  Euro, 
  PoundSterling, 
  JapaneseYen, 
  IndianRupee, 
  RussianRuble, 
  SwissFranc,
  Bitcoin,
  Coins
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LucideProps } from "lucide-react"

interface CurrencyIconProps extends LucideProps {
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
      return <DollarSign className={cn("h-4 w-4", className)} {...props} />
    case "EUR":
      return <Euro className={cn("h-4 w-4", className)} {...props} />
    case "GBP":
    case "EGP": // £
      return <PoundSterling className={cn("h-4 w-4", className)} {...props} />
    case "JPY":
    case "CNY": // ¥
      return <JapaneseYen className={cn("h-4 w-4", className)} {...props} />
    case "INR":
      return <IndianRupee className={cn("h-4 w-4", className)} {...props} />
    case "RUB":
      return <RussianRuble className={cn("h-4 w-4", className)} {...props} />
    case "CHF":
      return <SwissFranc className={cn("h-4 w-4", className)} {...props} />
    case "BTC":
      return <Bitcoin className={cn("h-4 w-4", className)} {...props} />
    // Fallback for others
    default:
      return <Coins className={cn("h-4 w-4", className)} {...props} />
  }
}

