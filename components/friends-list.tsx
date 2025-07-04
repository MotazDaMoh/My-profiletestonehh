"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

const friends = [
  {
    name: "Abo Tasneem",
    username: "@abomeezo267",
    avatar: "https://i.postimg.cc/jqGjpCKP/2c9627ed5c58f037d0abb37f0361d666.webp",
    online: true,
  },
  {
    name: "Waseem",
    username: "@waseemoo2",
    avatar: "https://i.postimg.cc/ZKpq4ZKg/81ce5e316905e8ac26c79aa9b4f27f69.webp",
    online: false,
  },
  {
    name: "Naif",
    username: "@naifn",
    avatar: "https://i.postimg.cc/52J2tGXt/a644928c2ef6b51a23e47446038b7c92.png",
    online: false,
  },
]

type FriendsListProps = {
  onClose: () => void
}

export default function FriendsList({ onClose }: FriendsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-end bg-black/60 p-4 backdrop-blur-sm md:items-center md:justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="relative flex h-[60%] w-full flex-col rounded-t-2xl bg-[#18181b] md:h-auto md:max-w-md md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-bold text-white">Friends</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <ul className="space-y-2">
            {friends.map((friend) => (
              <li
                key={friend.name}
                className="flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-white/10"
              >
                <div className="relative">
                  <Image
                    src={friend.avatar || "/placeholder.svg"}
                    alt={friend.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {friend.online && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-[#18181b] bg-green-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <span className="font-semibold text-white">{friend.name}</span>
                  <p className="text-sm text-white/60">{friend.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
