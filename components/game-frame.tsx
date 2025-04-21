"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function GameFrame({ game }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Reset loading state when game changes
    setLoading(true)
    setError(false)
  }, [game])

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleIframeError = () => {
    setError(true)
    setLoading(false)
  }

  return (
    <div className="w-full h-[80vh] bg-black/50 rounded-lg overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">Loading {game.title}...</h3>
            <p className="text-gray-400 mt-2">This may take a moment</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center max-w-md px-4">
            <h3 className="text-xl font-medium text-red-500 mb-2">Failed to load game</h3>
            <p className="text-gray-400">
              The game could not be loaded. This might be due to school network restrictions or the game being
              unavailable.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
              onClick={() => {
                setLoading(true)
                setError(false)
                // Force iframe reload
                const iframe = document.querySelector("iframe")
                if (iframe) {
                  iframe.src = game.url
                }
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <iframe
        src={game.url}
        title={game.title}
        className="w-full h-full border-0"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  )
}
