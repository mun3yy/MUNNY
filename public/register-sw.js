// Register service worker for Ultraviolet

// Declare Ultraviolet if it's not already defined elsewhere
if (typeof Ultraviolet === "undefined") {
  var Ultraviolet = {
    codec: {
      xor: {
        encode: (str) => {
          let result = ""
          for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ 123)
          }
          return result
        },
        decode: (str) => {
          let result = ""
          for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ 123)
          }
          return result
        },
      },
    },
  }
}

// Declare __uv$config if it's not already defined elsewhere
if (typeof __uv$config === "undefined") {
  var __uv$config = {
    prefix: "/service/",
    bare: "/bare/",
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: "/uv.handler.js",
    bundle: "/uv.bundle.js",
    config: "/uv.config.js",
    sw: "/uv.sw.js",
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      console.log("Service worker registered successfully")
    })
    .catch((err) => {
      console.error("Service worker registration failed:", err)
    })
}
