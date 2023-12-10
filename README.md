# gRPC Web Devtools Example

1. Register interceptors:

   [`client/src/grpc-devtools.ts`](./client/src/grpc-devtools.ts):

   ```ts
   import type { StreamInterceptor, UnaryInterceptor } from "grpc-web";

   declare const __gRPC_devtools__:
     | undefined
     | {
         gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
         gRPCDevtoolsStreamInterceptor: StreamInterceptor<unknown, unknown>;
       };

   export const gRPCDevtoolsUnaryInterceptors =
     typeof __gRPC_devtools__ === "object"
       ? [__gRPC_devtools__.gRPCDevtoolsUnaryInterceptor]
       : [];
   export const gRPCDevtoolsStreamInterceptors =
     typeof __gRPC_devtools__ === "object"
       ? [__gRPC_devtools__.gRPCDevtoolsStreamInterceptor]
       : [];
   ```

   [`client/src/chat-service.ts`](./client/src/chat-service.ts#L26-L30):

   ```ts
   import {
     gRPCDevtoolsUnaryInterceptors,
     gRPCDevtoolsStreamInterceptors,
   } from "./grpc-devtool.ts";

   const client = new EchoServicePromiseClient(host, creds, {
     unaryInterceptors: gRPCDevtoolsUnaryInterceptors,
     streamInterceptors: gRPCDevtoolsStreamInterceptors,
   });
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
