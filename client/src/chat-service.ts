import { ClientReadableStream } from "grpc-web";
import { ChatServiceClient } from "./protos/ChatServiceClientPb";
import {
  SendMessageRequest,
  OnMessageRequest,
  OnMessageResponse,
} from "./protos/chat_pb";
import { unaryInterceptors, streamInterceptors } from "./grpc-devtools";

export type ChatService = {
  send: (message: string) => void;
  addListener: (listener: Listener) => void;
};
type Listener = (message: string) => void;

export class GrpcWebChatService implements ChatService {
  private userId: string;
  private chatService: ChatServiceClient;
  private channel: ClientReadableStream<OnMessageResponse>;
  private messageListeners: Listener[];

  constructor() {
    // Create unique user for different tabs
    this.userId = Math.random().toString(36).slice(2, 6);

    this.chatService = new ChatServiceClient("http://localhost:8080", null, {
      // register grpc-web interceptors for debugging
      unaryInterceptors: unaryInterceptors,
      streamInterceptors: streamInterceptors,
    });

    const req = new OnMessageRequest();
    req.setId(this.userId);
    const metadata = {
      "request-metadata-example": "onMessage",
    };
    this.channel = this.chatService.onMessage(req, metadata);

    this.messageListeners = [];
    this.channel.on("data", (response) => {
      const message = `${response.getId()}: ${response.getMessage()}`;
      this.messageListeners.forEach((listener) => listener(message));
    });
  }

  send = (message: string): void => {
    const request = new SendMessageRequest();
    request.setId(this.userId);
    request.setMessage(message);
    const metadata = {
      "request-metadata-example": "sendMessage",
    };
    if (Math.random() > 0.5) {
      this.chatService.sendMessage(request, metadata).catch(() => void 0);
    } else {
      this.chatService.sendMessage(request, metadata, () => void 0);
    }
  };

  addListener = (listener: Listener): void => {
    this.messageListeners.push(listener);
  };
}
