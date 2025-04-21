/*
 * Ultraviolet Configuration
 * This is loaded into the browser and used by the client-side code
 */
self.__uv$config = {
  prefix: "/service/",
  bare: "/bare/",
  encodeUrl: (url) => {
    // Simple XOR encoding
    return btoa(
      Array.from(url)
        .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ (index % 256)))
        .join(""),
    )
  },
  decodeUrl: (encoded) => {
    // Simple XOR decoding
    const data = atob(encoded)
    return Array.from(data)
      .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ (index % 256)))
      .join("")
  },
  handler: "/uv/uv.handler.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
}
