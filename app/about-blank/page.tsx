"use client"

import { useEffect } from "react"

export default function AboutBlankPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window.open("about:blank", "_blank")
      if (win) {
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>$MUNNY PROXY$</title>
              <style>
                body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; }
              </style>
            </head>
            <body>
              <iframe src="${window.location.origin}"></iframe>
            </body>
          </html>
        `)
        win.document.close()
        window.location.href = "https://google.com"
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Opening in about:blank...</h1>
        <p>If nothing happens, please enable popups and try again.</p>
      </div>
    </div>
  )
}
