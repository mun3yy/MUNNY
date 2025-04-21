import { type NextRequest, NextResponse } from "next/server"

// Map of game slugs to their actual URLs
const gameUrlMap = {
  "1v1-lol": "https://1v1.lol/",
  agario: "https://agar.io/",
  "among-us": "https://amongus-online.net/",
  "angry-birds": "https://www.angrybirds.io/",
  "bad-ice-cream": "https://www.coolmathgames.com/0-bad-ice-cream",
  "baldis-basics": "https://baldis-basics.io/",
  "basketball-stars": "https://www.basketballstars.io/",
  "battle-royale": "https://battleroyale.io/",
  bitlife: "https://bitlife-life.io/",
  bloxorz: "https://www.coolmathgames.com/0-bloxorz",
  "cookie-clicker": "https://orteil.dashnet.org/cookieclicker/",
  "crossy-road": "https://poki.com/en/g/crossy-road",
  "geometry-dash": "https://geometrydash.io/",
  "happy-wheels": "https://happywheels.io/",
  "minecraft-classic": "https://classic.minecraft.net/",
  "retro-bowl": "https://retro-bowl.io/",
  slope: "https://slope.io/",
  "subway-surfers": "https://poki.com/en/g/subway-surfers",
  tetris: "https://tetris.com/play-tetris",
  "2048": "https://play2048.co/",
  // Add more mappings as needed
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug

  // Get the actual URL for the game
  const gameUrl = gameUrlMap[slug]

  if (!gameUrl) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 })
  }

  try {
    // Fetch the content from the target URL
    const response = await fetch(gameUrl, {
      headers: {
        // Set a common user agent to avoid being blocked
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    // Get the content type
    const contentType = response.headers.get("content-type") || "text/html"

    // Get the response body
    const body = await response.text()

    // Modify the HTML to fix any relative URLs and remove potential blockers
    let modifiedBody = body

    if (contentType.includes("text/html")) {
      // Replace relative URLs with absolute ones
      modifiedBody = modifiedBody.replace(/href=["']\/([^"']+)["']/g, `href="${gameUrl}/$1"`)
      modifiedBody = modifiedBody.replace(/src=["']\/([^"']+)["']/g, `src="${gameUrl}/$1"`)

      // Add base tag to handle other relative URLs
      modifiedBody = modifiedBody.replace(/<head>/i, `<head><base href="${gameUrl}">`)

      // Add CSP meta tag to allow loading resources
      modifiedBody = modifiedBody.replace(
        /<head>/i,
        `<head><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`,
      )
    }

    // Create a modified response
    return new NextResponse(modifiedBody, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        // Cache the response for 1 hour
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to proxy game request" }, { status: 500 })
  }
}
