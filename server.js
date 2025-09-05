import "dotenv/config";
import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateContent } from "./src/services/gemini.service.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:5173",
  }
 });
const chatHistory = [];

io.on('connection', (socket) => {
  console.log("A user Connected");
  
  socket.on('user-query', async (data) => {
    
    chatHistory.push({
      role: 'user',
      parts: [{ text: data }]
    });

    const res = await generateContent(chatHistory);

    chatHistory.push({
      role: 'model',
      parts: [{ text: res }]
    });

    
    socket.emit("ai-response", res);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});

httpServer.listen(5000, () => {
  console.log("Http and WS server started!");
});