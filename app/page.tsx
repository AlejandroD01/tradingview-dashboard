import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "TradingView Financial Dashboard",
  description: "Real-time financial data dashboard with interactive TradingView widgets",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Dashboard />
    </main>
  )
}

