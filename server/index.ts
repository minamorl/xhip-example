import { Server } from "xhip-server"
import app from "./app"
import * as http from "http"

new Server(app, {
  cors: {
    origin: 'http://localhost:8888',
    credentials: true,
  }
}).listen(8080)
