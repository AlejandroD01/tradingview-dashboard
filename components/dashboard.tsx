"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TradingViewChart from "@/components/trading-view-chart"
import TradingViewTicker from "@/components/trading-view-ticker"
import TradingViewDetails from "@/components/trading-view-details"
import TradingViewMarketOverview from "@/components/trading-view-market-overview"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"

const popularSymbols = [
  { value: "NASDAQ:AAPL", label: "Apple Inc." },
  { value: "NASDAQ:MSFT", label: "Microsoft Corp." },
  { value: "NASDAQ:AMZN", label: "Amazon.com Inc." },
  { value: "NASDAQ:GOOGL", label: "Alphabet Inc." },
  { value: "NASDAQ:META", label: "Meta Platforms Inc." },
  { value: "NYSE:TSLA", label: "Tesla Inc." },
  { value: "BINANCE:BTCUSDT", label: "Bitcoin / USD" },
  { value: "BINANCE:ETHUSDT", label: "Ethereum / USD" },
]

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL")
  const { theme } = useTheme()
  const currentTheme = theme === "system" ? "light" : theme

  useEffect(() => {
    // Simulate loading time for widgets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Real-time market data powered by TradingView</p>
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full h-[65px] rounded-lg" />
        ) : (
          <TradingViewTicker colorTheme={currentTheme as "light" | "dark"} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full">
          <Tabs defaultValue="chart" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="overview">Market Overview</TabsTrigger>
              </TabsList>

              <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Select Symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularSymbols.map((symbol) => (
                      <SelectItem key={symbol.value} value={symbol.value}>
                        {symbol.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="chart" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Chart</CardTitle>
                  <CardDescription>Interactive TradingView chart with technical indicators</CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  {isLoading ? (
                    <Skeleton className="w-full h-[600px]" />
                  ) : (
                    <TradingViewChart symbol={selectedSymbol} theme={currentTheme as "light" | "dark"} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Symbol Details</CardTitle>
                  <CardDescription>Detailed information about {selectedSymbol.split(":")[1]}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  {isLoading ? (
                    <Skeleton className="w-full h-[400px]" />
                  ) : (
                    <TradingViewDetails symbol={selectedSymbol} colorTheme={currentTheme as "light" | "dark"} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Market Overview</CardTitle>
                  <CardDescription>Overview of major market indices and stocks</CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  {isLoading ? (
                    <Skeleton className="w-full h-[600px]" />
                  ) : (
                    <TradingViewMarketOverview colorTheme={currentTheme as "light" | "dark"} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Gainers</CardTitle>
            <CardDescription>Stocks with the highest daily gains</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden rounded-b-lg">
            {isLoading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : (
              <TradingViewChart symbol="NASDAQ:TSLA" height={400} theme={currentTheme as "light" | "dark"} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Crypto Market</CardTitle>
            <CardDescription>Major cryptocurrencies performance</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden rounded-b-lg">
            {isLoading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : (
              <TradingViewChart symbol="BINANCE:BTCUSDT" height={400} theme={currentTheme as "light" | "dark"} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

