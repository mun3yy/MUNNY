import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Decode the URL (it would be base64 encoded in the frontend)
    const decodedUrl = atob(url)

    // Fetch the content from the target URL
    const response = await fetch(decodedUrl)

    // Get the content type
    const contentType = response.headers.get("content-type") || "text/html"

    // Get the response body
    const body = await response.text()

    // Create a modified response
    // In a real implementation, you would modify the HTML to proxy all resources
    // This is a simplified example
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to proxy request" }, { status: 500 })
  }
}
