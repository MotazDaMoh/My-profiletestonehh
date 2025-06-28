"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X, ArrowUpRight, AlertCircle } from "lucide-react" // Changed: Imported ArrowUpRight instead of Youtube
import { SkeletonLoader } from "./skeleton-loader"

type ChannelInput = {
  id: string // This is the channel handle
  team: string
}

type ChannelData = {
  status: "success"
  id: string
  name: string
  avatar: string
  subscribers: string
  team: string
  handle: string
}

type ChannelError = {
  status: "error"
  handle: string
  team: string
  error: string
}

type Channel = ChannelData | ChannelError

type FavoriteYouTubersProps = {
  channelsData: ChannelInput[]
  onClose: () => void
}

const teamColors: { [key: string]: string } = {
  "Team Falcons": "text-green-400",
  "Team Peakes": "text-sky-400",
}

const formatSubscribers = (count: string) => {
  if (!count) return "N/A"
  const num = Number.parseInt(count, 10)
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M subscribers`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K subscribers`
  }
  return `${num} subscribers`
}

const ChannelSkeleton = () => (
  <div className="flex items-center space-x-4 p-3">
    <SkeletonLoader className="h-12 w-12 rounded-full" />
    <div className="flex-grow space-y-2">
      <SkeletonLoader className="h-4 w-3/4" />
      <SkeletonLoader className="h-3 w-1/2" />
    </div>
  </div>
)

export default function FavoriteYouTubers({ channelsData, onClose }: FavoriteYouTubersProps) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChannels = async () => {
      setIsLoading(true)
      try {
        const channelDataPromises = channelsData.map(async (channelInput): Promise<Channel> => {
          try {
            const res = await fetch(`/api/youtube?handle=${channelInput.id}`)

            if (!res.ok) {
              const errorData = await res.json().catch(() => ({ error: "Failed to parse error response." }))
              throw new Error(errorData.error || `Request failed with status ${res.status}`)
            }

            const data = await res.json()
            return {
              status: "success",
              ...data,
              team: channelInput.team,
              handle: channelInput.id,
            }
          } catch (error: any) {
            console.error(`Failed to fetch channel handle ${channelInput.id}:`, error.message)
            return {
              status: "error",
              handle: channelInput.id,
              team: channelInput.team,
              error: "Channel not found or API error.",
            }
          }
        })
        const results = await Promise.all(channelDataPromises)
        setChannels(results)
      } catch (error) {
        console.error("Error fetching YouTube channels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChannels()
  }, [channelsData])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end bg-black/60 p-4 backdrop-blur-md md:items-center md:justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative flex h-[60%] w-full flex-col rounded-t-2xl bg-zinc-900/80 ring-1 ring-white/10 md:h-auto md:max-w-md md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-bold text-white">Favorite YouTubers</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: channelsData.length }).map((_, i) => (
                <ChannelSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {channels.map((channel, index) => (
                <li key={index}>
                  <a
                    href={channel.status === "success" ? `https://www.youtube.com/@${channel.handle}` : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-white/10"
                  >
                    {channel.status === "success" ? (
                      <>
                        <Image
                          src={channel.avatar || "/placeholder.svg"}
                          alt={channel.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{channel.name}</span>
                            <span className={`text-xs font-bold ${teamColors[channel.team] || "text-gray-400"}`}>
                              {channel.team}
                            </span>
                          </div>
                          <p className="text-sm text-white/60">{formatSubscribers(channel.subscribers)}</p>
                        </div>
                                      
                      </>
                    ) : (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                          <AlertCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <div className="flex-grow">
                          <span className="font-semibold text-white">{channel.handle}</span>
                          <p className="text-sm text-red-400">{channel.error}</p>
                        </div>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
