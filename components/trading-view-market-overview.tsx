"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewMarketOverviewProps {
  width?: string | number
  height?: string | number
  colorTheme?: "light" | "dark"
  isTransparent?: boolean
  showChart?: boolean
  locale?: string
}

export default function TradingViewMarketOverview({
  width = "100%",
  height = 600,
  colorTheme = "light",
  isTransparent = false,
  showChart = true,
  locale = "en",
}: TradingViewMarketOverviewProps) {
  const container = useRef<HTMLDivElement>(null)
  const [widgetKey, setWidgetKey] = useState(Date.now())

  useEffect(() => {
    // Force re-render of widget when theme changes
    setWidgetKey(Date.now())
  }, [colorTheme])

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
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.type = "text/javascript"
    script.async = true

    // Create the widget configuration
    const widgetConfig = {
      colorTheme,
      dateRange: "12M",
      showChart,
      locale,
      largeChartUrl: "",
      isTransparent,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      width,
      height,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Indices",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500",
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "Nasdaq 100",
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow 30",
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225",
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index",
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "FTSE 100",
            },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Commodities",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500",
            },
            {
              s: "CME:6E1!",
              d: "Euro",
            },
            {
              s: "COMEX:GC1!",
              d: "Gold",
            },
            {
              s: "NYMEX:CL1!",
              d: "Crude Oil",
            },
            {
              s: "NYMEX:NG1!",
              d: "Natural Gas",
            },
            {
              s: "CBOT:ZC1!",
              d: "Corn",
            },
          ],
          originalTitle: "Commodities",
        },
        {
          title: "Bonds",
          symbols: [
            {
              s: "CME:GE1!",
              d: "Eurodollar",
            },
            {
              s: "CBOT:ZB1!",
              d: "T-Bond",
            },
            {
              s: "CBOT:UB1!",
              d: "Ultra T-Bond",
            },
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund",
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP",
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL",
            },
          ],
          originalTitle: "Bonds",
        },
        {
          title: "Forex",
          symbols: [
            {
              s: "FX:EURUSD",
              d: "EUR/USD",
            },
            {
              s: "FX:GBPUSD",
              d: "GBP/USD",
            },
            {
              s: "FX:USDJPY",
              d: "USD/JPY",
            },
            {
              s: "FX:USDCHF",
              d: "USD/CHF",
            },
            {
              s: "FX:AUDUSD",
              d: "AUD/USD",
            },
            {
              s: "FX:USDCAD",
              d: "USD/CAD",
            },
          ],
          originalTitle: "Forex",
        },
        {
          title: "Crypto",
          symbols: [
            {
              s: "BINANCE:BTCUSDT",
              d: "BTC/USDT",
            },
            {
              s: "BINANCE:ETHUSDT",
              d: "ETH/USDT",
            },
            {
              s: "BINANCE:SOLUSDT",
              d: "SOL/USDT",
            },
            {
              s: "BINANCE:BNBUSDT",
              d: "BNB/USDT",
            },
            {
              s: "BINANCE:ADAUSDT",
              d: "ADA/USDT",
            },
            {
              s: "BINANCE:DOGEUSDT",
              d: "DOGE/USDT",
            },
          ],
          originalTitle: "Crypto",
        },
      ],
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
  }, [colorTheme, isTransparent, showChart, locale, width, height, widgetKey])

  return <div className="tradingview-widget-container" ref={container}></div>
}

