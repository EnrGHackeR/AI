"use client"

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Home, Eye } from "lucide-react"

const defaultHourlyData = [
  { hour: "12am", visitors: 120 },
  { hour: "2am", visitors: 80 },
  { hour: "4am", visitors: 45 },
  { hour: "6am", visitors: 90 },
  { hour: "8am", visitors: 280 },
  { hour: "10am", visitors: 420 },
  { hour: "12pm", visitors: 380 },
  { hour: "2pm", visitors: 450 },
  { hour: "4pm", visitors: 520 },
  { hour: "6pm", visitors: 480 },
  { hour: "8pm", visitors: 350 },
  { hour: "10pm", visitors: 220 },
]

const defaultTopProperties = [
  { page: "Paris Apartment", visitors: 245 },
  { page: "Côte d'Azur Villa", visitors: 189 },
  { page: "Lyon Studio", visitors: 156 },
  { page: "Bordeaux House", visitors: 98 },
]

export function RealtimePropertyCard() {
  const [currentVisitors, setCurrentVisitors] = useState(847)
  const [pageViews, setPageViews] = useState(3420)
  const [hourlyData, setHourlyData] = useState(defaultHourlyData)
  const [topProperties, setTopProperties] = useState(defaultTopProperties)
  const [highlightedBar, setHighlightedBar] = useState(8)

  const maxVisitors = Math.max(...hourlyData.map((d) => d.visitors))

  // Animate visitor count
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVisitors((prev) => prev + Math.floor(Math.random() * 10) - 3)
      setPageViews((prev) => prev + Math.floor(Math.random() * 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Animate bar highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedBar((prev) => (prev + 1) % hourlyData.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [hourlyData.length])

  // Update hourly data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHourlyData((prev) =>
        prev.map((item) => ({
          ...item,
          visitors: Math.max(30, item.visitors + Math.floor(Math.random() * 40) - 20),
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Update top properties periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTopProperties((prev) =>
        prev.map((item) => ({
          ...item,
          visitors: Math.max(50, item.visitors + Math.floor(Math.random() * 20) - 10),
        })),
      )
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full rounded-2xl p-6 card-gradient"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-[#36B1C7]">Property Activity</h3>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2D55] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#C1121F]" />
          </span>
        </div>
        <span className="text-sm text-[#E8D8C3]/60">Live</span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <motion.div
          className="rounded-xl p-4 text-white"
          style={{ background: "linear-gradient(135deg, rgba(193, 18, 31, 0.3), rgba(255, 45, 85, 0.2))" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 opacity-60" />
            <p className="text-sm opacity-80">Viewing Now</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentVisitors}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-3xl font-bold"
            >
              {currentVisitors.toLocaleString()}
            </motion.p>
          </AnimatePresence>
        </motion.div>
        <motion.div
          className="rounded-xl p-4 text-white"
          style={{ background: "linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(138, 43, 226, 0.15))" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-4 h-4 opacity-60" />
            <p className="text-sm opacity-80">Property Views</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={pageViews}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-3xl font-bold"
            >
              {pageViews.toLocaleString()}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-[#E8D8C3]/70">Views Today</p>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: "#B8A89C" }}
                axisLine={false}
                tickLine={false}
                interval={1}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F2A44",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#FBF6EE",
                }}
              />
              <Bar dataKey="visitors" radius={[4, 4, 0, 0]}>
                {hourlyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === highlightedBar ? "#36B1C7" : entry.visitors === maxVisitors ? "#FF2D55" : "rgba(255,255,255,0.08)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-[#E8D8C3]/70">Trending Properties</p>
        <div className="space-y-2">
          {topProperties.map((property, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: "rgba(211,175,55,0.08)", x: 4 }}
            >
              <span className="text-sm text-[#E8D8C3]/70">{property.page}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={property.visitors}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm font-medium text-[#FBF6EE]"
                >
                  {property.visitors}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
