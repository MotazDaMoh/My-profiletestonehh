import { NextResponse } from "next/server"

// Discord webhook URL pattern
const WEBHOOK_URL_PATTERN = /https:\/\/discord\.com\/api\/webhooks\/(\d+)\/([a-zA-Z0-9_-]+)/

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { webhook, embed } = payload

    if (!webhook.url) {
      return NextResponse.json({ success: false, message: "Webhook URL is required" }, { status: 400 })
    }

    // Extract webhook ID and token from the URL
    const match = webhook.url.match(WEBHOOK_URL_PATTERN)

    if (!match) {
      return NextResponse.json({ success: false, message: "Invalid webhook URL format" }, { status: 400 })
    }

    // Validate embed content length
    if (embed.title && embed.title.length > 256) {
      return NextResponse.json({ success: false, message: "Embed title cannot exceed 256 characters" }, { status: 400 })
    }

    if (embed.description && embed.description.length > 4096) {
      return NextResponse.json(
        { success: false, message: "Embed description cannot exceed 4096 characters" },
        { status: 400 },
      )
    }

    if (embed.footer.text && embed.footer.text.length > 2048) {
      return NextResponse.json(
        { success: false, message: "Footer text cannot exceed 2048 characters" },
        { status: 400 },
      )
    }

    if (embed.author.name && embed.author.name.length > 256) {
      return NextResponse.json({ success: false, message: "Author name cannot exceed 256 characters" }, { status: 400 })
    }

    // Validate fields
    if (embed.fields && embed.fields.length > 25) {
      return NextResponse.json({ success: false, message: "Embeds can have at most 25 fields" }, { status: 400 })
    }

    for (const field of embed.fields || []) {
      if (!field.name.trim()) {
        return NextResponse.json({ success: false, message: "Field name cannot be empty" }, { status: 400 })
      }
      if (field.name.length > 256) {
        return NextResponse.json(
          { success: false, message: "Field name cannot exceed 256 characters" },
          { status: 400 },
        )
      }
      if (!field.value.trim()) {
        return NextResponse.json({ success: false, message: "Field value cannot be empty" }, { status: 400 })
      }
      if (field.value.length > 1024) {
        return NextResponse.json(
          { success: false, message: "Field value cannot exceed 1024 characters" },
          { status: 400 },
        )
      }
    }

    // Helper function to validate URLs
    const isValidUrl = (url: string): boolean => {
      if (!url || url.trim() === "") return true
      try {
        new URL(url)
        return true
      } catch (e) {
        return false
      }
    }

    // Validate URLs
    if (embed.url && !isValidUrl(embed.url)) {
      return NextResponse.json({ success: false, message: "Invalid embed URL format" }, { status: 400 })
    }

    if (embed.image && !isValidUrl(embed.image)) {
      return NextResponse.json({ success: false, message: "Invalid image URL format" }, { status: 400 })
    }

    if (embed.thumbnail && !isValidUrl(embed.thumbnail)) {
      return NextResponse.json({ success: false, message: "Invalid thumbnail URL format" }, { status: 400 })
    }

    if (embed.author.url && !isValidUrl(embed.author.url)) {
      return NextResponse.json({ success: false, message: "Invalid author URL format" }, { status: 400 })
    }

    if (embed.author.icon_url && !isValidUrl(embed.author.icon_url)) {
      return NextResponse.json({ success: false, message: "Invalid author icon URL format" }, { status: 400 })
    }

    if (embed.footer.icon_url && !isValidUrl(embed.footer.icon_url)) {
      return NextResponse.json({ success: false, message: "Invalid footer icon URL format" }, { status: 400 })
    }

    // Prepare the embed with proper handling of empty fields
    const discordEmbed = {
      title: embed.title || undefined,
      description: embed.description || undefined,
      url: embed.url && embed.url.trim() !== "" ? embed.url : undefined,
      color: embed.color ? Number.parseInt(embed.color.replace("#", ""), 16) : undefined,
      timestamp: embed.timestamp || undefined,
      author: embed.author.name
        ? {
            name: embed.author.name,
            url: embed.author.url && embed.author.url.trim() !== "" ? embed.author.url : undefined,
            icon_url: embed.author.icon_url && embed.author.icon_url.trim() !== "" ? embed.author.icon_url : undefined,
          }
        : undefined,
      thumbnail:
        embed.thumbnail && embed.thumbnail.trim() !== ""
          ? {
              url: embed.thumbnail,
            }
          : undefined,
      image:
        embed.image && embed.image.trim() !== ""
          ? {
              url: embed.image,
            }
          : undefined,
      fields: embed.fields.length > 0 ? embed.fields : undefined,
      footer: embed.footer.text
        ? {
            text: embed.footer.text,
            icon_url: embed.footer.icon_url && embed.footer.icon_url.trim() !== "" ? embed.footer.icon_url : undefined,
          }
        : undefined,
    }

    // Add a small delay to simulate processing time (for better UX with progress indicator)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    try {
      // Log the payload for debugging
      console.log(
        "Sending embed payload:",
        JSON.stringify(
          {
            username: webhook.name || undefined,
            avatar_url: webhook.avatar && webhook.avatar.trim() !== "" ? webhook.avatar : undefined,
            content: webhook.content || undefined,
            embeds: [discordEmbed],
          },
          null,
          2,
        ),
      )

      // Send the webhook directly using fetch
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: webhook.name || undefined,
          avatar_url: webhook.avatar && webhook.avatar.trim() !== "" ? webhook.avatar : undefined,
          content: webhook.content || undefined,
          embeds: [discordEmbed],
        }),
      })

      // Handle non-OK responses
      if (!response.ok) {
        let errorData = {}
        let errorText = ""

        try {
          errorData = await response.json()
          errorText = JSON.stringify(errorData)
        } catch (e) {
          errorText = await response.text()
        }

        // Handle Discord API error codes
        let errorMessage = "Failed to send webhook"
        const statusCode = response.status

        if (response.status === 404) {
          errorMessage = "Unknown webhook: The webhook does not exist or has been deleted"
        } else if (response.status === 401) {
          errorMessage = "Invalid webhook token"
        } else if (response.status === 400) {
          // Check for specific Discord API errors
          if (errorData && typeof errorData === "object") {
            // Check for username error
            if ((errorData as any).username) {
              errorMessage = `Username error: ${(errorData as any).username.join(", ")}`
            }
            // Check for other specific errors
            else if ((errorData as any).message) {
              errorMessage = (errorData as any).message
            } else {
              errorMessage = "Invalid request format"
            }
          } else {
            errorMessage = "Invalid request format"
          }
        } else if (response.status === 429) {
          errorMessage = "Rate limited: Too many requests, please try again later"
        }

        console.error("Discord API error:", {
          status: response.status,
          statusText: response.statusText,
          errorData: errorText,
        })

        return NextResponse.json(
          {
            success: false,
            message: errorMessage,
            code: (errorData as any).code || response.status,
            details: errorText,
          },
          { status: statusCode },
        )
      }

      const data = await response.json().catch(() => ({}))

      // Return success response with message ID and channel ID if available
      return NextResponse.json({
        success: true,
        message: "Embed sent successfully",
        messageId: data.id || "unknown",
        channelId: data.channel_id || "unknown",
      })
    } catch (error: any) {
      console.error("Webhook send error:", error)

      // Try to get more detailed error information
      let errorMessage = "Network error when sending webhook"
      if (error.message) {
        errorMessage = error.message
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          error: error.message,
          details: "Please check your webhook URL and embed content format.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error sending embed:", error)

    // Provide more detailed error messages
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}
