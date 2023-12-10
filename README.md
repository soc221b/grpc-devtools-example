# gRPC Web Devtools Example

1. Register interceptors:

   [`client/src/grpc-devtools.ts`](./client/src/grpc-devtools.ts):

   ```ts
   // @ts-nocheck

   export const unaryInterceptors = window.__gRPC_devtools__
     ? [window.__gRPC_devtools__.gRPCDevtoolsUnaryInterceptor]
     : [];

   export const streamInterceptors = window.__gRPC_devtools__
     ? [window.__gRPC_devtools__.gRPCDevtoolsStreamInterceptor]
     : [];
   ```

   [`client/src/chat-service.ts`](./client/src/chat-service.ts#L26-L30):

   ```ts
   import { unaryInterceptors, streamInterceptors } from "./grpc-devtools";
   // ...

   this.chatService = new ChatServiceClient("http://localhost:8080", null, {
     // register grpc-web interceptors for debugging
     unaryInterceptors: unaryInterceptors,
     streamInterceptors: streamInterceptors,
   });
   // ...
   ```

2. Start server gRPC service:

   ```shell
   cd server
   npm ci
   npm run dev
   ```

3. Start envoy proxy:

   ```shell
   envoy -c envoy.yaml
   ```

4. Start client dev server:

   ```shell
   cd client
   npm ci
   npm run dev
   ```

5. Open a browser tab and navigate to:

   ```
   localhost:8081
   ```
