"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, Eye } from "lucide-react"

export default function SettingsSection() {
  const [tabTitle, setTabTitle] = useState("")
  const [tabIcon, setTabIcon] = useState("default")
  const [aboutBlankEnabled, setAboutBlankEnabled] = useState(false)
  const [autoAboutBlank, setAutoAboutBlank] = useState(false)
  const [panicKey, setPanicKey] = useState("Escape")
  const [panicUrl, setPanicUrl] = useState("https://google.com")
  const [quickExit, setQuickExit] = useState(true)

  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("munnyProxySettings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setTabTitle(settings.tabTitle || "")
        setTabIcon(settings.tabIcon || "default")
        setAboutBlankEnabled(settings.aboutBlankEnabled || false)
        setAutoAboutBlank(settings.autoAboutBlank || false)
        setPanicKey(settings.panicKey || "Escape")
        setPanicUrl(settings.panicUrl || "https://google.com")
        setQuickExit(settings.quickExit || true)

        // Apply saved tab cloak
        if (settings.tabTitle) {
          document.title = settings.tabTitle
        }

        // Apply saved tab icon
        if (settings.tabIcon !== "default") {
          applyTabIcon(settings.tabIcon)
        }

        // Auto open in about:blank if enabled
        if (settings.autoAboutBlank && !window.location.href.includes("about:blank")) {
          openInAboutBlank()
        }
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settings = {
        tabTitle,
        tabIcon,
        aboutBlankEnabled,
        autoAboutBlank,
        panicKey,
        panicUrl,
        quickExit,
      }
      localStorage.setItem("munnyProxySettings", JSON.stringify(settings))
    }
  }, [tabTitle, tabIcon, aboutBlankEnabled, autoAboutBlank, panicKey, panicUrl, quickExit])

  // Apply tab icon
  const applyTabIcon = (icon) => {
    if (typeof window !== "undefined") {
      const link = document.querySelector("link[rel*='icon']") || document.createElement("link")
      link.type = "image/x-icon"
      link.rel = "shortcut icon"

      switch (icon) {
        case "google":
          link.href = "https://www.google.com/favicon.ico"
          break
        case "drive":
          link.href = "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
          break
        case "classroom":
          link.href = "https://ssl.gstatic.com/classroom/favicon.png"
          break
        case "gmail":
          link.href = "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
          break
        default:
          // Reset to default
          link.href = "/favicon.ico"
      }

      document.head.appendChild(link)
    }
  }

  // Tab cloaking functions
  const applyTabCloak = () => {
    if (typeof window !== "undefined") {
      if (tabTitle) {
        document.title = tabTitle
      }

      applyTabIcon(tabIcon)
    }
  }

  // About:blank function
  const openInAboutBlank = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open("about:blank", "_blank")
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${tabTitle || "$MUNNY PROXY$"}</title>
              <style>
                body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; }
              </style>
            </head>
            <body>
              <iframe src="${window.location.href}"></iframe>
            </body>
          </html>
        `)
        newWindow.document.close()
      }
    }
  }

  // Panic button functionality
  useEffect(() => {
    if (typeof window !== "undefined" && quickExit) {
      const handleKeyDown = (e) => {
        if (e.key === panicKey) {
          window.location.href = panicUrl
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [panicKey, panicUrl, quickExit])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Tab Cloaking</CardTitle>
            <CardDescription>Change how this site appears in your browser tab</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tab-title">Tab Title</Label>
              <Input
                id="tab-title"
                placeholder="Google"
                value={tabTitle}
                onChange={(e) => setTabTitle(e.target.value)}
                className="bg-black/50 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tab-icon">Tab Icon</Label>
              <Select value={tabIcon} onValueChange={setTabIcon}>
                <SelectTrigger id="tab-icon" className="bg-black/50 border-white/10">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="drive">Google Drive</SelectItem>
                  <SelectItem value="classroom">Google Classroom</SelectItem>
                  <SelectItem value="gmail">Gmail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={applyTabCloak}>
              <Check className="mr-2 h-4 w-4" />
              Apply Cloak
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 mt-6">
          <CardHeader>
            <CardTitle className="text-white">About:Blank Page</CardTitle>
            <CardDescription>Open this site in an about:blank page to bypass filters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="about-blank">Enable About:Blank</Label>
                <p className="text-sm text-gray-400">Opens the site in a new window</p>
              </div>
              <Switch id="about-blank" checked={aboutBlankEnabled} onCheckedChange={setAboutBlankEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-about-blank">Auto About:Blank</Label>
                <p className="text-sm text-gray-400">Automatically open in about:blank when site loads</p>
              </div>
              <Switch id="auto-about-blank" checked={autoAboutBlank} onCheckedChange={setAutoAboutBlank} />
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={openInAboutBlank}
              disabled={!aboutBlankEnabled}
            >
              <Eye className="mr-2 h-4 w-4" />
              Open in About:Blank
            </Button>

            <div className="p-3 bg-yellow-500/20 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
              <p className="text-sm text-yellow-200">
                Using about:blank may help bypass some filters, but it might be detected by advanced monitoring systems.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Exit</CardTitle>
            <CardDescription>Quickly navigate away from this site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quick-exit">Enable Quick Exit</Label>
                <p className="text-sm text-gray-400">Press a key to quickly exit the site</p>
              </div>
              <Switch id="quick-exit" checked={quickExit} onCheckedChange={setQuickExit} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panic-key">Panic Key</Label>
              <Select value={panicKey} onValueChange={setPanicKey}>
                <SelectTrigger id="panic-key" className="bg-black/50 border-white/10">
                  <SelectValue placeholder="Select a key" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="Escape">Escape</SelectItem>
                  <SelectItem value="`">` (Backtick)</SelectItem>
                  <SelectItem value="F1">F1</SelectItem>
                  <SelectItem value="F2">F2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="panic-url">Redirect URL</Label>
              <Input
                id="panic-url"
                placeholder="https://google.com"
                value={panicUrl}
                onChange={(e) => setPanicUrl(e.target.value)}
                className="bg-black/50 border-white/10"
              />
            </div>

            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500/20"
              onClick={() => (window.location.href = panicUrl)}
            >
              Test Quick Exit
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Ultraviolet Proxy Settings</CardTitle>
            <CardDescription>Configure the Ultraviolet proxy for games and websites</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-500/20 rounded-md flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <p className="text-sm text-green-200">
                Ultraviolet proxy is enabled for all games. This helps bypass school filters and allows games to load
                properly.
              </p>
            </div>

            <p className="text-sm text-gray-400">
              The Ultraviolet proxy automatically loads when you open a game or use the web proxy feature. No additional
              configuration is needed.
            </p>

            <p className="text-sm text-gray-400">
              If you're experiencing issues with games not loading, try using the About:Blank feature above for an
              additional layer of protection.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
