"use client"

import type React from "react"
import { useState, useEffect, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

interface Field {
  name: string
  value: string
  inline: boolean
}

interface EmbedData {
  webhook: {
    url: string
    name: string
    avatar: string
    content: string
  }
  embed: {
    title: string
    description: string
    url: string
    color: string
    timestamp: Date | null
    author: {
      name: string
      url: string
      icon_url: string
    }
    thumbnail: string
    image: string
    fields: Field[]
    footer: {
      text: string
      icon_url: string
    }
  }
}

const PreviewBadge = memo(function PreviewBadge() {
  return (
    <div className="absolute top-4 left-4 apple-vibrancy px-4 py-2 rounded-full z-10">
      <span className="apple-caption font-medium">معاينة</span>
    </div>
  )
})

const RenderFields = memo(function RenderFields({ fields }: { fields: Field[] }) {
  if (!fields.length) return null

  const fieldsCopy = [...fields]
  const rows: React.ReactNode[] = []
  let currentRow: Field[] = []

  fieldsCopy.forEach((field, index) => {
    currentRow.push(field)

    const isLastField = index === fieldsCopy.length - 1
    const isRowFull = currentRow.length === 3
    const hasNonInlineField = !field.inline

    if (isLastField || isRowFull || hasNonInlineField) {
      rows.push(
        <div
          key={`row-${index}`}
          className={`grid gap-4 mt-3 ${
            currentRow.length === 1 ? "grid-cols-1" : currentRow.length === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {currentRow.map((rowField, fieldIndex) => (
            <div key={`field-${index}-${fieldIndex}`} className="min-w-0 text-right">
              <div className="font-semibold text-sm text-white mb-1 break-words">{rowField.name}</div>
              <div className="text-sm text-[#dbdee1] whitespace-pre-wrap break-words leading-relaxed">
                {rowField.value}
              </div>
            </div>
          ))}
        </div>,
      )

      if (isRowFull || hasNonInlineField) {
        currentRow = []
      }
    }
  })

  return <div className="mt-4">{rows}</div>
})

const EmbedPreview = memo(function EmbedPreview({ embedData }: { embedData: EmbedData }) {
  const { webhook, embed } = embedData

  const [imageError, setImageError] = useState({
    thumbnail: false,
    image: false,
    authorIcon: false,
    footerIcon: false,
    avatar: false,
  })

  useEffect(() => {
    setImageError({
      thumbnail: false,
      image: false,
      authorIcon: false,
      footerIcon: false,
      avatar: false,
    })
  }, [embed.thumbnail, embed.image, embed.author.icon_url, embed.footer.icon_url, webhook.avatar])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleImageError = (type: keyof typeof imageError) => {
    setImageError((prev) => ({
      ...prev,
      [type]: true,
    }))
  }

  return (
    <Card className="apple-card-elevated overflow-hidden relative performance-optimized">
      <PreviewBadge />
      <CardContent className="p-0">
        <div className="bg-[#313338] text-[#dbdee1] p-6" dir="rtl">
          {/* Webhook Message Header */}
          <div className="flex items-start mb-4">
            <Avatar className="ml-4 h-10 w-10 flex-shrink-0">
              {webhook.avatar && !imageError.avatar ? (
                <AvatarImage
                  src={webhook.avatar || "/placeholder.svg"}
                  alt={webhook.name}
                  onError={() => handleImageError("avatar")}
                />
              ) : null}
              <AvatarFallback className="bg-[#5865F2] text-white font-semibold text-sm">
                {getInitials(webhook.name || "منشئ الرسائل المدمجة")}
              </AvatarFallback>
            </Avatar>
            <div className="text-right min-w-0 flex-1">
              <div className="font-semibold text-white text-base mb-1">{webhook.name || "منشئ الرسائل المدمجة"}</div>
              <div className="text-xs text-[#949ba4]">
                بوت • اليوم في {format(new Date(), "h:mm a", { locale: ar })}
              </div>
            </div>
          </div>

          {/* Webhook Content */}
          {webhook.content && (
            <div className="mb-4 break-words whitespace-pre-wrap text-right text-[#dbdee1] leading-relaxed">
              {webhook.content}
            </div>
          )}

          {/* Discord Embed */}
          <div
            className="border-r-4 rounded-md bg-[#2b2d31] p-4 mt-2 relative"
            style={{ borderRightColor: embed.color || "#007AFF" }}
          >
            {/* Author */}
            {embed.author.name && (
              <div className="flex items-center mb-3 justify-end">
                {embed.author.icon_url && !imageError.authorIcon && (
                  <Image
                    src={embed.author.icon_url || "/placeholder.svg"}
                    alt=""
                    width={24}
                    height={24}
                    className="ml-2 rounded-full object-cover flex-shrink-0"
                    onError={() => handleImageError("authorIcon")}
                    loading="lazy"
                  />
                )}
                {embed.author.url ? (
                  <a
                    href={embed.author.url}
                    className="text-sm font-medium text-white hover:underline break-words"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {embed.author.name}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-white break-words">{embed.author.name}</span>
                )}
              </div>
            )}

            {/* Title */}
            {embed.title && (
              <div className="mb-3 text-right">
                {embed.url ? (
                  <a
                    href={embed.url}
                    className="text-lg font-semibold text-white hover:underline break-words leading-tight"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {embed.title}
                  </a>
                ) : (
                  <div className="text-lg font-semibold text-white break-words leading-tight">{embed.title}</div>
                )}
              </div>
            )}

            {/* Description */}
            {embed.description && (
              <div className="text-sm text-[#dbdee1] whitespace-pre-wrap mb-4 text-right leading-relaxed break-words">
                {embed.description}
              </div>
            )}

            {/* Fields */}
            <RenderFields fields={embed.fields} />

            {/* Image */}
            {embed.image && !imageError.image && (
              <div className="mt-4">
                <Image
                  src={embed.image || "/placeholder.svg"}
                  alt=""
                  width={400}
                  height={300}
                  className="max-w-full h-auto rounded-md"
                  onError={() => handleImageError("image")}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            )}
            {embed.image && imageError.image && (
              <div className="mt-4 flex items-center justify-center bg-[#1e1f22] rounded-md p-6 text-[#949ba4]">
                <AlertCircle className="h-5 w-5 ml-2 flex-shrink-0" />
                <span className="text-sm">فشل في تحميل الصورة</span>
              </div>
            )}

            {/* Footer */}
            {(embed.footer.text || embed.timestamp) && (
              <div className="flex items-center mt-4 text-xs text-[#949ba4] justify-end">
                {embed.footer.icon_url && !imageError.footerIcon && (
                  <Image
                    src={embed.footer.icon_url || "/placeholder.svg"}
                    alt=""
                    width={20}
                    height={20}
                    className="ml-2 rounded-full object-cover flex-shrink-0"
                    onError={() => handleImageError("footerIcon")}
                    loading="lazy"
                  />
                )}
                <span className="break-words">
                  {embed.footer.text}
                  {embed.footer.text && embed.timestamp && " • "}
                  {embed.timestamp && format(embed.timestamp, "d MMMM yyyy", { locale: ar })}
                </span>
              </div>
            )}

            {/* Thumbnail */}
            {embed.thumbnail && !imageError.thumbnail && (
              <div className="absolute top-4 left-4">
                <Image
                  src={embed.thumbnail || "/placeholder.svg"}
                  alt=""
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                  onError={() => handleImageError("thumbnail")}
                  loading="lazy"
                />
              </div>
            )}
            {embed.thumbnail && imageError.thumbnail && (
              <div className="absolute top-4 left-4 w-20 h-20 bg-[#1e1f22] rounded-md flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-[#949ba4]" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

export default EmbedPreview
