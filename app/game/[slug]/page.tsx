"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { gamesList } from "@/lib/games-list"

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      // Find the game by slug
      const foundGame = gamesList.find((g) => g.title.toLowerCase().replace(/\s+/g, "-") === params.slug)

      if (foundGame) {
        setGame(foundGame)
      } else {
        // Game not found, redirect to games page
        router.push("/#games")
      }
    }

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [params.slug, router])

  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="text-white mr-4" onClick={() => router.push("/#games")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
          <h1 className="text-2xl font-bold text-white">{game.title}</h1>
        </div>

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

          <iframe
            src={game.url}
            title={game.title}
            className="w-full h-full border-0"
            allowFullScreen
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  )
}
