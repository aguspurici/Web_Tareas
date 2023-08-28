import server from "./src/app.js"
import { connectDB } from './src/db.js'

connectDB();
server.listen(3000)
console.log('Server on port', 3000)