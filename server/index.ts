import { Server } from "xhip-server"
import app from "./app"
import * as http from "http"

const server = new Server(app, {
  origin: 'http://localhost:8888',
  credentials: true,
}).app
http.createServer(server).listen(8080)
