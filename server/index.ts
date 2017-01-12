import { Server } from "xhip-server"
import app from "./app"

new Server(app, {
  origin: 'http://localhost:8888',
  credentials: true,
}).app.listen(8080)
