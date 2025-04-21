"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, Shield, X } from "lucide-react"

export default function ProxySection() {
  const [url, setUrl] = useState("")
  const [proxyUrl, setProxyUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

  const handleProxySubmit = (e) => {
    e.preventDefault()

    if (!url) return
    if (!uvLoaded) {
      alert("Ultraviolet proxy is still loading. Please try again in a moment.")
      return
    }

    setIsLoading(true)

    try {
      // Ensure URL has protocol
      let processedUrl = url
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        processedUrl = "https://" + url
      }

      // Create proxied URL using Ultraviolet
      const encodedUrl = window.Ultraviolet.codec.xor.encode(processedUrl)
      const proxiedUrl = "/service/" + encodedUrl

      setProxyUrl(proxiedUrl)
    } catch (err) {
      console.error("Error creating proxy URL:", err)
      alert("Failed to create proxy URL. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const closeProxy = () => {
    setProxyUrl("")
  }

  return (
    <div>
      {proxyUrl ? (
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-20 bg-black/50"
            onClick={closeProxy}
          >
            <X className="h-4 w-4" />
          </Button>
          <iframe src={proxyUrl} className="w-full h-[80vh] border-0 rounded-lg" title="Proxied Content" />
        </div>
      ) : (
        <div>
          <div className="max-w-3xl mx-auto mb-8">
            <Card className="bg-black/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Ultraviolet Web Proxy</CardTitle>
                <CardDescription>Access blocked websites through our secure Ultraviolet proxy</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProxySubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter URL (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-black/50 border-white/10"
                    required
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading || !uvLoaded}>
                    {isLoading ? "Loading..." : "Go"}
                  </Button>
                </form>
                {!uvLoaded && <p className="text-yellow-500 text-sm mt-2">Loading Ultraviolet proxy... Please wait.</p>}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="features" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="servers">Servers</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="bg-black/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Ultraviolet Proxy Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <ProxyFeature
                      icon={<Shield className="h-5 w-5 text-green-500" />}
                      title="Advanced Bypass Technology"
                      description="Ultraviolet uses specialized techniques to bypass even the strictest school filters"
                    />
                    <ProxyFeature
                      icon={<Globe className="h-5 w-5 text-green-500" />}
                      title="Access Any Website"
                      description="Bypass network restrictions and access virtually any blocked website"
                    />
                    <ProxyFeature
                      icon={<Lock className="h-5 w-5 text-green-500" />}
                      title="Secure Browsing"
                      description="All connections are encrypted and your browsing activity is hidden from network monitors"
                    />
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servers">
              <Card className="bg-black/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Proxy Servers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ProxyServer location="United States" status="Online" ping="45ms" />
                    <ProxyServer location="Europe" status="Online" ping="120ms" />
                    <ProxyServer location="Asia" status="Online" ping="180ms" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="bg-black/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-medium mb-1">What is Ultraviolet?</h3>
                      <p className="text-gray-400">
                        Ultraviolet is a high-performance web proxy that can bypass most school and workplace filters.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Can I access any website?</h3>
                      <p className="text-gray-400">
                        Most websites should work, but some may have anti-proxy measures that could cause issues.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Is my data safe?</h3>
                      <p className="text-gray-400">
                        We don't store any of your browsing data or history. All traffic is encrypted.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

function ProxyFeature({ icon, title, description }) {
  return (
    <li className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </li>
  )
}

function ProxyServer({ location, status, ping }) {
  return (
    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
      <div>
        <h3 className="text-white font-medium">{location}</h3>
        <p className="text-sm text-gray-400">Ping: {ping}</p>
      </div>
      <div className="flex items-center">
        <span className={`h-2 w-2 rounded-full mr-2 ${status === "Online" ? "bg-green-500" : "bg-red-500"}`}></span>
        <span className={status === "Online" ? "text-green-500" : "text-red-500"}>{status}</span>
      </div>
    </div>
  )
}
