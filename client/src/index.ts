import "@picocss/pico/css/pico.min.css";
import { createApp } from "./render";
import { GrpcWebChatService } from "./chat-service";

createApp({ chatService: new GrpcWebChatService() });
