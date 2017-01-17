require('dotenv').config()

import { Server } from "xhip-server"
import app from "./app"
import * as http from "http"
import * as path from "path"
import * as serveStatic from "serve-static"
import * as URL from "url"
const cors = (process.env.NODE_ENV === "development") ? {
    origin: "http://localhost:8888",
    credentials: true,
  } : {}
const server = new Server(app, {
  cors
})
server.app.use(serveStatic(path.join(__dirname, '../frontend/dist'), {'index': ['index.html']}))
server.listen(process.env.API_ENDPOINT ? URL.parse(process.env.API_ENDPOINT).port : 80)