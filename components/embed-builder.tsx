"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmbedPreview from "@/components/embed-preview"
import { CodeExamples } from "@/components/code-examples"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  Check,
  Copy,
  Info,
  Loader2,
  MessageSquare,
  Plus,
  RefreshCw,
  Trash2,
  X,
  Code,
  Eye,
  Settings,
  User,
  Grid,
  FileText,
} from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"
import { Progress } from "@/components/ui/progress"

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

interface StatusMessage {
  type: "success" | "error" | "loading" | "info" | null
  message: string
  details?: string
  timestamp?: Date
  messageId?: string
  channelId?: string
  progress?: number
}

const webhookUrlPattern = /https:\/\/discord\.com\/api\/webhooks\/(\d+)\/([a-zA-Z0-9_-]+)/

export function EmbedBuilder() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [showPreview, setShowPreview] = useState(false)
  const [statusMessage, setStatusMessage] = useState<StatusMessage>({
    type: null,
    message: "",
  })

  const [embedData, setEmbedData] = useState<EmbedData>({
    webhook: {
      url: "",
      name: "منشئ الرسائل المدمجة",
      avatar: "",
      content: "",
    },
    embed: {
      title: "عنوان الرسالة المدمجة",
      description: "هذا مثال على وصف الرسالة المدمجة في ديسكورد. يمكنك تخصيصها باستخدام المحرر على اليسار.",
      url: "",
      color: "#007AFF", // Apple System Blue
      timestamp: null,
      author: {
        name: "",
        url: "",
        icon_url: "",
      },
      thumbnail: "",
      image: "",
      fields: [],
      footer: {
        text: "",
        icon_url: "",
      },
    },
  })

  const [sendButtonState, setSendButtonState] = useState<"ready" | "confirm" | "sending" | "success" | "failed">(
    "ready",
  )

  // Show initial help message
  useEffect(() => {
    setStatusMessage({
      type: "info",
      message: "مرحباً بك في منشئ الرسائل المدمجة!",
      details: "ابدأ بإدخال رابط الويب هوك وتخصيص رسالتك المدمجة باستخدام التبويبات أدناه.",
      timestamp: new Date(),
    })

    const timer = setTimeout(() => {
      setStatusMessage((prev) => {
        if (prev.type === "info" && prev.message === "مرحباً بك في منشئ الرسائل المدمجة!") {
          return { type: null, message: "" }
        }
        return prev
      })
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleWebhookChange = (key: string, value: string) => {
    setEmbedData({
      ...embedData,
      webhook: {
        ...embedData.webhook,
        [key]: value,
      },
    })
  }

  const handleEmbedChange = (key: string, value: string | Date | null) => {
    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        [key]: value,
      },
    })
  }

  const handleAuthorChange = (key: string, value: string) => {
    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        author: {
          ...embedData.embed.author,
          [key]: value,
        },
      },
    })
  }

  const handleFooterChange = (key: string, value: string) => {
    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        footer: {
          ...embedData.embed.footer,
          [key]: value,
        },
      },
    })
  }

  const addField = () => {
    if (embedData.embed.fields.length >= 25) {
      toast({
        title: "تم الوصول للحد الأقصى",
        description: "ديسكورد يسمح بحد أقصى 25 حقل لكل رسالة مدمجة.",
        variant: "destructive",
      })
      return
    }

    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        fields: [
          ...embedData.embed.fields,
          {
            name: "اسم الحقل",
            value: "قيمة الحقل",
            inline: true,
          },
        ],
      },
    })
  }

  const updateField = (index: number, key: string, value: string | boolean) => {
    const updatedFields = [...embedData.embed.fields]
    updatedFields[index] = {
      ...updatedFields[index],
      [key]: value,
    }

    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        fields: updatedFields,
      },
    })
  }

  const removeField = (index: number) => {
    const updatedFields = [...embedData.embed.fields]
    updatedFields.splice(index, 1)

    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        fields: updatedFields,
      },
    })
  }

  const moveFieldUp = (index: number) => {
    if (index <= 0) return

    const updatedFields = [...embedData.embed.fields]
    const temp = updatedFields[index]
    updatedFields[index] = updatedFields[index - 1]
    updatedFields[index - 1] = temp

    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        fields: updatedFields,
      },
    })
  }

  const moveFieldDown = (index: number) => {
    if (index >= embedData.embed.fields.length - 1) return

    const updatedFields = [...embedData.embed.fields]
    const temp = updatedFields[index]
    updatedFields[index] = updatedFields[index + 1]
    updatedFields[index + 1] = temp

    setEmbedData({
      ...embedData,
      embed: {
        ...embedData.embed,
        fields: updatedFields,
      },
    })
  }

  const clearStatusMessage = () => {
    setStatusMessage({
      type: null,
      message: "",
    })
  }

  const copyWebhookUrl = () => {
    if (!embedData.webhook.url) {
      toast({
        title: "لا يوجد رابط ويب هوك",
        description: "يرجى إدخال رابط الويب هوك أولاً.",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard
      .writeText(embedData.webhook.url)
      .then(() => {
        toast({
          title: "تم النسخ!",
          description: "تم نسخ رابط الويب هوك إلى الحافظة.",
        })
      })
      .catch(() => {
        toast({
          title: "فشل في النسخ",
          description: "لم يتم نسخ الرابط. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        })
      })
  }

  const validateWebhookUrl = (url: string): boolean => {
    return webhookUrlPattern.test(url)
  }

  const validateUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return true
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const validateEmbedData = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (embedData.webhook.name.toLowerCase().includes("discord")) {
      errors.push("اسم الويب هوك لا يمكن أن يحتوي على كلمة 'discord' (سياسة ديسكورد)")
    }

    if (!embedData.webhook.url) {
      errors.push("رابط الويب هوك مطلوب")
    } else if (!validateWebhookUrl(embedData.webhook.url)) {
      errors.push("تنسيق رابط الويب هوك غير صحيح")
    }

    if (embedData.embed.title.length > 256) {
      errors.push("عنوان الرسالة المدمجة لا يمكن أن يتجاوز 256 حرف")
    }

    if (embedData.embed.description.length > 4096) {
      errors.push("وصف الرسالة المدمجة لا يمكن أن يتجاوز 4096 حرف")
    }

    if (embedData.webhook.content.length > 2000) {
      errors.push("محتوى الرسالة لا يمكن أن يتجاوز 2000 حرف")
    }

    if (embedData.embed.footer.text.length > 2048) {
      errors.push("نص التذييل لا يمكن أن يتجاوز 2048 حرف")
    }

    if (embedData.embed.author.name.length > 256) {
      errors.push("اسم المؤلف لا يمكن أن يتجاوز 256 حرف")
    }

    // Validate URLs
    if (embedData.embed.url && !validateUrl(embedData.embed.url)) {
      errors.push("تنسيق رابط الرسالة المدمجة غير صحيح")
    }

    if (embedData.embed.image && !validateUrl(embedData.embed.image)) {
      errors.push("تنسيق رابط الصورة غير صحيح")
    }

    if (embedData.embed.thumbnail && !validateUrl(embedData.embed.thumbnail)) {
      errors.push("تنسيق رابط الصورة المصغرة غير صحيح")
    }

    if (embedData.embed.author.url && !validateUrl(embedData.embed.author.url)) {
      errors.push("تنسيق رابط المؤلف غير صحيح")
    }

    if (embedData.embed.author.icon_url && !validateUrl(embedData.embed.author.icon_url)) {
      errors.push("تنسيق رابط أيقونة المؤلف غير صحيح")
    }

    if (embedData.embed.footer.icon_url && !validateUrl(embedData.embed.footer.icon_url)) {
      errors.push("تنسيق رابط أيقونة التذييل غير صحيح")
    }

    if (embedData.webhook.avatar && !validateUrl(embedData.webhook.avatar)) {
      errors.push("تنسيق رابط الصورة الرمزية غير صحيح")
    }

    // Validate fields
    if (embedData.embed.fields.length > 25) {
      errors.push("الرسائل المدمجة يمكن أن تحتوي على 25 حقل كحد أقصى")
    }

    embedData.embed.fields.forEach((field, index) => {
      if (!field.name.trim()) {
        errors.push(`اسم الحقل ${index + 1} لا يمكن أن يكون فارغاً`)
      }
      if (field.name.length > 256) {
        errors.push(`اسم الحقل ${index + 1} لا يمكن أن يتجاوز 256 حرف`)
      }
      if (!field.value.trim()) {
        errors.push(`قيمة الحقل ${index + 1} لا يمكن أن تكون فارغة`)
      }
      if (field.value.length > 1024) {
        errors.push(`قيمة الحقل ${index + 1} لا يمكن أن تتجاوز 1024 حرف`)
      }
    })

    const colorRegex = /^#[0-9A-Fa-f]{6}$/
    if (embedData.embed.color && !colorRegex.test(embedData.embed.color)) {
      errors.push("تنسيق اللون غير صحيح. استخدم التنسيق السادس عشري (مثل #007AFF)")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  const resendEmbed = async () => {
    if (statusMessage.type !== "success" && statusMessage.type !== "error") {
      return
    }
    setSendButtonState("confirm")
  }

  const viewMessage = () => {
    if (!statusMessage.channelId || !statusMessage.messageId) {
      return
    }
    const channelId = statusMessage.channelId
    const messageId = statusMessage.messageId
    window.open(`https://discord.com/channels/@me/${channelId}/${messageId}`, "_blank")
  }

  const sendEmbed = async () => {
    const validation = validateEmbedData()

    if (!validation.valid) {
      toast({
        title: "خطأ في التحقق",
        description: validation.errors[0],
        variant: "destructive",
      })

      setStatusMessage({
        type: "error",
        message: "خطأ في التحقق",
        details: validation.errors.join("\n"),
        timestamp: new Date(),
      })

      setSendButtonState("failed")
      return
    }

    try {
      setIsLoading(true)
      setSendButtonState("sending")
      setStatusMessage({
        type: "loading",
        message: "جاري إرسال الرسالة المدمجة إلى ديسكورد...",
        progress: 0,
        timestamp: new Date(),
      })

      const progressInterval = setInterval(() => {
        setStatusMessage((prev) => {
          if (prev.type !== "loading") return prev
          const newProgress = Math.min((prev.progress || 0) + 10, 90)
          return { ...prev, progress: newProgress }
        })
      }, 200)

      const response = await fetch("/api/send-embed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(embedData),
      })

      clearInterval(progressInterval)

      const data = await response.json()

      if (response.ok && data.success) {
        setStatusMessage({
          type: "success",
          message: "تم إرسال الرسالة المدمجة بنجاح!",
          details: `تم تسليم رسالتك المدمجة إلى قناة ديسكورد.`,
          timestamp: new Date(),
          messageId: data.messageId,
          channelId: data.channelId,
        })

        toast({
          title: "نجح الإرسال!",
          description: "تم إرسال رسالتك المدمجة بنجاح.",
        })

        setSendButtonState("success")
      } else {
        throw new Error(data.message || `خطأ: ${response.status}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير معروف"

      setStatusMessage({
        type: "error",
        message: "فشل في إرسال الرسالة المدمجة",
        details: errorMessage,
        timestamp: new Date(),
      })

      toast({
        title: "فشل في إرسال الرسالة المدمجة",
        description: errorMessage,
        variant: "destructive",
      })

      setSendButtonState("failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Mobile preview toggle
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Mobile Preview Toggle */}
      {isMobile && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={togglePreview} className="apple-button-secondary bg-transparent px-6 py-3">
            <Eye className="h-4 w-4 ml-2" />
            {showPreview ? "إخفاء المعاينة" : "عرض المعاينة"}
          </Button>
        </div>
      )}

      {/* Mobile Preview */}
      {isMobile && showPreview && (
        <div className="lg:hidden">
          <h2 className="apple-body-large font-semibold mb-4">المعاينة</h2>
          <EmbedPreview embedData={embedData} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Editor */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Webhook Settings */}
          <Card className="apple-card-elevated">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="apple-body-large font-semibold">إعداد الويب هوك</h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <Label htmlFor="webhook-url" className="apple-body font-medium">
                      رابط الويب هوك
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-4 w-4 apple-text-gray" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs apple-caption">
                            يمكنك العثور على رابط الويب هوك في ديسكورد من خلال إعدادات السيرفر &gt; التكاملات &gt; الويب
                            هوك
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex gap-3">
                    <Input
                      id="webhook-url"
                      placeholder="https://discord.com/api/webhooks/..."
                      className="apple-input flex-1 text-sm sm:text-base"
                      value={embedData.webhook.url}
                      onChange={(e) => handleWebhookChange("url", e.target.value)}
                      type={embedData.webhook.url.includes("webhooks") ? "password" : "text"}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyWebhookUrl}
                      className="apple-button-secondary bg-transparent flex-shrink-0"
                      aria-label="نسخ رابط الويب هوك"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {embedData.webhook.url && !validateWebhookUrl(embedData.webhook.url) && (
                    <p className="apple-caption apple-text-red mt-2">
                      تنسيق رابط الويب هوك غير صحيح. يجب أن يبدو مثل:
                      https://discord.com/api/webhooks/123456789/abcdef...
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="webhook-name" className="apple-body font-medium block mb-3 sm:mb-4">
                    اسم الويب هوك
                  </Label>
                  <Input
                    id="webhook-name"
                    placeholder="منشئ الرسائل المدمجة"
                    className="apple-input text-sm sm:text-base"
                    value={embedData.webhook.name}
                    onChange={(e) => handleWebhookChange("name", e.target.value)}
                    maxLength={80}
                  />
                  {embedData.webhook.name.toLowerCase().includes("discord") && (
                    <p className="apple-caption apple-text-red mt-2">
                      اسم الويب هوك لا يمكن أن يحتوي على كلمة 'discord' (سياسة ديسكورد)
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="webhook-avatar" className="apple-body font-medium block mb-3 sm:mb-4">
                    رابط الصورة الرمزية
                  </Label>
                  <Input
                    id="webhook-avatar"
                    placeholder="https://example.com/avatar.png"
                    className="apple-input text-sm sm:text-base"
                    value={embedData.webhook.avatar}
                    onChange={(e) => handleWebhookChange("avatar", e.target.value)}
                  />
                  {embedData.webhook.avatar && !validateUrl(embedData.webhook.avatar) && (
                    <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                  )}
                  {!embedData.webhook.avatar && (
                    <p className="apple-caption mt-2">اتركه فارغاً لاستخدام الصورة الرمزية الافتراضية</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="webhook-content" className="apple-body font-medium block mb-3 sm:mb-4">
                    محتوى الرسالة
                  </Label>
                  <Textarea
                    id="webhook-content"
                    placeholder="محتوى الرسالة (اختياري)"
                    className="apple-textarea text-sm sm:text-base"
                    value={embedData.webhook.content}
                    onChange={(e) => handleWebhookChange("content", e.target.value)}
                    maxLength={2000}
                  />
                  <p
                    className={cn(
                      "apple-caption mt-2",
                      embedData.webhook.content.length > 2000 ? "apple-text-red" : "",
                    )}
                  >
                    {embedData.webhook.content.length}/2000 حرف
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="apple-vibrancy p-1 sm:p-2 rounded-xl sm:rounded-2xl w-full grid grid-cols-5 gap-1">
              <TabsTrigger
                value="general"
                className="rounded-lg sm:rounded-xl apple-body text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">عام</span>
              </TabsTrigger>
              <TabsTrigger
                value="author"
                className="rounded-lg sm:rounded-xl apple-body text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">المؤلف</span>
              </TabsTrigger>
              <TabsTrigger
                value="fields"
                className="rounded-lg sm:rounded-xl apple-body text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
              >
                <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">الحقول</span>
              </TabsTrigger>
              <TabsTrigger
                value="footer"
                className="rounded-lg sm:rounded-xl apple-body text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">التذييل</span>
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="rounded-lg sm:rounded-xl apple-body text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
              >
                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">الكود</span>
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="mt-6 sm:mt-8">
              <Card className="apple-card-elevated">
                <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                  <div>
                    <Label htmlFor="embed-title" className="apple-body font-medium block mb-3 sm:mb-4">
                      العنوان
                    </Label>
                    <Input
                      id="embed-title"
                      placeholder="عنوان الرسالة المدمجة"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.title}
                      onChange={(e) => handleEmbedChange("title", e.target.value)}
                      maxLength={256}
                    />
                    <p className={cn("apple-caption mt-2", embedData.embed.title.length > 256 ? "apple-text-red" : "")}>
                      {embedData.embed.title.length}/256 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="embed-description" className="apple-body font-medium block mb-3 sm:mb-4">
                      الوصف
                    </Label>
                    <Textarea
                      id="embed-description"
                      placeholder="وصف الرسالة المدمجة..."
                      className="apple-textarea text-sm sm:text-base min-h-[120px] sm:min-h-[150px]"
                      value={embedData.embed.description}
                      onChange={(e) => handleEmbedChange("description", e.target.value)}
                      maxLength={4096}
                    />
                    <p
                      className={cn(
                        "apple-caption mt-2",
                        embedData.embed.description.length > 4096 ? "apple-text-red" : "",
                      )}
                    >
                      {embedData.embed.description.length}/4096 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="embed-url" className="apple-body font-medium block mb-3 sm:mb-4">
                      الرابط
                    </Label>
                    <Input
                      id="embed-url"
                      placeholder="https://example.com"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.url}
                      onChange={(e) => handleEmbedChange("url", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.url && !validateUrl(embedData.embed.url) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="embed-color" className="apple-body font-medium block mb-3 sm:mb-4">
                      اللون
                    </Label>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Input
                        id="embed-color"
                        type="color"
                        className="w-16 h-12 sm:w-20 sm:h-14 p-1 apple-input flex-shrink-0"
                        value={embedData.embed.color}
                        onChange={(e) => handleEmbedChange("color", e.target.value)}
                      />
                      <Input
                        className="flex-1 apple-input text-sm sm:text-base"
                        value={embedData.embed.color}
                        onChange={(e) => handleEmbedChange("color", e.target.value)}
                        pattern="^#[0-9A-Fa-f]{6}$"
                        placeholder="#007AFF"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="embed-timestamp" className="apple-body font-medium block mb-3 sm:mb-4">
                      الطابع الزمني
                    </Label>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-right font-normal apple-input text-sm sm:text-base",
                              !embedData.embed.timestamp && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {embedData.embed.timestamp
                              ? format(embedData.embed.timestamp, "PPP", { locale: ar })
                              : "اختر التاريخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={embedData.embed.timestamp || undefined}
                            onSelect={(date) => handleEmbedChange("timestamp", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {embedData.embed.timestamp && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEmbedChange("timestamp", null)}
                          className="apple-button-secondary flex-shrink-0"
                          aria-label="مسح الطابع الزمني"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="embed-thumbnail" className="apple-body font-medium block mb-3 sm:mb-4">
                      رابط الصورة المصغرة
                    </Label>
                    <Input
                      id="embed-thumbnail"
                      placeholder="https://example.com/thumbnail.png"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.thumbnail}
                      onChange={(e) => handleEmbedChange("thumbnail", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.thumbnail && !validateUrl(embedData.embed.thumbnail) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="embed-image" className="apple-body font-medium block mb-3 sm:mb-4">
                      رابط الصورة
                    </Label>
                    <Input
                      id="embed-image"
                      placeholder="https://example.com/image.png"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.image}
                      onChange={(e) => handleEmbedChange("image", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.image && !validateUrl(embedData.embed.image) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Author Tab */}
            <TabsContent value="author" className="mt-6 sm:mt-8">
              <Card className="apple-card-elevated">
                <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                  <div>
                    <Label htmlFor="author-name" className="apple-body font-medium block mb-3 sm:mb-4">
                      اسم المؤلف
                    </Label>
                    <Input
                      id="author-name"
                      placeholder="اسم المؤلف"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.author.name}
                      onChange={(e) => handleAuthorChange("name", e.target.value)}
                      maxLength={256}
                    />
                    <p
                      className={cn(
                        "apple-caption mt-2",
                        embedData.embed.author.name.length > 256 ? "apple-text-red" : "",
                      )}
                    >
                      {embedData.embed.author.name.length}/256 حرف
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="author-url" className="apple-body font-medium block mb-3 sm:mb-4">
                      رابط المؤلف
                    </Label>
                    <Input
                      id="author-url"
                      placeholder="https://example.com"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.author.url}
                      onChange={(e) => handleAuthorChange("url", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.author.url && !validateUrl(embedData.embed.author.url) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="author-icon" className="apple-body font-medium block mb-3 sm:mb-4">
                      رابط أيقونة المؤلف
                    </Label>
                    <Input
                      id="author-icon"
                      placeholder="https://example.com/icon.png"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.author.icon_url}
                      onChange={(e) => handleAuthorChange("icon_url", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.author.icon_url && !validateUrl(embedData.embed.author.icon_url) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fields Tab */}
            <TabsContent value="fields" className="mt-6 sm:mt-8">
              <Card className="apple-card-elevated">
                <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="apple-body-large font-semibold">الحقول ({embedData.embed.fields.length}/25)</h3>
                    <Button onClick={addField} className="apple-button-primary w-full sm:w-auto">
                      <Plus className="h-4 w-4 ml-2" /> إضافة حقل
                    </Button>
                  </div>

                  {embedData.embed.fields.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 apple-text-gray">
                      <Grid className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                      <p className="apple-body">لم يتم إضافة حقول بعد. انقر على الزر أعلاه لإضافة حقلك الأول.</p>
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8 max-h-[600px] overflow-y-auto">
                      {embedData.embed.fields.map((field, index) => (
                        <div key={index} className="apple-card p-6 sm:p-8 rounded-2xl">
                          <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h4 className="apple-body font-semibold">الحقل {index + 1}</h4>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveFieldUp(index)}
                                disabled={index === 0}
                                className="h-8 w-8 apple-text-gray hover:apple-text-blue rounded-lg"
                                aria-label={`نقل الحقل ${index + 1} لأعلى`}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveFieldDown(index)}
                                disabled={index === embedData.embed.fields.length - 1}
                                className="h-8 w-8 apple-text-gray hover:apple-text-blue rounded-lg"
                                aria-label={`نقل الحقل ${index + 1} لأسفل`}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeField(index)}
                                className="h-8 w-8 apple-text-gray hover:apple-text-red rounded-lg"
                                aria-label={`حذف الحقل ${index + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-4 sm:space-y-6">
                            <div>
                              <Label htmlFor={`field-name-${index}`} className="apple-body font-medium block mb-3">
                                الاسم
                              </Label>
                              <Input
                                id={`field-name-${index}`}
                                placeholder="اسم الحقل"
                                className="apple-input text-sm sm:text-base"
                                value={field.name}
                                onChange={(e) => updateField(index, "name", e.target.value)}
                                maxLength={256}
                              />
                              <p className={cn("apple-caption mt-2", field.name.length > 256 ? "apple-text-red" : "")}>
                                {field.name.length}/256 حرف
                              </p>
                              {!field.name.trim() && (
                                <p className="apple-caption apple-text-red mt-2">اسم الحقل لا يمكن أن يكون فارغاً</p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor={`field-value-${index}`} className="apple-body font-medium block mb-3">
                                القيمة
                              </Label>
                              <Textarea
                                id={`field-value-${index}`}
                                placeholder="قيمة الحقل"
                                className="apple-textarea text-sm sm:text-base min-h-[100px]"
                                value={field.value}
                                onChange={(e) => updateField(index, "value", e.target.value)}
                                maxLength={1024}
                              />
                              <p
                                className={cn("apple-caption mt-2", field.value.length > 1024 ? "apple-text-red" : "")}
                              >
                                {field.value.length}/1024 حرف
                              </p>
                              {!field.value.trim() && (
                                <p className="apple-caption apple-text-red mt-2">قيمة الحقل لا يمكن أن تكون فارغة</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <Switch
                                id={`field-inline-${index}`}
                                checked={field.inline}
                                onCheckedChange={(checked) => updateField(index, "inline", checked)}
                              />
                              <Label htmlFor={`field-inline-${index}`} className="apple-body font-medium">
                                في نفس السطر
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Footer Tab */}
            <TabsContent value="footer" className="mt-6 sm:mt-8">
              <Card className="apple-card-elevated">
                <CardContent className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                  <div>
                    <Label htmlFor="footer-text" className="apple-body font-medium block mb-3 sm:mb-4">
                      نص التذييل
                    </Label>
                    <Input
                      id="footer-text"
                      placeholder="نص التذييل"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.footer.text}
                      onChange={(e) => handleFooterChange("text", e.target.value)}
                      maxLength={2048}
                    />
                    <p
                      className={cn(
                        "apple-caption mt-2",
                        embedData.embed.footer.text.length > 2048 ? "apple-text-red" : "",
                      )}
                    >
                      {embedData.embed.footer.text.length}/2048 حرف
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="footer-icon" className="apple-body font-medium block mb-3 sm:mb-4">
                      رابط أيقونة التذييل
                    </Label>
                    <Input
                      id="footer-icon"
                      placeholder="https://example.com/icon.png"
                      className="apple-input text-sm sm:text-base"
                      value={embedData.embed.footer.icon_url}
                      onChange={(e) => handleFooterChange("icon_url", e.target.value)}
                      type="url"
                    />
                    {embedData.embed.footer.icon_url && !validateUrl(embedData.embed.footer.icon_url) && (
                      <p className="apple-caption apple-text-red mt-2">تنسيق الرابط غير صحيح</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code Tab */}
            <TabsContent value="code" className="mt-6 sm:mt-8">
              <CodeExamples embedData={embedData} />
            </TabsContent>
          </Tabs>

          {/* Status Message */}
          {statusMessage.type && (
            <Alert
              className={cn(
                "relative apple-card-elevated",
                statusMessage.type === "success" && "border-green-500/50 bg-green-50",
                statusMessage.type === "error" && "border-red-500/50 bg-red-50",
                statusMessage.type === "loading" && "border-blue-500/50 bg-blue-50",
                statusMessage.type === "info" && "border-blue-500/50 bg-blue-50",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4 h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                onClick={clearStatusMessage}
                aria-label="إغلاق الرسالة"
              >
                <X className="h-4 w-4" />
              </Button>

              {statusMessage.type === "success" && <Check className="h-5 w-5 apple-text-green" />}
              {statusMessage.type === "error" && <AlertCircle className="h-5 w-5 apple-text-red" />}
              {statusMessage.type === "loading" && <Loader2 className="h-5 w-5 apple-text-blue animate-spin" />}
              {statusMessage.type === "info" && <Info className="h-5 w-5 apple-text-blue" />}

              <AlertTitle className="apple-body font-semibold">
                {statusMessage.type === "success" && "نجح"}
                {statusMessage.type === "error" && "خطأ"}
                {statusMessage.type === "loading" && "جاري الإرسال"}
                {statusMessage.type === "info" && "معلومات"}
              </AlertTitle>

              <AlertDescription className="mt-2">
                <p className="apple-body">{statusMessage.message}</p>
                {statusMessage.details && (
                  <div className={cn("mt-3 apple-caption", statusMessage.type === "error" && "whitespace-pre-line")}>
                    {statusMessage.details}
                  </div>
                )}

                {statusMessage.type === "loading" && statusMessage.progress !== undefined && (
                  <Progress value={statusMessage.progress} className="h-2 mt-4 bg-gray-200" />
                )}

                {statusMessage.timestamp && (
                  <div className="apple-caption apple-text-light-gray mt-4">
                    {format(statusMessage.timestamp, "d MMMM yyyy 'في' h:mm a", { locale: ar })}
                  </div>
                )}

                {statusMessage.type === "success" && statusMessage.messageId && (
                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="apple-button-secondary bg-transparent"
                      onClick={viewMessage}
                    >
                      <MessageSquare className="h-4 w-4 ml-2" />
                      عرض الرسالة
                    </Button>
                  </div>
                )}

                {statusMessage.type === "error" && (
                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="apple-button-secondary bg-transparent"
                      onClick={resendEmbed}
                    >
                      <RefreshCw className="h-4 w-4 ml-2" />
                      حاول مرة أخرى
                    </Button>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Send Button */}
          <div className="flex justify-end gap-4 sm:gap-6">
            {sendButtonState === "ready" && (
              <Button
                className="apple-button-primary px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                onClick={() => setSendButtonState("confirm")}
              >
                جاهز؟
              </Button>
            )}

            {sendButtonState === "confirm" && (
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                <span className="apple-body apple-text-gray text-center sm:text-right">إرسال هذه الرسالة المدمجة؟</span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="apple-button-secondary bg-transparent flex-1 sm:flex-initial"
                    onClick={() => setSendButtonState("ready")}
                  >
                    لا
                  </Button>
                  <Button
                    size="sm"
                    className="apple-button-primary flex-1 sm:flex-initial"
                    onClick={() => {
                      setSendButtonState("sending")
                      sendEmbed()
                    }}
                  >
                    نعم
                  </Button>
                </div>
              </div>
            )}

            {sendButtonState === "sending" && (
              <Button disabled className="apple-button-primary px-6 sm:px-8 py-3 sm:py-4 opacity-80 w-full sm:w-auto">
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإرسال...
              </Button>
            )}

            {sendButtonState === "success" && (
              <Button
                className="apple-button-primary px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                style={{ backgroundColor: "var(--apple-system-green)" }}
                onClick={() => setSendButtonState("ready")}
              >
                <Check className="ml-2 h-4 w-4" />
                تم الإرسال بنجاح
              </Button>
            )}

            {sendButtonState === "failed" && (
              <Button
                className="apple-button-primary px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                style={{ backgroundColor: "var(--apple-system-red)" }}
                onClick={() => {
                  setSendButtonState("confirm")
                }}
              >
                <AlertCircle className="ml-2 h-4 w-4" />
                فشل - حاول مرة أخرى
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Preview */}
        <div className={cn("hidden lg:block", isMobile ? "mt-16" : "sticky top-32 h-fit")}>
          <h2 className="apple-body-large font-semibold mb-6">المعاينة</h2>
          <EmbedPreview embedData={embedData} />
        </div>
      </div>
    </div>
  )
}
