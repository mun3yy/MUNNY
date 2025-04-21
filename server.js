const express = require("express")
const { createBareServer } = require("@tomphttp/bare-server-node")
const path = require("path")
const http = require("http")
const cors = require("cors")

const app = express()
const bareServer = createBareServer("/bare/")
const port = process.env.PORT || 3000

// CORS
app.use(cors())

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Serve Ultraviolet files
app.use("/uv/", express.static(path.join(__dirname, "node_modules/@titaniumnetwork-dev/ultraviolet/dist/")))

// Create HTTP server
const server = http.createServer()

// Handle requests
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    // Handle bare requests
    bareServer.routeRequest(req, res)
  } else {
    // Handle HTTP requests
    app(req, res)
  }
})

// Handle upgrades
server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
