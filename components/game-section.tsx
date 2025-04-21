"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X, Play } from "lucide-react"
import { gamesList } from "@/lib/games-list"
import GameFrame from "@/components/game-frame"

export default function GameSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGames, setFilteredGames] = useState(gamesList)
  const [selectedGame, setSelectedGame] = useState(null)
  const [categories, setCategories] = useState([
    "All",
    "Popular",
    "Action",
    "Puzzle",
    "Racing",
    "Sports",
    "Arcade",
    "Multiplayer",
  ])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [uvLoaded, setUvLoaded] = useState(false)

  useEffect(() => {
    // Load Ultraviolet scripts
    const loadUltraviolet = async () => {
      try {
        // Check if Ultraviolet is already loaded
        if (window.Ultraviolet) {
          setUvLoaded(true)
          return
        }

        // Load Ultraviolet bundle
        const bundleScript = document.createElement("script")
        bundleScript.src = "/uv/uv.bundle.js"
        document.head.appendChild(bundleScript)

        // Load Ultraviolet config
        const configScript = document.createElement("script")
        configScript.src = "/uv/uv.config.js"
        document.head.appendChild(configScript)

        // Wait for scripts to load
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUvLoaded(true)
      } catch (err) {
        console.error("Failed to load Ultraviolet:", err)
      }
    }

    loadUltraviolet()
  }, [])

  useEffect(() => {
    if (searchTerm === "" && selectedCategory === "All") {
      setFilteredGames(gamesList)
    } else {
      const filtered = gamesList.filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || game.categories.includes(selectedCategory)
        return matchesSearch && matchesCategory
      })
      setFilteredGames(filtered)
    }
  }, [searchTerm, selectedCategory])

  const handleGameClick = (game) => {
    if (!uvLoaded) {
      alert("Ultraviolet proxy is still loading. Please try again in a moment.")
      return
    }

    // Create a proxied version of the game URL using Ultraviolet
    try {
      // Extract the actual URL from our game object
      // This assumes the original URLs are stored in the gamesList
      const originalUrl = game.originalUrl || getOriginalGameUrl(game.title)

      if (originalUrl) {
        // Create proxied URL using Ultraviolet
        const uvConfig = window.__uv$config
        const encodedUrl = uvConfig.encodeUrl(originalUrl)
        const proxiedUrl = uvConfig.prefix + encodedUrl

        // Create a new game object with the proxied URL
        const proxiedGame = {
          ...game,
          url: proxiedUrl,
        }

        setSelectedGame(proxiedGame)
      } else {
        // Fallback to the original URL if we can't find the original
        setSelectedGame(game)
      }
    } catch (err) {
      console.error("Error creating proxy URL for game:", err)
      // Fallback to the original game object
      setSelectedGame(game)
    }
  }

  // Helper function to get original game URLs
  const getOriginalGameUrl = (title) => {
    // This is a mapping of game titles to their actual URLs
    const urlMap = {
      "1v1.LOL": "https://1v1.lol/",
      "Agar.io": "https://agar.io/",
      "Among Us (Fan-made)": "https://amongus-online.net/",
      "Angry Birds (HTML5)": "https://www.angrybirds.io/",
      "Cookie Clicker": "https://orteil.dashnet.org/cookieclicker/",
      "Minecraft Classic": "https://classic.minecraft.net/",
      "Retro Bowl": "https://retro-bowl.io/",
      Slope: "https://slope.io/",
      "Subway Surfers": "https://poki.com/en/g/subway-surfers",
      // Add more mappings as needed
    }

    return urlMap[title] || null
  }

  const closeGame = () => {
    setSelectedGame(null)
  }

  return (
    <div>
      {selectedGame ? (
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute top-4 right-4 z-20 bg-black/50" onClick={closeGame}>
            <X className="h-4 w-4" />
          </Button>
          <GameFrame game={selectedGame} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search games..."
                className="pl-10 bg-black/50 border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {!uvLoaded && (
            <div className="bg-yellow-500/20 text-yellow-200 p-4 rounded-lg mb-6">
              Loading Ultraviolet proxy... Games will be available once the proxy is loaded.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredGames.map((game, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 hover:border-green-500 transition-all cursor-pointer overflow-hidden group"
                onClick={() => handleGameClick(game)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={game.thumbnail || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-white truncate">{game.title}</h3>
                  <p className="text-gray-400 text-sm">{game.categories.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
