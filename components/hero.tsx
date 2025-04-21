"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DollarSign, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

export default function Hero() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleExit = () => {
    window.location.href = "https://google.com"
  }

  const navigateTo = (path: string) => {
    setMenuOpen(false)
    router.push(path)
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="h-20 w-20 text-green-500" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">$MUNNY PROXY$</h1>
              <DollarSign className="h-20 w-20 text-green-500" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Your ultimate unblocked school website with games, apps, and proxy services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-black/90 border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">Choose an Option</DialogTitle>
                  <DialogDescription>Select what you want to access in $MUNNY PROXY$</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <MenuCard
                    title="Games"
                    description="Play 200+ unblocked HTML games"
                    onClick={() => navigateTo("/dashboard?tab=games")}
                    icon="🎮"
                  />
                  <MenuCard
                    title="Apps"
                    description="Access useful tools and utilities"
                    onClick={() => navigateTo("/dashboard?tab=apps")}
                    icon="📱"
                  />
                  <MenuCard
                    title="Proxy"
                    description="Browse blocked websites securely"
                    onClick={() => navigateTo("/dashboard?tab=proxy")}
                    icon="🌐"
                  />
                  <MenuCard
                    title="Settings"
                    description="Configure tab cloaking and more"
                    onClick={() => navigateTo("/dashboard?tab=settings")}
                    icon="⚙️"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="text-white border-red-500 hover:bg-red-500/20 px-8"
              onClick={handleExit}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Exit the Proxy
            </Button>
          </motion.div>
        </div>

        {/* Featured Games Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">Featured Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredGames.map((game, index) => (
              <div
                key={index}
                className="bg-black/50 border border-white/10 rounded-lg overflow-hidden hover:border-green-500 transition-all cursor-pointer group"
                onClick={() => navigateTo(`/dashboard?tab=games&game=${game.id}`)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                    <span className="text-white text-sm font-medium">Play Now</span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-white text-sm font-medium truncate">{game.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MenuCard({ title, description, onClick, icon }) {
  return (
    <Card
      className="bg-black/70 border-white/10 hover:border-green-500 transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

const featuredGames = [
  {
    id: "1v1-lol",
    title: "1v1.LOL",
    image:
      "https://play-lh.googleusercontent.com/QYGZeM9Qo1NlOGN-yS9j1U1c0jHQWzG_NnvWsUUY9bZq_0ozMJfQ9r6KI4-T-7SFpQ=w526-h296-rw",
  },
  {
    id: "among-us",
    title: "Among Us",
    image:
      "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec=w526-h296-rw",
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    image:
      "https://play-lh.googleusercontent.com/eU_TYj8ztpiDQRqz3Ig7TvlQHJ3-p01OWr0JH_LHNHV0itOSLJTQbCS1-tS8-oQjcUvs=w526-h296-rw",
  },
  {
    id: "minecraft",
    title: "Minecraft Classic",
    image:
      "https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP=w526-h296-rw",
  },
  {
    id: "geometry-dash",
    title: "Geometry Dash",
    image:
      "https://play-lh.googleusercontent.com/WJT3ZJRlxvRbvGnNBr3aFbFCxLpYm6yEIEfGXWQA-vLPuUMM__0wiDvYQyQ6UPb2Jbw=w526-h296-rw",
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    image:
      "https://play-lh.googleusercontent.com/OssE3ON9WsLZedOF39UCgtIHcRYfV0OqQS9O78LfmRdxSyKdHX52G2OFa0LkG6D-k9w=w526-h296-rw",
  },
  {
    id: "fnaf",
    title: "Five Nights at Freddy's",
    image:
      "https://play-lh.googleusercontent.com/RmvBSjkThmix4S-hDIeIOknlpbJfp0GqDLauaASN9PXGiDIRQXBkQK-8-f6qJ1xGYg=w526-h296-rw",
  },
  {
    id: "slope",
    title: "Slope",
    image:
      "https://play-lh.googleusercontent.com/uJn2i9h7KxYQarC_c3K4qH6o7gLtflFnhD_dN14MNkzHJ1aTnS5C5Jhjh_HgEQqRiQ=w526-h296-rw",
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    image:
      "https://play-lh.googleusercontent.com/WRM5Y1xZmzcCP1YtO5zl6G2g7CU5c5ZfjX4UVrgi1bpNgkfy-wuB-bQx3kkeRfaGYQ=w526-h296-rw",
  },
  {
    id: "happy-wheels",
    title: "Happy Wheels",
    image:
      "https://play-lh.googleusercontent.com/SV8RsV5udSeeONjatT5SwleP6lzV6PjtNPs2VvyYXU3mEZjgYP1GH-uRrUoGRKLAZQ=w526-h296-rw",
  },
]
