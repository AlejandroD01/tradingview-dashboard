"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol?: string
  theme?: "light" | "dark"
  autosize?: boolean
  height?: number
  interval?: string
  withVolume?: boolean
}

// Track if TradingView script is loading or loaded
let tvScriptLoading = false
let tvScriptLoaded = false

export default function TradingViewChart({
  symbol = "NASDAQ:AAPL",
  theme = "light",
  autosize = true,
  height = 600,
  interval = "D",
  withVolume = true,
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null)
  const [widgetKey, setWidgetKey] = useState(Date.now())

  useEffect(() => {
    // Force re-render of widget when symbol or theme changes
    setWidgetKey(Date.now())
  }, [symbol, theme])

  useEffect(() => {
    if (!container.current) return

    const widgetId = `tradingview-chart-${symbol.replace(/[^a-zA-Z0-9]/g, "-")}-${widgetKey}`

    // Create a clean container for the widget
    const widgetContainer = document.createElement("div")
    widgetContainer.id = widgetId
    widgetContainer.style.height = autosize ? "100%" : `${height}px`
    widgetContainer.style.width = "100%"

    // Clear the container and append the new widget container
    container.current.innerHTML = ""
    container.current.appendChild(widgetContainer)

    const createWidget = () => {
      if (typeof window.TradingView !== "undefined" && document.getElementById(widgetId)) {
        try {
          new window.TradingView.widget({
            autosize,
            symbol,
            interval,
            timezone: "Etc/UTC",
            theme,
            style: "1",
            locale: "en",
            toolbar_bg: theme === "dark" ? "#2B2B43" : "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: widgetId,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: true,
            studies: withVolume
              ? ["Volume@tv-basicstudies", "RSI@tv-basicstudies", "MAExp@tv-basicstudies"]
              : ["RSI@tv-basicstudies", "MAExp@tv-basicstudies"],
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            withdateranges: true,
            hide_side_toolbar: false,
          })
        } catch (error) {
          console.error("Error initializing TradingView widget:", error)
        }
      }
    }

    const loadTradingViewScript = () => {
      // If script is already loaded, create widget
      if (tvScriptLoaded) {
        createWidget()
        return
      }

      // If script is loading, wait for it
      if (tvScriptLoading) {
        const checkIfLoaded = setInterval(() => {
          if (tvScriptLoaded) {
            clearInterval(checkIfLoaded)
            createWidget()
          }
        }, 100)
        return
      }

      // Start loading script
      tvScriptLoading = true

      const script = document.createElement("script")
      script.id = "tradingview-widget-script"
      script.src = "https://s3.tradingview.com/tv.js"
      script.type = "text/javascript"
      script.async = true
      script.onload = () => {
        tvScriptLoaded = true
        tvScriptLoading = false
        createWidget()
      }
      script.onerror = () => {
        tvScriptLoading = false
        console.error("Error loading TradingView script")
      }

      document.head.appendChild(script)
    }

    loadTradingViewScript()

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = ""
      }
    }
  }, [symbol, theme, autosize, height, interval, withVolume, widgetKey])

  return <div ref={container} style={{ height: autosize ? "100%" : `${height}px` }} className="w-full" />
}

// Add TradingView to the Window interface
declare global {
  interface Window {
    TradingView: any
  }
}

