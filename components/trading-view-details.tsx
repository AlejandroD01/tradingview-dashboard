"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewDetailsProps {
  symbol?: string
  width?: string | number
  height?: string | number
  colorTheme?: "light" | "dark"
  isTransparent?: boolean
}

export default function TradingViewDetails({
  symbol = "NASDAQ:AAPL",
  width = "100%",
  height = 400,
  colorTheme = "light",
  isTransparent = false,
}: TradingViewDetailsProps) {
  const container = useRef<HTMLDivElement>(null)
  const [widgetKey, setWidgetKey] = useState(Date.now())

  useEffect(() => {
    // Force re-render of widget when symbol or theme changes
    setWidgetKey(Date.now())
  }, [symbol, colorTheme])

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
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
    script.type = "text/javascript"
    script.async = true

    // Create the widget configuration
    const widgetConfig = {
      symbol,
      width,
      height,
      colorTheme,
      isTransparent,
      locale: "en",
      largeChartUrl: "",
      showVolume: true,
      showMA: true,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    }

    // Set the configuration as a JSON string
    script.innerHTML = JSON.stringify(widgetConfig)

    // Append the script to the widget container
    widgetContainer.appendChild(script)

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [symbol, width, height, colorTheme, isTransparent, widgetKey])

  return <div className="tradingview-widget-container" ref={container}></div>
}

