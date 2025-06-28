"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronRight, Moon, Users, YoutubeIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import FriendsList from "./friends-list"
import FavoriteYouTubers from "./favorite-youtubers"
import InteractiveBadge from "./interactive-badge"
import ProfileTabs from "./profile-tabs"

const favoriteYouTubersData = [
  { id: "opiilz", team: "Team Falcons" },
  { id: "aziz14", team: "Team Falcons" },
  { id: "bo3omar22", team: "Team Falcons" },
  { id: "ocmz", team: "Team Peakes" },
  { id: "mohammed-oden", team: "Team Falcons" },
]

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const Stat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div>
    <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</h2>
    <div className="flex items-center space-x-2 text-sm text-gray-200">
      <Icon className="h-4 w-4 text-gray-400" />
      <span>{value}</span>
    </div>
  </div>
)

export default function UserProfilePage() {
  const [isFriendsListVisible, setIsFriendsListVisible] = useState(false)
  const [isYouTubersListVisible, setIsYouTubersListVisible] = useState(false)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md rounded-3xl bg-zinc-900/70 p-1 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl md:max-w-4xl"
    >
      <div className="rounded-[22px] bg-zinc-900 p-4 sm:p-6">
        <div className="relative h-36 w-full rounded-2xl sm:h-48 md:h-64">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86_20250628_124606_%D9%A0%D9%A0%D9%A0%D9%A0-CtRS8eEvVjwJP98jFpC6etKkii93wi.png"
            alt="User Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-zinc-900/50 to-transparent" />
        </div>

        <div className="relative -mt-12 px-2 sm:-mt-16 sm:px-4">
          <div className="flex flex-col items-center md:grid md:grid-cols-3 md:items-start md:gap-8">
            {/* Left Column (Avatar & Info) */}
            <motion.div variants={itemVariants} className="flex flex-col items-center md:col-span-1 md:items-start">
              <div className="relative h-24 w-24 rounded-full border-4 border-zinc-900 sm:h-32 sm:w-32 md:h-40 md:w-40">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MOTAZ_20250628_114511_%D9%A0%D9%A0%D9%A0%D9%A0-oCAJSjR4AaFAZ6W0aw24B0MariFv0w.png"
                  alt="User Avatar"
                  layout="fill"
                  className="rounded-full"
                />
                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 ring-2 ring-zinc-900 sm:h-8 sm:w-8">
                  <Moon className="h-4 w-4 text-yellow-400 sm:h-5 sm:w-5" />
                </div>
              </div>

              <div className="mt-3 w-full text-center md:text-left">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">MotazDarawsha</h1>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:justify-start">
                  <InteractiveBadge src="/badges/bug-hunter.svg" alt="Bug Hunter Badge" tooltip="Bug Hunter" />
                  <InteractiveBadge src="/badges/nitro-booster.svg" alt="Nitro Booster Badge" tooltip="Nitro Booster" />
                  <InteractiveBadge src="/badges/partner.svg" alt="Partner Badge" tooltip="Partner" />
                  <InteractiveBadge
                    src="/badges/hypesquad-emerald.svg"
                    alt="Hypesquad Emerald Badge"
                    tooltip="HypeSquad Emerald"
                  />
                </div>
                <div className="mt-3 flex items-center justify-center space-x-2 text-sm text-gray-400 md:justify-start">
                  <Image src="/badges/username-icon.png" alt="Username Icon" width={16} height={16} />
                  <span className="font-medium text-gray-300">91jq</span>
                  <span className="text-gray-500">•</span>
                  <span>Design & Dev</span>
                </div>
              </div>

              <Button
                asChild
                className="mt-4 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-2.5 text-base font-semibold text-white transition-transform duration-200 hover:scale-105 sm:mt-6"
              >
                <a href="https://discord.com/users/9199" target="_blank" rel="noopener noreferrer">
                  Add Me
                </a>
              </Button>
            </motion.div>

            {/* Right Column (Details with Tabs) */}
            <motion.div variants={containerVariants} className="mt-6 w-full md:col-span-2 md:mt-4">
              <ProfileTabs>
                {/* About Tab Content */}
                <div className="space-y-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <motion.div variants={itemVariants}>
                    <h2 className="mb-2 text-sm font-semibold text-gray-400">About Me</h2>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Ayo, name&apos;s Motaz.
                      <br />
                      Straight outta Palestine.
                      <br />I be into dev stuff and makin&apos; designs, ya feel me?
                    </p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="border-t border-white/10 pt-4">
                    <Stat icon={MessageCircle} label="Member Since" value="Jun 20, 2025" />
                  </motion.div>
                </div>

                {/* Community Tab Content */}
                <div className="space-y-3">
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ y: -2, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFriendsListVisible(true)}
                    className="flex w-full origin-center items-center justify-between rounded-xl bg-white/5 p-4 text-left ring-1 ring-white/10 transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      
                      <h2 className="font-semibold text-gray-200">Your Friends</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>

                  <motion.button
                    variants={itemVariants}
                    whileHover={{ y: -2, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsYouTubersListVisible(true)}
                    className="flex w-full origin-center items-center justify-between rounded-xl bg-white/5 p-4 text-left ring-1 ring-white/10 transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      
                      <h2 className="font-semibold text-gray-200">Favorite YouTuber</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.button>
                </div>
              </ProfileTabs>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFriendsListVisible && <FriendsList onClose={() => setIsFriendsListVisible(false)} />}
        {isYouTubersListVisible && (
          <FavoriteYouTubers channelsData={favoriteYouTubersData} onClose={() => setIsYouTubersListVisible(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
