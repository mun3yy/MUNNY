"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Calculator, FileText, X } from "lucide-react"
import { appsList } from "@/lib/apps-list"

export default function AppsSection() {
  const [selectedApp, setSelectedApp] = useState(null)

  const handleAppClick = (app) => {
    setSelectedApp(app)
  }

  const closeApp = () => {
    setSelectedApp(null)
  }

  return (
    <div>
      {selectedApp ? (
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute top-4 right-4 z-20 bg-black/50" onClick={closeApp}>
            <X className="h-4 w-4" />
          </Button>
          <iframe src={selectedApp.url} title={selectedApp.title} className="w-full h-[80vh] border-0 rounded-lg" />
        </div>
      ) : (
        <div>
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="all">All Apps</TabsTrigger>
              <TabsTrigger value="ai">AI Tools</TabsTrigger>
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appsList.map((app, index) => (
                  <AppCard key={index} app={app} onClick={() => handleAppClick(app)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appsList
                  .filter((app) => app.category === "ai")
                  .map((app, index) => (
                    <AppCard key={index} app={app} onClick={() => handleAppClick(app)} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="utilities">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appsList
                  .filter((app) => app.category === "utilities")
                  .map((app, index) => (
                    <AppCard key={index} app={app} onClick={() => handleAppClick(app)} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="productivity">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appsList
                  .filter((app) => app.category === "productivity")
                  .map((app, index) => (
                    <AppCard key={index} app={app} onClick={() => handleAppClick(app)} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* AI Chat Assistant */}
          <div className="mt-8 bg-black/50 border border-white/10 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-green-500 mr-2" />
              <h2 className="text-xl font-medium text-white">AI Chat Assistant</h2>
            </div>

            <div className="h-64 bg-black/50 rounded-lg mb-4 p-4 overflow-y-auto">
              <div className="flex items-start mb-4">
                <div className="bg-green-500/20 rounded-lg p-3 max-w-[80%]">
                  <p className="text-white">Hello! I'm your AI assistant. How can I help you today?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Ask me anything..." className="bg-black/50 border-white/10" />
              <Button className="bg-green-600 hover:bg-green-700">Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AppCard({ app, onClick }) {
  const icons = {
    ai: <Brain className="h-6 w-6" />,
    utilities: <Calculator className="h-6 w-6" />,
    productivity: <FileText className="h-6 w-6" />,
  }

  return (
    <Card
      className="bg-black/50 border-white/10 hover:border-green-500 transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-md bg-green-500/20 text-green-500">{icons[app.category]}</div>
        </div>
        <CardTitle className="text-white mt-2">{app.title}</CardTitle>
        <CardDescription>{app.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Launch</Button>
      </CardFooter>
    </Card>
  )
}
