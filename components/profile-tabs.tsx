"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Tab = {
  id: string
  label: string
}

type ProfileTabsProps = {
  children: React.ReactNode[]
}

const tabs: Tab[] = [
  { id: "about", label: "About" },
  { id: "community", label: "Community" },
]

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren", // Animate parent before children
      staggerChildren: 0.1, // Stagger animation of children
    },
  },
}

export default function ProfileTabs({ children }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div>
      <div className="mb-4 flex space-x-1 rounded-lg bg-white/5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative w-full rounded-md px-3 py-1.5 text-sm font-medium text-white transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
            )}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white/10"
                style={{ borderRadius: 6 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => {
          if (tab.id === activeTab) {
            return (
              <motion.div key={tab.id} variants={tabContentVariants} initial="hidden" animate="visible">
                {children[index]}
              </motion.div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
