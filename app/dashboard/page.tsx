"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import GameSection from "@/components/game-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppsSection from "@/components/apps-section"
import ProxySection from "@/components/proxy-section"
import SettingsSection from "@/components/settings-section"

export default function Dashboard() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("games")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["games", "apps", "proxy", "settings"].includes(tab)) {
      setActiveTab(tab)
    }

    // Handle direct game selection if provided in URL
    const gameParam = searchParams.get("game")
    if (gameParam && tab === "games") {
      // You could implement direct game loading here
      console.log("Loading game:", gameParam)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="games" className="text-lg">
                Games
              </TabsTrigger>
              <TabsTrigger value="apps" className="text-lg">
                Apps
              </TabsTrigger>
              <TabsTrigger value="proxy" className="text-lg">
                Proxy
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-lg">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="games">
              <GameSection />
            </TabsContent>

            <TabsContent value="apps">
              <AppsSection />
            </TabsContent>

            <TabsContent value="proxy">
              <ProxySection />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
