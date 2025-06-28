"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
// import { useSound } from "@/hooks/use-sound" // Removed import

type InteractiveBadgeProps = {
  src: string
  alt: string
  tooltip: string
}

export default function InteractiveBadge({ src, alt, tooltip }: InteractiveBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)
  // const playHoverSound = useSound("/sounds/hover-sound.mp3", 0.3) // Removed useSound hook

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)} // Removed playHoverSound() call
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.2, rotate: -5 }}
      className="relative"
    >
      <Image src={src || "/placeholder.svg"} alt={alt} width={24} height={24} />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs font-semibold text-white shadow-lg"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
