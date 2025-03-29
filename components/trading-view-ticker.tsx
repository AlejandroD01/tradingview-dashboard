"use client"

import { useEffect, useRef } from "react"

interface TradingViewTickerProps {
  symbols?: string[]
  colorTheme?: "light" | "dark"
  isTransparent?: boolean
}

export default function TradingViewTicker({
  symbols = [
    "NASDAQ:AAPL",
    "NASDAQ:MSFT",
    "NASDAQ:AMZN",
    "NASDAQ:GOOGL",
    "NASDAQ:META",
    "NYSE:TSLA",
    "FOREXCOM:SPXUSD",
    "FOREXCOM:NSXUSD",
    "BINANCE:BTCUSDT",
    "BINANCE:ETHUSDT",
  ],
  colorTheme = "light",
  isTransparent = false,
}: TradingViewTickerProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

    // Clear any existing content
    container.current.innerHTML = ""

    // Create the widget container div
    const widgetContainer = document.createElement("div")
    widgetContainer.className = "tradingview-widget-container__widget"
    container.current.appendChild(widgetContainer)

    // Create the script element
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.type = "text/javascript"
    script.async = true

    // Create the widget configuration
    const config = {
      symbols: symbols.map((symbol) => ({
        proName: symbol,
        title: symbol.split(":")[1] || symbol,
      })),
      showSymbolLogo: true,
      colorTheme,
      isTransparent,
      displayMode: "adaptive",
      locale: "en",
    }

    // Set the configuration as a JSON string
    script.innerHTML = JSON.stringify(config)

    // Append the script to the widget container
    widgetContainer.appendChild(script)

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [symbols, colorTheme, isTransparent])

  return <div className="tradingview-widget-container" ref={container}></div>
}

