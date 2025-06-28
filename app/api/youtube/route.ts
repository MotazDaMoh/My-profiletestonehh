import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get("handle")
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    console.error("YOUTUBE_API_KEY is not set in environment variables.")
    return NextResponse.json({ error: "YouTube API key is not configured." }, { status: 500 })
  }

  if (!handle) {
    return NextResponse.json({ error: "Channel handle is required." }, { status: 400 })
  }

  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${handle}&key=${apiKey}`
    const response = await fetch(apiUrl)

    // Gracefully handle non-JSON responses from the YouTube API
    const contentType = response.headers.get("content-type")
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      const errorText = await response.text()
      console.error(`YouTube API error for handle '${handle}':`, errorText)
      return NextResponse.json(
        { error: `YouTube API returned a non-JSON response for handle '${handle}'.` },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (data.items && data.items.length === 0) {
      return NextResponse.json({ error: `Channel with handle '${handle}' not found.` }, { status: 404 })
    }

    const channel = data.items[0]
    const channelData = {
      id: channel.id,
      name: channel.snippet.title,
      avatar: channel.snippet.thumbnails.default.url,
      subscribers: channel.statistics.subscriberCount,
    }

    return NextResponse.json(channelData)
  } catch (error) {
    console.error("An unexpected error occurred in the YouTube API route:", error)
    return NextResponse.json({ error: "Failed to fetch data from YouTube API." }, { status: 500 })
  }
}
